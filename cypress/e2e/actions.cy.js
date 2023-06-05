describe("Actions page", () => {
  it("should submit a coupon code", () => {
    cy.visit("http://localhost:8080/commands/actions");
    cy.get('.action-form')
            .find('[type="text"]').type('HALFOFF')
    cy.get('.action-form').submit()
            .next().should('contain', 'Your form has been submitted!')
  })
})