describe('Login page', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('displays sign-in button', () => {
    cy.get('button').contains('Sign in').should('exist');
  });
});
