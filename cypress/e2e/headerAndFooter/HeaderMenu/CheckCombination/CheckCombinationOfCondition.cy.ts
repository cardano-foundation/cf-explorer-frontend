import DashboardPage from "cypress/pagesobject/DashBoard/Dashboard";

const dashboardPage = new DashboardPage();
describe('Check combination of conditions',()=>{
beforeEach(() => {
  dashboardPage.goToDashboardPage();
  dashboardPage.clickNetworkDropDownList()
                .verifyNetworkSelection(['Mainnet','Preprod','Preview'])
                .clickNetworkDropDownListOption()
                .clickAllFiltersDropDownList()
                .verifyAllFilterSelection(['All Filters','Epochs','Blocks','Transactions','Tokens','Addresses','Pools','Policy Id'])
                .verifySearchBoxDisplay()
  })

  it("Check the matching condition:Filters=Epoch, Enter valid value 'Transactions'", () => {
    dashboardPage
                .selectFilterOption('Epochs')
                .inputValueToSearchBar('a52bee31da9921898189e94f7e57617b30d5fcaa6da85e83c6229c0e1464efa2')
                .clickSearchButton()
                .verifyNoResultDisplay()
    });

  it("Check the matching condition:Filters=Pool, Enter valid value 'Epoch'", () => {
    dashboardPage
                .selectFilterOption('Pools')
                .inputValueToSearchBar('400')
                .clickSearchButton()
                .verifyNoResultDisplay()
    });

  it("Check the matching condition:Filters=Blocks, Enter valid value 'Transactions'", () => {
    dashboardPage
                .selectFilterOption('Blocks')
                .inputValueToSearchBar('a52bee31da9921898189e94f7e57617b30d5fcaa6da85e83c6229c0e1464efa2')
                .clickSearchButton()
                .verifyNoResultDisplay()
    });

  it("Check the matching condition:Filters=Tokens, Enter valid value 'Epoch'", () => {
    dashboardPage
                .selectFilterOption('Tokens')
                .inputValueToSearchBar('400')
                .clickSearchButton()
                .verifyNoResultDisplay()
    });

  it("Check the matching condition:Filters=Addresses, Enter valid value 'Epoch'", () => {
    dashboardPage
                .selectFilterOption('Addresses')
                .inputValueToSearchBar('400')
                .clickSearchButton()
                .verifyNoResultDisplay()
    });
})