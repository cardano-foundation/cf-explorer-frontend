import DashboardPage from "cypress/pagesobject/DashBoard/Dashboard";

const dashboardPage = new DashboardPage();
describe('Confirm action of Search bar',()=>{
beforeEach(() => {
  dashboardPage.goToDashboardPage();
  })
  it("Check default display of 'Search bar'", () => {
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
  it("Check search successfully Blocks", () => {
    dashboardPage
                 .clickAllFiltersDropDownList()
                 .verifyAllFilterSelectionIsEnable()
                 .verifySearchBoxDisplay()
                 .selectFilterOption('Blocks')
                 .verifyOptionFilterSelected('Blocks')
                 .inputValueToSearchBar('29ec75df88a188b6f869cdee0ca787612c89a2c6f9d2ed6f4d879de0a4cfbebf')
                 .clickSearchButton()
                 .verifyNavigatedToPage('Block details')
                 .verifyDetailValueAfterSearch('29ec75df88a188b6f869cdee0ca787612c89a2c6f9d2ed6f4d879de0a4cfbebf')
    });
  it("Check search successfully Epochs", () => {
    dashboardPage
                 .clickAllFiltersDropDownList()
                 .verifyAllFilterSelectionIsEnable()
                 .verifySearchBoxDisplay()
                 .selectFilterOption('Epochs')
                 .verifyOptionFilterSelected('Epochs')
                 .inputValueToSearchBar('400')
                 .clickSearchButton()
                 .verifyNavigatedToPage('Epoch details')
                 .verifyDetailEpochAfterSearch('400')
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
  it("Check search successfully Addresses", () => {
    dashboardPage
                 .clickAllFiltersDropDownList()
                 .verifyAllFilterSelectionIsEnable()
                 .verifySearchBoxDisplay()
                 .selectFilterOption('Addresses')
                 .verifyOptionFilterSelected('Addresses')
                 .inputValueToSearchBar('addr1q8yvx9j6j9w5s46ngg0f54valk8m82rqepq4vyd9l4up06npjdredqgd4ade66mxr38rmr3424jfshly845acx46xp6qut47gn')
                 .clickSearchButton()
                 .verifyNavigatedToPage('Address Details')
                 .verifyDetailAddressAfterSearch('addr1q8yvx9j6j9w5s46ngg0f54valk8m82rqepq4vyd9l4up06npjdredqgd4ade66mxr38rmr3424jfshly845acx46xp6qut47gn')
    });

  it("Check search unsuccessfully :Enter a value that does not exist ", () => {
    dashboardPage
                 .verifySearchBoxDisplay()
                 .inputValueToSearchBar('afaj2557872266qe444s5da6s5d9a9sd9asd59as8d9')
                 .clickSearchButton()
                 .verifyNoResultDisplay()
    });

  it("Check search unsuccessfully : Enter special characters ( %jjj. &&***)  ", () => {
    dashboardPage
                 .verifySearchBoxDisplay()
                 .inputValueToSearchBar('%jjj. &&***')
                 .clickSearchButton()
                 .verifyNoResultDisplay()
    });

  it("Check search unsuccessfully : Input invalid value in [Search] field and choose filter", () => {
    dashboardPage
                 .verifySearchBoxDisplay()
                 .inputValueToSearchBar('ajshdk959559a5sd9598as9d898a9ds56asd59as5d9')
                 .clickAllFiltersDropDownList()
                 .verifyAllFilterSelectionIsEnable()
                 .verifySearchBoxDisplay()
                 .selectFilterOption('Addresses')
                 .clickSearchButton()
                 .verifyNoResultDisplay()
    });

  it("Check search unsuccessfully : Blank input [Search Bar]", () => {
    dashboardPage
                  .verifySearchBoxDisplay()
                  .inputValueToSearchBar(' ')
                  .clickSearchButton()
                  .verifySearchButtonDisabled()
    });
})