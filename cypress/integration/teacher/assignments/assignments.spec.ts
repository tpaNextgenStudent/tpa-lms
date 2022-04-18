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
  });

  it('Navigates to single assignment view', () => {
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

  it('Allows the teacher to assess attempt', () => {
    const commentContent = "Very good! I'm proud of you!";
    let attemptId = '';

    cy.location().should(loc => {
      const parts = loc.pathname.split('/');
      attemptId = parts[parts.length - 1];
    });

    cy.intercept(
      'POST',
      `http://localhost:3000/api/teacher/assess/attempt/${attemptId}`,
      {
        statusCode: 200,
        body: {
          score: '2',
          comment: commentContent,
        },
      }
    );

    cy.get('[data-cypress=TeacherAssessPanel]')
      .should('exist')
      .within(() => {
        cy.get('[data-cypress=TeacherAssessForm]').should('not.exist');

        cy.get('[data-cypress=CTAButton]').first().should('exist').click();

        cy.get('[data-cypress=TeacherAssessForm]')
          .should('exist')
          .within(() => {
            cy.get('[data-cypress=TeacherAssessFormComment]')
              .should('exist')
              .type(commentContent);

            cy.get('[data-cypress=CustomSelect]').should('exist').click();
            cy.get('#react-select-score-select-listbox').then($list => {
              cy.wrap($list)
                .contains('2')
                .then($item => {
                  cy.wrap($item).click();
                });
            });
            cy.get('button[type=submit]').should('exist').click();
          });
      });
    cy.get('[data-cypress=TeacherAssessForm]').should('not.exist');
    cy.location().should(loc => {
      expect(loc.search).to.eq('?view=comments');
    });
    cy.get('[data-cypress=CTAButton]').first().should('exist');
  });

  it('Navigates to next attempt to assess', () => {
    let attemptId = '';

    cy.location().should(loc => {
      const parts = loc.pathname.split('/');
      attemptId = parts[parts.length - 1];
    });
    cy.get('button')
      .contains('Next Task')
      .should('exist')
      .click()
      .then(() => {
        cy.location().should(loc => {
          const parts = loc.pathname.split('/');
          expect(parts[parts.length - 1]).not.to.eq(attemptId);
        });
      });
  });
});
