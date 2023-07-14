import TokenListPage from "../../pagesobject/TokenListPage";

const tokenListPage = new TokenListPage();
it("Check action of all items in the screen", () => {
    tokenListPage.goToHomePage();
    tokenListPage.checkActionClickOnAssetName();
});