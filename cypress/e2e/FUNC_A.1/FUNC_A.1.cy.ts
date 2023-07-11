import TokenListPage from "../../../pagesobject/TokenListPage";

const tokenListPage = new TokenListPage();
it("Full Checkout: Paid in advance", () => {
  cy.viewport(1920,1080);

  tokenListPage.goToHomePage();
  
  tokenListPage
  .verifyButtonNextPage()
  .verifyButtonSortTotalTransaction()
  .verifyButtonSortTotalSuplly()
  .verifyButtonSortCreated();
});