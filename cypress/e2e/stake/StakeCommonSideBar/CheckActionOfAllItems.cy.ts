import StakeListPage from "../../../pagesobject/Stake/StakeListPage";

const stakePage = new StakeListPage();
describe("stake common side bar", () => {
    it("Check action of all items in the screen", () => {
        stakePage   .goToStakeRegistration()
                    .clickRecordRandom()

                    .checkClickOnStakeKeySideBar()
                    .clickButtonBack()
                    .clickRecordRandom()

                    .checkClickOnDelegatedToSideBar()
                    .clickButtonBack()
                    .clickRecordRandom()

                    .checkHoverOnDelegatedToSideBar() 
                    .checkClickOnViewAllAddress()   

                    .checkClickOnDelegationHistory()
                    .clickRecordRandom()

                    // .checkClickOnStakeAddressHistory()
                    // .clickRecordRandom()

                    .checkClickOnWithrawalHistory()
                    .clickRecordRandom()

                    .checkClickOnInstantaneousReward()
                    .clickRecordRandom()

                    .checkHoverOnButtonCoppy()
                    // .checkCoppyStakeAddress()
                    .checkClickOnButtonViewDetail()
                    
                    
    });
})