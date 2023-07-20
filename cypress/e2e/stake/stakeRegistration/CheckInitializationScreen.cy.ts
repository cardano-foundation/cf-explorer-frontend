import StakeListPage from "../../../pagesobject/Stake/StakeListPage";

const stakePage = new StakeListPage();
describe("stake registration", () => {
    it("Check initialization the screen", () => {
        stakePage   .goToStakeRegistration()
                    .verifyHyperLinkIsEnable()
                    .verifyButtonNextAndPreviousIsEnable()
                    .verifyPaging(2)             
    });
})
