import assigments from '../pages/api/teacher/assignments';

test('assignments', async () => {
  const req = {};
  const res = {};
  await assigments(req, res);

  if (res._getStatusCode() == 200) {
  }
});
