describe('Student - My Tasks', () => {
  it('Displays my tasks page with tasks list', () => {
    cy.login();
    cy.visit('/student/tasks');

    cy.get('h1').should('contain.text', 'My Tasks');

    const activeTaskListElement = cy.get('[data-cypress=ActiveTaskListItem]');
    activeTaskListElement.should('exist');

    const activeTaskListElementTitle = activeTaskListElement.find(
      '[data-cypress=TaskListItemTitle]'
    );

    // compare active list item's and task section's title text
    const taskSection = cy.get('[data-cypress=TaskSection]');
    taskSection.should('exist');

    const taskSectionTaskTitle = taskSection.find(
      '[data-cypress=TaskSectionTaskTitle]'
    );

    let taskTitle: string;
    taskSectionTaskTitle.should(element => {
      taskTitle = element.text();
    });

    activeTaskListElementTitle.should(element => {
      const activeListItemTitle = element.text();
      expect(taskTitle).to.equal(activeListItemTitle);
    });
  });

  it('Switches between tasks', () => {
    cy.get('[data-cypress=TaskListItem]')
      .first()
      .then($item => {
        const itemTitle = cy
          .wrap($item)
          .find('[data-cypress=TaskListItemTitle]');

        let nextTaskTitle: string;
        itemTitle.should(e => {
          nextTaskTitle = e.text();
        });

        cy.wrap($item).click();
        cy.wrap($item)
          .invoke('attr', 'data-cypress')
          .should('equal', 'ActiveTaskListItem');

        cy.get('[data-cypress=TaskSectionTaskTitle]').should(e => {
          expect(e.text()).to.equal(nextTaskTitle);
        });
      });
  });

  it('Switches between description and comments tab', () => {
    cy.get('[data-cypress=TaskComments]').should('not.exist');
    cy.get('[data-cypress=TaskDescription]').should('exist');

    cy.get('[data-cypress=TaskNav]').then($element => {
      cy.wrap($element)
        .find('[data-cypress=TaskNavComments]')
        .should('exist')
        .click()
        .then(() => {
          cy.get('[data-cypress=TaskComments]').should('exist');
          cy.get('[data-cypress=TaskDescription]').should('not.exist');
        });

      cy.wrap($element)
        .find('[data-cypress=TaskNavDescription]')
        .should('exist')
        .click()
        .then(() => {
          cy.get('[data-cypress=TaskComments]').should('not.exist');
          cy.get('[data-cypress=TaskDescription]').should('exist');
        });
    });
  });

  it('Switches between fullscreen and default view', () => {
    cy.get('[data-cypress=TaskSectionFullScreenButton')
      .click()
      .then(() => {
        cy.get('[data-cypress=TaskSection').should(
          'have.css',
          'position',
          'fixed'
        );
      });
    cy.get('[data-cypress=TaskSectionFullScreenButton')
      .click()
      .then(() => {
        cy.get('[data-cypress=TaskSection').should(
          'not.have.css',
          'position',
          'fixed'
        );
      });
  });

  //- code copy

  //- code hover warning
});
