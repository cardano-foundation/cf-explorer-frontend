import PolicyPage from "cypress/pagesobject/policy/PolicyPage";

const policyPage = new PolicyPage();
describe('Check initialization the screen',()=>{
beforeEach(() => {
  policyPage.goToTokenPage()
            .clickPolicyIdRandomly();
  })
it("Check initalizing successfully when gridview have data", () => {
   policyPage.verifyPolicyDetailsPageDisplay()
             .verifyPolicyIdDisplay()
             .verifyTabTokenDIsplay()
             .verifyTabPolicyAssetHolderDisplay()
             .verifyTokenNameColumnIsHyperLink()
             .verifyTokenIDColumnIsHyperLink()
             .verifyPagingNavigatorTokenTabDisplay(10)
             .clickTabPolicyAssetHolder()
             .verifyPagingNavigatorPolicyAssetHolderDisplay(10)
});

})