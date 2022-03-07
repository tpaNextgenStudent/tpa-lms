import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const data = fs.readFileSync('./lib/mocks/data.json', 'utf-8');
  return res.send(JSON.parse(data));
}
