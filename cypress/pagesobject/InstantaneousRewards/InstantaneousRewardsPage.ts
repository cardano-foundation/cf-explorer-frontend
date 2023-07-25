import WebApi from "cypress/core/WebApi";
import { InstantaneousConstants } from "cypress/fixtures/constants/Instantaneous";
import * as util from 'util';


const listItemFollowColumn = "(//table//tbody//tr//td[count(//th[contains(text(),'%s')]//preceding-sibling::th) + boolean(//th[contains(text(),'%s')])])";
const listItemFollowColumn2 = "(//table//tbody//tr//td[count(//th[contains(text(),'{0}')]//preceding-sibling::th) + boolean(//th[contains(text(),'{0}')])])";

const listbtnNextAndPre = "(//ul//button)"
const numberOfPage = "//ul//input"
const selectPerPage = "//span[text()='Per page']/parent::div"
const listNumberPerPage = "//ul[@role='listbox']//li"
const txbNumberPageCurrentOfLastPage = "//ul//li//input/following-sibling::span"
const labelTransactionDetail = "//div[text()='Transaction details']"
const btnBack = "//small[text()='Back']"

export default class InstantaneousRewardsPage extends WebApi{
    gotoInstantaneousRewards(){
        this.openAnyUrl("/instantaneous-rewards");
        return this;
    } 

    clickOnButtonBack(){
        cy.clickElement(btnBack)
        return this;
    }

    verifyHyperLinkIsEnable(){
        cy.xpath(util.format(listItemFollowColumn, InstantaneousConstants.COLUMN_NAME[0], InstantaneousConstants.COLUMN_NAME[0]) + '/a').should("not.be", 'disable')      
        cy.xpath(util.format(listItemFollowColumn, InstantaneousConstants.COLUMN_NAME[3], InstantaneousConstants.COLUMN_NAME[3])).should("not.be", 'disable')      
        cy.xpath(util.format(listItemFollowColumn, InstantaneousConstants.COLUMN_NAME[2], InstantaneousConstants.COLUMN_NAME[2])).should("not.be", 'disable')      
        return this;
    }

    verifyButtonNextAndPreviousIsEnable(){
        cy.xpath(listbtnNextAndPre).each(($element)=>{
            cy.wrap($element).should("not.be", "disabled");
        })
        return this;
    }

    verifyPaging(numberPage: number) {
        cy.clickElement(listbtnNextAndPre+ "[3]")
        cy.xpath(numberOfPage).invoke('prop', 'value').then((value) => {
          expect(numberPage).to.equal(parseInt(value));
        });
        cy.reload()
        return this;
    }

    checkClickOnTxHash(){
        cy.clickElementRandomly(listItemFollowColumn2+'/a', InstantaneousConstants.COLUMN_NAME[0])
        cy.verifyElementDisplay(labelTransactionDetail)
        return this;
    }

    checkTxHashIsDisplay(){
        cy.verifyElementDisplay(listItemFollowColumn2+'/a', InstantaneousConstants.COLUMN_NAME[0])
        return this;
    }

    checkFormatTxHash(){
        const xpath = util.format(listItemFollowColumn, InstantaneousConstants.COLUMN_NAME[0], InstantaneousConstants.COLUMN_NAME[0])
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
        cy.verifyAllElementDisplay(listItemFollowColumn2, InstantaneousConstants.COLUMN_NAME[1])
        return this;
    }

    checkFormatCreatedAt(){
        const xpathCreatedAt = util.format(listItemFollowColumn, InstantaneousConstants.COLUMN_NAME[1], InstantaneousConstants.COLUMN_NAME[1])
        const timeRegex = /^\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}:\d{2}$/;
        cy.xpath(xpathCreatedAt).each(($element)=>{
            cy.wrap($element).invoke('text').then((text)=>{
                expect(text).to.match(timeRegex);
            })
        })
        return this;
    }

    checkBlockIsDisplay(){
        cy.verifyAllElementDisplay(listItemFollowColumn2, InstantaneousConstants.COLUMN_NAME[2])
        return this;
    }

    checkStakeKeyIsDisplay(){
        cy.verifyAllElementDisplay(listItemFollowColumn2, InstantaneousConstants.COLUMN_NAME[3])
        return this;
    }

    checkRewardPaidIsDisplay(){
        cy.verifyAllElementDisplay(listItemFollowColumn2, InstantaneousConstants.COLUMN_NAME[4])
        return this;
    }

    checkRewardPaid(){
        const xpath = util.format(listItemFollowColumn, InstantaneousConstants.COLUMN_NAME[4], InstantaneousConstants.COLUMN_NAME[4]);
        cy.xpath(xpath).each((element)=>{
            cy.wrap(element).invoke('text').then(text=>{
                const characterEnd = text.slice(-1);
                const numberOfReward = text.slice(-text.length, -1);
                expect(characterEnd).to.equal('₳')
                const isNumber = !isNaN(parseFloat(numberOfReward))
                cy.wrap(isNumber).should('be.true')
            })
        })
        return this;
    }

    checkFormatStakeKey(){
        const xpath = util.format(listItemFollowColumn, InstantaneousConstants.COLUMN_NAME[3], InstantaneousConstants.COLUMN_NAME[3])
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
        cy.xpath(numberOfPage).clear().type('1').type('{enter}')
        cy.xpath(numberOfPage).invoke('prop', 'value').then((pageCurrent) =>{            
            if(pageCurrent == '1'){
                cy.xpath(listbtnNextAndPre+"[1]").should('be.disabled')
                cy.xpath(listbtnNextAndPre+"[2]").should('be.disabled')
            }
        })
        cy.clickElement(listbtnNextAndPre+"[4]")
        cy.xpath(listbtnNextAndPre+"[3]").should('be.disabled')
        cy.xpath(listbtnNextAndPre+"[4]").should('be.disabled')
        return this;
    }
}