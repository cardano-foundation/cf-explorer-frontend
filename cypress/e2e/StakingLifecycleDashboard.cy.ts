describe("StakingLifecycle Dashboard", () => {
  beforeEach(() => {
    cy.withLogin();
    cy.visit("en/staking-lifecycle/");
  });
  it("should page render", () => {
    cy.get("input[placeholder]").should("exist");
    cy.contains("What is staking on Cardano?");
    cy.contains("Saved reports");
  });

  it("should all the tabs render", () => {
    cy.get("div[role='tablist']").within(() => {
      cy.get("button[role='tab'] p").invoke("text").should("contain", "Stake Address Reports");
      cy.get("button[role='tab'] p").invoke("text").should("contain", "Pool Reports");
    });
  });

  it("should all the table render", () => {
    cy.get("[data-testid='table-common']").within(() => {
      cy.get("thead tr th").eq(0).should("contain", "Created At");
      cy.get("thead tr th").eq(1).should("contain", "Report Name");
      cy.get("thead tr th").eq(2).should("contain", "Date Range");
      cy.get("thead tr th").eq(3).should("contain", "ADA Transfers");
      cy.get("thead tr th").eq(4).should("contain", "Events");
      cy.get("thead tr th").eq(5).should("contain", "Exporting Report");
    });
    cy.get("button[role='tab'] p").eq(1).click();

    cy.get("[data-testid='table-common']").within(() => {
      cy.get("thead tr th").eq(0).should("contain", "Created At");
      cy.get("thead tr th").eq(1).should("contain", "Report Name");
      cy.get("thead tr th").eq(2).should("contain", "Epoch Range");
      cy.get("thead tr th").eq(3).should("contain", "Pool Size");
      cy.get("thead tr th").eq(4).should("contain", "Events");
      cy.get("thead tr th").eq(5).should("contain", "Exporting Report");
    });
  });

  it("check searching staking key action", () => {
    cy.get("input[placeholder]").type("stake1u8dy35cmv7xvy4g4lj9qw9v6v4y84xhq5w9jy6vnm9wuhpgvupg3u");
    cy.get("input[placeholder] ~ button").click();
    cy.contains("Staking Delegation Lifecycle").should("exist");
  });
});
