import { ContractConstants } from "cypress/fixtures/constants/ContractConstants";
import WebApi from "../../core/WebApi";
import * as util from 'util';
import exp from "constants";

//locators
//contract list
const listItemHyperLink ="//table//tbody//tr//td[count(//th[contains(text(),'{0}')]//preceding-sibling::th) + boolean(//th[contains(text(),'{0}')])]//a"
const listItemHyperLink1 ="//table//tbody//tr//td[count(//th[contains(text(),'%s')]//preceding-sibling::th) + boolean(//th[contains(text(),'%s')])]//a"
const listItemBalance ="//table//tbody//tr//td[count(//th[contains(text(),'{0}')]//preceding-sibling::th) + boolean(//th[contains(text(),'{0}')])]/div/div"
const listItemWithText ="//table//tbody//tr//td[count(//th[contains(text(),'{0}')]//preceding-sibling::th) + boolean(//th[contains(text(),'{0}')])]/div"
const listItemNo ="//table//tbody//tr//td[count(//th[contains(text(),'#')]//preceding-sibling::th) + boolean(//th[contains(text(),'#')])]"
const balanceSortButton ="//th[text()='Balance']/button";
const transactionSortButton ="//th[text()='Transaction Count']/button";
const pagingNavigator ="//nav[@aria-label='pagination navigation']";
const totalRecord = "//div[text()='Results']/span";
const perPage = "//span[text()='Per page']/preceding-sibling::div/div";
const perPageSelect = "//div[@id='menu-']/div[@class]/ul/li";
const textboxInputPage = "//nav[@aria-label='pagination navigation']//input";
const waitingIcon = "//span[contains(@class,'MuiCircularProgress-root')]";
const popupAddress ="//div[@role='tooltip']/div";
const displayRowSelect = "ul[role='listbox'] li";

//contract Detail
const contractDetailPageTitle ="//div[@id='main']//div[text()='Contract Details']";

export default class ContractPage extends WebApi {
  goToContractPage() {
    this.openAnyUrl("/contracts");
    return this;
  }

  verifyAddressIsHyperlink(){
    const address = util.format(listItemHyperLink1,ContractConstants.COLUMN_NAME[1],ContractConstants.COLUMN_NAME[1])
    this.verifyListElementAttribute(address,'href');
    return this;
  }

  verifyBalanceIsDisplay(){
    cy.verifyAllElementDisplay(listItemBalance,ContractConstants.COLUMN_NAME[2]);
    return this;
  }

  verifyValueIsDisplay(){
    cy.verifyAllElementDisplay(listItemWithText,ContractConstants.COLUMN_NAME[3]);
    return this;
  }
  verifyTransactionIsDisplay(){
    cy.verifyAllElementDisplay(listItemWithText,ContractConstants.COLUMN_NAME[4]);
    return this;
  }

  verifyIconSortIsEnable(){
    cy.xpath(balanceSortButton).verifyElementEnabled();
    cy.xpath(transactionSortButton).verifyElementEnabled();
    return this;
  }

  clickOnPerPageDropdown() {
    cy.xpath(perPage).scrollIntoView().click();
    return this;
  }

  changePerPageValue(value:string) {
    switch (value){
      case '10':
        cy.xpath(perPageSelect).eq(0).click();
        break;
      case '20':
        cy.xpath(perPageSelect).eq(1).click();
        break;
      case '50':
        cy.xpath(perPageSelect).eq(2).click();
        break;
      case '100':
        cy.xpath(perPageSelect).eq(3).click();
        break;
    }
    return this;
  }

  verifyDefaultInputPage(defaultPage:string){
    cy.xpath(textboxInputPage).invoke('attr','value').then((value)=>{
      expect(value).to.equal(defaultPage)
    })
    return this;
  }

  verifyPagingNavigatorDisplay(caseOfTotalRecord:number){
    let totalRecords :number;
    cy.xpath(totalRecord)
      .invoke('text')
      .then((text) => {
        totalRecords = parseInt(text.replace(/,/g, '-')); 
        if(totalRecords>=caseOfTotalRecord){
          cy.verifyElementDisplay(pagingNavigator);
        }else{
          cy.verifyElementNotVisible(pagingNavigator);
        }
       });
    return this;
  }

  verifyNoIsInConsecutive(){
    cy.verifyFieldIsConsecutive(listItemNo)
    return this;
  }

  verifyAddressDisplayShorted(){
    cy.getAllTextContent(listItemHyperLink,(text:string)=>{
      expect(text).to.contains('...')},ContractConstants.COLUMN_NAME[1])
    return this;
  }

  verifyAddressDisplayShortedFormat(){
    cy.getAllTextContent(listItemHyperLink,(text:string)=>{
      expect((text.substring(5, text.length - 5))).to.equal('...')},ContractConstants.COLUMN_NAME[1])
    return this;
  }

  verifyBalanceDataDisplay(){
    cy.getAllTextContent(listItemBalance,(text:string)=>{
      expect(text).to.contains(',')},ContractConstants.COLUMN_NAME[2])
    return this;
  }

  verifyValueDataDisplay(){
    cy.getAllTextContent(listItemWithText,(text:string)=>{
      expect(text).to.contains(',')},ContractConstants.COLUMN_NAME[3])
    return this;
  }

  verifyBalanceFormat(){
    cy.getAllTextContent(listItemBalance,(text:string)=>{
      if(text.includes('.')){
      const regex = /^\d+(?:\.\d{0,6})?$/;
      expect(regex.test(text.replace(/,/g, ''))).to.be.true;
      }
    },ContractConstants.COLUMN_NAME[2])
    return this;
  }

  verifyValueFormat(){
    cy.getAllTextContent(listItemWithText,(text:string)=>{
      if(text.includes('.')){
      const regex = /^\d+(?:\.\d{0,6})?$/;
      expect(regex.test(text.replace(/,/g, ''))).to.be.true;
      }
    },ContractConstants.COLUMN_NAME[3])
    return this;
  }

  verifyTransactionDisplay(){
    cy.verifyAllElementDisplay(listItemWithText,ContractConstants.COLUMN_NAME[4])
    return this;
  }

  clickOnContractRecordRandomly(){
    cy.verifyElementInvisible(waitingIcon);
    cy.clickElementRandomly(listItemHyperLink,ContractConstants.COLUMN_NAME[1])
    return this;
  }

  verifyNavigatedToContractDetailPage(){
    cy.verifyElementDisplay(contractDetailPageTitle)
    return this;
  }

  hoverOnContractRecordRandomly(){
    cy.hoverToElementRandomly(listItemHyperLink,ContractConstants.COLUMN_NAME[1])
    return this;
  }

  verifyAddressPopup(){
    cy.xpath(popupAddress).getTextContent().then((text)=>{
      expect(text.startsWith('addr')).to.be.true
    })
    return this;
  }

  clickOnBalanceRandomly(){
    cy.verifyElementInvisible(waitingIcon);
    cy.clickElementRandomly(listItemBalance,ContractConstants.COLUMN_NAME[2]);
    return this;
  }

  clickOnValueRandomly(){
    cy.verifyElementInvisible(waitingIcon);
    cy.clickElementRandomly(listItemWithText,ContractConstants.COLUMN_NAME[3]);
    return this;
  }

  verifyFieldNotClickable(){
    cy.verifyAllElementDisplay(listItemHyperLink,ContractConstants.COLUMN_NAME[1])
    return this;
  }

  clickOnSortBalance(){
    cy.verifyElementInvisible(waitingIcon);
    cy.clickElement(balanceSortButton);
    return this;
  }

  clickOnSortTransaction(){
    cy.verifyElementInvisible(waitingIcon);
    cy.clickElement(transactionSortButton);
    return this;
  }

  verifyBalanceIsSorted(sortOrder:string){
    cy.verifyFieldSorted(listItemBalance,sortOrder,ContractConstants.COLUMN_NAME[2])
    return this;
  }

  verifyTransactionIsSorted(sortOrder:string){
    cy.verifyFieldSorted(listItemWithText,sortOrder,ContractConstants.COLUMN_NAME[4])
    return this;
  }

  verifyDefaulDisplayRow(defaultValue:string){
    cy.verifyText(perPage,defaultValue).scrollIntoView()
    return this;
  }

  verifyNumberOfDisplayRow(expectedCount:string){
    cy.xpath(util.format(listItemHyperLink1,ContractConstants.COLUMN_NAME[1],ContractConstants.COLUMN_NAME[1])).should('have.length', parseInt(expectedCount));
    return this;
  }

  verifyDisplayRowSelection(displayRowSelection:string[]){
    cy.compareArrayText(displayRowSelect,displayRowSelection)
    return this;
  }

}