/// <reference types="cypress" />

describe("Home page should display all elements", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should navigate to the home page", () => {
    cy.title().should("eq", "Cardano Blockchain Explorer");
    //cy.get("home-title").should("have.text", ", a Cardano explorer");
  });

  it("should display Sidebar, Header, Footer and main section", () => {
    cy.get(`[data-testid="sidebar"]`).should("exist");
    cy.get(`[data-testid="header"]`).should("exist");
    cy.get(`[data-testid="home-container"]`).should("exist");
    cy.get(`[data-testid="footer"]`).should("exist");
  });

  it("should display network, signin, search bar", () => {
    cy.get(`[data-testid="header-network"]`).should("exist");
    cy.get(`[data-testid="header-signin"]`).should("exist").contains("Sign In");
    cy.get(`[data-testid="header-search"]`)
      .should("exist")
      .find('input[type="search"]')
      .should("have.attr", "placeholder", "Search transactions, address, blocks, epochs, pools...");
  });

  it("should display main contents", () => {
    cy.get(`[data-testid="home-statistic"]`).should("exist");
    cy.get(`[data-testid="home-trending"`).should("exist");
    cy.get(`[data-testid="home-latest-transactions"`).should("exist");
    cy.get(`[data-testid="home-top-delegation"]`).should("exist");
    cy.get(`[data-testid="home-latest-stories"]`).should("exist");
  });
});

describe("Home page function should work", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should switch network", () => {
    cy.get(`[data-testid="header-top"]`).within(() => {
      cy.get(`[data-testid="header-network"]`).click();
    });

    cy.get(`[data-testid="network-options"]`).each(($element) => {
      if ($element.text() === "Preprod") {
        cy.wrap($element).click();
      }
    });
  });

  it("should navigate to SignIn page", () => {
    cy.get(`[data-testid="header-signin"]`).click();
    cy.title().should("eq", "Sign In | Cardano Blockchain Explorer");
    cy.get(`[data-testid="signin-title"]`).contains("Sign In", { matchCase: false });
  });

  it("should change the search option", () => {
    cy.get(`[data-testid="header-search"]`).find(">button");
    cy.get(`[data-testid="all-filters-dropdown"]`).click();
    cy.get(`[data-testid="filter-options"]`).each(($element) => {
      if ($element.text() === "Epochs") {
        cy.wrap($element).click();
      }
    });
  });
});
