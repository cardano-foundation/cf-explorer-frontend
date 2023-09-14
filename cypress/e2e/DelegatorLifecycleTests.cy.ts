describe("Delegator Lifecycle", () => {
  const stakeId = "stake1u8a5n0u7j7y0tvxu0czxr08064n7fhalp0yae25znh0p8xs0yka8k";
  it("should navigate to staking delegation", () => {
    cy.visit("/staking-lifecycle");
    cy.get("input[placeholder*='address or pool id']").type(stakeId);
    cy.get("input[placeholder*='address or pool id']").type("{enter}");
    cy.get('[data-testid="delegator-registration-container"]').should("be.visible");
    cy.get('[id="step-1"]').click();
    cy.get('[data-testid="delegator-delegation-container"]').should("be.visible");
  });
  it("should on delegation list", () => {
    cy.visit("/staking-lifecycle");
    cy.get("input[placeholder*='address or pool id']").type(stakeId);
    cy.get("input[placeholder*='address or pool id']").type("{enter}");
    cy.get('[id="step-1"]').click();
    cy.get('[data-testid="delegator-delegation-container"]').should("be.visible");
  });
  it("should on rewards distribution list", () => {
    cy.visit("/staking-lifecycle");
    cy.get("input[placeholder*='address or pool id']").type(stakeId);
    cy.get("input[placeholder*='address or pool id']").type("{enter}");
    cy.get('[id="step-2"]').click();
    cy.get(".css-zq7rup").contains("Rewards Distribution");
  });
  it("should on rewards withdrawal", () => {
    cy.visit("/staking-lifecycle");
    cy.get("input[placeholder*='address or pool id']").type(stakeId);
    cy.get("input[placeholder*='address or pool id']").type("{enter}");
    cy.get('[id="step-3"]').click();
    cy.get('[data-testid="overview-staking"]').should("be.visible");
  });
  it.only("should on deregistration", () => {
    cy.visit("/staking-lifecycle");
    cy.get("input[placeholder*='address or pool id']").type(stakeId);
    cy.get("input[placeholder*='address or pool id']").type("{enter}");
    cy.get('[id="step-4"]').click();
    cy.wait(1000);
    cy.get('[data-testid="delegator-deregistration-certificate"]').should("be.visible");
  });
});
