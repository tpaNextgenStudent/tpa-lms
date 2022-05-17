import { NextApiRequest, NextApiResponse } from 'next';
import { Octokit, App } from 'octokit';
import prisma from '../../../lib/prisma';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const users = 'PaulinaPogorzelskaAppunite';
  const usersArray = users.split(' ');

  const octokit = new Octokit({
    auth: process.env.GITHUB_PERSONAL_ACCESS_TOKEN,
  });

  const {
    data: { login },
  } = await octokit.rest.users.getAuthenticated();

  //Find users id's by the github names
  const usersArrayWithIds = (await Promise.all(
    usersArray.map(async (userGithubName: string): Promise<any> => {
      const { data } = await octokit.request(
        'GET https://api.github.com/users/{userGithubName}',
        {
          userGithubName: userGithubName,
        }
      );
      return { id: data?.id, login: data?.login };
    })
  ).catch(e => {
    res.status(404).send({
      message: `User ${e.response.url.split('/').slice(-1)[0]} doesn't exsist`,
    });
  })) as Array<any>;

  //Invite users to organisation
  const invitedUsers = await Promise.all(
    usersArrayWithIds.map(async ({ id }: { id: number }): Promise<any> => {
      const { data } = await octokit.request(
        'POST https://api.github.com/orgs/{org}/invitations',
        {
          org: 'tpa-nextgen',
          invitee_id: id,
        }
      );
    })
  ).catch(e => res.status(404).send({ e }));

  res.status(200).send({ usersArrayWithIds });
};
