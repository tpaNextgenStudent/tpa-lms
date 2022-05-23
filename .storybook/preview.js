import { RouterContext } from 'next/dist/shared/lib/router-context';
import '../lib/styles/global.scss';
import '../lib/styles/gmfStyles.scss';

export const parameters = {
  nextRouter: {
    Provider: RouterContext.Provider,
  },
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
