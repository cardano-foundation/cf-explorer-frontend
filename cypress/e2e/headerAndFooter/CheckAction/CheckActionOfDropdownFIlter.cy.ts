import DashboardPage from "cypress/pagesobject/DashBoard/Dashboard";

const dashboardPage = new DashboardPage();
describe('Confirm action of all dropdown on Filters',()=>{
beforeEach(() => {
  dashboardPage.goToDashboardPage();
  })
it.only("Confirm action click on [Filters]", () => {
  dashboardPage
               .clickAllFiltersDropDownList()
               .verifyAllFilterSelectionIsEnable()
               .verifySearchBoxDisplay()
              });
})