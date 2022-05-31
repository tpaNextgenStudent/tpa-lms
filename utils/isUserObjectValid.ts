import { IUser } from '../apiHelpers/user';
import { IProfile } from '../lib/types';

export function isUserObjectValid(
  user: unknown
): user is { user: IUser; profile: IProfile } {
  return (
    !!user && typeof user === 'object' && 'user' in user && 'profile' in user
  );
}
