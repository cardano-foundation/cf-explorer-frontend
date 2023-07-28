import PoolDetail from "cypress/pagesobject/Pool/PoolDetail";

const poolDetail = new PoolDetail();
describe("Confirm initializing the screen", () => {
  beforeEach(() => {
    poolDetail.goToPage();
  });
  it("Check initalizing successfully ", () => {
    poolDetail
      .verifyBoomarkButton()
      .verifyCopyButton()
      .verifyBackButton()
      .verifyRewardAccountHyperlink()
      .verifyOwnerAccountHyperlink()
      .verifyDropdownList();
  });
});
