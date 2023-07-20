import StakeListPage from "../../../pagesobject/Stake/StakeListPage";

const stakePage = new StakeListPage();
describe("stake registration", () => {
    it("Check action of 'Paging Navigator'", () => {
        stakePage   .goToStakeRegistration()                                 
    })
})