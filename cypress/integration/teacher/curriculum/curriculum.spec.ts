describe('Teacher - Curriculum', () => {
  it('Displays curriculum page with tasks list', () => {
    cy.login();
    cy.visit('/teacher/curriculum');

    cy.get('h1').should('contain.text', 'Curriculum');

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

  it('Switches between modules using module select', () => {
    let currentModuleName: string;
    cy.get('[data-cypress=TaskSectionModuleName]').then($element => {
      cy.get('[data-cypress=CustomSelect]').within($moduleSelect => {
        expect($element.text()).to.include($moduleSelect.text());
        currentModuleName = $element.text();
      });
    });

    cy.get('[data-cypress=CustomSelect]').click();
    cy.get('#react-select-module-select-listbox').then($list => {
      cy.wrap($list)
        .first()
        .then($item => {
          cy.wrap($item).click();
          cy.get('[data-cypress=TaskSectionModuleName]').contains(
            $item.text(),
            { timeout: 10000 }
          );
        });
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
});
