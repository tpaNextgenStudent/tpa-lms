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
    res.status(404).send({
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
  module_progress.map(module => moduleTasks.push(module.tasks));
  const task = moduleTasks.flat().find(el => el.github_link === repositoryUrl);

  return { taskId: task.id, assignmentId: userAssignment?.id };
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const payload = JSON.parse(req.body.payload);

  const octokit = new Octokit({
    auth: process.env.GITHUB_PERSONAL_ACCESS_TOKEN,
  });

  const {
    data: { login },
  } = await octokit.rest.users.getAuthenticated();
  console.log(1, payload.workflow_run.repository.html_url);
  console.log(2, payload.workflow_run.actor.login);

  const taskDetails = await findTaskDetails(
    payload.workflow_run.repository.html_url,
    payload.workflow_run.actor.login,
    res
  );

  // //Check if it was pull_request event
  // if (payload.workflow_run.event != 'pull_request') {
  //   res.status(404).send({ message: 'Not a pull request event' });
  // }

  // //Check if user pushed to the correct branch
  // if (payload.workflow_run.head_branch != 'solution-branch') {
  //   res.status(404).send({ message: 'Incorrect branch name' });
  // }

  // //Check if task is summative or formative

  // if (payload.action === 'requested') {
  //   //Mark attempt as in review if action is requested
  //   res.status(200).send({
  //     1: 1,
  //   });
  // } else if (payload.action === 'completed') {
  //   //Make all actions for completed state
  //   const runId = payload.workflow_run.id;

  //   const runJobs = (await octokit
  //     .request('GET /repos/{owner}/{repo}/actions/runs/{run_id}/jobs', {
  //       repo: 'mwc1.tf16.toggl_task.code.dart',
  //       owner: 'tpa-nextgen',
  //       run_id: 2351531697,
  //     })
  //     .catch(e => console.log(e))) as any;

  //   const logs = (await octokit
  //     .request('GET /repos/{owner}/{repo}/actions/jobs/{job_id}/logs', {
  //       repo: 'mwc1.tf16.toggl_task.code.dart',
  //       owner: 'tpa-nextgen',
  //       job_id: runJobs.data.jobs[0].id,
  //     })
  //     .catch(e => console.log(e))) as any;

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

  res.status(200).send({ taskDetails });
  // }
};
