import InstantaneousRewardsPage from "cypress/pagesobject/InstantaneousRewards/InstantaneousRewardsPage";
const instantaneousRewardsPage =  new InstantaneousRewardsPage()
describe("Instantaneous Rewards screen", ()=>{
    it("Check initialization the screen", ()=>{
        instantaneousRewardsPage    .gotoInstantaneousRewards()
                                    .verifyHyperLinkIsEnable()
                                    .verifyButtonNextAndPreviousIsEnable()
                                    .verifyPaging(2)  
    })
})