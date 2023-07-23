import TokenListPage from "../../pagesobject/Token/TokenListPage";

const tokenListPage = new TokenListPage();
it("Check action of all items in the screen", () => {
    tokenListPage.goToHomePage();
    tokenListPage.checkActionClickOnAssetName()

                    .clickToBtnSortTotalTransaction()
                    .verifyTotalTransactionsIsSorted("asc")
                    .clickToBtnSortTotalTransaction()
                    .verifyTotalTransactionsIsSorted("dec")
                    
                    .clickToBtnSortTotalSupply()
                    .verifyTotalSupplyIsSorted("asc")
                    .clickToBtnSortTotalSupply()
                    .verifyTotalSupplyIsSorted("dec")

                    // .clickToBtnSortCreated()
                    // .verifyCreatedAtIsSorted("asc")
                    // .clickToBtnSortCreated()
                    // .verifyCreatedAtIsSorted("dec")

                    .clickRowFirst()
                    .verifyQuickViewIcon()
                    .clickTokenId()
                    .verifyOpenTokenDetail()
                    .clickRowFirst()
                    .verifyFocusTabTransaction()
                    .clickRowFirst()
                    .verifyFocusTabTopHolders()
                    .clickRowFirst()
                    .verifyFocusTabMint()
                    .clickRowFirst()
                    .clickButtonViewDetail()
                    .verifyOpenTokenDetail()
                    .clickRowFirst()
                    .clickButtonClose()
                    .reload()

}); 