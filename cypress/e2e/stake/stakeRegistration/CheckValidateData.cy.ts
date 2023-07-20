import StakeListPage from "../../../pagesobject/Stake/StakeListPage";

const stakePage = new StakeListPage();
describe("stake registration", () => {
    it("Check validation data of the Stake key Registration", () => {
        stakePage   .goToStakeRegistration()
                    .checkFormatTxHash()
                    .checkCreatedAtIsDisplay()
                    // .checkFormatCreatedAt()
                    .checkBlockIsDisplay()
                    .checkStakeKeyIsDisplay()
                    .checkFormatStakeKey()
                    .verifyPagingOfStakeList()
                    .checkValidationOfPaging()
    })
})