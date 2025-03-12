describe("Navigation", () => {
  it("should navigate to the about page", () => {
    // Start from the index page
    cy.visit("http://localhost:3000/")
    cy.contains("Connexion").click()
    cy.url().should("include", "/auth/signin")
  })
})
