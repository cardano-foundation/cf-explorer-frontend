import ContractPage from "cypress/pagesobject/Contract/ContractPage";

const contractPage = new ContractPage();
describe('Check action of items in the "Contract details" section',()=>{
beforeEach(() => {
    contractPage.goToContractPage()
                .clickOnContractRecordRandomly();
  })
it("Check action of hyperlink [Stake key address]", () => {
    contractPage.clickOnStakeAddress()
                .verifyNavigatedToStakeDetailPage()
})

it("Check action of hyperlink [Delegated To]", () => {
    contractPage.clickOnDelegatedTo()
                .verifyNavigatedToPoolPage()
})

it.only("Check when hover [Copy] button ", () => {
    contractPage.hoverOnCopyIcon()
                .verifyTooltipPopupDisplayed()
})

})