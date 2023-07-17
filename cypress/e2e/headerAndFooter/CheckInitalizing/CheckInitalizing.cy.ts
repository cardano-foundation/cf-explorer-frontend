import DashboardPage from "cypress/pagesobject/DashBoard/Dashboard";

const dashboardPage = new DashboardPage();
describe('Check initialization the screen',()=>{
beforeEach(() => {
  dashboardPage.goToDashboardPage();
  })
it.only("Check initializing successfully", () => {
  dashboardPage.clickNetworkDropDownList()
               .verifyNetworkSelection(['Mainnet','Preprod','Preview'])
});
})