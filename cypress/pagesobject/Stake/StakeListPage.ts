import { StakeConstants } from "cypress/fixtures/constants/StakeConstants";
import WebApi from "../../core/WebApi"
import { log } from "console";
const format = require('string-format');
import * as util from 'util';
import { text } from "stream/consumers";



const listItemFollowColumn = "(//table//tbody//tr//td[count(//th[contains(text(),'{0}')]//preceding-sibling::th) + boolean(//th[contains(text(),'{0}')])])";
const listButtonNextAndPrevious = "(//ul[contains(@class,'MuiPagination')]//button)"
const txbNumberOfPage = "//ul[contains(@class,'MuiPagination')]//input"
const txbNumberPageCurrentOfLastPage = "//ul[contains(@class,'MuiPagination')]//input/following-sibling::span"


export default class EpochPanel extends WebApi{
    constructor(){
      super();
    }

    goToStakeRegistration() {  
      this.openAnyUrl("/stake-keys/registration")
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

    checkActionClickOnTrxHash(){

        return this;
    } 
}