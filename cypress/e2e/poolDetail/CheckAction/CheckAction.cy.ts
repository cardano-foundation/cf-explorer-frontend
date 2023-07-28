import PoolDetail from "cypress/pagesobject/Pool/PoolDetail";

const poolDetail = new PoolDetail();

describe("Check actions", () => {
  beforeEach(() => {
    poolDetail.goToPage();
  });
  it("Check action of button [Back]  ", () => {
    poolDetail.checkAcctionOfBackButton();
  });

  it("Check action of button [Bookmark]", () => {
    poolDetail.checkActionOfBookmarkButton();
  });

  it("Check action of hyperlink [Reward account]", () => {
    poolDetail.checkActionOfHypelinkRewardAccount();
  });

  it("Check action of hyperlink [Owner account]", () => {
    poolDetail.checkActionOfHypelinkOwnerAccount();
  });

  it("Check action of dropdown [Lists]", () => {
    poolDetail
      .changePageSize(10)
      .verifyCurrentPageSize(10)
      .changePageSize(20)
      .verifyCurrentPageSize(20)
      .changePageSize(50)
      .verifyCurrentPageSize(50)
      .changePageSize(100)
      .verifyCurrentPageSize(100);
  });

  it("Check action of Analytics chart", () => {
    poolDetail.verifyChangeAnalyticsChart();
  });

  it("Check action of changing table tab", () => {
    poolDetail.changeTableTab(1).verifyFormatOfStakingDelegatorsTable().changeTableTab(0);
  });

  it("Check action of epoch hyperlink", () => {
    poolDetail.checkEpochHyperlink();
  });

  it("Check action of Staking Hyperlink", () => {
    poolDetail.changeTableTab(1).checkDelegatorStakingHyperlink();
  });
});
