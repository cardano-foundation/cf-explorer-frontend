import ContractPage from "cypress/pagesobject/Contract/ContractPage";

const contractPage = new ContractPage();
describe('Check display data of the "Transaction" section',()=>{
beforeEach(() => {
    contractPage.goToContractPage()
                .clickOnContractRecordRandomly();
  })

it('Check display data of the "Transaction hash" label', () => {
    contractPage.verifyDisplayTransactionHashLabel()
});

it('Check display data of the "Time" label', () => {
    contractPage.verifyDisplayTimeLabel()
});

it('Check display data of the "Block" label', () => {
    contractPage.verifyDisplayOfBlockLabel()
});

it('Check display data of the "Addresses" label', () => {
    contractPage.verifyDisplayOfAddressLabel()
});

it('Check display data of [Input address] hyperlink', () => {
    contractPage.verifyDisplayInputAddressLabel()
});

it('Check display data of [Out address] hyperlink', () => {
    contractPage.verifyDisplayOutputAddressLabel()
});

it('Check fomat of the " Fees" ', () => {
    contractPage.verifyDisplayFeesLabel()
});

it('Check fomat of the " Output" ', () => {
    contractPage.verifyDisplayOutputLabel()
});

})