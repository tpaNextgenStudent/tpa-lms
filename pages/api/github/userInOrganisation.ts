import { NextApiRequest, NextApiResponse } from 'next';
import { Octokit, App } from 'octokit';
import getUserSession from '../../../utils/getUserSession';
import prisma from '../../../lib/prisma';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const octokit = new Octokit({
    auth: `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`,
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

  //Check if user is in the organisation

  let userInOrganisation = true;
  const data = await octokit
    .request('GET https://api.github.com/orgs/{org}/members/{username}', {
      username: profile?.login,
      org: 'tpa-nextgen',
    })
    .catch(e => {
      userInOrganisation = false;
    });

  //check if user has repos created
  const module_progress = profile?.assignments[0].curriculum
    ?.module_progress as any;

  const module_progrees_with_tasks_info = await Promise.all(
    module_progress.map(async (module: any): Promise<any> => {
      return await Promise.all(
        module.tasks.map(async (task: any): Promise<any> => {
          const task_details = await prisma.task.findUnique({
            where: { id: task?.id },
          });

          return { ...task, task_details };
        })
      );
    })
  );

  let resposCreated = true;
  module_progrees_with_tasks_info.flat().map(task => {
    if (task.task_details.type === 'code') {
      if (task.github_link === '') resposCreated = false;
    }
  });

  //zjoinuj progress z task info zeby sprawdzic czy wszystkie taski z typem code maja nadany github link
  //jesli nie mają to status zeby odpalic nowy endpoint
  //jesli maja wpusc do systemu

  res.status(200).send({ userInOrganisation, resposCreated });
};
