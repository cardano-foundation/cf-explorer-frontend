describe("Delegator Lifecycle", () => {
  beforeEach(() => {
    cy.visit("/staking-lifecycle");
    cy.get("input[placeholder*='Search stake address or pool ID']").type(stakeId);
    cy.get("input[placeholder*='Search stake address or pool ID']").type("{enter}");
  });
  const stakeId = "stake1u8a5n0u7j7y0tvxu0czxr08064n7fhalp0yae25znh0p8xs0yka8k";
  it("should navigate to staking delegation", () => {
    cy.get('[data-testid="delegator-registration-container"]').should("be.visible");
    cy.wait(1000);
    cy.get('[id="step-1"]').click();
    cy.get('[data-testid="delegator-delegation-container"]').should("be.visible");
  });
  it("should on delegation list", () => {
    cy.wait(1000);
    cy.get('[id="step-1"]').click();
    cy.get('[data-testid="delegator-delegation-container"]').should("be.visible");
  });
  it("should on rewards distribution list", () => {
    cy.wait(1000);
    cy.get('[id="step-2"]').click();
    cy.get("p").contains("Rewards Distribution");
  });
  it("should on rewards withdrawal", () => {
    cy.wait(1000);
    cy.get('[id="step-3"]').click();
    cy.get('[data-testid="overview-staking"]').should("be.visible");
  });
  it("should on deregistration", () => {
    cy.wait(1000);
    cy.get('[id="step-4"]').click();
    cy.get('[data-testid="delegator-deregistration-certificate"]').should("be.visible");
  });

  it("should on random stake", () => {
    cy.visit("/staking-lifecycle");
    cy.get("button[data-testid='dropdown-menu-button']").click();
    cy.get("ul li").contains("Browse an example delegator").click();
  });

  it("should on random pool", () => {
    cy.visit("/staking-lifecycle");
    cy.get("button[data-testid='dropdown-menu-button']").click();
    cy.get("ul li").contains("Browse an example stake pool").click();
  });
});
