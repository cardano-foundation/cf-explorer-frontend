/// <reference types="cypress" />

describe("Home page should display all elements", () => {
  it("should navigate to the home page", () => {
    cy.visit("/");
    cy.getBySelector('home-title').should("have.text", "Cardano Blockchain Explorer");
  });
});

describe("Home page", () => {
  it("should display latest transactions", () => {
    cy.visit("/");
  });
});
