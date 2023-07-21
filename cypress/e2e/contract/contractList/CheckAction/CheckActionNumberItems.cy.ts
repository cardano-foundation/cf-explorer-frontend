import ContractPage from "cypress/pagesobject/Contract/ContractPage";

const contractPage = new ContractPage();
describe('Check action of "Number items" pulldown',()=>{
beforeEach(() => {
    contractPage.goToContractPage();
  })
it('Check action of "Number items" pulldown ', () => {
    contractPage.verifyDefaulDisplayRow('50')
                .clickOnPerPageDropdown()
                .verifyDisplayRowSelection(['10','20','50','100'])
                .changePerPageValue('10')
                .verifyNumberOfDisplayRow('10')
                .clickOnPerPageDropdown()
                .changePerPageValue('20')
                .verifyNumberOfDisplayRow('20')
                .clickOnPerPageDropdown()
                .changePerPageValue('50')
                .verifyNumberOfDisplayRow('50')
                .clickOnPerPageDropdown()
                .changePerPageValue('100')
                .verifyNumberOfDisplayRow('100')
})

})