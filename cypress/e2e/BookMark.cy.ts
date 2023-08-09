describe("Bookmark", () => {
  before(() => {
    cy.visit("/sign-in");
    cy.get('input[name="email"]').type("binh.nguyen@sotatek.com");
    cy.get('input[name="password"]').type("Test1234@");
    cy.get('[data-testid="login-btn"]').click();
    cy.get('[data-testid="home-title"]').should("exist");
    cy.get('[data-testid="header-signin"]').should("not.exist");
    cy.visit("/account/profile") ;
  });
  it("should navigate to the bookmark page", () => {
    cy.visit("/account/bookmark");
    cy.get('[href="/en/account/bookmark"]')
      .first()
      .invoke("text")
      .then((text) => {
        expect(text).to.be.equal("Bookmark");
      });
      cy.get("tr > :nth-child(1)").should("be.visible");
      cy.get("tr > :nth-child(2)").should("be.visible");
      cy.get("tr > :nth-child(3)").should("be.visible");
  });
});
