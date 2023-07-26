import InstantaneousRewardsPage from "cypress/pagesobject/InstantaneousRewards/InstantaneousRewardsPage";
const instantaneousRewardsPage =  new InstantaneousRewardsPage()

describe("Instantaneous Rewards screen", ()=>{
    it("Check action of all items in the screen", ()=>{
        instantaneousRewardsPage    .gotoInstantaneousRewards()
                                    .checkClickOnTxHash()
                                    .clickOnButtonBack()
                                    .checkHoverOnTxHash()
                                    .checkClickOnBlock()
                                    .clickOnButtonBack()
                                    .checkClickOnEpoch()
                                    .clickOnButtonBack()
    })
})