import StakeListPage from "../../../pagesobject/Stake/StakeListPage";

const stakePage = new StakeListPage();
describe("stake deregistration", () => {
    it("Check initialization the screen", () => {
        stakePage   .goToStakeDeregistration()
                    .verifyHyperLinkIsEnable()
                    .verifyButtonNextAndPreviousIsEnable()
                    .verifyPaging(2)             
    });
})
