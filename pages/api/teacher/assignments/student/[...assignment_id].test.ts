import endpoint from './[...assignment_id]';
import { testApiHandler } from 'next-test-api-route-handler';

describe('assignments/student/[assignment_id] endpoint', () => {
  it('if user is not authenticated, returns 401', async () => {
    const user = await createUser();
    const assignment = await createAssigmnent({ teacher: user });

    await testApiHandler({
      handler: endpoint,
      requestPatcher(req) {
        authenticateUser(req, user);
        req.url = '/assignments/student/' + assignment.id;
      },
      test: async ({ fetch }) => {
        const res = await fetch();
        await expect(res.json()).resolves.toStrictEqual([
          {
            id: assignment.id,
          },
        ]); // ◄ Passes!
      },
    });
  });
});

function authenticateUser(req) {
  req.headers['X-Test-Session-User-Id'] = user.id;
}

befo;
