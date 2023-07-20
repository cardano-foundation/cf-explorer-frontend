import DashboardPage from "cypress/pagesobject/DashBoard/Dashboard";

const dashboardPage = new DashboardPage();
describe('Confirm action of all nevigation on Footer',()=>{
beforeEach(() => {
  dashboardPage.goToDashboardPage();
  })
it("Confirm action of [LinkedIn] button", () => {
  dashboardPage.clickOnButtonInFooterAndVerifyPageNavigated('LinkedIn','https://www.linkedin.com/company/cardano-foundation/')
              });
it("Confirm action of [Telegram] button", () => {
  dashboardPage.clickOnButtonInFooterAndVerifyPageNavigated('Telegram','https://t.me/CardanoAnnouncements')
              });
it("Confirm action of [Twitter] button", () => {
  dashboardPage.clickOnButtonInFooterAndVerifyPageNavigated('Twitter','https://twitter.com/Cardano_CF')
              });
it("Confirm action of [Youtube] button", () => {
  dashboardPage.clickOnButtonInFooterAndVerifyPageNavigated('Youtube','https://www.youtube.com/c/cardanofoundation')
              });

})