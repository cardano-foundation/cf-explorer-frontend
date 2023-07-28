import PolicyPage from "cypress/pagesobject/policy/PolicyPage";

const policyPage = new PolicyPage();
describe('Check Token list tab',()=>{
beforeEach(() => {
  policyPage.goToTokenPage()
            .clickPolicyIdRandomly();
  })

it("Check display of [Policy ID]", () => {
   policyPage.verifyPolicyIdDisplay()       
});

it("Check display of [Token name]", () => {
   policyPage.verifyTokenNameColumnIsDisplayed()       
});

it("Check display of [Token ID]", () => {
   policyPage.verifyTokenIDColumnIsDisplayed()
             .verifyTokenIDColumnFormat()       
});

it("Check display of [Create date] ", () => {
   policyPage.verifyCreateAtColumnDisplay()
             .verifyCreateAtFormat()       
});

it("Check display of [Total Supply]", () => {
   policyPage.verifyTotalSupplyColumnDisplay()     
});

it("Check display of [Total Transactions]", () => {
   policyPage.verifyTotalTransactionColumnDisplay()     
});

it("Check action of [Token name] hyperlink", () => {
   policyPage.clickTokenNameRandomly()   
             .verifyNavigatedToTokenDetailPage()  
});

it("Check action of [Token ID] hyperlink", () => {
   policyPage.clickTokenIDRandomly()   
             .verifyNavigatedToTokenDetailPage()  
});


})