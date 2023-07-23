import TokenListPage from "cypress/pagesobject/Token/TokenListPage";

const tokenPage = new TokenListPage();
describe('Token list',()=>{
    beforeEach(() => {
        tokenPage.goToHomePage();
    })
    
    it("Check action of 'Paging Navigator'", () => {
        tokenPage   
                    .clickOnPerPageDropdown()
                    .changePerPageValue('10')
                    .checkPagingNavigatorWithNumberRecord('10')
                    .checkButtonNextIsEnable() 
                    .checkButtonNextIsDisable()
                    .checkButtonPreIsEnable('2')
                    .checkButtonPreIsDisable()
                    .checkInputTxbPageTo1FromMax('3')  

    });
})