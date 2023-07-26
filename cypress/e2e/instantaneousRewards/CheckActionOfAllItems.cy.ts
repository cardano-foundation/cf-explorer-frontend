import InstantaneousRewardsPage from "cypress/pagesobject/InstantaneousRewards/InstantaneousRewardsPage";
const instantaneousRewardsPage =  new InstantaneousRewardsPage()

describe("Instantaneous Rewards screen", ()=>{
    xit("Check action of all items in the screen", ()=>{
        instantaneousRewardsPage    .gotoInstantaneousRewards()
                                    .checkClickOnTxHash()
                                    .clickOnButtonBack()
                                    .checkHoverOnTxHash()
                                    .checkClickOnBlock()
                                    .clickOnButtonBack()
                                    .checkClickOnEpoch()
                                    .clickOnButtonBack()
    })

    it("Check action click on Pagination button ", ()=>{
        instantaneousRewardsPage    .gotoInstantaneousRewards()
                                    .clickOnPerPageDropdown()
                                    .checkActionNumberItemPullDown(['10','20','50','100'])
                                    .changePerPageValue('10')
                                    .verifyNumberOfBlockDisplayRow('10')
                                    .clickOnPerPageDropdown()
                                    .changePerPageValue('20')
                                    .verifyNumberOfBlockDisplayRow('20')
                                    .clickOnPerPageDropdown()
                                    .changePerPageValue('50')
                                    .verifyNumberOfBlockDisplayRow('50')
                                    .clickOnPerPageDropdown()
                                    .changePerPageValue('100')
                                    .verifyNumberOfBlockDisplayRow('100')            

    })
})