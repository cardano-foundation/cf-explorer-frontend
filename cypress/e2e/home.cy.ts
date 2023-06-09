/// <reference types="cypress" />

describe("Home page should display all elements", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  
  it("should navigate to the home page", () => {
    cy.title().should("eq", "Cardano Explorer");
    cy.getBySelector('home-title').should("have.text", "Cardano Blockchain Explorer");
  });

  it("should display Sidebar, Header, Footer and main content", () => {
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
      cy.log($element.text())
      if ($element.text() === 'Preprod') {
        cy.wrap($element).click()
      }
    })

    cy.getBySelector("network-name").should('have.text', 'Preprod')
  });
});
