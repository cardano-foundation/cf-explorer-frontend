import InstantaneousRewardsPage from "cypress/pagesobject/InstantaneousRewards/InstantaneousRewardsPage";
const instantaneousRewardsPage =  new InstantaneousRewardsPage()

describe("Instantaneous Rewards screen", ()=>{
    it("Check action of Paging Navigator", ()=>{
        instantaneousRewardsPage    .gotoInstantaneousRewards()

    })
})