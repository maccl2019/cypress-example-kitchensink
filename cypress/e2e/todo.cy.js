describe("Todo page", () => {
  const addItem = (item) => {
    cy.get('[data-test=new-todo]').type(`${item}{enter}`);

  }
  
  beforeEach(() => {
    cy.visit("http://localhost:8080/todo");
    // cy.visit("https://example.cypress.io/todo");

    // ok, for a bit of sanity, since there's a bug when adding stuff directly
    // to the storage, let's add some items through the UI.
    // right now, the todo items are not added immediately onload as 
    // they should - check /app/assets/js/todo/app.js for more info.
    // ["Pay electric bill", "Walk the dog"].forEach(addItem);
  });

  it("should add a new todo to the list", () => {
    addItem("Water the plants");

    // there should be an item with 'water the plants' in the list
    cy.contains('Water the plants').should('be.visible');
  });

  it("should check 'walk the dog' as completed", () => {
    // find the label with the text 'walk the dog'
    // then find the parent of the label which is the <li> element
    // then find the checkbox inside the <li> and check it
    cy.contains('Walk the dog').parent().find('input[type=checkbox]').check();
  });

  it("should have three todo items in the list", () => {
    // since there's two default items, let's add another one
    addItem("Feed the cat");

    // now let's check that there are three items in the list
    cy.get('.todo-list').find('li').should('have.length', 3);
  })

  it("should show all, active, and completed items", () => {
    // set some todo items up, since there's two initial items
    const todos = [
      { text: "Get the groceries", completed: true },
      { text: "Feed the cat", completed: false },
      { text: "Water the plants", completed: true }
    ]

    todos.forEach(({ text, completed }) => {
      addItem(text);

      // if the item is completed, check it
      if (completed) {
        cy.contains(text).parent().find('input[type=checkbox]').check();
      }
    })

    // There should be a total of five todo items in the list.
    // these are mixed between completed and active items.
    cy.get('.todo-list').find('li').should('have.length', 5);

    // Let's toggle the 'active' filter. there should now be three 
    // items in the list (the two default items and one unchecked item)
    cy.contains('Active').click();
    cy.get('.todo-list').find('li').should('have.length', 3);

    // Same goes for the 'completed' filter - there should be two
    // items in the list (the two checked items added earlier)
    cy.contains('Completed').click();
    cy.get('.todo-list').find('li').should('have.length', 2);
  });

  it("should clear completed tasks", () => {
    // set some todo items up, since there's two initial items
    const todos = [
      { text: "Get the groceries", completed: true },
      { text: "Feed the cat", completed: false },
      { text: "Water the plants", completed: true }
    ]

    todos.forEach(({ text, completed }) => {
      addItem(text);

      // if the item is completed, check it
      if (completed) {
        cy.contains(text).parent().find('input[type=checkbox]').check();
      }
    });

    // There should be a total of five todo items in the list.
    // these are mixed between completed and active items.
    cy.get('.todo-list').find('li').should('have.length', 5);

    // Let's clear all the completed items
    cy.contains('Clear completed').focus().click();

    // There should now be a total of three todo items in the list,
    // all previously unchecked.
    cy.get('.todo-list').find('li').should('have.length', 3);
  })

  it("should be able to toggle all the todo items", () => {
    const todos = [
      "Get the groceries",
      "Feed the cat",
      "Water the plants"
    ]

    // cy.get(".destroy").click({ multiple: true, force: true });

    todos.forEach(addItem);

    // Let's toggle everything to 'complete'
    cy.get('[for="toggle-all"]').click();

    // Sanity: check if there are 5 items in the list
    cy.get('.todo-list').find('li').should('have.length', 5);

    // Change filter to 'active'
    cy.contains("Clear completed").click()

    // At this point there should be no items in the list
    cy.get('.todo-list').children().should('have.length', 0);
  })

});