import PolicyPage from "cypress/pagesobject/policy/PolicyPage";

const policyPage = new PolicyPage();
describe('Check Policy information section',()=>{
beforeEach(() => {
  policyPage.goToTokenPage()
            .clickPolicyIdRandomly();
  })
it("Check action of [Policy ID] hyperlink", () => {
   policyPage.verifyPolicyIdIsNotHyperLink()
             
});

it("Check action of [Policy script] button", () => {
   policyPage.clickOnPolicyScript()
             .verifyPolicyScriptPopup()            
});

it("Check action of [Close] button on Show Policy Script popup", () => {
   policyPage.clickOnPolicyScript()
             .verifyPolicyScriptPopup()
             .clickOnClosePolicyScript()
             .verifyPolicyScriptPopupClosed()            
});

})