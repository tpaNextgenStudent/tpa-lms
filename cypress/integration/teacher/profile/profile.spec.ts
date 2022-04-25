describe('Teacher - Profile', () => {
  it('Displays teacher profile page', () => {
    cy.login();
    cy.visit('/profile');

    cy.get('h1').should('contain.text', 'My Profile');
  });

  it('Contains info about user', () => {
    cy.get('[data-cypress=ProfileBanner]').should('exist');
    cy.get('[data-cypress=ProfileUserInfo]')
      .should('exist')
      .within(() => {
        cy.get('[data-cypress=ProfileUserName]')
          .should('exist')
          .should('not.be.empty');
        cy.get('[data-cypress=ProfileUserGithubLink]')
          .should('exist')
          .should('not.be.empty');
        cy.get('[data-cypress=ProfileUserBio]')
          .should('exist')
          .should('not.be.empty');
        cy.get('[data-cypress=ProfileUserJoinDate]')
          .should('exist')
          .should('not.be.empty');
      });
  });

  it('Does not contain info about teacher', () => {
    cy.get('[data-cypress=ProfileTeacherInfo]').should('not.exist');
  });

  it('Contains info about cohort', () => {
    cy.get('[data-cypress=ProfileCohortInfo]')
      .should('exist')
      .within(() => {
        cy.get('[data-cypress=ProfileCohortName]')
          .should('exist')
          .should('not.be.empty');
        cy.get('[data-cypress=ProfileCohortNumOfStudents]')
          .should('exist')
          .should('not.be.empty');
      });
  });

  it('Redirects to cohort progress after link click', () => {
    cy.get('[data-cypress=ProfileCohortProgressLink]')
      .should('exist')
      .click()
      .then(() => {
        cy.location('pathname', { timeout: 10000 }).should(
          'match',
          new RegExp('/teacher\\/cohort\\/progress')
        );
        cy.get('h1').should('contain.text', 'Cohort Progress');
      });
  });
});
