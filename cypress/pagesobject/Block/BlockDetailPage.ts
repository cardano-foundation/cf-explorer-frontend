import { BlockDetailConstants } from "cypress/fixtures/constants/BlockDetailConstants";
import WebApi from "../../core/WebApi";
import {BlockConstants} from "../../fixtures/constants/BlockConstants"
import BlockDetail from "src/pages/BlockDetail";
//locators
const viewDetailTxt = "//a[contains(text(),'View Details')]";
const closeBtn = "//button[contains(@aria-label,'Close')]";
const txtBlockDetailTitle = "//div[contains(text(),'Block details')]";
const columnNameTransaction = "//tr//th[contains(text(),'{0}')]";
const txtBlockDetailInfor = "//div[contains(@class,'MuiGrid-root')]//div[contains(text(),'Block')]";
const blockIdValue = "//small[contains(text(),'Block Id')]//following-sibling::div/span";
const createdAtValue = "//div[contains(text(),'Created At ')]//..//..//following-sibling::div";
const blockValue = "//div[text()=' Block']/../../following-sibling::div";
const cellColumn = "//tbody//tr//td[count(//th[contains(text(),'{0}')]//preceding-sibling::th) + boolean(//th[contains(text(),'{0}')])]";
const cellColumnWithLink = "//tbody//tr//td[count(//th[contains(text(),'{0}')]//preceding-sibling::th) + boolean(//th[contains(text(),'{0}')])]//a";
const cellColumnBlockAmount = "//tbody//tr//td[count(//th[contains(text(),'Block')]//preceding-sibling::th) + boolean(//th[contains(text(),'Block')])]/div/div/a[contains(@href,'block')]";
const cellColumnEpochAmount = "//tbody//tr//td[count(//th[contains(text(),'Block')]//preceding-sibling::th) + boolean(//th[contains(text(),'Block')])]/div/div/a[contains(@href,'epoch')]";
const cellColumnAddressInput = "//table//tbody//tr//td[count(//th[contains(text(),'Addresses')]//preceding-sibling::th) + boolean(//th[contains(text(),'Addresses')])]//div[contains(text(),'Input:')]//following-sibling::div/a[contains(@href,'address')]";
const transactionDetailTitlePage = "//div[contains(text(),'Transaction details')]";
const txHashDetailTxt = "//div[contains(@class,'MuiTooltip-tooltip')]";
const addressDetailTxt = "//div[contains(@class,'MuiTooltip-tooltip')]";
const addressDetailTitle = "//div[contains(text(),'Address Details')]";
const numberBlockPerPage = '//span[contains(text(),"Per page")]//preceding-sibling::div/div';
const numberPerPageList = "//ul[@role='listbox']//li";
const bookMarkDetailBtn = "//div[contains(text(),'Block details')]//parent::div//button";
const bookMarkDetailColor = "//div[contains(text(),'Block details')]//parent::div//button//*[local-name()='svg' ]";
export default class BlockDetailPage extends WebApi {
  goToHomePage() {
    this.openAnyUrl("/");
    return this;
  }
  clickToBookMarkBtn(){
    cy.xpath(bookMarkDetailColor).getAttributeValue("fill").then(value =>{
      cy.log(value);
      if(value == "none"){
        cy.clickElement(bookMarkDetailBtn);
      }else{
      cy.clickElement(bookMarkDetailBtn);
      cy.clickElement(bookMarkDetailBtn);
      }
    })

    return this;
  }
  goToBlockPage() {
    this.openAnyUrl("/blocks");
    return this;
  }
  verifyBlockdetailScreenDisplay() {
    cy.verifyElementDisplay(viewDetailTxt);
    return this;
  }
  verifyAddressDetailPageDisplay() {
    this.isElementVisibleByXpath(addressDetailTitle);
    return this;
  }

  clickToCloseBtn() {
    cy.clickElement(closeBtn);
    return this;
  }
  clickRamdomlyToEpoch() {
    cy.clickElementRandomly(cellColumnEpochAmount);
    return this;
  }
  clickRamdomlyToTxHash() {
    cy.clickElementRandomly(cellColumn, BlockDetailConstants.COLUMN_NAME[0]);
    return this;
  }
  clickRandomlyToTransaction() {
    cy.clickElementRandomly(cellColumnAddressInput);
    return this;
  }
  clickToPerPage() {
    cy.clickElement(numberBlockPerPage);
    return this;
  }
  goBackToPreviousPage() {
    cy.go('back');
    return this;
  }
  async getTextElementBlockValue(){
    return await this.getTextElement(blockValue);
  }
  hoverToTxHash() {
    cy.hoverToElementRandomly(cellColumnWithLink, BlockDetailConstants.COLUMN_NAME[0]);
    return this;
  }
  hoverToAddress() {
    cy.hoverToElementRandomly(cellColumnAddressInput);
    return this;
  }
  verifytxHashShowFull(){
    cy.verifyElementDisplay(txHashDetailTxt);
    return this;
  }
  verifyTransactionShowFull(){
    cy.verifyElementDisplay(addressDetailTxt);
    return this;
  }
  verifyBlockintilizingScreen() {
    cy.verifyElementDisplay(txtBlockDetailTitle);
    cy.verifyElementDisplay(columnNameTransaction, BlockDetailConstants.COLUMN_NAME[0]);
    cy.verifyElementDisplay(columnNameTransaction, BlockDetailConstants.COLUMN_NAME[1]);
    cy.verifyElementDisplay(columnNameTransaction, BlockDetailConstants.COLUMN_NAME[2]);
    cy.verifyElementDisplay(columnNameTransaction, BlockDetailConstants.COLUMN_NAME[3]);
    cy.verifyElementDisplay(columnNameTransaction, BlockDetailConstants.COLUMN_NAME[4]);
    cy.verifyElementDisplay(columnNameTransaction, BlockDetailConstants.COLUMN_NAME[5]);

    cy.verifyElementDisplay(txtBlockDetailInfor, BlockDetailConstants.BLOCK_INFORMATION_LABEL[0]);
    cy.verifyElementDisplay(txtBlockDetailInfor, BlockDetailConstants.BLOCK_INFORMATION_LABEL[1]);
    cy.verifyElementDisplay(txtBlockDetailInfor, BlockDetailConstants.BLOCK_INFORMATION_LABEL[2]);
    cy.verifyElementDisplay(txtBlockDetailInfor, BlockDetailConstants.BLOCK_INFORMATION_LABEL[3]);
    cy.verifyElementDisplay(txtBlockDetailInfor, BlockDetailConstants.BLOCK_INFORMATION_LABEL[4]);
    cy.verifyElementDisplay(txtBlockDetailInfor, BlockDetailConstants.BLOCK_INFORMATION_LABEL[5]);
    return this;
  }
  verifyBlockIdDisplayFull() {
    cy.xpath(blockIdValue).getTextContent().then(text =>{
      expect(text.length).equal(64);
    });
    return this;
  }
  verifyFormatTimeCreatedAt() {
    cy.checkDateTimeFormat(createdAtValue,BlockDetailConstants.DATE_TIME[0]);
    return this;
  }
  verifyBlockValueDisplay() {
    cy.verifyElementDisplay(blockValue);
    return this;
  }
  veriyTransactionFeesColumn() {
    cy.verifyAllElementDisplay(cellColumn,BlockDetailConstants.COLUMN_NAME[3]);
    return this;
  }
  verifyTotalOutput() {
    cy.verifyAllElementDisplay(cellColumn,BlockDetailConstants.COLUMN_NAME[4]);
    return this;
  }
  verifyTransactionDetailPageDisplay() {
    cy.verifyElementDisplay(transactionDetailTitlePage);
    return this;
  }
  async verifyBlockDisplayCorrectly() {
    const block = await this.getTextElement(blockValue);
    const expected: any[] = []
    cy.getAllTextContent(cellColumnBlockAmount, (txt: string) => {
      expected.push(parseInt(txt));

    }).then(() =>{
      expected.forEach((value) => {
        cy.wrap(block).should('eq', value.toString());
      });
    })
    
    return this;
  }
  verifyEnoughChoiceInPerPage() {
    const expected: any[] = []
    cy.getAllTextContent(numberPerPageList, (txt: string) => {
      expected.push(parseInt(txt));

    }).then(() =>{
      expect(expected).to.deep.equal(BlockConstants.PER_PAGE);
    })

    return this;
  }
}