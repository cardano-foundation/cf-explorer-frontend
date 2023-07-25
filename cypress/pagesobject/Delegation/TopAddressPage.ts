import WebApi from "cypress/core/WebApi";
import {TopDelegationsConstants} from "../../fixtures/constants/TopDelegationsConstants"
//locators
const columnName = "//tr//th[contains(text(),'{0}')]";
const addressCell = "//tbody//tr//td[count(//th[contains(text(),'Addresses')]//preceding-sibling::th) + boolean(//th[contains(text(),'Addresses')])]//a";
const stakeCell = "//tbody//tr//td[count(//th[contains(text(),'Stake Address')]//preceding-sibling::th) + boolean(//th[contains(text(),'Stake Address')])]//a";
const cell = "//tbody//tr//td[count(//th[contains(text(),'{0}')]//preceding-sibling::th) + boolean(//th[contains(text(),'{0}')])]";
const txHashDetailTxt = "//div[contains(@class,'MuiTooltip-tooltip')]";
const AddressDetailTitle = "//div[contains(text(),'Address Details')]";
const stakeAddressDetailTitle = "//div[contains(text(),'Stake Address Details')]";
const numberBlockPerPage = "//div[contains(text(),'Addresses')]//preceding-sibling::div/div";
const numberStakePerPage = "//div[contains(text(),'Delegators')]//preceding-sibling::div/div";
const numberPerPageList = "//ul[@role='listbox']//li";
const AmountStakedTabBtn = "//button[contains(@id,'amount-staked')]";
export default class TopAddressPage extends WebApi {
  goToHomePage() {
    this.openAnyUrl("/");
    return this;
  }
  goToTopADAHolders() {
    this.openAnyUrl("/addresses");
    return this;
  }
  clickToAddressCell() {
    cy.clickElementRandomly(addressCell);
    return this;
  }
  clickToStakeAddressCell() {
    cy.clickElementRandomly(stakeCell);
    return this;
  }
  clickToByAmountStakedTab() {
    cy.clickElementRandomly(AmountStakedTabBtn);
    return this;
  }
  clickToPerPage() {
    cy.clickElement(numberBlockPerPage);
    return this;
  }
  clickToPerPageStakedAmount() {
    cy.clickElement(numberStakePerPage);
    return this;
  }
  verifyEnoughChoiceInPerPage() {
    const expected: any[] = []
    cy.getAllTextContent(numberPerPageList, (txt: string) => {
      expected.push(parseInt(txt));

    }).then(() =>{
      expect(expected).to.deep.equal(TopDelegationsConstants.PER_PAGE);
    })

    return this;
  }
  verifyDefaultPageNumber(defaultNumber: number) {
    cy.xpath(numberBlockPerPage).getTextContent().then(text =>{
      expect(defaultNumber).to.equal(parseInt(text));
    })
    return this;
  }
  verifyDefaultPageNumberStakedAmount(defaultNumber: number) {
    cy.xpath(numberStakePerPage).getTextContent().then(text =>{
      expect(defaultNumber).to.equal(parseInt(text));
    })
    return this;
  }
  veriryAddressDetailDisplay() {
    cy.verifyElementDisplay(AddressDetailTitle);
    return this;
  }
  veriryStakeAddressDetailDisplay() {
    cy.verifyElementDisplay(stakeAddressDetailTitle);
    return this;
  }
  verifyAllColumnNameDisplayed() {
    cy.verifyElementDisplay(columnName, TopDelegationsConstants.COLUMN_NAME[0]);
    cy.verifyElementDisplay(columnName, TopDelegationsConstants.COLUMN_NAME[1]);
    cy.verifyElementDisplay(columnName, TopDelegationsConstants.COLUMN_NAME[2]);
    cy.verifyElementDisplay(columnName, TopDelegationsConstants.COLUMN_NAME[3]);
    return this;
  }
  verifyAllColumnNameDisplayedByAmountStaked() {
    cy.verifyElementDisplay(columnName, TopDelegationsConstants.COLUMN_NAME[0]);
    cy.verifyElementDisplay(columnName, TopDelegationsConstants.COLUMN_NAME[4]);
    cy.verifyElementDisplay(columnName, TopDelegationsConstants.COLUMN_NAME[5]);
    cy.verifyElementDisplay(columnName, TopDelegationsConstants.COLUMN_NAME[5]);
    return this;
  }
  hoverToAddressCell() {
    cy.hoverToElementRandomly(addressCell);
    return this;
  }
  hoverToStakeAddressCell() {
    cy.hoverToElementRandomly(stakeCell);
    return this;
  }
  verifyAddressShowFull(){
    cy.verifyElementDisplay(txHashDetailTxt);
    return this;
  }
  verifyStkeAddressShowFull(){
    cy.verifyElementDisplay(txHashDetailTxt);
    return this;
  }
  verifyTransactionDisplay(){
    cy.verifyAllElementDisplay(cell, TopDelegationsConstants.COLUMN_NAME[3]);
    return this;
  }
  verifyFieldIsConsecutive(){
    cy.verifyFieldIsConsecutive(cell,TopDelegationsConstants.COLUMN_NAME[0]);
    return this;
  }
  verifyFormatAddress(){
    cy.getAllTextContent(addressCell,(txt: string) =>{
      expect(this.isFormatStringRight(txt, 5, 5, 3)).be.true;
    })
    return this;
  }
  verifyFormatStakeAddress(){
    cy.getAllTextContent(stakeCell,(txt: string) =>{
      expect(this.isFormatStringRight(txt, 5, 5, 3)).be.true;
    })
    return this;
  }
  verifyFormatStakeAmount(){
    cy.getAllTextContent(cell,(txt: string) =>{
      expect(this.hasMaxCharactersAfterDot(txt.replace(" ₳",""))).be.true;
    },TopDelegationsConstants.COLUMN_NAME[6])
    return this;
  }
  isFormatStringRight(text: string, firstPart: number, lastPart: number, dots: number) {
    let totalLength = firstPart + lastPart + dots;
    if (text.length !== totalLength) {
      return false;
    }
  
    let parts = text.split('.');
    
    if (parts.length - 1 !== dots) {
      return false;
    }
  
    if (parts[0].length != firstPart || parts[parts.length - 1].length != lastPart) {
      return false;
    }
    return true;
  }
  hasMaxCharactersAfterDot(number: string) {
    // Convert the number to a string
    const numString = number.toString();
    
    // Find the index of the decimal point
    const dotIndex = numString.indexOf('.');
    
    // If there is no decimal point, return false
    if (dotIndex === -1) {
      return true;
    }
    
    // Count the number of characters after the decimal point
    const charactersAfterDot = numString.length - dotIndex - 1;
    
    // Return true if there are 6 or fewer characters after the decimal point, false otherwise
    return charactersAfterDot <= 6;
  }
  
}