describe("Delegator Lifecycle", () => {
    it("should navigate to staking delegation", () => {
        const stakeId = "stake1uxt9gqu909k5t4w46s0ustthjtuqsqtr87v7jwapks3sg0sdrj4lh"
      cy.visit("/staking-lifecycle");
      cy.get("input[placeholder*='address or pool id']").type(stakeId);
      cy.get("input[placeholder*='address or pool id']").type("{enter}");
      cy.get('[data-testid="delegator-registration-container"]').should("be.visible");
      cy.get('[id="step-1"]').click();
      cy.get('[data-testid="delegator-delegation-container"]').should("be.visible");
    });
  });