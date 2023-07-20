import StakeListPage from "../../../pagesobject/Stake/StakeListPage";

const stakePage = new StakeListPage();
describe("stake registration", () => {
    it("Check action of all items in the screen", () => {
        stakePage   .goToStakeRegistration()
                    .checkActionClickOnTxHash()
                    .clickButtonBack()
                    .checkHoverOnTxHash()
                    .checkActionClickOnBlock()
                    .clickButtonBack()
                    .checkActionClickOnEpoch()
                    .clickButtonBack()
                    .checkHoverOnBlock()
                    .checkHoverOnStakeKey()
                    .checkActionClickOnStakeKey()
                    .clickButtonBack()
    })
})