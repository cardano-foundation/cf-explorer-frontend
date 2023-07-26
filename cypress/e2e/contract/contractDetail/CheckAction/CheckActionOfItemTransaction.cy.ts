import ContractPage from "cypress/pagesobject/Contract/ContractPage";

const contractPage = new ContractPage();
describe('Check action of items in the "Transaction" section',()=>{
beforeEach(() => {
    contractPage.goToContractPage()
                .clickOnContractRecordRandomly();
  })
it("Check action of button [Transaction] ", () => {
    contractPage.clickOnTransactionTab()
                .verifyTransactionTableIsDisplayed()
})

it("Check action of hyperlink [Transaction hash]", () => {
    contractPage.clickOnTransactionHashRandomly()
                .verifyNavigatedToPage('Transaction Details')
})

it("Check action of [Input address] hyperlink ", () => {
    contractPage.clickOnInputAddressRandomly()
                .verifyNavigatedToPage('Address Details')
})

it("Check action of [Output address] hyperlink ", () => {
    contractPage.clickOnOutputAddressRandomly()
                .verifyNavigatedToPage('Address Details')
})

it("Check action of [Block] hyperlink ", () => {
    contractPage.clickOnBlockRandomly()
                .verifyNavigatedToPage('Block details')
})

it("Check action of [Epoch] hyperlink ", () => {
    contractPage.clickOnEpochRandomly()
                .verifyNavigatedToPage('Epoch details')
})

})