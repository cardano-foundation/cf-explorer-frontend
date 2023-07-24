import WebApi from "cypress/core/WebApi";
import { InstantaneousConstants } from "cypress/fixtures/constants/Instantaneous";
import * as util from 'util';


const listItemFollowColumn = "(//table//tbody//tr//td[count(//th[contains(text(),'%s')]//preceding-sibling::th) + boolean(//th[contains(text(),'%s')])])";
const listbtnNextAndPre = "(//ul//button)"
const numberOfPage = "//ul//input"
const selectPerPage = "//span[text()='Per page']/parent::div"
const listNumberPerPage = "//ul[@role='listbox']//li"

export default class InstantaneousRewardsPage extends WebApi{
    gotoInstantaneousRewards(){
        this.openAnyUrl("/instantaneous-rewards");
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
}