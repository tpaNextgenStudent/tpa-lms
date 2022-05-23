import { NextApiRequest, NextApiResponse } from 'next';
import { Octokit, App } from 'octokit';
import getUserSession from '../../../utils/getUserSession';
import prisma from '../../../lib/prisma';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const octokit = new Octokit({
    auth: process.env.GITHUB_PERSONAL_ACCESS_TOKEN,
  });

  const {
    data: { login },
  } = await octokit.rest.users.getAuthenticated();

  const session = await getUserSession({ req });
  const user = session?.user?.accounts[0] as any;
  const profile = await prisma.profile.findFirst({
    where: { provider_account_id: user.providerAccountId },
    select: {
      login: true,
      assignments: { select: { curriculum: true } },
    },
  });

  //check if user has repos created
  const module_progress = profile?.assignments[0].curriculum
    ?.module_progress as any;

  try {
    const new_module_progress = await Promise.all(
      module_progress.map(async (module: any): Promise<any> => {
        const tasks = await Promise.all(
          module.tasks.map(async (task: any): Promise<any> => {
            const task_details = await prisma.task.findUnique({
              where: { id: task?.id },
            });

            if (task_details?.type === 'code') {
              // make repo a template
              const data = await octokit.request(
                'PATCH https://api.github.com/repos/{owner}/{repo}',
                {
                  repo: task_details?.link?.split('/').slice(-1)[0],
                  owner: 'tpa-nextgen',
                  is_template: true,
                }
              );

              //create copy for user
              const data2 = (await octokit.request(
                'POST https://api.github.com/repos/{template_owner}/{template_repo}/generate',
                {
                  template_repo: task_details?.link?.split('/').slice(-1)[0],
                  template_owner: 'tpa-nextgen',
                  owner: 'tpa-nextgen-staging',
                  name: `${task_details?.link?.split('/').slice(-1)[0]}-${
                    profile?.login
                  }`,
                  private: true,
                }
              )) as any;

              //make user a colabolator
              const data3 = await octokit.request(
                'PUT https://api.github.com/repos/{owner}/{repo}/collaborators/{username}',
                {
                  repo: data2.data.html_url.split('/').slice(-1)[0],
                  owner: 'tpa-nextgen-staging',
                  username: profile?.login,
                }
              );
              return {
                ...task,
                github_link: data2.data.html_url,
              };
            }
            return task;
          })
        );
        return { ...module, tasks };
      })
    );
    const updatedCurriculum = await prisma.curriculum.update({
      where: { id: profile?.assignments[0]?.curriculum?.id },
      data: { module_progress: new_module_progress },
    });

    res.status(200).send({ updatedCurriculum });
  } catch (error: unknown) {
    let message = 'Error while creating repositories';
    let status = 500;
    if (error instanceof Error) {
      message = error.message;
      if (message.includes('already exists')) {
        status = 409;
      }
    }
    return res.status(status).send({ message });
  }
};
