import { ContractConstants } from "cypress/fixtures/constants/ContractConstants";
import WebApi from "../../core/WebApi";
import * as util from 'util';

//locators
//contract list
const listItemHyperLink ="//table//tbody//tr//td[count(//th[contains(text(),'{0}')]//preceding-sibling::th) + boolean(//th[contains(text(),'{0}')])]//a"
const listItemHyperLink1 ="//table//tbody//tr//td[count(//th[contains(text(),'%s')]//preceding-sibling::th) + boolean(//th[contains(text(),'%s')])]//a"
const listItemBalance ="//table//tbody//tr//td[count(//th[contains(text(),'{0}')]//preceding-sibling::th) + boolean(//th[contains(text(),'{0}')])]/div/div"
const listItemWithText ="//table//tbody//tr//td[count(//th[contains(text(),'{0}')]//preceding-sibling::th) + boolean(//th[contains(text(),'{0}')])]/div"
const listItemTransaction ="//table//tbody//tr//td[count(//th[contains(text(),'{0}')]//preceding-sibling::th) + boolean(//th[contains(text(),'{0}')])]//small"
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
const contractListRecord ="//tbody//tr";

//contract Detail
const contractDetailPageTitle ="//div[@id='main']//div[text()='Contract Details']";
const contractDetailLabel = "//div[contains(@class,'MuiContainer')]//div[contains(@class,'MuiGrid')]//div[text()='%s']/../following-sibling::div";
const transactionTab ="//div[contains(@class,'MuiContainer')]//div[contains(@class,'MuiTabs')]//div[text()='Transactions']";
const scriptTab ="//div[contains(@class,'MuiContainer')]//div[contains(@class,'MuiTabs')]//div[text()='Script']";
const detailAddress ="//div[contains(@class,'MuiBox-root')]//div[text()='Address']/following-sibling::div//small";
const detailStakeAddress ="//div[contains(@class,'MuiBox-root')]//div[text()='Stake Address']/following-sibling::div/a";
const verifyScriptButton ="//div[text()='VERIFY SCRIPT']";
const inputNativeScript ="//textarea[@placeholder='Input Native script']";
const verifyScriptPopupCloseButton ="//button[@data-testid='close-modal-button']";
const stakeAddrDetailPage ="//div[@id='main']//div[text()='Stake Address Details']";
const poolDetailPage = "//small[contains(text(),'Pool Id')]";
const copyIcon ="//div[text()='Stake Address']/following-sibling::div//button[@aria-label='Copy']";
const toolTipCopy ="//div[@role='tooltip']/div[text()='Copy']";


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
    cy.verifyElementInvisible(waitingIcon);
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
    cy.verifyElementInvisible(waitingIcon);
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

  verifyNumberOfBlockDisplayRow(expectedCount:string){
    cy.xpath(contractListRecord).should('have.length.lte', parseInt(expectedCount));
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

  verifyPrevButtonIsDisable(){
    cy.xpath(pagingNavigator).find('ul>li').eq(1).find('button').should('have.attr', 'disabled');
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

  inputPage(pageNumber:string){
    cy.xpath(textboxInputPage).setInputValue(pageNumber);
    cy.xpath(textboxInputPage).type('{enter}');
    return this;
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

  verifyAllLabelInContractDetailDisplayed(){
    for(let i =0;i<ContractConstants.CONTRACT_DETAIL_LABEL.length;i++){
      cy.verifyElementDisplay(util.format(contractDetailLabel,ContractConstants.CONTRACT_DETAIL_LABEL[i]))
    }
    return this;
  }

  verifyTabTransactionButtonEnable(){
    cy.xpath(transactionTab).verifyElementEnabled()
    return this;
  }

  verifyTabScriptButtonEnable(){
    cy.xpath(scriptTab).verifyElementEnabled()
    return this;
  }

  verifyAddressDetailDisplayed(){
    cy.verifyElementDisplay(detailAddress)
    return this;
  }

  verifyStakeAddressDetailDisplayed(){
    cy.verifyElementDisplay(detailStakeAddress)
    return this;
  }

  verifyPulldownNumberItemDisplayed(){
    cy.xpath(totalRecord).getTextContent().then((text)=>{
      const result = parseInt(text.replace(/,/g, ""));
      if(result>10){
        cy.verifyElementDisplay(perPage)
      }
    })
    return this;
  }

  verifyTransactionListRecordDisplayed(){
    cy.verifyAllElementDisplay(listItemHyperLink,ContractConstants.TRANSACTION_TABLE[0])
    cy.verifyAllElementDisplay(listItemTransaction,ContractConstants.TRANSACTION_TABLE[1])
    cy.verifyAllElementDisplay(listItemHyperLink,ContractConstants.TRANSACTION_TABLE[2])
    cy.verifyAllElementDisplay(listItemTransaction,ContractConstants.TRANSACTION_TABLE[3])
    cy.verifyAllElementDisplay(listItemTransaction,ContractConstants.TRANSACTION_TABLE[4])
    cy.verifyAllElementDisplay(listItemTransaction,ContractConstants.TRANSACTION_TABLE[5])
    return this;
  }

  verifyTransactionDetail(){
    cy.verifyElementDisplay(util.format(contractDetailLabel,ContractConstants.CONTRACT_DETAIL_LABEL[0]))
    return this;
  }

  verifyADABalanceDetail(){
    cy.verifyElementDisplay(util.format(contractDetailLabel,ContractConstants.CONTRACT_DETAIL_LABEL[1]))
    return this;
  }

  verifyADAValueDetail(){
    cy.verifyElementDisplay(util.format(contractDetailLabel,ContractConstants.CONTRACT_DETAIL_LABEL[2]))
    return this;
  }

  verifyControlledStakeDetail(){
    cy.verifyElementDisplay(util.format(contractDetailLabel,ContractConstants.CONTRACT_DETAIL_LABEL[3]))
    return this;
  }

  verifyRewardAvailableDetail(){
    cy.verifyElementDisplay(util.format(contractDetailLabel,ContractConstants.CONTRACT_DETAIL_LABEL[4]))
    return this;
  }

  verifyRewardWithdrawDetail(){
    cy.verifyElementDisplay(util.format(contractDetailLabel,ContractConstants.CONTRACT_DETAIL_LABEL[5]))
    return this;
  }

  verifyDelegatedToDetail(){
    cy.verifyElementDisplay(util.format(contractDetailLabel,ContractConstants.CONTRACT_DETAIL_LABEL[6]))
    return this;
  }

  verifyContractDetailFormat(label:string){
    const i = ContractConstants.CONTRACT_DETAIL_LABEL.findIndex(item => item === label);
    cy.xpath(util.format(contractDetailLabel,ContractConstants.CONTRACT_DETAIL_LABEL[i])).getTextContent().then((text)=>{
      if(text.includes('.')){
        cy.log(text);
        console.log(text)
        const regex = /^\d+(?:\.\d{0,6})?$/;
        expect(regex.test(text.replace(/,/g, '').replace(/₳/g, ""))).to.be.true;
        }
    })
    return this;
  }

  clickVerifyScriptButton(){
    cy.clickElement(verifyScriptButton)
    return this;
  }

  verifyInputNativeScriptDisplay(){
    cy.verifyElementDisplay(inputNativeScript)
    return this;
  }

  verifyVerifyScriptPopupCloseButtonEnable(){
    cy.xpath(verifyScriptPopupCloseButton).verifyElementEnabled()
    return this;
  }

  clickOnVerifyScriptPopupCloseButton(){
    cy.clickElement(verifyScriptPopupCloseButton)
    return this;
  }

  verifyPopupClosed(){
    cy.verifyElementNotExist(verifyScriptPopupCloseButton)
    return this;
  }

  clickOnStakeAddress(){
    cy.clickElement(detailStakeAddress);
    return this;
  }

  verifyNavigatedToStakeDetailPage(){
    cy.verifyElementDisplay(stakeAddrDetailPage)
    return this;
  }

  clickOnDelegatedTo(){
    cy.clickElement(util.format(contractDetailLabel,ContractConstants.CONTRACT_DETAIL_LABEL[6])+'//a');
    return this;
  }

  verifyNavigatedToPoolPage(){
    cy.verifyElementDisplay(poolDetailPage)
    return this;
  }

  clickOnCopyIcon(){
    cy.clickElement(copyIcon)
    return this;
  }

  hoverOnCopyIcon(){
    cy.hoverToElement(copyIcon)
    return this;
  }

  verifyTooltipPopupDisplayed(){
    cy.verifyElementDisplay(toolTipCopy)
    return this;
  }
}