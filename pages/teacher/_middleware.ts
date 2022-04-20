import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { fetchGetUserDetails } from '../../api/user';
import { cookiesObjToString } from '../../lib/utils/cookiesObjToString';

export async function middleware(req: NextRequest) {
  const authCookie = cookiesObjToString(req.cookies);
  const user = await fetchGetUserDetails({ cookie: authCookie });

  if (user.role !== 'teacher') {
    return NextResponse.redirect(process.env.BASE_URL!);
  }
}
