import TokenListPage from "../../pagesobject/TokenListPage";

const tokenListPage = new TokenListPage();
it("Check initialization the screen", () => {
    tokenListPage.goToHomePage();
    
    tokenListPage .verifyButtonNextPage()
                  .verifyButtonSortTotalTransaction()
                  .verifyButtonSortTotalSuplly()
                  .verifyButtonSortCreated()
                  .verifySelectNumberItemPage()
                  .verifyTxbPageNumberEnterNumber()
                  .checkNumberPage();
  
});