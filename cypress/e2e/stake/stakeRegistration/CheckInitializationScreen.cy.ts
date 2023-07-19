import StakeListPage from "../../../pagesobject/Stake/StakeListPage";

const stakePage = new StakeListPage();
it("Check initialization the screen of stake registration", () => {
    stakePage   .goToStakeRegistration();
    
    stakePage   .verifyHyperLinkIsEnable()
                .verifyButtonNextAndPreviousIsEnable()
                .verifyPaging(2)
});