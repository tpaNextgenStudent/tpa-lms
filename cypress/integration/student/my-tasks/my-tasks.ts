describe('Student - My Tasks', () => {
  it('Displays my tasks page', () => {
    cy.login();
    cy.visit('/student/tasks');

    cy.get('h1').should('contain.text', 'My Tasks');

    const activeTaskListElement = cy.get('[data-cypress=ActiveTaskListItem]');
    activeTaskListElement.should('exist');

    const activeTaskListElementHeader = activeTaskListElement.get(
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

    activeTaskListElementHeader.should(element => {
      const activeListItemTitle = element.text();
      expect(taskTitle).to.equal(activeListItemTitle);
    });
  });

  //- changing active task
  //- description/comments nav
  //- fullscreen
  //- code copy
  //- code hover warning
  //-
});
