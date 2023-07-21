import StakeListPage from "../../../pagesobject/Stake/StakeListPage";

const stakePage = new StakeListPage();
describe("stake deregistration", () => {
    it("Check action of 'Paging Navigator'", () => {
        stakePage   .goToStakeDeregistration()   
                    .checkButtonNextIsEnable() 
                    .checkButtonNextIsDisable()
                    .checkButtonPreIsEnable('2')
                    .checkButtonPreIsDisable()
                    .checkInputTxbPageTo1FromMax('3')    
    })
})