const stakeAddressRegistration = ["Transaction Hash", "Created At", "ADA Value", "Certificate"];
const delegationHistory = ["Transaction Hash", "Created At", "Fees", "Certificate"];
const rewardsDistribution = ["Rewards Paid", "Created At", "Epoch"];
const withdrawalHistory = ["Transaction Hash", "Created At", "Net Amount"];
const deregistration = ["Transaction Hash", "Created At", "ADA Amount", "Certificate"];
const poolRegistration = ["Transaction Hash", "Created At", "ADA Value", "Certificate"];
const transactionHash = ["Transaction Hash", "Created At", "Fees", "Certificate"];
const operatorRewards = ["Epoch", "Created At", "Operator Reward ADA", "Reward Account"];
const SPOderegistration = ["Transaction Hash", "Created At", "ADA Value", "Certificate"];

describe("Report Staking Detail", () => {
  beforeEach(() => {
    cy.withLogin();
    cy.visit("en/staking-lifecycle/staking-report-generated/126");
  });
  it("should the page staking report detail render", () => {
    cy.get("[data-tesid='staking-report-name']").invoke("text").should("not.be.empty");
  });

  it("should all the report detail tabs render", () => {
    cy.get("div[role='tablist']").within(() => {
      cy.get("button div[active]").contains("Stake Address Registration");
      cy.get("button div[active]").contains("Delegation History");
      cy.get("button div[active]").contains("Rewards Distribution");
      cy.get("button div[active]").contains("Withdrawal History");
      cy.get("button div[active]").contains("Deregistration");
      cy.get("button div[active]").contains("ADA Transfers");
    });
  });

  it("should all the tables render", () => {
    cy.get("[data-testid='table-common']").within(() => {
      cy.get("thead tr th").each(($th, index) => {
        cy.wrap($th).contains(stakeAddressRegistration[index]);
      });
    });

    cy.get("div[role='tablist'] button:nth-child(2)").click();
    cy.get("[data-testid='table-common']").within(() => {
      cy.get("thead tr th").each(($th, index) => {
        cy.wrap($th).contains(delegationHistory[index]);
      });
    });

    cy.get("div[role='tablist'] button:nth-child(3)").click();
    cy.get("[data-testid='table-common']").within(() => {
      cy.get("thead tr th").each(($th, index) => {
        cy.wrap($th).contains(rewardsDistribution[index]);
      });
    });

    cy.get("div[role='tablist'] button:nth-child(4)").click();
    cy.get("[data-testid='table-common']").within(() => {
      cy.get("thead tr th").each(($th, index) => {
        cy.wrap($th).contains(withdrawalHistory[index]);
      });
    });
    cy.get("div[role='tablist'] button:nth-child(5)").click();
    cy.get("[data-testid='table-common']").within(() => {
      cy.get("thead tr th").each(($th, index) => {
        cy.wrap($th).contains(deregistration[index]);
      });
    });
  });
});

describe("Report SPO Detail", () => {
  beforeEach(() => {
    cy.withLogin();
    cy.visit("en/staking-lifecycle/pool-report-generated/52");
  });
  it("should the page staking report detail render", () => {
    cy.get("[data-testid='pool-report-name']").invoke("text").should("not.be.empty");
  });

  it("should all the report detail tabs render", () => {
    cy.get("div[role='tablist']").within(() => {
      cy.get("button div[active]").contains("Pool Registration");
      cy.get("button div[active]").contains("Pool Update");
      cy.get("button div[active]").contains("Operator Rewards");
      cy.get("button div[active]").contains("Deregsitration");
      cy.get("button div[active]").contains("Pool size");
    });
  });

  it("should all the tables render", () => {
    cy.get("[data-testid='table-common']").within(() => {
      cy.get("thead tr th").each(($th, index) => {
        cy.wrap($th).contains(poolRegistration[index]);
      });
    });

    cy.get("div[role='tablist'] button:nth-child(2)").click();
    cy.get("[data-testid='table-common']").within(() => {
      cy.get("thead tr th").each(($th, index) => {
        cy.wrap($th).contains(transactionHash[index]);
      });
    });

    cy.get("div[role='tablist'] button:nth-child(3)").click();
    cy.get("[data-testid='table-common']").within(() => {
      cy.get("thead tr th").each(($th, index) => {
        cy.wrap($th).contains(operatorRewards[index]);
      });
    });

    cy.get("div[role='tablist'] button:nth-child(4)").click();
    cy.get("[data-testid='table-common']").within(() => {
      cy.get("thead tr th").each(($th, index) => {
        cy.wrap($th).contains(SPOderegistration[index]);
      });
    });
  });
});
