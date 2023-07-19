import WebApi from "../../core/WebApi";
import {TransactionConstants} from "../../fixtures/constants/TransactionConstants"

//locators
const blockChainLocator = "//img[@alt='Blockchain']//parent::div";
const transactionMenu = "//a[@data-testid='submenu-button-transactions']";
const txnColumnName = "//th[contains(text(),'{0}')]";
const txHashHyperLink = "tbody tr[class] td:nth-of-type(2) a";
const blockHyperLink = "tbody tr[class] td:nth-of-type(3) a";
const inputAddressHyperLink = "tbody tr[class] td:nth-of-type(6) a";
const outputAddressHyperLink = "tbody tr[class] td:nth-of-type(7) a";
const currentPage = "nav[aria-label='pagination navigation'] input";
const totalResults = "//div[text()='Results']/span";
const pagingNavigator = "nav[aria-label='pagination navigation']";
const itemListsWithLink = "//table//tbody//tr//td[count(//th[contains(text(),'{0}')]//preceding-sibling::th) + boolean(//th[contains(text(),'{0}')])]//a";
const itemLists = "//table//tbody//tr//td[count(//th[contains(text(),'{0}')]//preceding-sibling::th) + boolean(//th[contains(text(),'{0}')])]//span";
const itemNo = "//table//tbody//tr//td[count(//th[contains(text(),'#')]//preceding-sibling::th) + boolean(//th[contains(text(),'#')])]"
const itemDateTxn = "//table//tbody//tr//td[count(//th[contains(text(),'Tx Hash')]//preceding-sibling::th) + boolean(//th[contains(text(),'Tx Hash')])]//following-sibling::div";
const itemFees = "//table//tbody//tr//td[count(//th[contains(text(),'Fees')]//preceding-sibling::th) + boolean(//th[contains(text(),'Fees')])]";
const itemOutputInADA = "//table//tbody//tr//td[count(//th[contains(text(),'Output in ADA')]//preceding-sibling::th) + boolean(//th[contains(text(),'Output in ADA')])]";
const quickViews = "//table//tbody//tr//td[count(//th[contains(text(),'')]//preceding-sibling::th) + boolean(//th[contains(text(),'')])]";
const displayFullData = "//div[contains(@class,'MuiTooltip-tooltip')]";
const transactionDetailTxt = "//div[contains(text(),'Transaction details')]"
const itemBlocks = "//table//tbody//tr//td[count(//th[contains(text(),'Block')]//preceding-sibling::th) + boolean(//th[contains(text(),'Block')])]//div[1]/a";
const itemEpochs = "//table//tbody//tr//td[count(//th[contains(text(),'Block')]//preceding-sibling::th) + boolean(//th[contains(text(),'Block')])]//div[2]/a";
const blockDetailTxt = "//div[contains(text(),'Block details')]";
const epochDetailTxt = "//div[contains(text(),'Epoch details')]";
const feesBtn = "//th[contains(text(),'Fees')]//button";
const waitingIcon = "//span[contains(@class,'MuiCircularProgress-root')]";
const outputInADABtn = "//th[contains(text(),'Output in ADA')]//button";
const addressDetailTxt = "//div[contains(text(),'Address Details')]"
const epochTxt = "//span[text()='Epoch']"
const blockTxt = "//small[text()='Block']"
const slotTxt = "//small[text()='slot']"
const createdTxt = "//small[contains(text(),'Created At')]//following-sibling::small";
const confirmationTxt = "//small[text()='Confirmation']";
const transactionFeeTxt = "//small[text()='Transaction Fees']";
const totalAmountTxt = "//small[contains(text(),'Total Output')]";
const summaryBtnOnQuickView = "//h4[contains(text(),'Summary')]";
const utxosBtnOnQuickView = "//h4[contains(text(),'UTXOs')]";
const metadataBtnOnQuickView = "//h4[contains(text(),'Metadata')]";
const closeBtn = "//button[@aria-label='Close']";
const viewDetailTxt = "//a[contains(text(),'View Details')]";
const txHahOnQuickModel = "//small[text()='Transaction hash']//parent::div//small//a";
const inputOnQuickModel = "//small[text()='Input']//parent::div//small//a";
const outputOnQuickModel = "//small[text()='Output']//parent::div//small//a";
const status = "//small[text()='Status']//following-sibling::small//small";
const records = "//table//tbody/tr";
const numberRecordPerPage = '//span[contains(text(),"Per page")]//preceding-sibling::div/div';
const numberPerPageList = "//ul[@role='listbox']//li";
const optionPerPage = "//ul//li[text()='{0}']";
const nextPagingBtn = "//ul//li[10]//button";
const backPagingBtn = "//ul//li[2]//button";
const lastestPageBtn = "//ul//li[11]//button";
const firstPageBtn = "//ul//li[1]//button";
const inputPageNumber = "//li/div/input";

export default class TransactionListPage extends WebApi {
  goToHomePage() {
    this.openAnyUrl("/");
    return this;
  }

  clickToBlockChainMenu() {
    this.clickToElementByXpath(blockChainLocator);
    return this;
  }

  clickToTransactionMenu() {
    this.clickToElementByXpath(transactionMenu);
    return this;
  }

  verifyTransactionListTable() {
    cy.verifyElementDisplay(txnColumnName, "#");
    cy.verifyElementDisplay(txnColumnName, "Tx Hash");
    cy.verifyElementDisplay(txnColumnName, "Block");
    cy.verifyElementDisplay(txnColumnName, "Output in ADA");
    cy.verifyElementDisplay(txnColumnName, "Fees");
    cy.verifyElementDisplay(txnColumnName, "Input address");
    cy.verifyElementDisplay(txnColumnName, "Output address");
    this.verifyListElementAttribute(txHashHyperLink,'href');
    this.verifyListElementAttribute(blockHyperLink,'href');
    this.verifyListElementAttribute(inputAddressHyperLink,'href');
    this.verifyListElementAttribute(outputAddressHyperLink,'href');
    return this;
  }
  
  verifyDefaultPage(defaultPage:string){
    this.verifyElementAttributeValue(currentPage,'value',defaultPage);
    return this;
  }

  verifyPagingNavigatorDisplay(){
    cy.xpath(totalResults)
    .invoke('text')
    .then((text) => {
      let number = parseInt(text); 
      if(number>10){
        cy.verifyElementDisplay(pagingNavigator);
      }else{
        cy.verifyElementNotVisible(pagingNavigator);
      }
    });
  return this;
  }

  goToTransactionListPage() {
    this.openAnyUrl("/transactions");
    return this;
  }

  verifyDataOfNoColumn() {
    cy.verifyAllElementDisplay(itemNo);
    cy.verifyFieldSorted(itemNo, "asc");
    return this;
  }

  verifyDataOfTxHashColumn() {
    cy.verifyAllElementDisplay(itemListsWithLink, TransactionConstants.COLUMN_NAME[1]);
    cy.getAllTextContent(itemListsWithLink, (txt: string) => {
      expect(this.isFormatStringRight(txt, 10, 7, 3)).be.true;
    }, TransactionConstants.COLUMN_NAME[1])
    cy.checkDateTimeFormat(itemDateTxn, TransactionConstants.DATE_TIME[0], TransactionConstants.COLUMN_NAME[1]);
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

  verifyDataOfBlockColumn() {
    cy.verifyAllElementDisplay(itemListsWithLink, TransactionConstants.COLUMN_NAME[2]);
    return this;
  }
  
  verifyDataOfFeesColumn() {
    cy.verifyAllElementDisplay(itemFees);
    return this;
  }

  verifyDataOfOutputInADAColumn() {
    cy.verifyAllElementDisplay(itemOutputInADA);
    return this;
  }

  verifyDataOfInputAddressColumn() {
    cy.verifyAllElementDisplay(itemListsWithLink, TransactionConstants.COLUMN_NAME[5]);
    return this;
  }

  verifyDataOfOutputAddressColumn() {
    cy.verifyAllElementDisplay(itemListsWithLink, TransactionConstants.COLUMN_NAME[6]);
    return this;
  }

  verifyDisplayQuickViews() {
    cy.verifyAllElementDisplay(quickViews,'');
    return this;
  }

  hoverToTxHash() {
    cy.hoverToElementRandomly(itemListsWithLink, TransactionConstants.COLUMN_NAME[1]);
    return this;
  }

  verifyDisplayFullData() {
    cy.verifyElementDisplay(displayFullData);
    return this;
  }

  clickOnAnyTxHash() {
    cy.clickElementRandomly(itemListsWithLink, TransactionConstants.COLUMN_NAME[1]);
    return this;
  }

  verifyDisplayTransactionDetailPage() {
    cy.verifyElementDisplay(transactionDetailTxt);
    return this;
  }

  goBackToPreviousPage() {
    cy.go('back');
    return this;
  }

  clickToAnyBlock() {
    cy.clickElementRandomly(itemBlocks);
    return this;
  }

  verifyDisplayBlockDetailPage() {
    cy.verifyElementDisplay(blockDetailTxt);
    return this;
  }

  clickOnAnyEpoch() {
    cy.clickElementRandomly(itemEpochs);
    return this;
  }

  verifyDisplayEpochDetailPage() {
    cy.verifyElementDisplay(epochDetailTxt);
    return this;
  }

  clickOnSortFeesBtn() {
    cy.clickElement(feesBtn);
    return this;
  }

  verifySortedData(sortOrder: string, value: string) {
    cy.verifyElementInvisible(waitingIcon);
    cy.verifyFieldSorted(itemLists, sortOrder, value);
    return this;
  }

  clickOnSortOutputInADABtn() {
    cy.clickElement(outputInADABtn);
    return this;
  }

  hoverToInputAddress() {
    cy.hoverToElementRandomly(itemListsWithLink, TransactionConstants.COLUMN_NAME[5]);
    return this;
  }

  verifyDisplayAddressDetailPage() {
    cy.verifyElementDisplay(addressDetailTxt);
    return this;
  }

  clickOnAnyInputAddress() {
    cy.clickElementRandomly(itemListsWithLink, TransactionConstants.COLUMN_NAME[5]);
    return this;
  }

  hoverToOutputAddress() {
    cy.hoverToElementRandomly(itemListsWithLink, TransactionConstants.COLUMN_NAME[6]);
    return this;
  }

  clickOnAnyOutputAddress() {
    cy.clickElementRandomly(itemListsWithLink, TransactionConstants.COLUMN_NAME[6]);
    return this;
  }

  clickOnAnyQuickView() {
    cy.clickElementRandomly(quickViews);
    return this;
  }

  verifyQuickViewPopup() {
    cy.verifyElementDisplay(blockTxt);
    cy.verifyElementDisplay(slotTxt);
    cy.verifyElementDisplay(epochTxt);
    cy.verifyElementDisplay(createdTxt);
    cy.checkDateTimeFormat(createdTxt, TransactionConstants.DATE_TIME[0],'');
    cy.verifyElementDisplay(confirmationTxt);
    cy.verifyElementDisplay(transactionFeeTxt);
    cy.verifyElementDisplay(totalAmountTxt);
    cy.verifyElementDisplay(status);
    cy.xpath(summaryBtnOnQuickView).verifyElementEnabled();
    cy.xpath(utxosBtnOnQuickView).verifyElementEnabled();
    cy.xpath(txHahOnQuickModel).invoke("text").then(text => {
      expect(this.isFormatStringRight(text, 10, 7, 3)).be.true;
    })
    this.verifyListElementAttribute(txHahOnQuickModel,'href');
    this.verifyListElementAttribute(inputOnQuickModel,'href');
    this.verifyListElementAttribute(outputOnQuickModel,'href');
    cy.xpath(closeBtn).verifyElementEnabled();
    cy.xpath(viewDetailTxt).verifyElementEnabled();
    return this;
  }

  clickOnAnyRecord() {
    cy.clickElementRandomly(records);
    return this;
  }

  clickOnTxHash() { 
    cy.clickElement(txHahOnQuickModel);
    return this;
  }

  hoverToInput() {
    cy.hoverToElement(inputOnQuickModel);
    return this;
  }

  clickOnInput() { 
    cy.clickElement(inputOnQuickModel);
    return this;
  }

  hoverToOutput() {
    cy.hoverToElement(outputOnQuickModel);
    return this;
  }

  clickOnOutput() { 
    cy.clickElement(outputOnQuickModel);
    return this;
  }

  verifyDefaultNumberRecord(defaultNumber: number) {
    cy.xpath(numberRecordPerPage).getTextContent().then(text =>{
      expect(defaultNumber).to.equal(parseInt(text));
    })
    return this;
  }

  clickToPerPage() {
    cy.clickElement(numberRecordPerPage);
    return this;
  }

  verifyOptionPerPage() {
    const expected: any[] = []
    cy.getAllTextContent(numberPerPageList, (txt: string) => {
      expected.push(parseInt(txt));
    }).then(() =>{
      expect(expected).to.deep.equal(TransactionConstants.PER_PAGE);
    })
    return this;
  }

  selectOptionPerPage(amount: number) {
    cy.clickElement(optionPerPage, amount);
    return this;
  }

  verifyNumberRecordDisplay() {
    cy.xpath(numberRecordPerPage)
    .invoke("text")
    .then((text) => {
      cy.xpath(records).should("have.length", text);
    });
  return this;
  }

  clickOnNextPagingBtn() {
    cy.clickElement(nextPagingBtn);
    return this;
  }

  clickOnBackPagingBtn() {
    cy.clickElement(backPagingBtn);
    return this;
  }

  verifyNextPagingSuccessfully() {
    cy.xpath(currentPage).getAttributeValue("value").then(textBefore => {
      this.clickOnNextPagingBtn();
      cy.xpath(currentPage).getAttributeValue("value").then(textAfter => {
      expect(textBefore).not.to.equal(textAfter);
      })
    })
    return this;
  }

  verifyBackPagingSuccessfully() {
    cy.xpath(currentPage).getAttributeValue("value").then(textBefore => {
      this.clickOnNextPagingBtn();
      cy.xpath(currentPage).getAttributeValue("value").then(textAfter => {
      expect(textBefore).not.to.equal(textAfter);
      })
    })
    return this;
  }

  clickOnLastestPageBtn() {
    cy.clickElement(lastestPageBtn);
    return this;
  }

  verifyLastestPageBtnIsDisable() {
    cy.xpath(lastestPageBtn).verifyElementUnabled();
    return this;
  }

  clickOnFisrtPageBtn() {
    cy.clickElement(firstPageBtn);
    return this;
  }

  verifyFirstPageBtnIsDisable() {
    cy.xpath(firstPageBtn).verifyElementUnabled();
    return this;
  }

  enterPageNumber(numberPage: string) {
    cy.xpath(inputPageNumber).setInputValue(numberPage);
    cy.xpath(inputPageNumber).type('{enter}');
    return this;
  }
}
