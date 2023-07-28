import PoolDetail from "cypress/pagesobject/Pool/PoolDetail";

const poolDetail = new PoolDetail();
describe(`Check display data of the "Pool details" screen 	`, () => {
  beforeEach(() => {
    poolDetail.goToPage();
  });
  it('Check diisplay data of the "Pool details" screen ', () => {
    poolDetail.verifyAllTheDetailsDisplayed();
  });
});
