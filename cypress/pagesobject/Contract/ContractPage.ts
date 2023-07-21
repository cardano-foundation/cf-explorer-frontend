import { ContractConstants } from "cypress/fixtures/constants/ContractConstants";
import WebApi from "../../core/WebApi";
import * as util from 'util';

//locators
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
    cy.xpath(listItemNo).invoke('text').then((list)=>{
      const numbers = list.split('\n').map((itemText) => parseInt(itemText.trim()));

      // Check if the numbers are consecutive.
      const areConsecutive = numbers.every((number, index) => {
        if (index === 0) {
          return true; // The first number is always considered consecutive.
        }
        return number === numbers[index - 1] + 1;
      });

      expect(areConsecutive).to.be.true;
    });
    return this;
  }

}