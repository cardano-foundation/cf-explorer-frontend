import TopAddress from "cypress/pagesobject/TopAddressPage"

describe("Top Address", () => {
    const topAdress = new TopAddress();
    it("Check initialzation the screen", () => {
        topAdress
        .goToTopADAHolders()
        .verifyAllColumnNameDisplayed()
        .hoverToAddressCell()
        .verifyAddressShowFull();
    })
    it("Check display data of the Top Address", () => {
        topAdress
        .goToTopADAHolders()
        .verifyFieldIsConsecutive()
        .verifyFormatAddress()
        .verifyFormatBalance()
        .verifyTransactionDisplay();
    })
    it("Check action of all items in the screen", () => {
        topAdress
        .goToTopADAHolders()
        .clickToAddressCell()
        .veriryAddressDetailDisplay();
    })
    it.only("verify perpage", () => {
        let defaultPage = 50;
        topAdress
        .goToTopADAHolders()
        .verifyDefaultPageNumber(defaultPage)
        .clickToPerPage()
        .verifyEnoughChoiceInPerPage();
    })
})  