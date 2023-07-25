import InstantaneousRewardsPage from "cypress/pagesobject/InstantaneousRewards/InstantaneousRewardsPage";
const instantaneousRewardsPage =  new InstantaneousRewardsPage()

describe("Instantaneous Rewards screen", ()=>{
    it("Check display data of the Instantaneous Rewards", ()=>{
        instantaneousRewardsPage    .gotoInstantaneousRewards()
                                    .checkTxHashIsDisplay()
                                    .checkFormatTxHash()
                                    .checkCreatedAtIsDisplay()
                                    // // .checkFormatCreatedAt()
                                    .checkBlockIsDisplay()
                                    .checkRewardPaid()
                                    .verifyPagingOfStakeList()
                                    .checkValidationOfPaging()
    })
})