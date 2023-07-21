import ContractPage from "cypress/pagesobject/Contract/ContractPage";
import EpochPanel from "../../../pagesobject/Epoch/EpochPanel";

const contractPage = new ContractPage();
describe('Check initialization the screen',()=>{
beforeEach(() => {
  contractPage.goToContractPage();
  })
it("Check initalizing successfully when gridview have data", () => {
  contractPage.verifyAddressIsHyperlink()
              .verifyBalanceIsDisplay()
              .verifyValueIsDisplay()
              .verifyTransactionIsDisplay()
              .verifyIconSortIsEnable()
              .clickOnPerPageDropdown()
              .changePerPageValue('10')
              .verifyPagingNavigatorDisplay(10)
              .verifyDefaultInputPage('1')
});

})