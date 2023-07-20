import DashboardPage from "cypress/pagesobject/DashBoard/Dashboard";

const dashboardPage = new DashboardPage();
describe('Check display data in label',()=>{
beforeEach(() => {
  dashboardPage.goToDashboardPage();
  })
it.only("Check the display of [Term and Policy]", () => {
  dashboardPage.verifyTermAndPolicy('© 2023 Cardano Foundation. All rights reserved. Version: 0.4.7')

              });
})