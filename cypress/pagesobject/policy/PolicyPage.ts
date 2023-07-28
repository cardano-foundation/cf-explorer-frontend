
import { PolicyConstants } from "cypress/fixtures/constants/PolicyConstants";
import WebApi from "../../core/WebApi"
import * as util from 'util';

//selector
const listPolicy ="//table//tbody//tr//td[count(//th[contains(text(),'Policy ID')]//preceding-sibling::th) + boolean(//th[contains(text(),'Policy ID')])]//a";
const policyDetailPageTitle ="//*[text()='Policy Details']";
const addressDetailPageTitle ="//*[text()='Address Details']";
const policyId ="//div[text()='Policy ID:']/following-sibling::div";
const tokenTab ="//div[@data-testid='tab-testid']//div[text()='Token']";
const policyAssetHolderTab ="//div[@data-testid='tab-testid']//div[text()='Policy Asset Holders']";
const itemListsWithLink ="//table//tbody//tr//td[count(//th[contains(text(),'{0}')]//preceding-sibling::th) + boolean(//th[contains(text(),'{0}')])]//a";
const itemListsWithText ="//table//tbody//tr//td[count(//th[contains(text(),'{0}')]//preceding-sibling::th) + boolean(//th[contains(text(),'{0}')])]";
const itemListsWithLink1 ="//table//tbody//tr//td[count(//th[contains(text(),'%s')]//preceding-sibling::th) + boolean(//th[contains(text(),'%s')])]//a";
const totalRecord = "//div[text()='Results']/span";
const totalRecord1 = "//div[text()='Result']/span";
const pagingNavigator = "//nav[@aria-label='pagination navigation']";
const waitingIcon = "//span[contains(@class,'MuiCircularProgress-root')]";
const policyScript ="//button[@data-testid='open-modal-button']";
const closePolicyScript ="//button[@data-testid='close-modal-button']";
const tokenDetailPage ="//div[@data-testid='all-filters-dropdown']/div";
const perPage = "//span[text()='Per page']/preceding-sibling::div/div";
const perPageSelect = "//div[@id='menu-']/div[@class]/ul/li";
const tokenListRecord ="//tbody//tr";
const textboxInputPage = "//nav[@aria-label='pagination navigation']//input";

export default class PolicyPage extends WebApi{
  
  constructor(){
    super();
  }
  
  goToTokenPage() {  
    this.openAnyUrl("/tokens")
    return this;
  }

  clickPolicyIdRandomly(){
    cy.verifyElementInvisible(waitingIcon);
    cy.clickElementRandomly(listPolicy,'')
    return this;
  }

  verifyPolicyDetailsPageDisplay(){
    cy.verifyAllElementDisplay(policyDetailPageTitle,'')
    return this;
  }

  verifyPolicyIdDisplay(){
    cy.verifyElementDisplay(policyId)
    return this;
  }

  verifyTabTokenDIsplay(){
    cy.verifyElementDisplay(tokenTab)
    return this;
  }

  verifyTabPolicyAssetHolderDisplay(){
    cy.verifyElementDisplay(policyAssetHolderTab)
    return this;
  }
  
  clickTabPolicyAssetHolder(){
    cy.clickElement(policyAssetHolderTab)
    cy.verifyElementInvisible(waitingIcon);
    return this;
  }

  verifyTokenNameColumnIsHyperLink(){
    this.verifyListElementAttribute(util.format(itemListsWithLink1,PolicyConstants.COLUMN_NAME[0],PolicyConstants.COLUMN_NAME[0]),'href');
    return this;
  }

  verifyTokenNameColumnIsDisplayed(){
    cy.verifyAllElementDisplay(itemListsWithLink,PolicyConstants.COLUMN_NAME[0])
    return this;
  }

  verifyBalanceColumnIsDisplayed(){
    cy.verifyAllElementDisplay(itemListsWithText,PolicyConstants.COLUMN_NAME_POLICY_ASSET[3])
    return this;
  }

  verifyTokenNamePolicyAssetColumnIsDisplayed(){
    cy.verifyAllElementDisplay(itemListsWithLink,PolicyConstants.COLUMN_NAME_POLICY_ASSET[1])
    return this;
  }

  verifyTokenIDColumnIsHyperLink(){
    this.verifyListElementAttribute(util.format(itemListsWithLink1,PolicyConstants.COLUMN_NAME[1],PolicyConstants.COLUMN_NAME[1]),'href');
    return this;
  }

  verifyTokenIDColumnIsDisplayed(){
    cy.verifyAllElementDisplay(itemListsWithLink,PolicyConstants.COLUMN_NAME[1])
    return this;
  }

  verifyTokenIDColumnFormat(){
    cy.getAllTextContent(itemListsWithLink,(text:string)=>{
      expect((text.substring(5, text.length - 5))).to.equal('...')},PolicyConstants.COLUMN_NAME[1])
    return this;
  }

  verifyAddressColumnFormat(){
    cy.verifyElementInvisible(waitingIcon);
    cy.wait(2000)
    cy.getAllTextContent(itemListsWithLink,(text:string)=>{
      expect((text.substring(5, text.length - 5))).to.equal('...')},PolicyConstants.COLUMN_NAME_POLICY_ASSET[0])
    return this;
  }

  verifyTokenIdColumnFormat(){
    cy.verifyElementInvisible(waitingIcon);
    cy.wait(2000)
    cy.getAllTextContent(itemListsWithLink,(text:string)=>{
      expect((text.substring(5, text.length - 5))).to.equal('...')},PolicyConstants.COLUMN_NAME_POLICY_ASSET[2])
    return this;
  }

  verifyPagingNavigatorPolicyAssetHolderDisplay(caseOfTotalRecord:number){
    cy.verifyElementInvisible(waitingIcon);
    let totalRecords :number;
    cy.xpath(totalRecord)
      .invoke('text')
      .then((text) => {
        totalRecords = parseInt(text); 
        if(totalRecords>=caseOfTotalRecord){
          cy.verifyElementDisplay(pagingNavigator);
        }else{
          cy.verifyElementNotExist(pagingNavigator);
        }
       });

  return this;
  }

  verifyPagingNavigatorTokenTabDisplay(caseOfTotalRecord:number){
    let totalRecords :number;
    cy.xpath(totalRecord1)
      .invoke('text')
      .then((text) => {
        totalRecords = parseInt(text); 
        if(totalRecords>=caseOfTotalRecord){
          cy.verifyElementDisplay(pagingNavigator);
        }else{
          cy.verifyElementNotExist(pagingNavigator);
        }
       });

  return this;
  }

  verifyPolicyIdIsNotHyperLink(){
    cy.xpath(policyId).should('not.have.attr', 'href');
    return this;
  }

  clickOnPolicyScript(){
    cy.clickElement(policyScript)
    return this;
  }

  clickOnClosePolicyScript(){
    cy.clickElement(closePolicyScript)
    return this;
  }

  verifyPolicyScriptPopup(){
    cy.verifyElementDisplay(closePolicyScript)
    return this;
  }

  verifyPolicyScriptPopupClosed(){
    cy.verifyElementNotExist(closePolicyScript)
    return this;
  }

  verifyCreateAtColumnDisplay(){
    cy.verifyAllElementDisplay(itemListsWithText,PolicyConstants.COLUMN_NAME[2])
    return this;
  }

  verifyTotalSupplyColumnDisplay(){
    cy.verifyAllElementDisplay(itemListsWithText,PolicyConstants.COLUMN_NAME[3])
    return this;
  }

  verifyTotalTransactionColumnDisplay(){
    cy.verifyAllElementDisplay(itemListsWithText,PolicyConstants.COLUMN_NAME[4])
    return this;
  }

  verifyCreateAtFormat(){
    cy.checkDateTimeFormat(itemListsWithText,PolicyConstants.DATE_TIME[0],PolicyConstants.COLUMN_NAME[2])
    return this;
  }

  clickTokenNameRandomly(){
    cy.clickElementRandomly(itemListsWithLink,PolicyConstants.COLUMN_NAME[0])
    return this;
  }

  clickTokenNamePolicyAssetRandomly(){
    cy.clickElementRandomly(itemListsWithLink,PolicyConstants.COLUMN_NAME_POLICY_ASSET[1])
    return this;
  }

  clickTokenIDRandomly(){
    cy.clickElementRandomly(itemListsWithLink,PolicyConstants.COLUMN_NAME[1])
    return this;
  }

  clickAddressRandomly(){
    cy.wait(4000)
    cy.clickElementRandomly(itemListsWithLink,PolicyConstants.COLUMN_NAME_POLICY_ASSET[0])
    return this;
  }

  verifyNavigatedToTokenDetailPage(){
    cy.xpath(tokenDetailPage).getTextContent().then((text) =>{
      expect(text).to.equal('Tokens')
    })
    return this;
  }

  verifyNavigatedToAddressDetailPage(){
    cy.verifyElementDisplay(addressDetailPageTitle);
    return this;
  }

  clickOnPerPageDropdown(){
    cy.clickElement(perPage);
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

  verifyPagingNavigatorDisplay(caseOfTotalRecord:number){
    let totalRecords :number;
    cy.xpath(totalRecord)
      .invoke('text')
      .then((text) => {
        totalRecords = parseInt(text); 
        if(totalRecords>=caseOfTotalRecord){
          cy.verifyElementDisplay(pagingNavigator);
        }else{
          cy.verifyElementNotVisible(pagingNavigator);
        }
       });

  return this;
  }

  verifyNumberOfBlockDisplayRow(expectedCount:string){
    cy.xpath(tokenListRecord).should('have.length.lte', parseInt(expectedCount));
    return this;
  }

  inputRandomPage(perpage1:string){
    cy.xpath(totalRecord).getTextContent().then((text)=>{
      const number :number= parseInt(text.replace(/,/g, ""));
      const integerPart :number= Math.floor(number / parseInt(perpage1));
      const randomPage = Math.floor(Math.random() * (integerPart - 2)) +2;
      cy.xpath(textboxInputPage).setInputValue((randomPage).toString());
      cy.xpath(textboxInputPage).type('{enter}');

    })
    return this;
  }

  clickToTheEndPage(){
    cy.xpath(pagingNavigator).find('ul>li').eq(10).click()
    return this;
  }

  verifyTotalPage(perPage:string){
    cy.xpath(totalRecord).getTextContent().then((text)=>{
      const number = parseInt(text.replace(/,/g, ""));
      const integerPart = Math.floor(number / parseInt(perPage));

      cy.xpath(textboxInputPage).getAttributeValue('value').then((value)=>{
        expect(value).to.equal(String(integerPart+1));
      })
    })
    return this;
  }

  verifyNextButtonIsEnable(){
    cy.xpath(pagingNavigator).find('ul>li').eq(9).should('not.be', 'disabled');
    return this; 
  }

  verifyNextButtonIsDisable(){
    cy.xpath(pagingNavigator).find('ul>li').eq(9).find('button').should('have.attr', 'disabled');
    return this; 
  }

  verifyPrevButtonIsEnable(){
    cy.xpath(pagingNavigator).find('ul>li').eq(1).should('not.be', 'disabled');
    return this; 
  }

  verifyDefaultInputPage(defaultPage:string){
    cy.xpath(textboxInputPage).invoke('attr','value').then((value)=>{
      expect(value).to.equal(defaultPage)
    })
    return this;
  }

  verifyPrevButtonIsDisable(){
    cy.xpath(pagingNavigator).find('ul>li').eq(1).find('button').should('have.attr', 'disabled');
    return this; 
  }

  inputPage(pageNumber:string){
    cy.xpath(textboxInputPage).setInputValue(pageNumber);
    cy.xpath(textboxInputPage).type('{enter}');
    return this;
  }

  verifyInputPage(){
    cy.xpath(perPage).getTextContent().then((numberOfPerPage)=>{

      cy.xpath(totalRecord).getTextContent().then((text)=>{
        const number1 = parseInt(text);
        const integerPart = Math.floor(number1 / parseInt(numberOfPerPage));
        for(let i=1;i<=integerPart+1;i++){
          this.inputPage(String(i));
          cy.xpath(pagingNavigator).find('ul>li').eq(2).find('div>span')
            .getTextContent()
            .then((text)=>{
              if(i==1){
                expect(text).contain('1');
                expect(text).contain(numberOfPerPage);
              }else{
                expect(text).contain(String(parseInt(numberOfPerPage)*(i-1)+1));
              }
            })
        }
        });
    })
  }

  verifyFirstPageButtonIsDisable(){
    cy.xpath(pagingNavigator).find('ul>li').eq(0).find('button').should('have.attr', 'disabled');
   return this; 
  }

  verifyFirstPageButtonIsEnable(){
    cy.xpath(pagingNavigator).find('ul>li').eq(0).find('button').should('not.be', 'disabled');
   return this; 
  }

  clickToTheFirstPage(){
    cy.xpath(pagingNavigator).find('ul>li').eq(0).click()
    return this;
  }

  verifyLastPageButtonIsEnable(){
    cy.xpath(pagingNavigator).find('ul>li').eq(10).find('button').should('not.be', 'disabled');
   return this; 
  }

  verifyLastPageButtonIsDisable(){
    cy.xpath(pagingNavigator).find('ul>li').eq(10).find('button').should('have.attr', 'disabled');
   return this; 
  }
}
