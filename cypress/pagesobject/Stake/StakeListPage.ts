import { StakeConstants } from "cypress/fixtures/constants/StakeConstants";
import WebApi from "../../core/WebApi"
import { log } from "console";
const format = require('string-format');
import * as util from 'util';
import { text } from "stream/consumers";
import { each } from "cypress/types/bluebird";

const listItemFollowColumn = "(//table//tbody//tr//td[count(//th[contains(text(),'{0}')]//preceding-sibling::th) + boolean(//th[contains(text(),'{0}')])])";
const listButtonNextAndPrevious = "(//ul[contains(@class,'MuiPagination')]//button)"
const txbNumberOfPage = "//ul[contains(@class,'MuiPagination')]//input"
const txbNumberPageCurrentOfLastPage = "//ul[contains(@class,'MuiPagination')]//input/following-sibling::span"
const btnBack = "//small[text()='Back']"
const labelTransactionDetial = "//div[text()='Transaction details']"
const labelBlockDetail = "//div[text()='Block details']"
const labelEpochDetail = "//div[text()='Epoch details']"
const tabListTitle = "//div[@role='tablist']//div[text()='Delegation History']/ancestor::button"
const listBoxNumberPage = "ul[role='listbox'] li"
const listRecoredInPage = "//table//tr[@class]"
const labelFullWhenHoverOn = "//div[@role='tooltip']//div"
const btnPerPage = "//span[text()='Per page']/preceding-sibling::div/div";
const perPageSelect = "//div[@id='menu-']/div[@class]/ul/li";

const listBtnNextAndPre = "(//li//button)"
const txbNumberPage = "(//li//input)"
const rangeOfPage = "//li//input/following-sibling::span"
const fullTxHash = "//button[@aria-label='Copy']/preceding-sibling::span"
export default class EpochPanel extends WebApi{
    constructor(){
      super();
    }

    goToStakeRegistration() {  
      this.openAnyUrl("/stake-keys/registration")
      return this;
    }

    goToStakeDeregistration() {  
        this.openAnyUrl("/stake-keys/de-registration")
        return this;
    }

    clickButtonBack(){
        cy.clickElement(btnBack)
        return this;
    }

    verifyHyperLinkIsEnable(){
      cy.xpath(format(listItemFollowColumn, "Tx Hash")).should("not.be", 'disable')      
      cy.xpath(format(listItemFollowColumn, "Stake Address")).should("not.be", 'disable')      
      cy.xpath(format(listItemFollowColumn, "Block")).should("not.be", 'disable')      
      return this;
    }
    
    verifyCreatedAtIsTextLabel(){
      return this;
    }

    verifyButtonNextAndPreviousIsEnable(){
      cy.xpath(listButtonNextAndPrevious).each(($element)=>{
        cy.wrap($element).should("not.be", "disabled");
      })
      return this;
    }

    verifyPaging(numberPage: number) {
        cy.clickElement(listButtonNextAndPrevious+ "[3]")
        cy.xpath(txbNumberOfPage).invoke('prop', 'value').then((value) => {
          expect(numberPage).to.equal(parseInt(value));
        });
        cy.reload()
        return this;
    }

    checkTxHashIsDisplay(){
        cy.verifyAllElementDisplay(listItemFollowColumn, "Tx Hash")
        return this;
    }

    checkFormatTxHash(){
        const xpath = format(listItemFollowColumn, "Tx Hash")
        cy.xpath(xpath).each((element)=>{
            cy.wrap(element).then((text:any) => {
                const firstTenChars = text.slice(0, 10);
                const lastSevenChars = text.slice(-7);
                expect(/\./.test(firstTenChars)).to.be.false;
                expect(/\./.test(lastSevenChars)).to.be.false;
            });
        })
        return this;
    }

    checkCreatedAtIsDisplay(){
        cy.verifyAllElementDisplay(listItemFollowColumn, "Created At")
        return this;
    }
    
    checkFormatCreatedAt(){
        const xpathCreatedAt = format(listItemFollowColumn, "Created At")
        const timeRegex = /^\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}:\d{2}$/;
        cy.xpath(xpathCreatedAt).each(($element)=>{
            cy.wrap($element).invoke('text').then((text)=>{
                expect(text).to.match(timeRegex);
            })
        })
        return this;
    }

    checkFormatCreatedAt2(){
        const xpathCreatedAt = format(listItemFollowColumn, "Created At")
        cy.xpath(xpathCreatedAt).each(($element)=>{
            cy.wrap($element).invoke('text').then((text)=>{
                cy.checkDateTimeFormat(text, StakeConstants.DATE_TIME[0])
            })
        })
        return this;
    }

    checkBlockIsDisplay(){
        cy.verifyAllElementDisplay(listItemFollowColumn, "Block")
        return this;
    }

    checkStakeKeyIsDisplay(){
        cy.verifyAllElementDisplay(listItemFollowColumn, "Stake Address")
        return this;
    }

    checkFormatStakeKey(){
        const xpath = format(listItemFollowColumn, "Stake Address")
        cy.xpath(xpath).each((element)=>{
            cy.wrap(element).then((text:any) => {
                const firstFiveChars = text.slice(0, 5);
                const lastFiveChars = text.slice(-5);
                expect(/\./.test(firstFiveChars)).to.be.false;
                expect(/\./.test(lastFiveChars)).to.be.false;
            });
        })
        return this;
    }

    verifyPagingOfStakeList(){
        cy.xpath(txbNumberPageCurrentOfLastPage).invoke('text').then(text=>{
            expect(text).to.match(/^\d+ - \d+ of [\d,]+$/);
        })
        return this;
    }

    checkValidationOfPaging(){
        cy.xpath(txbNumberOfPage).clear().type('1').type('{enter}')
        cy.xpath(txbNumberOfPage).invoke('prop', 'value').then((pageCurrent) =>{            
            if(pageCurrent == '1'){
                cy.xpath(listButtonNextAndPrevious+"[1]").should('be.disabled')
                cy.xpath(listButtonNextAndPrevious+"[2]").should('be.disabled')
            }
        })
        cy.clickElement(listButtonNextAndPrevious+"[4]")
        cy.xpath(listButtonNextAndPrevious+"[3]").should('be.disabled')
        cy.xpath(listButtonNextAndPrevious+"[4]").should('be.disabled')
        return this;
    }

    checkActionClickOnTxHash(){
        cy.clickElement(format(listItemFollowColumn, "Tx Hash")+"[1]/a")
        cy.verifyElementDisplay(labelTransactionDetial)
        return this;
    } 

    checkHoverOnTxHash(){
        // const xpathFirstItem = format(listItemFollowColumn, "Tx Hash")+'[1]/a'
        // cy.clickElement(xpathFirstItem)
        // cy.xpath(fullTxHash).invoke('text').then(txHashInTransactionDetail=>{
        //     cy.clickElement(btnBack)
        //     cy.hoverToElement(xpathFirstItem)
        //     cy.xpath(labelFullWhenHoverOn).invoke('text').then(text=>{
        //         expect(text).to.equal(txHashInTransactionDetail)
        //     })
        // })
        cy.hoverToElementRandomly(format(listItemFollowColumn, 'Tx Hash'))
        cy.verifyElementDisplay(labelFullWhenHoverOn)
        return this;
    }

    checkActionClickOnBlock(){
        cy.clickElementRandomly(format(listItemFollowColumn, "Block")+"/a")
        cy.verifyElementDisplay(labelBlockDetail)
        return this;
    }

    checkActionClickOnEpoch(){
        cy.clickElementRandomly(format(listItemFollowColumn, "Block")+"/div/a")
        cy.verifyElementDisplay(labelEpochDetail)
        return this;
    }

    checkHoverOnBlock(){
        cy.hoverToElementRandomly(format(listItemFollowColumn, "Block")+"/div/a")
        return this;
    }

    checkHoverOnStakeKey(){
        cy.hoverToElementRandomly(format(listItemFollowColumn, "Stake Address")+"/a")
        cy.verifyElementDisplay(labelFullWhenHoverOn)
        return this;
    }

    checkActionClickOnStakeKey(){
        cy.clickElementRandomly(format(listItemFollowColumn, "Stake Address")+"/a")
        cy.xpath(format(tabListTitle, "Delegation History")).should('have.attr', 'aria-selected', 'true')
        return this;
    }


    clickOnPerPageDropdown() {
        cy.xpath(btnPerPage).scrollIntoView().click();
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

    checkActionNumberItemPullDown(listNumberPage : string[]){
        cy.compareArrayText(listBoxNumberPage,listNumberPage)

        return this;
    }  
    
    verifyNumberOfBlockDisplayRow(expectedCount:string){
        cy.xpath(listRecoredInPage).should('have.length.lte', parseInt(expectedCount));
        return this;
    }
    
    checkButtonNextIsEnable(){
        cy.xpath(txbNumberPage).invoke('attr', 'value').then((value:any)=>{    
            const numberPage1 = parseInt(value)       
            cy.clickElement(listBtnNextAndPre+'[3]')
            cy.xpath(txbNumberPage).invoke('attr', 'value').then((numberPage2:any)=>{            
                expect(numberPage1+1).to.equal(parseInt(numberPage2));
            })
        })
        return this;
    }

    checkButtonNextIsDisable(){
        cy.xpath(listButtonNextAndPrevious+'[4]').click()
        cy.xpath(listButtonNextAndPrevious+'[3]').scrollIntoView().should('to.be.disabled')
        cy.wait(5000)
        return this;
    }

    checkButtonPreIsEnable(numberPage:string){
        cy.xpath(txbNumberOfPage).clear().type(""+numberPage+"").type('{enter}')
        cy.xpath(listButtonNextAndPrevious+'[1]').verifyElementEnabled()
        cy.xpath(listButtonNextAndPrevious+'[2]').verifyElementEnabled()
        return this;
    }

    checkButtonPreIsDisable(){
        cy.xpath(listButtonNextAndPrevious+'[1]').click()
        cy.xpath(listButtonNextAndPrevious+'[2]').scrollIntoView().should('to.be.disabled')
        return this;
    }

    checkInputTxbPageTo1FromMax(value:string){
        cy.xpath(btnPerPage).getTextContent().then(text=>{
            const perPage = parseInt(text)
            const numberPage = parseInt(value)
            cy.xpath(txbNumberOfPage).clear().type(""+numberPage+"").type('{enter}')
            cy.xpath(rangeOfPage).getTextContent().then(text=>{
                const subString = text.substring(6, 9);    
                expect(perPage*numberPage).to.equal(parseInt(subString))   
            })
        })
        return this;
    }
    
    checkInputNumberPageLessThan1(value:string){
        cy.xpath(txbNumberOfPage).invoke('attr', 'value').then((text:any)=>{
            const pageCurrent = parseInt(text)
            const numberPage = parseInt(value)
            cy.xpath(txbNumberOfPage).clear().type(""+numberPage+"").type('{enter}')
            cy.xpath(txbNumberOfPage).invoke('attr', 'value').then((text:any)=>{
                expect(pageCurrent).to.equal(parseInt(text))   
            })
        })
        return this;
    }

    checkInputNumberPageMoreThanMax(){
        cy.clickElement(listBtnNextAndPre+"[4]")

        return this;
    }
}