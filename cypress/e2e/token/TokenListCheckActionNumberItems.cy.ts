import TokenListPage from "cypress/pagesobject/TokenListPage";
const tokenListPage = new TokenListPage();
describe('Check action of "Number items" pulldown',()=>{
    beforeEach(() => {
        tokenListPage.goToHomePage();
    })
    it("Check action of 'Number items' pulldown", () => {
        tokenListPage
                    .verifyDefaulDisplayRow('50')
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
    });
})