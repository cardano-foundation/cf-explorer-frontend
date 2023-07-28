import WebApi from "cypress/core/WebApi";
import { EpochConstants } from "cypress/fixtures/constants/EpochConstants";
import {
  ADA_VALUE_PATTERN,
  NUMBER_ONLY_PATTERN,
  PERCENT_PATTERN,
  STAKE_PATTERN,
  TEXT,
  poolId,
  poolListPage,
  tableRows
} from "cypress/fixtures/constants/PoolConstants";

const locators = {
  bookmarkButton: "button[data-testid='bookmark-button']",
  copyButton: "button[aria-label='Copy']",
  backButton: "[data-testid='back-button']",
  tableSelectionSize: "div[data-testid='table-selection-size']",
  tableOptionsBox: "div[id^='menu-'] ul[role='listbox']",
  ticker: `img[alt="Ticker Icon"] ~div:nth-last-child(1)`,
  createdAt: `img[alt="Calendar Icon"] ~div:nth-last-child(1)`,
  rewardAccount: "[data-testid='info-reward-account']",
  ownerAccount: "[data-testid='info-owner-account']",
  poolSize: `img[alt="Drop Icon"] ~div:nth-last-child(1)`,
  stakeLimit: `img[alt="Highest Icon"] ~div:nth-last-child(1)`,
  delegators: `img[alt="Delegator Icon"] ~div:nth-last-child(1)`,
  poolId: "[data-testid='pool-id']",
  reward: `[data-testid="overview-Reward"]`,
  ros: `[data-testid="overview-ROS"]`,
  saturation: "[data-testid='info-saturation'",
  fixedCost: "[data-testid='overview-Fixed Cost(A)']",
  declaredPledge: "[data-testid='overview-Declared Pledge(A)']",
  lifetimeBlocks: "[data-testid='overview-Lifetime Blocks']",
  analyticsChartGroup: "[data-testid='analytics-chart-group']",
  analyticsMaxValue: "[data-testid='analytics-max-value']",
  analyticsMinValue: "[data-testid='analytics-min-value']",
  table: "div.table-wrapper table",
  tableWrapper: "[data-testid='pool-table']"
};
class PoolDetail extends WebApi {
  page = `/en/delegation-pool/${poolId}`;

  constructor() {
    super();
  }

  goToPage() {
    this.openAnyUrl(this.page);
  }

  getNumberOnly(text: string) {
    const match = text.match(NUMBER_ONLY_PATTERN);
    const extractedNumber = match ? match[1] : "";
    console.log(extractedNumber);
    return extractedNumber;
  }

  verifyStakeKeyValid(locator: string) {
    cy.get(locator)
      .invoke("text")
      .then((text) => expect(STAKE_PATTERN.test(text)).to.be.true);
    return this;
  }

  verifyPercentNumber(locator: string) {
    cy.get(locator)
      .invoke("text")
      .then((text) => expect(PERCENT_PATTERN.test(text)).to.be.true);
  }

  verifyADAToken(locator: string, reformat = true) {
    cy.get(locator)
      .invoke("text")
      .then((text) => {
        if (reformat) text = this.getNumberOnly(text);
        expect(ADA_VALUE_PATTERN.test(text)).to.be.true;
      });
  }

  verifyNumber(locator: string) {
    const regexPattern = /^\d{1,3}(,\d{3})*$/;
    cy.get(locator)
      .invoke("text")
      .then((text) => {
        expect(regexPattern.test(text)).to.be.true;
      });
  }

  checkFormatOfLifetimeBlock() {
    this.verifyNumber(locators.lifetimeBlocks);
    return this;
  }

  checkFormatOfCreatedDate() {
    cy.checkDateTimeFormat(locators.createdAt, EpochConstants.DATE_TIME[0]);
    return this;
  }
  checkFormatOfRewardAccount() {
    this.verifyStakeKeyValid(locators.rewardAccount);
    return this;
  }
  checkFormatOfOwnerAccount() {
    this.verifyStakeKeyValid(locators.ownerAccount);
    return this;
  }
  checkFormatOfPoolSize() {
    this.verifyADAToken(locators.poolSize);
    return this;
  }
  checkFormatOfStakeLimit() {
    this.verifyADAToken(locators.stakeLimit);
    return this;
  }
  checkFormatOfDelegations() {
    this.verifyNumber(locators.delegators);
    return this;
  }
  checkFormatOfSaturation() {
    this.verifyPercentNumber(locators.saturation);
    return this;
  }

  checkFormatOfReward() {
    this.verifyPercentNumber(locators.reward);
    return this;
  }

  checkFormatOfROS() {
    this.verifyPercentNumber(locators.ros);
    return this;
  }

  checkFormatOfPledge() {
    this.verifyNumber(locators.declaredPledge);
    return this;
  }

  checkFormatOfCost() {
    this.verifyNumber(locators.fixedCost);
    return this;
  }

  verifyAllTheDetailsDisplayed() {
    const { ticker, createdAt, rewardAccount, ownerAccount, poolSize, stakeLimit, poolId } = locators;
    [ticker, createdAt, rewardAccount, ownerAccount, poolSize, stakeLimit, poolId].forEach((selector) => {
      cy.get(selector).invoke("text").should("not.be.empty");
    });
    return this;
  }

  verifyBoomarkButton() {
    cy.get(locators.bookmarkButton).verifyElementEnabled();
    return this;
  }

  verifyCopyButton() {
    cy.get(locators.copyButton).verifyElementEnabled();
    return this;
  }

  verifyBackButton() {
    cy.get(locators.backButton).should("exist");
    return this;
  }

  verifyRewardAccountHyperlink() {
    this.verifyElementAttribute(locators.rewardAccount, "href");
    return this;
  }

  verifyOwnerAccountHyperlink() {
    this.verifyElementAttribute(locators.ownerAccount, "href");
    return this;
  }

  verifyDropdownList() {
    cy.get(locators.tableSelectionSize + "> input").should("have.value", "50");
    cy.get(locators.tableSelectionSize).click();
    cy.get(locators.tableOptionsBox).within(() => {
      cy.get("li").each(($option) => {
        cy.wrap($option).should("have.attr", "data-value");
      });
    });
    return this;
  }

  //actions
  checkAcctionOfBackButton() {
    this.openAnyUrl(poolListPage);
    this.goToPage();
    cy.get(locators.backButton).click();
    cy.url().should("contain", poolListPage);
    return this;
  }

  checkActionOfBookmarkButton() {
    return this;
  }

  checkActionOfHypelinkRewardAccount() {
    cy.get(locators.rewardAccount).click();
    cy.url().should("include", "/stake");
    return this;
  }

  checkActionOfHypelinkOwnerAccount() {
    cy.get(locators.ownerAccount).click();
    cy.url().should("include", "/stake");
    return this;
  }

  changePageSize(size: number) {
    cy.get(locators.tableSelectionSize).click();
    cy.get(`${locators.tableOptionsBox} li[data-value="${size}"]`).scrollIntoView().click();
    return this;
  }

  verifyCurrentPageSize(size: number) {
    cy.get(locators.tableSelectionSize + "> input").should("have.value", String(size));
    return this;
  }

  verifyChangeAnalyticsChart() {
    cy.get(locators.analyticsChartGroup).within(() => {
      cy.contains(TEXT.en.chartHighestStake);
      cy.contains(TEXT.en.chartLowestStake);
      cy.get("button").contains(TEXT.en.chartDelegators).click();
      cy.contains(TEXT.en.chartHighestNumberOfDelegator);
      cy.contains(TEXT.en.chartLowestNumberOfDelegator);
    });
    return this;
  }

  changeTableTab(tabIndex: number) {
    cy.get(`${locators.tableWrapper} button[role="tab"]`).eq(tabIndex).scrollIntoView().click();
    return this;
  }

  verifyEpochTable() {
    cy.get(locators.tableWrapper).within(() => {
      cy.get("table").should("exist");
      cy.get("table thead th")
        .should("have.length", 5)
        .each(($th, index) => {
          cy.wrap($th).should("contain", tableRows[index]);
        });
    });
    return this;
  }

  verifyFormatOfEpochTable() {
    cy.get(locators.tableWrapper)
      .scrollIntoView()
      .find("tbody tr")
      .eq(0)
      .within(() => {
        this.verifyNumber("td:nth-of-type(1) >a");
        this.verifyNumber("td:nth-of-type(2)");
        this.verifyADAToken("td:nth-of-type(3)>span", false);
        this.verifyADAToken("td:nth-of-type(4)>span", false);
        this.verifyADAToken("td:nth-of-type(5)>span", false);
        this.verifyPercentNumber("td:nth-of-type(6)");
      });
  }

  verifyFormatOfStakingDelegatorsTable() {
    cy.get(locators.tableWrapper)
      .scrollIntoView()
      .find("tbody tr")
      .eq(0)
      .within(() => {
        cy.wait(100);
        this.verifyNumber("td:nth-of-type(1)");
        this.verifyStakeKeyValid("td:nth-of-type(2)>div>a");
        this.verifyADAToken("td:nth-of-type(3)>span", false);
        cy.checkDateTimeFormat("td:nth-of-type(4)", EpochConstants.DATE_TIME[0]);
        this.verifyADAToken("td:nth-of-type(5)>span", false);
      });
    return this;
  }

  checkEpochHyperlink() {
    cy.get(locators.tableWrapper)
      .scrollIntoView()
      .find("tbody tr")
      .eq(0)
      .within(() => {
        cy.get("td:nth-of-type(1) >a").click();
        cy.url().should("contain", "/epoch/");
      });
  }

  checkDelegatorStakingHyperlink() {
    cy.get(locators.tableWrapper)
      .scrollIntoView()
      .find("tbody tr")
      .eq(0)
      .within(() => {
        cy.get("td:nth-of-type(2)>div>a").click();
        cy.url().should("contain", "/stake/");
      });
  }
}

export default PoolDetail;
