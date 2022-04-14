describe('Student - My Scores', () => {
  it('Displays my tasks page with table', () => {
    cy.login();
    cy.visit('/student/scores');

    cy.get('h1').should('contain.text', 'My Scores');

    cy.get('[data-cypress=Table]').within(() => {
      const tableHeaders = [
        'Date of submission',
        'Date of review',
        'Module',
        'Task',
        'Task type',
        'Attempt',
        'Score',
        'Reviewed by',
      ];
      tableHeaders.forEach(header => {
        cy.get('[data-cypress=TableHead]').contains(header).should('exist');
      });
    });

    let taskName: string;
    let taskScore: string;
    cy.get('[data-cypress=TableRow]')
      .first()
      .within(() => {
        cy.get('[data-cypress=MyScoresTableTaskCell]').then($el => {
          taskName = $el.text();
        });
        cy.get('[data-cypress=TaskScoreBadge]').then($el => {
          taskScore = $el.text();
        });
      })
      .contains('View task')
      .should('exist')
      .click();

    cy.location('pathname', { timeout: 10000 })
      .should('match', new RegExp('/student\\/scores\\/.+'))
      .then(() => {
        cy.get('h1').should('include.text', 'My Scores');
        cy.get('h1').should('include.text', taskName);
      });

    cy.get('[data-cypress=TaskSection]').within($section => {
      cy.get('[data-cypress=TaskScoreBadge]').should('include.text', taskScore);
      cy.get('[data-cypress=TaskSectionTaskTitle]').should(
        'have.text',
        taskName
      );
    });

    cy.get('[data-cypress=TaskSectionTryAgainBar]')
      .should('exist')
      .find('button')
      .click();

    cy.location('pathname', { timeout: 10000 }).should(
      'match',
      new RegExp('/student\\/tasks\\/.+')
    );
  });
});
