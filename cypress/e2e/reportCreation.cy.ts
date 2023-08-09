const poolReportEvents = ["All", "Registration", "Pool Update", "Reward", "Deregistration"];
const stakeReportEvents = ["All", "Registration", "Rewards", "Delegation", "Withdraw funds", "Deregistration"];
const reportName = "reportname1";
const pool = "pool14rnkjjate6rqa7f9xmezgwne99n8hlahg7ymcyhzkhus758r3h7";
const stake = "stake1uytmv8kxw8gj2jqflnxtr8y8lw3rsjp38tfz98zxmndqgscyem0p4";
const enterPoolReport = () => {
  cy.get("input[placeholder='Enter report name']").type(reportName + new Date().getTime());
  cy.get("input[name='POOL_SIZE'][value='YES']").click();
  cy.get("[data-testid='report-events']").find("button").eq(0).click();
  cy.wait(500);
  cy.get("button[data-testid='next-step']").click({ force: true });
};

const enterStakeReport = () => {
  cy.get("input[placeholder='Enter report name']").type(reportName);
  cy.get("[data-testid='date-range-picker']").click();
  cy.get("button[data-testid='decrease-month']").eq(0).click();
  cy.wait(500);
  cy.get("[data-testid='custom-picker-calender']>div:nth-of-type(1) .react-datepicker")
    .eq(0)
    .find(".react-datepicker__month .react-datepicker__week")
    .eq(0)
    .find(".react-datepicker__day--001")
    .click();
  cy.get("button[data-testid='decrease-month']").eq(1).click();
  cy.get("[data-testid='custom-picker-calender']>div:nth-of-type(2) .react-datepicker")
    .eq(0)
    .find(".react-datepicker__month .react-datepicker__week")
    .find(".react-datepicker__day--010")
    .click();
  cy.get("input[name='ADA_TRANSFER'][value='YES']").click();
  cy.get("[data-testid='report-events']").find("button").eq(0).click();
  cy.get("button[data-testid='next-step']").click({ force: true });
};

describe("Pool report composer", () => {
  beforeEach(() => {
    cy.withLogin();
    cy.wait(1000)
    cy.visit(
      `/en/staking-lifecycle/spo/${pool}/timeline/registration/87725730dbb989e0043705e39d40cffb94c1c1b0e766788a3a4b9906682fe7c6`
    );
    cy.get("button").contains("Compose report").click();
  });
  it("should report composer modal render", () => {
    cy.get("input[placeholder='Enter report name']").should("exist");
    cy.get("span[data-testid='slider']").should("exist");
    cy.get("input[name='POOL_SIZE']").should("exist");
  });

  it("should all the pool events render", () => {
    cy.get("[data-testid='report-events']")
      .find("button")
      .each(($button, i) => {
        cy.wrap($button).invoke("text").should("contain", poolReportEvents[i]);
      });
  });

  it("check actions of step1", () => {
    enterPoolReport();
  });

  it("check the contents of step2", () => {
    enterPoolReport();
    cy.get("[data-testid='checking-report-content']").within(() => {
      cy.get("div").should("contain", reportName);
      cy.get("div").should("contain", "Epoch 30 -  Epoch 50");
      cy.get("div").should("contain", pool);
      cy.get("div").should("contain", "YES");
      cy.get("div").should("contain", "Registration, Pool Update, Reward, Deregistration");
    });
  });

  it("double check of step2", () => {
    enterPoolReport();
    cy.get("[data-testid='double-check-button']").click();
    cy.get("input[placeholder='Enter report name']").should("exist");
  });

  it("check actions of composer a report", () => {
    enterPoolReport();
    cy.get("[data-testid='compose-button']").click();
    cy.wait(500);
    cy.get("[data-testid='toast-container']").should("exist");
  });
});

describe("Stake report composer", () => {
  beforeEach(() => {
    cy.withLogin();
    cy.wait(1000)
    cy.visit(
      `/en/staking-lifecycle/delegator/${stake}/timeline/registration/122e536c2a63732c2200ad58ae68b507c9b28d25dfdaf97ea3fd209d7a54728a`
    );
    cy.get("button").contains("Compose report").click();
  });

  it("should report composer modal render", () => {
    cy.get("input[placeholder='Enter report name']").should("exist");
    cy.get("[data-testid='date-range-picker']").should("exist");
    cy.get("input[name='ADA_TRANSFER'][value='YES']").should("exist");
    cy.get("input[name='ADA_TRANSFER'][value='NO']").should("exist");
  });

  it("should all the pool events render", () => {
    cy.get("[data-testid='report-events']")
      .find("button")
      .each(($button, i) => {
        cy.wrap($button).invoke("text").should("contain", stakeReportEvents[i]);
      });
  });

  it("check actions of step1 ", () => {
    enterStakeReport();
  });

  it("check the contents of step2", () => {
    enterStakeReport();
    cy.get("[data-testid='checking-report-content']").within(() => {
      cy.get("div").should("contain", reportName);
      cy.get("div").should("contain", stake);
      cy.get("div").should("contain", "YES");
      cy.get("div").should("contain", "Registration, Rewards, Delegation, Withdraw funds, Deregistration");
    });
  });

  it("double check of step2", () => {
    enterStakeReport();
    cy.get("[data-testid='double-check-button']").click();
    cy.get("input[placeholder='Enter report name']").should("exist");
  });

  it("check actions of composer a report", () => {
    enterStakeReport();
    cy.get("[data-testid='compose-button']").click();
    cy.wait(500);
    cy.get("[data-testid='toast-container']").should("exist");
  });
});
