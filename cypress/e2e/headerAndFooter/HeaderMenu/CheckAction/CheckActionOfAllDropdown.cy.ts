import DashboardPage from "cypress/pagesobject/DashBoard/Dashboard";

const dashboardPage = new DashboardPage();
describe('Confirm action of all dropdown',()=>{
beforeEach(() => {
  dashboardPage.goToDashboardPage();
  })
it("Confirm action of [Epoch] item ]", () => {
  dashboardPage
               .clickAllFiltersDropDownList()
               .verifyAllFilterSelectionIsEnable()
               .verifySearchBoxDisplay()
               .selectFilterOption('Epochs')
               .verifyOptionFilterSelected('Epochs')
  });
it("Confirm action of [Blocks] item ]", () => {
  dashboardPage
               .clickAllFiltersDropDownList()
               .verifyAllFilterSelectionIsEnable()
               .verifySearchBoxDisplay()
               .selectFilterOption('Blocks')
               .verifyOptionFilterSelected('Blocks')
  });
it("Confirm action of [Transactions] item ]", () => {
  dashboardPage
               .clickAllFiltersDropDownList()
               .verifyAllFilterSelectionIsEnable()
               .verifySearchBoxDisplay()
               .selectFilterOption('Transactions')
               .verifyOptionFilterSelected('Transactions')
  });
it("Confirm action of [Tokens] item ]", () => {
  dashboardPage
               .clickAllFiltersDropDownList()
               .verifyAllFilterSelectionIsEnable()
               .verifySearchBoxDisplay()
               .selectFilterOption('Tokens')
               .verifyOptionFilterSelected('Tokens')
  });
it("Confirm action of [Addresses] item ]", () => {
  dashboardPage
               .clickAllFiltersDropDownList()
               .verifyAllFilterSelectionIsEnable()
               .verifySearchBoxDisplay()
               .selectFilterOption('Addresses')
               .verifyOptionFilterSelected('Addresses')
  });
it("Confirm action of [Pools] item ]", () => {
  dashboardPage
               .clickAllFiltersDropDownList()
               .verifyAllFilterSelectionIsEnable()
               .verifySearchBoxDisplay()
               .selectFilterOption('Pools')
               .verifyOptionFilterSelected('Pools')
  });
it("Confirm action of [Policy Id] item ]", () => {
  dashboardPage
               .clickAllFiltersDropDownList()
               .verifyAllFilterSelectionIsEnable()
               .verifySearchBoxDisplay()
               .selectFilterOption('Policy Id')
               .verifyOptionFilterSelected('Policy Id')
  });
})