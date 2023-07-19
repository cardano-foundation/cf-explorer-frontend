import StakeListPage from "../../../pagesobject/Stake/StakeListPage";

const stakePage = new StakeListPage();
describe("stake registration", () => {
    xit("Check initialization the screen", () => {
        stakePage   .goToStakeRegistration()
                    .verifyHyperLinkIsEnable()
                    .verifyButtonNextAndPreviousIsEnable()
                    .verifyPaging(2)
                    
    });

    xit("Check validation data of the Stake key Registration", () => {
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
    it("Check action of all items in the screen", () => {
        stakePage   .goToStakeRegistration()
        
    })
})
