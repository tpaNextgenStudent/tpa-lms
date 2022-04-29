import { NextApiRequest, NextApiResponse } from 'next';
import { now } from 'next-auth/client/_utils';
import { Octokit, App } from 'octokit';
import prisma from '../../lib/prisma';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const curriculumBase = req.body.body;

  const tasks = [] as any;
  const module_progress_gen = [] as any;
  const base = curriculumBase?.modules || [];

  await Promise.all(
    base.map(async (module: any, i: number): Promise<any> => {
      const position = i;
      let tasksss = [] as any;
      let module_progress = {
        position: i + 1,
        module_id: module.id,
        name: module.name,
        tasks: [] as any,
      };

      await Promise.all(
        module.tasks.map(async (task: any, i: number) => {
          const u = await prisma.task.findFirst({
            where: { curriculum_id: task.id },
          });

          let obj = {
            id: u?.id,
            position: i + 1,
            status: 'upcoming',
            attempt_id: null as null | string,
            score: null as null | number,
            answer: null as null | string,
            attempt_number: null as null | number,
          };
          if (module.id === 'mwc1') {
            if (task.type === 'info') {
              const at = await prisma.attempt.create({
                data: {
                  assignment_id: 'cl2j88m990528jus66029n439',
                  task_id: u?.id,
                  answer: '',
                  attempt_number: 1,
                  teacher_assigment_id: 'cl2j88m980523jus6sjfv6hx9',
                  status: 'approved',
                  module_number: 1,
                  task_number: i + 1,
                },
              });
              obj = {
                id: u?.id,
                position: i + 1,
                status: 'approved',
                attempt_id: at.id,
                score: null,
                answer: '',
                attempt_number: 1,
              };
            } else {
              const at = await prisma.attempt.create({
                data: {
                  assignment_id: 'cl2j88m990528jus66029n439',
                  task_id: u?.id,
                  answer: 'https://github.com/tpa-nextgen/TEMP_CHECK',
                  attempt_number: 1,
                  teacher_assigment_id: 'cl2j88m980523jus6sjfv6hx9',
                  status: 'approved',
                  score: 3,
                  comment: 'good job !',
                  module_number: 1,
                  task_number: i + 1,
                },
              });
              obj = {
                id: u?.id,
                position: i + 1,
                status: 'approved',
                attempt_id: at.id,
                score: 3,
                answer: 'https://github.com/tpa-nextgen/TEMP_CHECK',
                attempt_number: 1,
              };
            }
          }

          module_progress.tasks[i] = obj;
          return tasksss;
        })
      );

      module_progress_gen[position] = module_progress;
      return;
    })
  );

  let checkkk = [] as any;
  const responseWithUserData = await Promise.all(
    module_progress_gen.map(async (module: any): Promise<any> => {
      const moduleVersion = await prisma.moduleVersion.findFirst({
        where: { moduleId: module.module_id },
      });

      delete module['module_id'];
      checkkk.push({
        module_id: moduleVersion?.id,
        ...module,
      });

      return {
        module_id: moduleVersion?.id,
        ...module,
      };
    })
  );

  console.log(555, JSON.stringify(responseWithUserData));

  res.status(200).send({ module_progress_gen });
};
