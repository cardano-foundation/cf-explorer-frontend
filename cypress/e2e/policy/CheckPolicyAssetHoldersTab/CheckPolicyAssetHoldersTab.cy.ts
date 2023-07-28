import PolicyPage from "cypress/pagesobject/policy/PolicyPage";

const policyPage = new PolicyPage();
describe('Check Policy Asset Holders list tab',()=>{
beforeEach(() => {
  policyPage.goToTokenPage()
            .clickPolicyIdRandomly()
            .clickTabPolicyAssetHolder();
  })

it("Check display of [Address]", () => {
   policyPage.verifyAddressColumnFormat()       
});

it("Check display of [Token name]", () => {
   policyPage.verifyTokenNamePolicyAssetColumnIsDisplayed()       
});

it("Check display of [Token ID]", () => {
   policyPage.verifyTokenIdColumnFormat()       
});

it("Check display of [Balance]", () => {
   policyPage.verifyBalanceColumnIsDisplayed()       
});

it("Check action of [Token name] hyperlink", () => {
   policyPage.clickTokenNamePolicyAssetRandomly()
             .verifyNavigatedToTokenDetailPage()       
});

it("Check action of [Token ID] hyperlink", () => {
  policyPage.clickTokenIDRandomly()   
            .verifyNavigatedToTokenDetailPage()  
});

it("Check action of [Address] hyperlink", () => {
  policyPage.clickAddressRandomly()   
            .verifyNavigatedToAddressDetailPage()  
});

})