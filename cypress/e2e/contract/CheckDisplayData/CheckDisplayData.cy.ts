import ContractPage from "cypress/pagesobject/Contract/ContractPage";

const contractPage = new ContractPage();
describe('Check display data of Epoch list screen',()=>{
beforeEach(() => {
    contractPage.goToContractPage();
  })
it("Check display data of [No] column ", () => {
    contractPage.verifyNoIsInConsecutive()
});

})