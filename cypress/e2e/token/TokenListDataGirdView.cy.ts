import TokenListPage from "../../pagesobject/Token/TokenListPage";

const tokenListPage = new TokenListPage();
it("Check display data of the Token List grid view", () => {
    tokenListPage.goToHomePage();

    tokenListPage.verifyColumnName()
                    .verifyDataColumnCreateAt()
                    .verifyDataColumnTotalSupply()
                    .verifyDataColumnVolume24H()
                    .verifyDataColumnTotalVolume()
                    .verifyDataColumnTotalTransaction()
                    .verifyFormatOfCreatedAt();
});
