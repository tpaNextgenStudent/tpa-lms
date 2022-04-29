import { NextApiRequest, NextApiResponse } from 'next';
import { Octokit, App } from 'octokit';
import prisma from '../../../lib/prisma';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const octokit = new Octokit({
    auth: `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`,
  });

  const {
    data: { login },
  } = await octokit.rest.users.getAuthenticated();
  const curriculumBase = req.body.body;

  curriculumBase.modules.forEach(async (module: any) => {
    //if we don't have this id in MODULE at all add it there
    const moduleExsist = await prisma.module.findUnique({
      where: { id: module.id },
    });

    if (!moduleExsist) {
      const createdModule = await prisma.module.create({
        data: {
          id: module?.id,
          name: module.name,
        },
      });
    }
    //add module version to MODULE VERSION

    const lastVersion = await prisma.moduleVersion.findMany({
      where: { moduleId: module?.id },
      orderBy: {
        version_number: 'desc',
      },
    });
    const lastVersionNumber = lastVersion[0]?.version_number || 0;

    const createdModuleVersion = await prisma.moduleVersion.create({
      data: {
        moduleId: module?.id,
        version_number: lastVersionNumber + 1,
      },
    });

    //add tasks and link them to correct MODULE VERSION
    module.tasks.forEach(async (task: any, i: number) => {
      let des = { data: { download_url: '' } };
      if (task.description.includes('/master/')) {
        const de = await octokit.request(
          'GET https://api.github.com/repos/{owner}/{repo}/contents/{path}',
          {
            owner: 'tpa-nextgen',
            repo: 'modules-master',
            path: task.description.substring(58),
          }
        );
        des = de;
      } else {
        const de = await octokit.request(
          'GET https://api.github.com/repos/{owner}/{repo}/contents/{path}',
          {
            owner: 'tpa-nextgen',
            repo: 'modules-master',
            path: task.description.substring(92),
            ref: '1cd29d1f9fc592be29aa523d7500cf60aa6b0725',
          }
        );
        des = de;
      }

      var request = require('request');

      const desc = await request.get(
        des?.data?.download_url,
        function (error: any, response: any, body: any) {
          check(body);
        }
      );

      const check = async (body: any) => {
        await prisma.task.create({
          data: {
            curriculum_id: task?.id,
            module_version_id: createdModuleVersion.id,
            type: task.type,
            summative: task.kind === 'summative' ? true : false,
            position: i + 1,
            name: task.name,
            description: body,
            link: task.link,
          },
        });
      };
      console.log(33, desc);
    });
  });

  res.status(200).send({});
};
