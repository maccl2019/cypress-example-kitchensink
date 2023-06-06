describe("Misc page", () => {

  beforeEach(() => {
    cy.visit("http://localhost:8080");
    cy.contains("Commands").click();
    cy.contains("Misc").click();
  });

  it("should assert correct URL", () => {
    cy.url().should('include', '/commands/misc');
  });

  it("should assert that the table is clickable and turns blue", () => {
    cy.get('.misc-table').within(() => {
      // click all the cells (and header) in the table
      cy.get('th').click({ multiple: true }).end();
      cy.get('td').click({ multiple: true }).end();

      // check that ALL cells (plus header) are blue
      cy.get('th').should('have.css', 'background-color', 'rgb(217, 237, 247)')
      cy.get('td').should('have.css', 'background-color', 'rgb(217, 237, 247)')
    })
  })
})