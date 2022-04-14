/// <reference types="cypress" />
import './commands';
import Chainable = Cypress.Chainable;

Cypress.Commands.add('login' as keyof Chainable, () => {
  const cookiesName = Cypress.env('COOKIE_NAME');
  const socialLoginOptions = {
    username: Cypress.env('GITHUB_USER'),
    password: Cypress.env('GITHUB_PW'),
    loginUrl: Cypress.config().baseUrl + '/login',
    loginSelector: 'button',
    postLoginSelector: '[data-cypress=UserNav]',
    getAllBrowserCookies: true,
  };

  return cy
    .task('GitHubSocialLogin', socialLoginOptions)
    .then(({ cookies }: any) => {
      cy.clearCookies();

      const filteredCookies = cookies.filter((cookie: Cookie) =>
        cookiesName.includes(cookie.name)
      );
      filteredCookies.forEach((cookie: Cookie) => {
        cy.setCookie(cookie.name, cookie.value, {
          domain: cookie.domain,
          expiry: cookie.expiry,
          httpOnly: cookie.httpOnly,
          path: cookie.path,
          secure: cookie.secure,
        });
      });

      Cypress.Cookies.defaults({
        preserve: cookiesName,
      });
    });
});
