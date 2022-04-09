import Cookie = Cypress.Cookie;

describe('Login', () => {
  const LOGIN_TEXT = 'Login with github';
  it(`Displays ${LOGIN_TEXT} button(s)`, () => {
    cy.visit('/login');
    cy.contains(LOGIN_TEXT).should('exist');
  });

  it('Success for GitHub provider', () => {
    const cookiesName = Cypress.env('COOKIE_NAME');
    const socialLoginOptions = {
      username: Cypress.env('GITHUB_USER'),
      password: Cypress.env('GITHUB_PW'),
      loginUrl: Cypress.config().baseUrl + '/login',
      loginSelector: 'button',
      postLoginSelector: 'ul',
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

        cy.visit('');
      });
  });
});
