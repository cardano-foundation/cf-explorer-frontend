import { String, first } from "cypress/types/lodash";
import WebApi from "../../core/WebApi";
import {BlockConstants} from "../../fixtures/constants/BlockConstants"
import BlockDetail from "src/pages/BlockDetail";
import BlockDetailPage from "./BlockDetailPage";
import { text } from "stream/consumers";
//locators
const blockChainLocator = "//img[@alt='Blockchain']//parent::div";
const blocksLocator = "//a[contains(@href,'/blocks')]";
const txtColumnName = "//th[contains(text(),'{0}')]";
const transactionBtn = "//th[contains(text(),'Transactions')]//button";
const createdAtBtn = "//th[contains(text(),'Created At')]//button";
const listBlock = '//div[@data-testid="blocks-card"]//tbody//tr';
const numberBlockPerPage = '//span[contains(text(),"Per page")]//preceding-sibling::div/div';
const perPageDropDown = "//ul//li[text()='{0}']";
const itemListsWithLink = "//table//tbody//tr//td[count(//th[contains(text(),'{0}')]//preceding-sibling::th) + boolean(//th[contains(text(),'{0}')])]//a";
const itemLists = "//table//tbody//tr//td[count(//th[contains(text(),'{0}')]//preceding-sibling::th) + boolean(//th[contains(text(),'{0}')])]//span";
const quickViews = "//table//tbody//tr//td[count(//th[contains(text(),'')]//preceding-sibling::th) + boolean(//th[contains(text(),'')])]";
const fieldBlock = "//table//tbody/tr";
const viewDetailTxt = "//a[contains(text(),'View Details')]";
const blockIdDetailTxt = "//div[contains(@class,'MuiTooltip-tooltip')]";
const epchoDetailTxt = "//div[contains(text(),'Epoch details')]";
const waitingIcon = "//span[contains(@class,'MuiCircularProgress-root')]";
const blockTxt = "//small[text()='Block']";
const slotTxt = "//small[text()='slot']";
const epochTxt = "//span[text()='Epoch']";
const createdTxt = "//small[contains(text(),'Created At')]//following-sibling::small";
const confirmationTxt = "//small[text()='Confirmation']";
const transactionFeeTxt = "//small[text()='Transaction Fees']";
const totalAmountTxt = "//small[contains(text(),'Total Output in ADA')]";
const blockIdOnQuickModel = "//small[text()='Block Id']//parent::div//small//a";
const transactionBtnOnQuickView = "//h4[contains(text(),'Transactions')]";
const closeBtn = "//button[@aria-label='Close']";
const clipBoard = "//button[contains(@aria-label,'Copy')]";
const numberPerPageList = "//ul[@role='listbox']//li";
const nextBtn = "//ul//li[10]//button";
const nextLastPageBtn = "//ul//li[11]//button";
const firstPageBtn = "//ul//li[1]//button";
const inputPageNumber = "//li/div/input";
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
  enterPageNumber(numberPage: string) {
    cy.xpath(inputPageNumber).setInputValue(numberPage);
    cy.xpath(inputPageNumber).type('{enter}');
    return this;
  }
  verifyPageWhenEnterPageNumber(numberPage: string) {
    cy.xpath(inputPageNumber).getAttributeValue("value").then(textBefore => {
      this.enterPageNumber(numberPage)
      cy.xpath(inputPageNumber).getAttributeValue("value").then(textAfter => {
        if(parseInt(numberPage) < 1){
          expect(textBefore).to.equal("1");
        }else{
          expect(parseInt(numberPage)).not.to.equal(textAfter);
      }
    })
    })
  return this;
}
  clickToAnyBlock() {
    cy.clickElementRandomly(fieldBlock);
    return new BlockDetailPage;
  }

  clickToBlocksField() {
    this.clickToElementByXpath(blocksLocator);
    return this;
  }
  clickToEpochCell() {
    cy.clickElementRandomly(itemListsWithLink, BlockConstants.COLUMN_NAME[2]);
    return this;
  }
  goBackToPreviousPage() {
    cy.go('back');
    return this;
  }
  clickToTransactionBtn() {
    cy.clickElement(transactionBtn);
    return this;
  }
  clickToQuickView() {
    cy.clickElementRandomly(quickViews);
    return this;
  }
  clickToPerPage() {
    cy.clickElement(numberBlockPerPage);
    return this;
  }
  clickToNextBtn() {
    cy.clickElement(nextBtn);
    return this;
  }
  selectAmountDataPerPage(amount: number) {
    cy.clickElement(perPageDropDown, amount);
    return this;
  }
  hoverToBlockId() {
    cy.hoverToElementRandomly(itemListsWithLink, BlockConstants.COLUMN_NAME[1]);
    return this;
  }
  verifyBlockIdShowFull() {
    cy.verifyElementDisplay(blockIdDetailTxt);
    return this;
  }
  verifyClickNextBtnSuccessfully() {

    cy.xpath(inputPageNumber).getAttributeValue("value").then(textBefore => {
      this.clickToNextBtn();
      cy.xpath(inputPageNumber).getAttributeValue("value").then(textAfter => {
      expect(textBefore).not.to.equal(textAfter);
      })
    })
    return this;
  }
  verifyClickFisrtPageBtnSuccessfully() {

    cy.xpath(inputPageNumber).getAttributeValue("value").then(textBefore => {
      this.clickToBackFisrtPageBtn();
      cy.xpath(inputPageNumber).getAttributeValue("value").then(textAfter => {
      expect(textBefore).not.to.equal(textAfter);
      })
    })
    return this;
  }
  clickToNextLastPageBtn() {
    cy.clickElement(nextLastPageBtn);
    return this;
  }
  verifyNextLastPageBtnIsDisable() {
    cy.xpath(nextLastPageBtn).verifyElementUnabled();
    return this;
  }
  clickToBackFisrtPageBtn() {
    cy.clickElement(firstPageBtn);
    return this;
  }
  verifyFirstPageBtnIsDisable() {
    cy.xpath(firstPageBtn).verifyElementUnabled();
    return this;
  }
  verifyEpochDetailPageDisplay() {
    cy.verifyElementDisplay(epchoDetailTxt);
    return this;
  }
  verifyTranSactionSorted(sortOrder: string) {
    cy.verifyElementInvisible(waitingIcon);
    cy.verifyFieldSorted(itemLists, sortOrder, BlockConstants.COLUMN_NAME[3]);
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
  verifyEnoughChoiceInPerPage() {
    const expected: any[] = []
    cy.getAllTextContent(numberPerPageList, (txt: string) => {
      expected.push(parseInt(txt));

    }).then(() =>{
      expect(expected).to.deep.equal(BlockConstants.PER_PAGE);
    })

    return this;
  }
  verifyQuickViewModel() {
    cy.verifyElementDisplay(blockTxt);
    cy.verifyElementDisplay(slotTxt);
    cy.verifyElementDisplay(epochTxt);
    cy.verifyElementDisplay(createdTxt);
    cy.verifyElementDisplay(confirmationTxt);
    cy.verifyElementDisplay(transactionFeeTxt);
    cy.verifyElementDisplay(totalAmountTxt);
    cy.xpath(transactionBtnOnQuickView).verifyElementEnabled();
    cy.xpath(blockIdOnQuickModel).invoke("text").then(text => {
      expect(this.isFormatStringRight(text, 10, 7, 3)).be.true;
    })
    cy.xpath(closeBtn).verifyElementEnabled();
    cy.xpath(viewDetailTxt).verifyElementEnabled();
    return this;
  }
  verifyBlockdetailScreenDisplay() {
    cy.verifyElementDisplay(viewDetailTxt);
    return this;
  }
  verifyFormatCreatedDateOnQuickViewModel() {
    cy.checkDateTimeFormat(createdTxt, BlockConstants.DATE_TIME[0],'');
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
  verifyDateTimeFormat() {
    cy.checkDateTimeFormat(itemLists, BlockConstants.DATE_TIME[0], BlockConstants.COLUMN_NAME[6]);
    return this;
  }
  verifyFormatBlockId() {
    cy.getAllTextContent(itemListsWithLink, (txt: string) => {
      expect(this.isFormatStringRight(txt, 10, 7, 3)).be.true;
    }, BlockConstants.COLUMN_NAME[1])
    return this;
  } 
verifyDateTimeOrdered() {
  cy.verifyDateTimeIsSorted(itemLists, BlockConstants.SORT[1], BlockConstants.COLUMN_NAME[6]);
  return this;
}
verifyDefaultPageNumber(defaultNumber: number) {
  cy.xpath(numberBlockPerPage).getTextContent().then(text =>{
    expect(defaultNumber).to.equal(parseInt(text));
  })
  return this;
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