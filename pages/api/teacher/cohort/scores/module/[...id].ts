import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../../../lib/prisma';
import getUserSession from '../../../../../../utils/getUserSession';
import getUserAssignment from '../../../../../../utils/getUserAssignment';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getUserSession({ req });
  const moduleId = req.query.id[0];

  const userAssigment = await getUserAssignment(
    session?.user?.accounts[0].providerAccountId
  );

  const cohortStudents = await prisma.assignment.findMany({
    where: {
      cohort_id: userAssigment?.cohort_id,
      role: 'student',
    },
    select: {
      profile: {
        select: {
          profile_id: true,
          login: true,
          role: true,
          provider_account_id: true,
          assignments: true,
        },
      },
      curriculum: true,
    },
    orderBy: [
      {
        curriculum: {
          last_module_position: 'desc',
        },
      },
      {
        curriculum: {
          last_task_position: 'desc',
        },
      },
    ],
  });

  const mappedCohortStudents = cohortStudents.map(student => {
    const curriculum = student.curriculum;
    const modules = (curriculum?.module_progress as Array<any>) || [];
    module = modules.find(module => module.module_id === moduleId) || {
      tasks: [],
    };
    if (module['tasks' as keyof typeof module].length > 0) {
      const profile = student.profile as any;
      const { assignments, ...rest } = profile;
      return {
        student: { profile: rest, assignment_id: assignments[0].id },
        tasks: module['tasks' as keyof typeof module],
      };
    }
  });

  const responseWithUserData = await Promise.all(
    mappedCohortStudents
      .filter(n => n)
      .map(async (studentResults): Promise<any> => {
        const { ...user } = await prisma.account.findUnique({
          where: {
            providerAccountId:
              studentResults?.student?.profile?.provider_account_id,
          },
          include: { user: true },
        });
        return {
          ...studentResults,
          student: {
            user: user.user,
            profile: studentResults?.student.profile,
            assignment_id: studentResults?.student.assignment_id,
          },
        };
      })
  );

  if (session.nextAuthSession) {
    res.status(200).send(responseWithUserData);
  } else {
    res.status(401).send({ message: 'Unauthorized' });
  }
};
