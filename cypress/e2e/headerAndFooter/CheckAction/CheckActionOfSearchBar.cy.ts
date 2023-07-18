import DashboardPage from "cypress/pagesobject/DashBoard/Dashboard";

const dashboardPage = new DashboardPage();
describe('Confirm action of Search bar',()=>{
beforeEach(() => {
  dashboardPage.goToDashboardPage();
  })
  xit("Check default display of 'Search bar'", () => {
    dashboardPage.verifySearchBarInnerText('Search transactions, address, blocks, epochs, pools...')
                .verifySearchBarBUttonDisplayed();
    });
  it("Check search successfully Transactions", () => {
    dashboardPage
                 .clickAllFiltersDropDownList()
                 .verifyAllFilterSelectionIsEnable()
                 .verifySearchBoxDisplay()
                 .selectFilterOption('Transactions')
                 .verifyOptionFilterSelected('Transactions')
                 .inputValueToSearchBar('a52bee31da9921898189e94f7e57617b30d5fcaa6da85e83c6229c0e1464efa2')
                 .clickSearchButton()

                 cy.wait(3000)
    });
})