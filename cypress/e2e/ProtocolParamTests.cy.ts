import ProtocolParemPage from "cypress/pagesobject/ProtocolParamPage";

const protocolParemPage = new ProtocolParemPage();
describe("Protocol Parameter", () => {
  it("Check initialization the screen", () => {
    protocolParemPage
    .goToProtocolParametersPage()
    .verifyEnoughParameterOnList()
    .verifyViewUpdateHistoryBtnEnable()
    ;
  });
  it("Check display the data on the 'Protocol list' screen ", () => {
    protocolParemPage
    .goToProtocolParametersPage()
    .veriyParameterNameCellDisplay()
    .veriyValueCellDisplay()
    .veriyLastUpdatedEpochCellDisplay()
    .veriyCreatedAtDisplay()
    .verifyDateTimeFormat()
    ;
  });
  it("Check the action of the items", () => {
    protocolParemPage
    .goToProtocolParametersPage()
    .clickToViewUpdateHistory()
    .veriyProParamUpdateHistoryDisplayed()
    ;
  });
  it.only("verify filter", async () => {
    const paramList = await protocolParemPage
    .goToProtocolParametersPage()
    .getUpdateParam();

    const actual = await protocolParemPage
    .clickToViewUpdateHistory()
    .getParameterNameCellDisplay();
    
    expect(paramList.filter(x => x.value).toString).to.be.equal(actual.toString);
  });
});

