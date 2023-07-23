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
    });
})