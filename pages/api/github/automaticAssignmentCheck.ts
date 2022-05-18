import { NextApiRequest, NextApiResponse } from 'next';
import { Octokit, App } from 'octokit';
import getUserSession from '../../../utils/getUserSession';
import prisma from '../../../lib/prisma';

// Info from Workflow runs webhook
// workflow_run.head_branch must match user personal branch name
// we're finding artefat_id by run_id (id)

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const payload = JSON.parse(req.body.payload);

  const octokit = new Octokit({
    auth: process.env.GITHUB_PERSONAL_ACCESS_TOKEN,
  });

  const {
    data: { login },
  } = await octokit.rest.users.getAuthenticated();

  //Check if it was pull_request event
  if (payload.workflow_run.event != 'pull_request') {
    res.status(404).send({ message: 'Not a pull request event' });
  }

  //Check if user pushed to the correct branch
  if (payload.workflow_run.head_branch != 'solution-branch') {
    res.status(404).send({ message: 'Incorrect branch name' });
  }

  if (payload.action === 'requested') {
    //Mark attempt as in review if action is requested
  } else if (payload.action === 'completed') {
    //Make all actions for completed state
    const runId = payload.workflow_run.id;

    const runJobs = (await octokit
      .request('GET /repos/{owner}/{repo}/actions/runs/{run_id}/jobs', {
        repo: 'Go-repo-example',
        owner: 'tpa-nextgen-staging',
        run_id: 2347867778,
      })
      .catch(e => console.log(e))) as any;

    // const logs = (await octokit
    //   .request('GET /repos/{owner}/{repo}/actions/jobs/{job_id}/logs', {
    //     repo: payload.workflow_run.repository.name,
    //     owner: 'tpa-nextgen-staging',
    //     job_id: runJobs.data.jobs[0].id,
    //   })
    //   .catch(e => console.log(e))) as any;

    // let comment = '';
    // let score;

    // if (logs.data.includes('gotest')) {
    //   if (logs.data.includes('Messages:')) {
    //     comment = logs.data
    //       .split('Messages:')[1]
    //       .split('\r\n')[0]
    //       .replace('\t', '')
    //       .trim();
    //   }
    //   if (logs.data.includes('✓')) {
    //     score = 3;
    //     comment = 'Perfectly done.';
    //   } else if (logs.data.includes('✖')) {
    //     score = 1;
    //   }
    // }
    // console.log('la', { comment, score });

    res.status(200).send({
      1: { name: payload.workflow_run.repository.name, id: runId, runJobs },
    });
  }
};
