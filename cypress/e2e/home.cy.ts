/// <reference types="cypress" />

describe("Home page should display all elements", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should navigate to the home page", () => {
    cy.title().should("eq", "Iris - Cardano Blockchain Explorer");
    cy.getBySelector('home-title').should("have.text", "Cardano Blockchain Explorer");
  });

  it("should display Sidebar, Header, Footer and main section", () => {
    cy.getBySelector('sidebar').should('exist');
    cy.getBySelector('header').should('exist');
    cy.getBySelector('home-container').should('exist');
    cy.getBySelector('footer').should('exist');
  });

  it("should display network, signin, search bar", () => {
    cy.getBySelector("header-network").should('exist');
    cy.getBySelector("header-signin").should('exist').contains("Sign In");
    cy.getBySelector("header-search")
      .should('exist')
      .find('input[type="search"]')
      .should('have.attr', 'placeholder', 'Search transactions, address, blocks, epochs, pools...');
  })

  it("should display main contents", () => {
    cy.getBySelector('home-statistic').should('exist');
    cy.getBySelector('home-trending').should('exist');
    cy.getBySelector('home-latest-transactions').should('exist');
    cy.getBySelector('home-top-delegation').should('exist');
    cy.getBySelector('home-latest-stories').should('exist');
  });

});

describe("Home page function should work", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should switch network", () => {
    cy.getBySelector("header-top").within(() => {
      cy.getBySelector("header-network").click()
    })

    cy.getBySelector("network-options").each($element => {
      if ($element.text() === 'Preprod') {
        cy.wrap($element).click()
      }
    })
  });

  it("should navigate to SignIn page", () => {
    cy.getBySelector("header-signin").click();
    cy.title().should("eq", "Sign In | Iris - Cardano Blockchain Explorer");
    cy.getBySelector("signin-title").contains(/^(Sign In)$/i);
  });

  it("should change the search option", () => {
    cy.getBySelector("header-search").find(">button");
    cy.getBySelector("all-filters-dropdown").click();
    cy.getBySelector("filter-options").each($element => {
      if ($element.text() === 'Epochs') {
        cy.wrap($element).click()
      }
    })

  })
});
