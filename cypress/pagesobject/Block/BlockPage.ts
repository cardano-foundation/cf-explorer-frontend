import { first } from "cypress/types/lodash";
import WebApi from "../../core/WebApi";
import {BlockConstants} from "../../fixtures/constants/BlockConstants"
//locators
const blockChainLocator = "//img[@alt='Blockchain']//parent::div";
const blocksLocator = "//a[contains(@href,'/blocks')]";
const txtColumnName = "//th[contains(text(),'{0}')]";
const transactionBtn = "//th[contains(text(),'Transactions')]//button";
const createdAtBtn = "//th[contains(text(),'Created At')]//button";
const listBlock = '//div[@data-testid="blocks-card"]//tbody//tr';
const numberBlockPerPage = '//span[contains(text(),"Per page")]//preceding-sibling::div/div';
const itemListsWithLink = "//table//tbody//tr//td[count(//th[contains(text(),'{0}')]//preceding-sibling::th) + boolean(//th[contains(text(),'{0}')])]//a";
const itemLists = "//table//tbody//tr//td[count(//th[contains(text(),'{0}')]//preceding-sibling::th) + boolean(//th[contains(text(),'{0}')])]//span";
const quickViews = "//table//tbody//tr//td[count(//th[contains(text(),'')]//preceding-sibling::th) + boolean(//th[contains(text(),'')])]";
export default class LoginPage extends WebApi {
  goToHomePage() {
    this.openAnyUrl("/");
    return this;
  }
  goToBlockPage() {
    this.openAnyUrl("/blocks");
    return this;
  }
  clickToBlockChainField() {
    this.clickToElementByXpath(blockChainLocator);
    return this;
  }

  clickToBlocksField() {
    this.clickToElementByXpath(blocksLocator);
    return this;
  }
  verifyColumnName() {
    cy.verifyElementDisplay(txtColumnName, BlockConstants.COLUMN_NAME[0]);
    cy.verifyElementDisplay(txtColumnName, BlockConstants.COLUMN_NAME[1]);
    cy.verifyElementDisplay(txtColumnName, BlockConstants.COLUMN_NAME[2]);
    cy.verifyElementDisplay(txtColumnName, BlockConstants.COLUMN_NAME[3]);
    cy.verifyElementDisplay(txtColumnName, BlockConstants.COLUMN_NAME[4]);
    cy.verifyElementDisplay(txtColumnName, BlockConstants.COLUMN_NAME[5]);
    cy.verifyElementDisplay(txtColumnName, BlockConstants.COLUMN_NAME[6]);
    return this;
  }
  verifySortBtnEnable() {
    this.isControlEnabledByXpath(transactionBtn);
    this.isControlEnabledByXpath(createdAtBtn);
    return this;
  }
  verifyDesiredPageNumberMatchWithDataInList() {
    cy.xpath(numberBlockPerPage)
      .invoke("text")
      .then((text) => {
        cy.xpath(listBlock).should("have.length", text);
      });
    return this;
  }
  verifyListBlockNoDisplay() {
    cy.verifyAllElementDisplay(itemListsWithLink, BlockConstants.COLUMN_NAME[0]);
    return this;
  }
  verifyListBlockHashDisplay() {
    cy.verifyAllElementDisplay(itemListsWithLink, BlockConstants.COLUMN_NAME[1]);
    return this;
  }
  verifyEpochDisplay() {
    cy.verifyAllElementDisplay(itemListsWithLink, BlockConstants.COLUMN_NAME[2]);
    return this;
  }
  verifyTransactionDisplay() {
    cy.verifyAllElementDisplay(itemLists, BlockConstants.COLUMN_NAME[3]);
    return this;
  }
  verifyFeeDisplay() {
    cy.verifyAllElementDisplay(itemLists, BlockConstants.COLUMN_NAME[4]);
    return this;
  }
  verifyOutputDisplay() {
    cy.verifyAllElementDisplay(itemLists, BlockConstants.COLUMN_NAME[5]);
    return this;
  }
  verifyQuickViewsDisplay() {
    cy.verifyAllElementDisplay(quickViews,'');
    return this;
  }
  verifyFormatBlockId() {
    cy.getAllTextContent(itemListsWithLink, (txt: string) => {
      expect(this.isFormatStringRight(txt, 10, 7, 3)).be.true;
    }, BlockConstants.COLUMN_NAME[1])
    return this;
  } 
verifyDateTimeOrdered() {
  cy.verifyDateTimeIsSorted(itemLists, BlockConstants.SORT[0], BlockConstants.COLUMN_NAME[5])
}

  isFormatStringRight(text: string, firstPart: number, lastPart: number, dots: number) {
    let totalLength = firstPart + lastPart + dots;
    if (text.length !== totalLength) {
      return false;
    }
  
    let parts = text.split('.');
    
    if (parts.length - 1 !== dots) {
      return false;
    }
  
    if (parts[0].length != firstPart || parts[parts.length - 1].length != lastPart) {
      return false;
    }
    return true;
  }
}