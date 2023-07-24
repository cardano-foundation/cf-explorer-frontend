import ContractPage from "cypress/pagesobject/Contract/ContractPage";

const contractPage = new ContractPage();
describe('Check initialization the screen',()=>{
beforeEach(() => {
  contractPage.goToContractPage()
              .clickOnContractRecordRandomly();
  })
it("Check initalizing successfully when gridview have data", () => {
  contractPage.verifyNavigatedToContractDetailPage()
              .verifyAllLabelInContractDetailDisplayed()
              .verifyTabTransactionButtonEnable()
              .verifyTabScriptButtonEnable()
              .verifyAddressDetailDisplayed()
              .verifyStakeAddressDetailDisplayed()
              .verifyTransactionListRecordDisplayed()
              .verifyPulldownNumberItemDisplayed()
              .verifyPagingNavigatorDisplay(10)
              .verifyDefaultInputPage('1')
});

})