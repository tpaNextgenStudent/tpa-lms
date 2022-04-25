describe('Teacher - Cohort Progress', () => {
  it('Displays assignments page with grades legend and table', () => {
    cy.login();
    cy.visit('/teacher/cohort/progress');

    cy.get('h1').should('contain.text', 'Cohort Progress');

    cy.get('[data-cypress=GradesLegend]').should('exist');

    cy.get('[data-cypress=Table]').within(() => {
      const tableHeaders = ['Student name', 'Task 1'];
      tableHeaders.forEach(header => {
        cy.get('[data-cypress=TableHead]').contains(header).should('exist');
      });
    });
  });

  it('Switches between modules using module select', () => {
    let currentModuleName: string;
    let moduleId: string;

    cy.location().should(loc => {
      const parts = loc.pathname.split('/');
      moduleId = parts[parts.length - 1];
    });

    cy.get('[data-cypress=CustomSelect]')
      .within($moduleSelect => {
        currentModuleName = $moduleSelect.text();
      })
      .click();

    cy.get('#react-select-module-select-listbox').then($list => {
      cy.wrap($list).first().click();
      cy.location('pathname', { timeout: 10000 }).should(
        'not.include',
        moduleId
      );
      cy.get('[data-cypress=CustomSelect]', { timeout: 10000 }).within(
        $moduleSelect => {
          expect($moduleSelect.text()).not.to.eq(currentModuleName);
        }
      );
    });
  });

  let studentName: string;
  it('Navigates to single student progress view', () => {
    cy.get('[data-cypress=TableRow]')
      .first()
      .within(() => {
        cy.get('[data-cypress=UserName]').then($el => {
          studentName = $el.text();
        });
      })
      .contains('Go to profile')
      .should('exist')
      .click();

    cy.location('pathname', { timeout: 10000 })
      .should('match', new RegExp('/teacher\\/cohort\\/progress\\/.+'))
      .then(() => {
        cy.get('h1', { timeout: 10000 }).should(
          'include.text',
          'Cohort Progress'
        );
        cy.get('h1', { timeout: 10000 }).should('include.text', studentName);
      });

    cy.get('[data-cypress=GradesLegend]').should('exist');

    cy.get('[data-cypress=Table]').within(() => {
      const tableHeaders = ['Module', 'Task 1'];
      tableHeaders.forEach(header => {
        cy.get('[data-cypress=TableHead]').contains(header).should('exist');
      });
    });
  });

  it("Switches between 'scores' and 'tasks to be assigned tabs'", () => {
    cy.get('[data-cypress=GradesLegend]').should('exist');
    cy.get('#student-scores-table').should('exist');
    cy.get('#student-tasks-to-be-assigned-table').should('not.exist');

    cy.get('[data-cypress=ViewParamTabsSection]').then($element => {
      cy.wrap($element)
        .contains('Tasks to be assigned')
        .should('exist')
        .click()
        .then(() => {
          cy.get('[data-cypress=GradesLegend]', { timeout: 10000 }).should(
            'not.exist'
          );
          cy.get('#student-scores-table').should('not.exist');
          cy.get('#student-tasks-to-be-assigned-table').should('exist');

          cy.get('[data-cypress=Table]').within(() => {
            const tableHeaders = [
              'Date of submission',
              'Module',
              'Task name',
              'Task type',
              'Attempt',
            ];
            tableHeaders.forEach(header => {
              cy.get('[data-cypress=TableHead]')
                .contains(header)
                .should('exist');
            });
          });
        });
    });
  });

  it('Navigates to single assignment view', () => {
    let taskName: string;
    let taskModule: string;
    cy.get('[data-cypress=TableRow]')
      .first()
      .within(() => {
        cy.get('[data-cypress=AssignmentsTableTaskCell]').then($el => {
          taskName = $el.text();
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
