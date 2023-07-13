import WebApi from "../../core/WebApi"
import { EpochConstants } from "../../fixtures/constants/EpochConstants";
import format from "@stdlib/string-format";

//epoch list
const blockchainDropdownList = "//span[text()='Blockchain']/..";
const epochPanel = "//span[text()='Epochs']/..";
const epochNumberHyperLink = "tr[class] > td>a";
const epochNumberList = "tr[class] > td>a>div>div";
const epochStatusList = "tr[class] > td>a>div>span";
const dataInEpochTable = "tr[class]";
const pagingNavigator = "nav[aria-label='pagination navigation']";
const textboxInputPage = "nav[aria-label='pagination navigation'] input";
const latestEpochNumber = "//div[contains(@class,'MuiGrid-container')]//span[contains(@class,'MuiBox-root')]";
const footer = "footer[data-testid]";
const perPage = "//span[text()='Per page']/preceding-sibling::div/div";
const perPageSelect = "//div[@id='menu-']/div[@class]/ul/li";
const displayRowSelect = "ul[role='listbox'] li";
const progressCircle = "div[data-test-id='CircularProgressbarWithChildren']";
const blockSortButton = "//th[text()='Blocks']/button";
const totalOutputSortButton = "//th[text()='Total Output']/button";
const epochDetailPanel ="//a[text()='View Details']/..";
const epochDetailPanelViewDetailButton ="//a[text()='View Details']";
const epochDetailPanelProgressCircle ="//a[text()='View Details']/..//div[@data-test-id='CircularProgressbarWithChildren__children']";
const epochDetailPanelBlock ="//small[text()='Block']/..";
const epochDetailPanelSlot ="//small[text()='slot']/..";
const epochDetailPanelStartTime ="//small[text()='Start Timestamp']/following-sibling::small";
const epochDetailPanelEndTime ="//small[text()='End Timestamp']/following-sibling::small";
const epochDetailPanelTxCount ="//small[text()='Tx Count']/..";
const epochDetailPanelTotalOutput ="//small[text()='Total Output']/following-sibling::small";
const epochDetailPanelBlocksTab="//a/small[text()='Blocks']/..";
const epochDetailPanelCloseButton="//a[text()='View Details']/..//button";
const epochDetailPanelTitle ="//h2[text()='Epoch detail']";
const totalRecord = "//div[text()='Results']/span";
const itemListsWithLink = "//table//tbody//tr//td[count(//th[contains(text(),'{0}')]//preceding-sibling::th) + boolean(//th[contains(text(),'{0}')])]//a";
const itemLists = "//table//tbody//tr//td[count(//th[contains(text(),'{0}')]//preceding-sibling::th) + boolean(//th[contains(text(),'{0}')])]//span";


//epoch detail
const epochDetailStatus ="//h2[text()='Epoch detail']/following-sibling::small";
const epochDetailStartTimeStamp="//div[text()='Start Timestamp ']/../../..";
const epochDetailEndTimeStamp="//div[text()='End Timestamp ']/../../..";
const epochDetailTotalOutput="//div[text()=' Total Output']/../../..";
const epochDetailBlock="//div[text()=' Blocks']/../../..";
const epochDetailSlot="//div[text()=' Slot']/../../..";
const epochDetailTransactionCount="//div[text()=' Transaction Count']/../../..";
const epochDetailRewardsDistributed="//div[text()=' Rewards Distributed']/../../..";
const backButton ="//small[text()='Back']/.."

export default class EpochPanel extends WebApi{
  
  constructor(){
    super();
  }
  
  goToEpochPage() {  
    this.openAnyUrl("/epochs")
    return this;
  }

  clickOnBlockChainDropDownList() {
    this.clickToElementByXpath(blockchainDropdownList);
    return this;
  }

  clickOnEpochPanel() {
    this.clickToElementByXpath(epochPanel);
    return this;
  }

  clickOnOneEpochRecord() {
    cy.get(dataInEpochTable).eq(0).click();
    return this;
  }

  clickOnCloseEpochDetailPopUp() {
    cy.clickElement(epochDetailPanelCloseButton);
    return this;
  }

  clickOnViewDetailInEpochDetailPopUp() {
    cy.clickElement(epochDetailPanelViewDetailButton);
    return this;
  }

  clickOnBlockTabInEpochDetailPopUp() {
    cy.clickElement(epochDetailPanelBlocksTab);
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

  verifyDefaulDisplayRow(defaultValue:string){
    cy.verifyText(perPage,defaultValue).scrollIntoView()
    return this;
  }

  verifyDisplayRowSelection(displayRowSelection:string[]){
    cy.compareArrayText(displayRowSelect,displayRowSelection)
    return this;
  }

  verifyNumberOfDisplayRow(expectedCount:string){
    cy.get(epochNumberList).should('have.length', parseInt(expectedCount)-1);
    return this;
  }

  verifyEpochPopupDisapper(){
    cy.verifyElementNotExist(epochDetailPanel);
    return this;
  }

  verifyEpochDetail(){
    cy.verifyElementDisplay(epochDetailPanelTitle);
    return this;
  }

  clickOnSort(field:string) {
    if(field==='Blocks'){
      cy.wait(1000);
      cy.xpath(blockSortButton).click();
      cy.wait(1000);
    }else if(field==='Total Output'){
      cy.wait(1000);
      cy.xpath(totalOutputSortButton).click();
      cy.wait(1000);
    }
    return this;
  }

  verifyPagingNavigatorDisplay(){
    let totalRecords :number;
    cy.xpath(totalRecord)
      .invoke('text')
      .then((text) => {
        totalRecords = parseInt(text); 
        if(totalRecords>=10){
          cy.get(footer).scrollIntoView();
          cy.verifyElementDisplay(pagingNavigator);
        }else{
          cy.verifyElementNotVisible(pagingNavigator);
        }
       });

  return this;
  }

  verifyDetailEpochPopUpIsDisplayed(){
    cy.verifyElementDisplay(epochDetailPanel);
    cy.verifyElementDisplay(epochDetailPanelProgressCircle);
    cy.verifyElementDisplay(epochDetailPanelBlock);
    cy.verifyElementDisplay(epochDetailPanelSlot);
    cy.verifyElementDisplay(epochDetailPanelStartTime);
    cy.verifyElementDisplay(epochDetailPanelEndTime);
    cy.verifyElementDisplay(epochDetailPanelTxCount);
    cy.verifyElementDisplay(epochDetailPanelTotalOutput);
    cy.verifyElementDisplay(epochDetailPanelBlocksTab);
    cy.verifyElementDisplay(epochDetailPanelViewDetailButton);
    cy.verifyElementDisplay(epochDetailPanelCloseButton);
    return this;
  }

  verifyDetailEpochPopUpFormat(format:string){
    cy.xpath(epochDetailPanelStartTime).invoke('text').then((dateTime)=>{
      cy.checkDateTimeFormat(dateTime,format);
    })

    cy.xpath(epochDetailPanelEndTime).invoke('text').then((dateTime)=>{
      cy.checkDateTimeFormat(dateTime,format);
    })

    cy.xpath(epochDetailPanelTotalOutput).invoke('text').then((text)=>{
      expect(text.endsWith("₳")).to.be.true;
    });
    return this;
  }

  verifyEpochNumberIsHyperLink(){
    this.verifyListElementAttribute(epochNumberHyperLink,'href');
    return this;
  }

  verifyOrtherFieldIsTextLabel(){
    cy.xpath(perPage).invoke("text").then((page)=>{
      for (let i = 0; i < parseInt(page)-1; i++) {
        cy.get(dataInEpochTable)
          .eq(i)
          .find('td>span')
          .each(($element) => {
            cy.wrap($element).should(($el) => {
              expect($el.text().trim()).not.to.be.empty;
            });
          });
      }
    })

  return this;
  }

  verifyDefaultInputPage(defaultPage:string){
    this.verifyElementAttributeValue(textboxInputPage,'value',defaultPage)
    return this;
  }

  verifyProgressCircleIsDisplayed(){
    cy.verifyElementDisplay(progressCircle);
    return this;
  }

  verifyEpochRecordIsInDesc(){
    cy.get(epochNumberList).then((list) => {
        const currentElement = Cypress.$(list[0]);
        cy.get(latestEpochNumber).invoke('text').then((text)=>{
          const currentValue = parseInt(currentElement.text().trim(), 10);
          expect(parseInt(text)).to.be.greaterThan(currentValue);
        })
        
    });

    cy.get(epochNumberList).then((list) => {
      for (let i = 0; i < list.length - 1; i++) {
        const currentElement = Cypress.$(list[i]);
        const nextElement = Cypress.$(list[i + 1]);
  
        const currentValue = parseInt(currentElement.text().trim(), 10);
        const nextValue = parseInt(nextElement.text().trim(), 10);
        expect(currentValue).to.be.greaterThan(nextValue);
      }
    });
    return this;
  }

  verifyDisplayOfTransaction(){
    cy.verifyAllElementDisplay(itemLists, EpochConstants.COLUMN_NAME[4]);
   }

  verifyDisplayOfBlock(){
    cy.verifyAllElementDisplay(itemLists, EpochConstants.COLUMN_NAME[3]);
   }

  verifyDisplayOfTotalOutput(){
    cy.verifyAllElementDisplay(itemLists, EpochConstants.COLUMN_NAME[6]);
   }

  verifyDisplayOfRewardDistributed(){
    cy.verifyAllElementDisplay(itemLists, EpochConstants.COLUMN_NAME[5]);

    cy.getAllTextContent(itemLists, (txt:string) => {
      expect(txt).to.satisfy((text:string) => {
        return text === "Not Available" || text.endsWith("₳");
      });
    },  EpochConstants.COLUMN_NAME[5]);
    return this;
   }

   verifyDateTimeFormat(time:string,format:string){
    switch (time){
        case 'Start Timestamp':
          cy.xpath(perPage).invoke("text").then((page)=>{
            for (let i = 0; i < parseInt(page)-1; i++) {
              let j = i >= 2 ? 1 : 0;
              cy.get(dataInEpochTable)
                .eq(i)
                .find('td>span')
                .eq(0)
                .scrollIntoView()
                .invoke('text')
                .then((dateTime)=>{
                  cy.checkDateTimeFormat(dateTime,format)
                });
                };
            });
            break;

        case 'End Timestamp':
          cy.xpath(perPage).invoke("text").then((page)=>{
            for (let i = 0; i < parseInt(page)-1; i++) {
              cy.get(dataInEpochTable)
                .eq(i)
                .find('td>span')
                .eq(1)
                .scrollIntoView()
                .invoke('text')
                .then((dateTime)=>{
                  cy.checkDateTimeFormat(dateTime,format)
                });
                };
            });  
            break;  
    }
   }

   async verifySortField(field:string,sortType:string){
    cy.wait(2000)
    switch (field){
      case 'Blocks':
        var blockList = format(itemLists, EpochConstants.COLUMN_NAME[3]);
        cy.xpath(blockList).then((list) => {
          for (let i = 0; i < list.length - 1; i++) {
            const currentElement = Cypress.$(list[i]);
            const nextElement = Cypress.$(list[i + 1]);
      
            const currentValue = parseInt(currentElement.text().trim(), 10);
            const nextValue = parseInt(nextElement.text().trim(), 10);
            if(sortType==='DESC'){
              expect(currentValue).to.be.gte(nextValue);
            }else if(sortType==='ASC'){
              expect(currentValue).to.be.lte(nextValue);
            }
          }
        });
         break;

      case 'Total Output':
          cy.xpath(perPage).invoke("text").then((page) => {
            const valuesArray :number[] = []; 
            for (let i = 0; i < parseInt(page) - 1; i++) {
              let j = i == 5 ? 5 : 4;
              cy.get(dataInEpochTable)
                .eq(i)
                .find('td>span')
                .eq(4)
                // .scrollIntoView()
                .invoke('text')
                .then((value) => {
                  valuesArray.push(parseFloat((value.slice(0, -2)).replace(/,/g, "")));
                  if (valuesArray.length > 1) {
                    const previousValue = valuesArray[valuesArray.length - 2];
                    const currentValue = valuesArray[valuesArray.length - 1];
                    if(sortType==='DESC'){
                      expect(previousValue).to.be.gte(currentValue);
                    }else if(sortType==='ASC'){
                      expect(previousValue).to.be.lte(currentValue);
                    }
                  }
                });
            }
         });
         break;
       }
    }

  clickToNextPage(){
    cy.get(pagingNavigator).find('ul>li').eq(9).click()
    return this;
  }

  clickToNextPageTillTheEndAndCheckNumberRecord(number:string){
    cy.xpath(totalRecord).getTextContent().then((text)=>{
      const number1 = parseInt(text);
      const integerPart = Math.floor(number1 / 10)+1;
      for(let i=0;i<integerPart;i++){
        if(i==integerPart-1){
          cy.get(epochNumberList).should(($list) => {
            const length = $list.length;
            expect(length).to.be.at.most(parseInt(number));
          });
        }else if(i==0){
          cy.get(epochNumberList).should('have.length', parseInt(number)-1);
        }else{
          cy.get(epochNumberList).should('have.length', parseInt(number));
        }
        this.clickToNextPage();
      }
      });
   return this; 
  }

  clickToNextPageAndVerifyNextButtonIsEnable(numberOfrecord:number){
    cy.xpath(totalRecord).getTextContent().then((text)=>{
      const number1 = parseInt(text);
      const integerPart = Math.floor(number1 / numberOfrecord);
      for(let i=0;i<=integerPart;i++){
        cy.get(pagingNavigator).find('ul>li').eq(9).should('not.be', 'disabled');
        this.clickToNextPage();
      }
      });
   return this; 
  }

  clickToNextPageAndVerifyPrevButtonIsEnable(numberOfrecord:number){
    cy.xpath(totalRecord).getTextContent().then((text)=>{
      const number1 = parseInt(text);
      const integerPart = Math.floor(number1 / numberOfrecord);
      for(let i=0;i<=integerPart;i++){
        this.clickToNextPage();
        cy.get(pagingNavigator).find('ul>li').eq(1).should('not.be', 'disabled');
        
      }
      });
   return this; 
  }

  verifyNextButtonIsDisable(){
        cy.get(pagingNavigator).find('ul>li').eq(9).find('button').should('have.attr', 'disabled');
   return this; 
  }

  verifyPrevButtonIsDisable(){
        cy.get(pagingNavigator).find('ul>li').eq(1).find('button').should('have.attr', 'disabled');
   return this; 
  }

  verifyFirstPageButtonIsDisable(){
    cy.get(pagingNavigator).find('ul>li').eq(0).find('button').should('have.attr', 'disabled');
   return this; 
  }

  verifyLastPageButtonIsDisable(){
    cy.get(pagingNavigator).find('ul>li').eq(10).find('button').should('have.attr', 'disabled');
   return this; 
  }

  verifyFirstPageButtonIsEnable(){
    cy.get(pagingNavigator).find('ul>li').eq(0).find('button').should('not.be', 'disabled');
   return this; 
  }

  verifyLastPageButtonIsEnable(){
    cy.get(pagingNavigator).find('ul>li').eq(10).find('button').should('not.be', 'disabled');
   return this; 
  }

  clickToTheEndPage(){
    cy.get(pagingNavigator).find('ul>li').eq(10).click()
    return this;
  }

  clickToTheFirstPage(){
    cy.get(pagingNavigator).find('ul>li').eq(0).click()
    return this;
  }

  getTotalPage(){
    return cy.get(textboxInputPage).getAttributeValue('value');
  }

  verifyTotalPage(perPage:string){
    cy.xpath(totalRecord).getTextContent().then((text)=>{
      const number = parseInt(text);
      const integerPart = Math.floor(number / parseInt(perPage));

      cy.get(textboxInputPage).getAttributeValue('value').then((value)=>{
        expect(value).to.equal(String(integerPart+1));
      })
    })
    return this;
  }

  inputPage(pageNumber:string){
    cy.get(textboxInputPage).setInputValue(pageNumber);
    cy.get(textboxInputPage).type('{enter}');
    return this;
  }

  verifyInputPage(){
    cy.xpath(perPage).getTextContent().then((numberOfPerPage)=>{

      cy.xpath(totalRecord).getTextContent().then((text)=>{
        const number1 = parseInt(text);
        const integerPart = Math.floor(number1 / parseInt(numberOfPerPage));
        for(let i=1;i<=integerPart+1;i++){
          this.inputPage(String(i));
          cy.get(pagingNavigator).find('ul>li').eq(2).find('div>span')
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

  verifyEpochDetailStatusIsDisplayed(){
    cy.verifyElementDisplay(epochDetailStatus);
    cy.verifyElementDisplay(epochDetailStartTimeStamp);
    cy.verifyElementDisplay(epochDetailEndTimeStamp);
    cy.verifyElementDisplay(epochDetailTotalOutput);
    cy.verifyElementDisplay(epochDetailBlock);
    cy.verifyElementDisplay(epochDetailSlot);
    cy.verifyElementDisplay(epochDetailTransactionCount);
    cy.verifyElementDisplay(epochDetailRewardsDistributed);
    return this;
  }

  verifyBackButtonIsEnable(){
    cy.xpath(backButton).verifyElementEnabled();
    return this;
  }
}
