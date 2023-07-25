import ContractPage from "cypress/pagesobject/Contract/ContractPage";

const contractPage = new ContractPage();
describe('Check display data of the "Transaction" section',()=>{
beforeEach(() => {
    contractPage.goToContractPage()
                .clickOnContractRecordRandomly();
  })

it('Check display data of the "Transaction hash" label', () => {
    contractPage.verifyTransactionDetail()
});

})