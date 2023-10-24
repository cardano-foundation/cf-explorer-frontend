Cypress.Commands.add("withLogin", () => {
  const user = {
    email: "ngan.vu@sotatek.com",
    password: "Test1234@"
  };
  cy.visit("/en/sign-in");
  cy.get("input[name='email']").type(user.email);
  cy.get("input[name='password']").type(user.password);
  cy.get("button[data-testid='login-btn']").click();
  cy.wait(100);
});
