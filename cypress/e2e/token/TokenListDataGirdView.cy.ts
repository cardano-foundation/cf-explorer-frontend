import TokenListPage from "../../pagesobject/TokenListPage";

const tokenListPage = new TokenListPage();
it("Check display data of the Token List grid view", () => {
    tokenListPage.goToHomePage();
    
    tokenListPage
                .verifyListTotalTransactionIsNumber();
});