import StakeListPage from "../../../pagesobject/Stake/StakeListPage";

const stakePage = new StakeListPage();
describe("stake common side bar", () => {
    it("Check initialization the deregistration screen", () => {
        stakePage   .goToStakeDeregistration()
                    .clickRecordRandom()
                    .checkStakeKeySideBarIsHyperLink()
                    .checkDelegationToSideBarIsHyperLink()
                    .checkButtonCoppyIsEnable()
                    .checkButtonViewDetailIsEnable()
                    .checkElementInSideBarIsDisplay()
    });

    it("Check initialization the registration screen", ()=>{
        stakePage   .goToStakeRegistration()
                    .clickRecordRandom()
                    .checkStakeKeySideBarIsHyperLink()
                    .checkDelegationToSideBarIsHyperLink()  
                    .checkButtonCoppyIsEnable()
                    .checkButtonViewDetailIsEnable()
                    .checkElementInSideBarIsDisplay() 
    })
})