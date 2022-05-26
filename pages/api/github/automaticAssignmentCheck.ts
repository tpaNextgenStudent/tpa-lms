import { NextApiRequest, NextApiResponse } from 'next';
import { Octokit } from 'octokit';
import prisma from '../../../lib/prisma';

const findTaskInfo = (repositoryUrl: string) => {
  const repositoryUrlSplitted = repositoryUrl.split('-');
  const userLogin = repositoryUrlSplitted.pop();
  return userLogin;
};

const findTaskDetails = async (
  repositoryUrl: string,
  userLogin: string,
  res: NextApiResponse
) => {
  const userRepoLogin = findTaskInfo(repositoryUrl);

  if (userRepoLogin != userLogin) {
    return res.status(404).send({
      message:
        'User that made action is not a user that should make actions on this repository',
    });
  }

  const userProfile = await prisma.profile.findUnique({
    where: { login: userLogin },
  });

  const userAssignment = await prisma.assignment.findFirst({
    where: { profile_id: userProfile?.profile_id },
    include: { curriculum: true },
  });

  const module_progress = userAssignment?.curriculum
    ?.module_progress as Array<any>;
  let moduleTasks = [] as Array<any>;
  module_progress.map(module =>
    module.tasks.map((task: any) =>
      moduleTasks.push({ ...task, modulePosition: module.position })
    )
  );
  const task = moduleTasks.flat().find(el => el.github_link === repositoryUrl);

  const taskDetails = await prisma.task.findFirst({ where: { id: task.id } });

  return { task, taskDetails, assignmentId: userAssignment?.id };
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const payload = JSON.parse(req.body.payload);

  const octokit = new Octokit({
    auth: process.env.GITHUB_PERSONAL_ACCESS_TOKEN,
  });

  const {
    data: { login },
  } = await octokit.rest.users.getAuthenticated();

  if (payload.action === 'requested') {
    //Mark attempt as in review if action is requested
    return res.status(404).send({
      message: 'Handler supposed to make procedures only for completed actions',
    });
  }

  const taskDetails = await findTaskDetails(
    payload.workflow_run.repository.html_url,
    payload.workflow_run.actor.login,
    res
  );

  //Check if it was pull_request event
  if (payload.workflow_run.event != 'pull_request') {
    return res.status(404).send({ message: 'Not a pull request event' });
  }

  //Check if user pushed to the correct branch
  if (payload.workflow_run.head_branch != 'solution-branch') {
    return res.status(404).send({ message: 'Incorrect branch name' });
  }
  //sprawdzić czy jest status in progress jak nie to return i koniec !!!!!!!!!!

  //Check if task is summative
  // if (taskDetails.taskDetails?.summative === true) {
  // await prisma.attempt.create({
  //   data: {
  //     assignment_id: taskDetails.assignmentId || '',
  //     task_id: taskDetails.taskDetails.id,
  //     answer: `https://github.com/tpa-nextgen-staging/${payload.workflow_run.pull_requests[0].head.repo.name}/pull/${payload.workflow_run.pull_requests[0].number}`,
  //     attempt_number: taskDetails.task.attempt_number + 1,
  //     teacher_assigment_id: 'cl2idovve0492o0s6xca7z2vs',
  //     submission_date: new Date(),
  //     status: 'in review',
  //     module_number: taskDetails.task.modulePosition,
  //     task_number: taskDetails.task.position,
  //   },
  // });
  // } else {
  // }

  const runId = payload.workflow_run.id;

  const runJobs = (await octokit
    .request('GET /repos/{owner}/{repo}/actions/runs/{run_id}/jobs', {
      repo: payload.workflow_run.repository.name,
      owner: 'tpa-nextgen-staging',
      run_id: runId,
    })
    .catch(e => console.log(e))) as any;

  const logs = (await octokit
    .request('GET /repos/{owner}/{repo}/actions/jobs/{job_id}/logs', {
      repo: payload.workflow_run.repository.name,
      owner: 'tpa-nextgen-staging',
      job_id: runJobs.data.jobs[0].id,
    })
    .catch(e => console.log(e))) as any;

  let comment = '';
  let score;
  if (taskDetails?.taskDetails?.summative === true) {
    console.log(1);
  } else {
    if (logs.data.includes('gotest')) {
      if (logs.data.includes('Messages:')) {
        comment = logs.data
          .split('Messages:')[1]
          .split('\r\n')[0]
          .replace('\t', '')
          .trim();
      }
      if (logs.data.includes('✓')) {
        score = 3;
        comment = 'Tests passed sucessfully.';
      } else if (logs.data.includes('✖')) {
        score = 1;
      }
    } else if (logs.data.includes('dart')) {
      if (!logs.data.includes('error')) {
        score = 3;
        comment = 'Tests passed sucessfully.';
      } else {
        score = 1;
        comment = logs.data
          .split(`\"testID\":`)
          .filter((n: any) => n.includes(`\"error\":`))
          .map((el: any) => {
            const splittedEl = el.split(',');
            return {
              testID: splittedEl[0],
              error: el.split(`\"error\":\"`)[1].split(`",\"stackTrace\"`)[0],
            };
          });
      }
    }
    console.log(2);
  }

  //   let comment = '';
  //   let score;
  //   let comments;

  //   if (logs.data.includes('gotest')) {
  //     if (logs.data.includes('Messages:')) {
  //       comment = logs.data
  //         .split('Messages:')[1]
  //         .split('\r\n')[0]
  //         .replace('\t', '')
  //         .trim();
  //     }
  //     if (logs.data.includes('✓')) {
  //       score = 3;
  //       comment = 'Perfectly done.';
  //     } else if (logs.data.includes('✖')) {
  //       score = 1;
  //     }
  //   } else if (logs.data.includes('dart')) {
  //     if (logs.data.includes('All tests passed')) {
  //       score = 3;
  //       comment = 'Perfectly done.';
  //     } else if (logs.data.includes('tests failed')) {
  //       score = 1;
  //       comments = logs.data.split('[E]').map((el: any, i: number) => {
  //         if (i === 0) {
  //           return;
  //         }
  //         if (el.includes('UnimplementedError')) {
  //           return;
  //         }
  //         const string = el.split('\r\n')[1];
  //         const indexOfSpace = string.indexOf(' ');
  //         return string.substring(indexOfSpace + 1).trim();
  //       });
  //       comment =
  //         comments.length > 0 ? comments.filter((n: any) => n).join('.') : '';
  //     }
  //   }

  return res.status(200).send({ comment, score });
  // }
};
