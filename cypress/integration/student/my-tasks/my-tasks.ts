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
});
