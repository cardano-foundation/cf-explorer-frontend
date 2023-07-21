import StakeListPage from "../../../pagesobject/Stake/StakeListPage";

const stakePage = new StakeListPage();
describe("stake deregistration", () => {
    it("Check action of 'Number items' pulldown", () => {
        stakePage   .goToStakeDeregistration()
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