export const ERROR_TYPE_MESSAGE = {
  Configuration:
    'Server error: There is a problem with the server configuration.',
  AccessDenied: 'Access denied. There was an error while logging in.',
  Verification: 'The token has expired or has already been used.',
  OAuthSignin: 'Error in constructing an authorization URL.',
  OAuthCallback: 'Error in handling the response from an OAuth provider.',
  OAuthCreateAccount: 'Could not create github user in the database.',
  EmailCreateAccount: 'Could not create email user in the database.',
  Callback: 'Error in the callback handler route.',
  OAuthAccountNotLinked:
    'Email on the account is already linked, but not with this account.',
  EmailSignin: 'Sending the e-mail with the verification token failed.',
  SessionRequired:
    'The content of this page requires you to be signed in at all times. See useSession for configuration.',
  Default: 'Error while authorization',
};
