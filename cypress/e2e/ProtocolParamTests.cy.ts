/// <reference types="cypress" />

describe("template spec", () => {
  it("should navigate to the blocks page", () => {
    cy.visit("/");
    cy.get('[data-testid="menu-button-protocol_parameters"]').click();
    //cy.get(".css-1cv7afn").contains("Protocol parameters");
    cy.get("button").contains("View update activity", { matchCase: false });
    //Updateable Parameters table
    cy.get('[data-testid="table-common"] th:nth-child(1)').first().contains("Parameter Name");
    cy.get('[data-testid="table-common"] th:nth-child(2)').first().contains("Value");
    cy.get('[data-testid="table-common"] th:nth-child(3)').contains("Last updated in epoch");
    cy.get('[data-testid="table-common"] th:nth-child(4)').contains("Timestamp");
    // global constants table
    cy.get('[data-testid="table-common"] th:nth-child(1)').last().contains("Parameter Name");
    cy.get('[data-testid="table-common"] th:nth-child(2)').last().contains("Value");
  });

  it("should navigate to the blocks page", () => {
    cy.visit("/protocol-parameters");
    //cy.get("css-1cv7afn").contains("Protocol parameters");
    cy.get("button").contains("View update activity", { matchCase: false });
  });
});
