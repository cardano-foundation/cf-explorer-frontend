import DashboardPage from "cypress/pagesobject/DashBoard/Dashboard";

const dashboardPage = new DashboardPage();
describe('Check initialization the screen',()=>{
beforeEach(() => {
  dashboardPage.goToDashboardPage();
  })
it("Confirm action of [Collapse/ Expand] Button", () => {
  dashboardPage.clickOnExpandCollapseBtn()
               .verifySideBarIsCollapsed()
               .clickOnExpandCollapseBtn()
               .verifySideBarIsExpanded()
              });

it("Confirm action when Clicking logo", () => {
  dashboardPage.clickOnBlockChainDropDownList()
               .clickOnBlockChainDropDownOption()
               .clickOnLogo()
               .verifyReturnToHomePage()
              });

it("Confirm action of [Blockchain] tab", () => {
  dashboardPage.clickOnBlockChainDropDownList()
               .verifyBlockchainDropdownSelection(['Epochs','Blocks','Transactions','Native Tokens','Smart Contracts','Pools','Top ADA Holders'])
              });

it("Confirm action of [Epochs] button", () => {
  dashboardPage.clickOnBlockChainDropDownList()
               .clickOnSpecificBlockChainDropDownOption('Epochs')
               .verifyPageNavigated('Epochs')
              });
it("Confirm action of [Blocks] button", () => {
  dashboardPage.clickOnBlockChainDropDownList()
               .clickOnSpecificBlockChainDropDownOption('Blocks')
               .verifyPageNavigated('Blocks')
              });

it("Confirm action of [Native Tokens] button", () => {
  dashboardPage.clickOnBlockChainDropDownList()
               .clickOnSpecificBlockChainDropDownOption('Native Tokens')
               .verifyPageNavigated('Token List')
              });

it("Confirm action of [Smart Contracts] button", () => {
  dashboardPage.clickOnBlockChainDropDownList()
               .clickOnSpecificBlockChainDropDownOption('Smart Contracts')
               .verifyPageNavigated('Contracts')
              });

it("Confirm action of [Pools] button", () => {
  dashboardPage.clickOnBlockChainDropDownList()
               .clickOnSpecificBlockChainDropDownOption('Pools')
               .verifyPageNavigated('Stake Pool')
              });

it("Confirm action of [Top ADA Holders] button", () => {
  dashboardPage.clickOnBlockChainDropDownList()
               .clickOnSpecificBlockChainDropDownOption('Top ADA Holders')
               .verifyPageNavigated('Top ADA Holders')
              });

it("Confirm action of [Other] tab", () => {
  dashboardPage.clickOnBlockChainDropDownList()
               .clickBrowse()
               .verifyBlockchainDropdownIsCollapsed()
              });

it("Confirm action of [Browse] tab", () => {
  dashboardPage.clickBrowse()
               .verifyBrowseDropdownSelection(['About Us','Contact Us','Cardano Docs','News and Blog'])
              });
it("Confirm action of [About Us] button", () => {
  dashboardPage.clickOnButtonAndVerifyURLNavigated('About Us','https://cardanofoundation.org/en/about-us/')
              });
it("Confirm action of [Contact Us] button", () => {
  dashboardPage.clickOnButtonAndVerifyURLNavigated('Contact Us','https://cardanofoundation.org/en/contact-us/')
              });
it("Confirm action of [Cardano Docs] button", () => {
  dashboardPage.clickOnButtonAndVerifyURLNavigated('Cardano Docs','https://docs.cardano.org/introduction')
              });
it("Confirm action of [News and Blog] button", () => {
  dashboardPage.clickOnButtonAndVerifyURLNavigated('News and Blog','https://cardanofoundation.org/en/news')
              });
it("Confirm action of [Blockchain Course] button", () => {
  dashboardPage.clickOnButtonAndVerifyURLNavigated('Blockchain Course','https://education.cardanofoundation.org/')
              });
it("Confirm action of [Builder Tools] button", () => {
  dashboardPage.clickOnButtonAndVerifyURLNavigated('Builder Tools','https://developers.cardano.org/tools/')
              });
it("Confirm action of [Github] button", () => {
  dashboardPage.clickOnButtonAndVerifyURLNavigated('Github','https://github.com/cardano-foundation')
              });

})