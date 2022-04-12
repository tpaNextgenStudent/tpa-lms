describe('Student - My Tasks', () => {
  it('Displays my tasks page with tasks list', () => {
    cy.login();
    cy.visit('/student/tasks');

    cy.get('h1').should('contain.text', 'My Tasks');

    const activeTaskListElement = cy.get('[data-cypress=ActiveTaskListItem]');
    activeTaskListElement.should('exist');

    const activeTaskListElementTitle = activeTaskListElement.get(
      '[data-cypress=TaskListItemTitle]'
    );

    // compare active list item's and task section's title text
    const taskSection = cy.get('[data-cypress=TaskSection]');
    taskSection.should('exist');

    const taskSectionTaskTitle = taskSection.get(
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
    const item = cy.get('[data-cypress=TaskListItem]:first');
    const itemTitle = item.get('[data-cypress=TaskListItemTitle]');

    let nextTaskTitle: string;

    itemTitle.should(e => {
      nextTaskTitle = e.text();
    });

    item.click();
    item.invoke('attr', 'data-cypress').should('equal', 'ActiveTaskListItem');

    cy.get('[data-cypress=TaskSectionTaskTitle]').should(e => {
      expect(e.text()).to.equal(nextTaskTitle);
    });
  });

  //- changing active task
  //- description/comments nav
  //- fullscreen
  //- code copy
  //- code hover warning
  //-
});
