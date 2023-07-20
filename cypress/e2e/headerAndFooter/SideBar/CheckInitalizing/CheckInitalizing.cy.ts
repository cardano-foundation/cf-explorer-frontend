import DashboardPage from "cypress/pagesobject/DashBoard/Dashboard";

const dashboardPage = new DashboardPage();
describe('Check initialization the screen',()=>{
beforeEach(() => {
  dashboardPage.goToDashboardPage();
  })
it.only("Check initializing successfully", () => {
  dashboardPage.clickOnBlockChainDropDownList()
               .verifyBlockchainDropdownSelection(['Epochs','Blocks','Transactions','Native Tokens','Smart Contracts','Pools','Top ADA Holders'])
               .clickOnBlockChainDropDownList()
               .clickOperationalCertificate()
               .verifyOperationalDropdownSelection(['Stake Address Registration','Stake Address Deregistration','Stake Delegation(s)','Pool Certificate','Pool Deregistration','Instantaneous Rewards '])
               .clickOperationalCertificate()
               .clickBrowse()
               .verifyBrowseDropdownSelection(['About Us','Contact Us','Cardano Docs','News and Blog'])
               .clickBrowse()
               .clickResources()
               .verifyResourceslDropdownSelection(['Blockchain Course','Builder Tools','Github'])
              });
})