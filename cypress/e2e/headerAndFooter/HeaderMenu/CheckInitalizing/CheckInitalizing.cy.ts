import DashboardPage from "cypress/pagesobject/DashBoard/Dashboard";

const dashboardPage = new DashboardPage();
describe('Check initialization the screen',()=>{
beforeEach(() => {
  dashboardPage.goToDashboardPage();
  })
it.only("Check initializing successfully", () => {
  dashboardPage.clickNetworkDropDownList()
               .verifyNetworkSelection(['Mainnet','Preprod','Preview'])
               .clickNetworkDropDownListOption()
               .clickAllFiltersDropDownList()
               .verifyAllFilterSelection(['All Filters','Epochs','Blocks','Transactions','Tokens','Addresses','Pools','Policy Id'])
               .verifySearchBoxDisplay()
              });
})