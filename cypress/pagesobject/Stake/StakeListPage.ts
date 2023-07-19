import WebApi from "../../core/WebApi"

const listItemFollowColumn = "(//table//tbody//tr//td[count(//th[contains(text(),'{0}')]//preceding-sibling::th) + boolean(//th[contains(text(),'{0}')])])";
const listButtonNextAndPrevious = "(//ul[contains(@class,'MuiPagination')]//button)"
const txbNumberOfPage = "//ul[contains(@class,'MuiPagination')]//input"


export default class EpochPanel extends WebApi{
    constructor(){
      super();
    }

    goToStakeRegistration() {  
      this.openAnyUrl("/stake-keys/registration")
      return this;
    }

    verifyHyperLinkIsEnable(){
      cy.verifyAllElementDisplay(listItemFollowColumn, "Tx Hash")
      cy.verifyAllElementDisplay(listItemFollowColumn, "Block")
      cy.verifyAllElementDisplay(listItemFollowColumn, "Stake Address")
      cy.verifyAllElementDisplay(listItemFollowColumn, "Created At")
      return this;
    }
    
    verifyCreatedAtIsTextLabel(){
      return this;
    }

    verifyButtonNextAndPreviousIsEnable(){
      cy.xpath(listButtonNextAndPrevious).each((element)=>{
        cy.wrap(element).should("not.be", "disabled");
      })
      return this;
    }

    verifyPaging(numberPage: number) {
        cy.clickElement(listButtonNextAndPrevious+ "[3]")
        cy.xpath(txbNumberOfPage).invoke('prop', 'value').then((value) => {
          expect(numberPage).to.equal(parseInt(value));
        });
        return this;
      }
}