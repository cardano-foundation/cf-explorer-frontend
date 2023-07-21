import StakeListPage from "../../../pagesobject/Stake/StakeListPage";

const stakePage = new StakeListPage();
describe("stake deregistration", () => {
    it("Check action of all items in the screen", () => {
        stakePage   .goToStakeDeregistration()
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