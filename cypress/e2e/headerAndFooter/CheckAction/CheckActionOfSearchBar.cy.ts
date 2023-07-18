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
                 .verifyNavigatedToPage('Transaction details')
                 .verifyDetailValueAfterSearch('a52bee31da9921898189e94f7e57617b30d5fcaa6da85e83c6229c0e1464efa2')
    });
  xit("Check search successfully Blocks", () => {
    dashboardPage
                 .clickAllFiltersDropDownList()
                 .verifyAllFilterSelectionIsEnable()
                 .verifySearchBoxDisplay()
                 .selectFilterOption('Blocks')
                 .verifyOptionFilterSelected('Blocks')
                 .inputValueToSearchBar('29ec75df88a188b6f869cdee0ca787612c89a2c6f9d2ed6f4d879de0a4cfbebf')
                 .clickSearchButton()
                 .verifyNavigatedToPage('Blocks details')
                 .verifyDetailValueAfterSearch('29ec75df88a188b6f869cdee0ca787612c89a2c6f9d2ed6f4d879de0a4cfbebf')
    });
  xit("Check search successfully Epochs", () => {
    dashboardPage
                 .clickAllFiltersDropDownList()
                 .verifyAllFilterSelectionIsEnable()
                 .verifySearchBoxDisplay()
                 .selectFilterOption('Epochs')
                 .verifyOptionFilterSelected('Epochs')
                 .inputValueToSearchBar('400')
                 .clickSearchButton()
                 .verifyNavigatedToPage('Epochs details')
                 .verifyDetailValueAfterSearch('400')
    });
  xit("Check search successfully Tokens", () => {
    dashboardPage
                 .clickAllFiltersDropDownList()
                 .verifyAllFilterSelectionIsEnable()
                 .verifySearchBoxDisplay()
                 .selectFilterOption('Tokens')
                 .verifyOptionFilterSelected('Tokens')
                 .inputValueToSearchBar('asset16fm0vh7wzvvv8p0m24hvazxuysqm7v0wka8d9p')
                 .clickSearchButton()
                 .verifyNavigatedToPage('Tokens details')
                 .verifyDetailValueAfterSearch('asset16fm0vh7wzvvv8p0m24hvazxuysqm7v0wka8d9p')
    });
  xit("Check search successfully Addresses", () => {
    dashboardPage
                 .clickAllFiltersDropDownList()
                 .verifyAllFilterSelectionIsEnable()
                 .verifySearchBoxDisplay()
                 .selectFilterOption('Addresses')
                 .verifyOptionFilterSelected('Addresses')
                 .inputValueToSearchBar('addr1q8yvx9j6j9w5s46ngg0f54valk8m82rqepq4vyd9l4up06npjdredqgd4ade66mxr38rmr3424jfshly845acx46xp6qut47gn')
                 .clickSearchButton()
                 .verifyNavigatedToPage('Addresses details')
                 .verifyDetailValueAfterSearch('addr1q8yvx9j6j9w5s46ngg0f54valk8m82rqepq4vyd9l4up06npjdredqgd4ade66mxr38rmr3424jfshly845acx46xp6qut47gn')
    });
})