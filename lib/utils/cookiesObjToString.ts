export function cookiesObjToString(cookies: { [p: string]: string }) {
  //map from {key: value} cookies pairs to 'cookie=value;' string
  return Object.entries(cookies)
    .map(c => c.map(v => encodeURIComponent(v)).join('='))
    .join('; ');
}
