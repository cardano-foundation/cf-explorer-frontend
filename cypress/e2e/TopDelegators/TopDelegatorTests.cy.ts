import TopAddressPage from "cypress/pagesobject/Delegation/TopAddressPage";

// describe("Top ADdress ADA Balance", () => {
//     const topAddressPage = new TopAddressPage();
//     it("Check initialzation the screen", () => {
//         topAddressPage
//         .goToTopADAHolders()
//         .verifyAllColumnNameDisplayed()
//         .hoverToAddressCell()
//         .verifyAddressShowFull();
//     })
//     it("Check display data of the Top Address", () => {
//         topAddressPage
//         .goToTopADAHolders()
//         .verifyFieldIsConsecutive()
//         .verifyFormatAddress()
//         .verifyFormatBalance()
//         .verifyTransactionDisplay();
//     })
//     it("Check action of all items in the screen", () => {
//         topAddressPage
//         .goToTopADAHolders()
//         .clickToAddressCell()
//         .veriryAddressDetailDisplay();
//     })
//     it.only("verify perpage", () => {
//         let defaultPage = 50;
//         topAddressPage
//         .goToTopADAHolders()
//         .verifyDefaultPageNumber(defaultPage)
//         .clickToPerPage()
//         .verifyEnoughChoiceInPerPage();
//     })
// });

describe("By Amount Staked", () => {
    const topAddressPage = new TopAddressPage();
    it("Check initialzation the screen", () => {
        topAddressPage
        .goToTopADAHolders()
        .clickToByAmountStakedTab()
        .verifyAllColumnNameDisplayedByAmountStaked()
        .hoverToStakeAddressCell()
        .verifyStkeAddressShowFull();
    })
    it("Check display data of the Amount Staked", () => {
        topAddressPage
        .goToTopADAHolders()
        .clickToByAmountStakedTab()
        .verifyFieldIsConsecutive()
        .verifyFormatStakeAddress()
        .verifyFormatStakeAmount();
    })
    it("Check action of all items in the screen", () => {
        topAddressPage
        .goToTopADAHolders()
        .clickToByAmountStakedTab()
        .clickToStakeAddressCell()
        .veriryStakeAddressDetailDisplay();
    })
    it.only("verify perpage", () => {
        let defaultPage = 50;
        topAddressPage
        .goToTopADAHolders()
        .clickToByAmountStakedTab()
        .verifyDefaultPageNumberStakedAmount(defaultPage)
        .clickToPerPageStakedAmount()
        .verifyEnoughChoiceInPerPage();
    })
})  