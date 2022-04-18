describe('Teacher - Assignments', () => {
  it('Displays assignments page with table', () => {
    cy.login();
    cy.visit('/teacher/assignments');

    cy.get('h1').should('contain.text', 'Assignments');

    cy.get('[data-cypress=Table]').within(() => {
      const tableHeaders = [
        'Date of submission',
        'Student name',
        'Module',
        'Task name',
        'Task type',
        'Attempt',
      ];
      tableHeaders.forEach(header => {
        cy.get('[data-cypress=TableHead]').contains(header).should('exist');
      });
    });

    let taskName: string;
    let taskModule: string;
    let studentName: string;
    cy.get('[data-cypress=TableRow]')
      .first()
      .within(() => {
        cy.get('[data-cypress=AssignmentsTableTaskCell]').then($el => {
          taskName = $el.text();
        });
        cy.get('[data-cypress=UserName]').then($el => {
          studentName = $el.text();
        });
        cy.get('[data-cypress=AssignmentsTableModuleCell]').then($el => {
          taskModule = $el.text();
        });
      })
      .contains('Check')
      .should('exist')
      .click();

    cy.location('pathname', { timeout: 10000 })
      .should('match', new RegExp('/teacher\\/assignments\\/.+'))
      .then(() => {
        cy.get('h1').should('include.text', 'Assignments');
        cy.get('h1').should('include.text', studentName);
      });

    cy.get('[data-cypress=TaskSection]').within($section => {
      cy.get('[data-cypress=TaskSectionModuleName]').should(
        'include.text',
        taskModule
      );
      cy.get('[data-cypress=TaskSectionTaskTitle]').should(
        'have.text',
        taskName
      );
    });
  });
});
