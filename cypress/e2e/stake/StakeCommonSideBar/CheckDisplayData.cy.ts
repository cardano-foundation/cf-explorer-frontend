import StakeListPage from "../../../pagesobject/Stake/StakeListPage";

const stakePage = new StakeListPage();
describe("stake common side bar", () => {
    it("Check display data of the Block Detail", () => {
        stakePage   .goToStakeDeregistration()
                    .clickRecordRandom()
                    .checkDisplayFullStakeKey(59)
                    .checkRewardAvailable()
                    .checkRewardWithdrawn()
                    .checkFormatDelegatedTo()
                    .checkTotalStake()
    });
})