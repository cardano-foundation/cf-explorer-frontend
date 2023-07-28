import PoolDetail from "cypress/pagesobject/Pool/PoolDetail";

const poolDetail = new PoolDetail();
describe("Check validation of data", () => {
  beforeEach(() => {
    poolDetail.goToPage();
  });
  it("Check format of All detail field", () => {
    poolDetail
      .checkFormatOfCreatedDate()
      .checkFormatOfRewardAccount()
      .checkFormatOfPoolSize()
      .checkFormatOfReward()
      .checkFormatOfDelegations()
      .checkFormatOfOwnerAccount()
      .checkFormatOfROS()
      .checkFormatOfCost()
      .checkFormatOfSaturation()
      .checkFormatOfStakeLimit()
      .checkFormatOfPledge()
      .checkFormatOfLifetimeBlock();
  });

  it("Check format of Epoch Table", () => {
    poolDetail.verifyFormatOfEpochTable();
  });

  it("Check format of Staking Delegators table", () => {
    poolDetail.changeTableTab(1).verifyFormatOfStakingDelegatorsTable();
  });
});
