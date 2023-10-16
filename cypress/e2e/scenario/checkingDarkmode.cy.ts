describe("checking dark mode function", () => {
  it("should app render the light mode", () => {
    cy.visit("/");
    cy.get(`[data-testid="theme-toggle"] input`).click();
    cy.wait(500);
    cy.get(`[data-testid="theme-toggle"] input`).click();
    cy.get(`div[data-theme="light"]`).should("exist");
  });

  it("should app render dark mode", () => {
    cy.visit("/");
    cy.get(`[data-testid="theme-toggle"] input`).click();
    cy.wait(500);
    cy.get(`div[data-theme="dark"]`).should("exist");
  });
});
