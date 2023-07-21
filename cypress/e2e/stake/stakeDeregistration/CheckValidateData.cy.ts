import StakeListPage from "../../../pagesobject/Stake/StakeListPage";

const stakePage = new StakeListPage();
describe("stake deregistration", () => {
    it("Check display data of the Stake key Deregistration", () => {
        stakePage   .goToStakeDeregistration()
                    .checkTxHashIsDisplay()
                    .checkFormatTxHash()
                    .checkCreatedAtIsDisplay()
                    .checkFormatCreatedAt()
                    .checkBlockIsDisplay()
                    .checkStakeKeyIsDisplay()
                    .checkFormatStakeKey()
                    .verifyPagingOfStakeList()
                    .checkValidationOfPaging()
    })
})