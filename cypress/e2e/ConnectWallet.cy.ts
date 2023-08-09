describe("Connect wallet and enter user name", () => {
  beforeEach(() => {
    cy.visit("/sign-in");
  });

  it("check screen sign up", () => { 
    
    cy.get('[data-testid="signin-title"]').should("be.visible").contains("Sign In");
    cy.get('[data-testid="forgot-password-link"] > .MuiBox-root')
      .should("be.visible")
      .contains("Forgot your password?");
    cy.get('[data-testid="connect-wallet"]').should("be.visible").should("be.enabled");
    cy.get('[data-testid="login-btn"]').should("be.visible").should("not.be.enabled");
  });

  it("check action enter username and password", () => {
    cy.get(":nth-child(2) > .MuiInputBase-root > .MuiInputBase-input").type("hanh.luu+2@sotatek.com");
    cy.get(":nth-child(3) > .MuiInputBase-root > .MuiInputBase-input").type("123");
    cy.get('[data-testid="login-btn"]').should("be.visible").should("be.enabled");
  });

  it("check sign up successful", () => {
    cy.get(":nth-child(2) > .MuiInputBase-root > .MuiInputBase-input").type("hanh.luu+2@sotatek.com");
    cy.get(":nth-child(3) > .MuiInputBase-root > .MuiInputBase-input").type("Test1234@");
    cy.get('[data-testid="login-btn"]').should("be.visible").should("be.enabled");

    cy.get('[data-testid="login-btn"]').click();
    cy.get('[data-testid="header-search"]').should("be.visible");
  });
});
