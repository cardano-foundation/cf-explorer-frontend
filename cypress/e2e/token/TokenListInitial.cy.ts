import TokenListPage from "../../pagesobject/TokenListPage";

const tokenListPage = new TokenListPage();
it("Check initialization the screen", () => {
    tokenListPage.goToHomePage();
    
    tokenListPage .verifyIconIsEnable()
                  .checkTitleColumn()
                  .verifyButtonNextPage()
                  .verifyButtonSortTotalTransaction()
                  .verifyButtonSortTotalSuplly()
                  .verifyButtonSortCreated()
                  .verifySelectNumberItemPage()
                  .verifyTxbPageNumberEnterNumber()
                  .checkNumberPage();
  
});