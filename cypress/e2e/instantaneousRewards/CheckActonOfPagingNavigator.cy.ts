import InstantaneousRewardsPage from "cypress/pagesobject/InstantaneousRewards/InstantaneousRewardsPage";
import { numberFormat } from "highcharts";
const instantaneousRewardsPage =  new InstantaneousRewardsPage()

describe("Instantaneous Rewards screen", ()=>{
    it("Check action of Paging Navigator", ()=>{
        instantaneousRewardsPage    .gotoInstantaneousRewards()
                                    .checkButtonNextIsEnable('1') 
                                    .checkButtonNextIsDisable()
                                    .checkButtonPreStatus('2', 'be.enabled')
                                    .checkButtonPreStatus('1', 'be.disabled')
                                    .checkInputTxbPageTo1FromMax(2) 

    })
})