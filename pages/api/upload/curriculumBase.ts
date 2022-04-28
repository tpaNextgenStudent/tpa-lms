import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const curriculumBase = req.body;
  console.log(4);
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
      // var request = require('request');
      // let description = '';
      // request.get(
      //   'https://raw.githubusercontent.com/tpa-nextgen/modules-master/master/outlines/model_with_classes_1/mwc1.code.dart.spotify_playlist.md?token=GHSAT0AAAAAABUAF4SWJ4VYSUHTRTGCWZQKYTJ2P5Q',
      //   function (error: any, response: any, body: any) {
      //     console.log(99999999, body);
      //     description = body;
      //   }
      // );

      await prisma.task.create({
        data: {
          curriculum_id: task?.id,
          module_version_id: createdModuleVersion.id,
          type: task.type,
          summative: task.kind === 'summative' ? true : false,
          position: i + 1,
          name: task.name,
          description: task.description,
          link: task.link,
        },
      });
    });
  });

  res.status(200).send({});
};
