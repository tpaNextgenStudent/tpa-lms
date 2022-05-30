// const ssh = 'git@github.com:tpa-nextgen/mwc1.tf16.toggl_task.code.dart.git';
// const https =
//     'https://github.com/tpa-nextgen/mwc1.tf16.toggl_task.code.dart.git';

export function githubRepoToSSH(https: string) {
  return https.replace('https://github.com/', 'git@github.com:');
}
