import ContractPage from "cypress/pagesobject/Contract/ContractPage";

const contractPage = new ContractPage();
describe('Check display data of Epoch list screen',()=>{
beforeEach(() => {
    contractPage.goToContractPage();
  })
it("Check display data of [No] column ", () => {
    contractPage.verifyNoIsInConsecutive()
});

it('Check display data of the "Contract Addresses" label', () => {
    contractPage.verifyAddressDisplayShorted()
});

it('Check fomat of the " Contract Addresses', () => {
    contractPage.verifyAddressDisplayShortedFormat()
});

it('Check display data of the "Balance" label', () => {
    contractPage.verifyBalanceDataDisplay()
});

it('Check display data of the "Value" label', () => {
    contractPage.verifyValueDataDisplay()
})
it('Check fomat of the " Balance"', () => {
    contractPage.verifyBalanceFormat()
});

it('Check fomat of the " Value"', () => {
    contractPage.verifyValueFormat()
});

it.only('heck display data of the "Transaction Count" labe"', () => {
    contractPage.verifyTransactionDisplay()
});

})