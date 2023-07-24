import ContractPage from "cypress/pagesobject/Contract/ContractPage";

const contractPage = new ContractPage();
describe('Check action click on [Verify script] button ',()=>{
beforeEach(() => {
    contractPage.goToContractPage()
                .clickOnContractRecordRandomly();
  })
it("Check action click on [Verify script] button ", () => {
    contractPage.clickVerifyScriptButton()
                .verifyInputNativeScriptDisplay()
                .verifyVerifyScriptPopupCloseButtonEnable()
})

it.only("Check action click on [X] button ", () => {
    contractPage.clickVerifyScriptButton()
                .verifyInputNativeScriptDisplay()
                .verifyVerifyScriptPopupCloseButtonEnable()
                .clickOnVerifyScriptPopupCloseButton()
                .verifyPopupClosed()
})
})