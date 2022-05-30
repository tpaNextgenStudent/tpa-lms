import { NextApiRequest, NextApiResponse } from 'next';
import { Octokit } from 'octokit';
import prisma from '../../../lib/prisma';
import modules from '../modules';

interface newAttmept {
  id: any;
  answer: any;
  assignment_id?: string;
  task_id?: string;
  score?: number | null;
  comment?: string | null;
  attempt_number?: number;
  teacher_assigment_id?: string | null;
  submission_date?: Date;
  evaluation_date?: Date | null;
  status?: string;
  module_number?: number;
  task_number?: number;
  workflow_run_id?: string | null;
}

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

  return {
    task,
    taskDetails,
    assignmentId: userAssignment?.id,
    curriculum: userAssignment?.curriculum,
  };
};

//taskDetails?.curriculum?.id
const updateModuleProgress = async (
  curriculumId: string,
  newModuleProgress: any
) => {
  const updatedCurriculum = await prisma.curriculum.update({
    where: { id: curriculumId },
    data: {
      module_progress: newModuleProgress,
    },
  });
};

const extractCommentsAndScore = (logs: any) => {
  let comment = '';
  let score;

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
  return { score, comment };
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const payload = JSON.parse(req.body.payload);

  const octokit = new Octokit({
    auth: process.env.GITHUB_PERSONAL_ACCESS_TOKEN,
  });

  const {
    data: { login },
  } = await octokit.rest.users.getAuthenticated();

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

  const runId = payload.workflow_run.id;

  if (payload.action === 'requested') {
    //If action is requested create attempt with workflow-run-id to later identify this attempt
    const newAttempt = await prisma.attempt.create({
      data: {
        assignment_id: taskDetails?.assignmentId || '',
        task_id: taskDetails?.taskDetails?.id || '',
        answer: `https://github.com/tpa-nextgen-staging/${payload.workflow_run.pull_requests[0].head.repo.name}/pull/${payload.workflow_run.pull_requests[0].number}`,
        attempt_number: taskDetails?.task?.attempt_number + 1 || 1,
        teacher_assigment_id: 'cl3mjp6v60090uts6s96mglvo',
        submission_date: new Date(),
        status: 'in review',
        module_number: taskDetails?.task?.modulePosition,
        task_number: taskDetails?.task?.position,
        workflow_run_id: `${runId}`,
      },
    });
    //update modules progress
    const module_progress = taskDetails?.curriculum
      ?.module_progress as Array<any>;
    const task_id = taskDetails?.taskDetails?.id as string;
    const newModuleProgress = await Promise.all(
      module_progress.map(async (module: any) => {
        const tasks = await Promise.all(
          module.tasks.map(async (task: any) => {
            if (task.id === task_id) {
              task.attempt_number = newAttempt.attempt_number;
              task.attempt_id = newAttempt.id;
              task.answer = newAttempt.answer;
              task.status = 'in review';

              if (taskDetails?.taskDetails?.summative === false) {
                const nextTask = module.tasks.find(
                  (el: any) => el.position === task.position + 1
                );
                const afterNextTask = module.tasks.find(
                  (el: any) => el.position === task.position + 2
                );
                if (afterNextTask) {
                  nextTask.status = 'in progress';
                } else {
                  let approved = 0;
                  let i = 0;
                  module.tasks.map((el: any) => {
                    i = i + 1;
                    if (el.status === 'approved') {
                      approved = approved + 1;
                    }
                  });
                  if (approved === i - 1 && newAttempt.score === 3) {
                    nextTask.status = 'in progress';
                  }
                }
              }
              return task;
            } else {
              return task;
            }
          })
        );
        return { ...module, tasks };
      })
    );

    await updateModuleProgress(
      taskDetails?.curriculum?.id as string,
      newModuleProgress
    );
  } else if (payload.action === 'completed') {
    const alreadyCreatedAttempt = await prisma.attempt.findUnique({
      where: { workflow_run_id: `${runId}` },
    });

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

    if (taskDetails?.taskDetails?.summative === true) {
      const oldAttempts = await prisma.attempt.findMany({
        where: { task_id: taskDetails?.taskDetails?.id, score: null },
      });

      await Promise.all(
        oldAttempts.map(async (attempt: any) => {
          if (attempt.workflow_run_id === `${runId}`) {
            await prisma.attempt.update({
              where: { id: attempt.id },
              data: { deprecated: true },
            });
          }
        })
      );

      let newAttempt: newAttmept;
      if (alreadyCreatedAttempt) {
        newAttempt = await prisma.attempt.update({
          where: { workflow_run_id: `${runId}` },
          data: {
            assignment_id: taskDetails?.assignmentId || '',
            task_id: taskDetails?.taskDetails?.id || '',
            answer: `https://github.com/tpa-nextgen-staging/${payload.workflow_run.pull_requests[0].head.repo.name}/pull/${payload.workflow_run.pull_requests[0].number}`,
            attempt_number: taskDetails?.task?.attempt_number || 1,
            teacher_assigment_id: 'cl3mjp6v60090uts6s96mglvo',
            submission_date: new Date(),
            status: 'in review',
            module_number: taskDetails?.task?.modulePosition,
            task_number: taskDetails?.task?.position,
          },
        });
      } else {
        newAttempt = await prisma.attempt.create({
          data: {
            assignment_id: taskDetails?.assignmentId || '',
            task_id: taskDetails?.taskDetails?.id || '',
            answer: `https://github.com/tpa-nextgen-staging/${payload.workflow_run.pull_requests[0].head.repo.name}/pull/${payload.workflow_run.pull_requests[0].number}`,
            attempt_number: taskDetails?.task?.attempt_number + 1,
            teacher_assigment_id: 'cl3mjp6v60090uts6s96mglvo',
            submission_date: new Date(),
            status: 'in review',
            module_number: taskDetails?.task?.modulePosition,
            task_number: taskDetails?.task?.position,
          },
        });
      }
      const module_progress = taskDetails?.curriculum
        ?.module_progress as Array<any>;
      const task_id = taskDetails?.taskDetails?.id as string;
      //unblock next task, chyba ze nastepny summative to sprawdz czy wszystko jest approved
      const newModuleProgress = await Promise.all(
        module_progress.map(async (module: any) => {
          const tasks = await Promise.all(
            module.tasks.map(async (task: any) => {
              if (task.id === task_id) {
                task.attempt_number = newAttempt.attempt_number;
                task.attempt_id = newAttempt.id;
                task.answer = newAttempt.answer;
                task.status = 'in review';
                return task;
              } else {
                return task;
              }
            })
          );
          return { ...module, tasks };
        })
      );

      await updateModuleProgress(
        taskDetails?.curriculum?.id as string,
        newModuleProgress
      );
    } else {
      console.log('JESTEM TU GDZIE POWINIENIEM');
      const { comment, score } = extractCommentsAndScore(logs);
      let newAttempt: newAttmept;
      if (alreadyCreatedAttempt) {
        newAttempt = await prisma.attempt.update({
          where: { workflow_run_id: `${runId}` },
          data: {
            assignment_id: taskDetails?.assignmentId || '',
            task_id: taskDetails?.taskDetails?.id || '',
            answer: `https://github.com/tpa-nextgen-staging/${payload.workflow_run.pull_requests[0].head.repo.name}/pull/${payload.workflow_run.pull_requests[0].number}`,
            attempt_number: taskDetails?.task?.attempt_number || 1,
            teacher_assigment_id: 'cl3mjp6v60090uts6s96mglvo',
            submission_date: new Date(),
            evaluation_date: new Date(),
            status: (score || 0) > 1 ? 'approved' : 'in progress',
            module_number: taskDetails?.task?.modulePosition,
            task_number: taskDetails?.task?.position,
            score: score,
            comment: JSON.stringify(comment),
          },
        });
      } else {
        newAttempt = await prisma.attempt.create({
          data: {
            assignment_id: taskDetails?.assignmentId || '',
            task_id: taskDetails?.taskDetails?.id || '',
            answer: `https://github.com/tpa-nextgen-staging/${payload.workflow_run.pull_requests[0].head.repo.name}/pull/${payload.workflow_run.pull_requests[0].number}`,
            attempt_number: taskDetails?.task?.attempt_number + 1,
            teacher_assigment_id: 'cl3mjp6v60090uts6s96mglvo',
            submission_date: new Date(),
            evaluation_date: new Date(),
            status: (score || 0) > 1 ? 'approved' : 'in progress',
            module_number: taskDetails?.task?.modulePosition,
            task_number: taskDetails?.task?.position,
            score: score,
            comment: JSON.stringify(comment),
          },
        });
      }

      const module_progress = taskDetails?.curriculum
        ?.module_progress as Array<any>;
      const task_id = taskDetails?.taskDetails?.id as string;
      //unblock next task, chyba ze nastepny summative to sprawdz czy wszystko jest approved
      const newModuleProgress = await Promise.all(
        module_progress.map(async (module: any) => {
          const tasks = await Promise.all(
            module.tasks.map(async (task: any) => {
              if (task.id === task_id) {
                task.attempt_number = newAttempt.attempt_number;
                task.attempt_id = newAttempt.id;
                task.score = newAttempt.score;
                task.answer = newAttempt.answer;
                task.status =
                  newAttempt.score === 3 ? 'approved' : 'in progress';
                const nextTask = module.tasks.find(
                  (el: any) => el.position === task.position + 1
                );
                const afterNextTask = module.tasks.find(
                  (el: any) => el.position === task.position + 2
                );
                if (afterNextTask) {
                  console.log(1, afterNextTask);
                  nextTask.status = 'in progress';
                } else {
                  console.log(2, 'else');
                  let approved = 0;
                  let i = 0;
                  module.tasks.map((el: any) => {
                    i = i + 1;
                    if (el.status === 'approved') {
                      approved = approved + 1;
                    }
                  });
                  console.log(3, approved);
                  console.log(4, i);
                  console.log(5, approved === i - 1 && newAttempt.score === 3);
                  if (approved === i - 1 && newAttempt.score === 3) {
                    nextTask.status = 'in progress';
                  }
                }
                return task;
              } else {
                return task;
              }
            })
          );
          return { ...module, tasks };
        })
      );

      await updateModuleProgress(
        taskDetails?.curriculum?.id as string,
        newModuleProgress
      );
    }
  }

  return res.status(200).send({});
};
