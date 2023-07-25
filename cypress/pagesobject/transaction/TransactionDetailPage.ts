import WebApi from "../../core/WebApi";
import {TransactionConstants} from "../../fixtures/constants/TransactionConstants"

//locators
const lastestTxHash = "//table//tbody//tr[1]//td[count(//th[contains(text(),'Tx Hash')]//preceding-sibling::th) + boolean(//th[contains(text(),'Tx Hash')])]//a";
const titleTxnDetailPage = "//div[contains(text(),'Transaction details')]";
const txHashElement = "//button[@aria-label='Copy']//preceding-sibling::span";
const epochElement = "//small[text()='Epoch']//preceding-sibling::a";
const inputSection = "//div[text()='Input']";
const outputSection = "//div[text()='Output']";
const createAt = "//div[text()='Created At ']";
const confirmation = "//div[text()='Confirmation']";
const totalOutput = "//div[text()='Total Output']";
const transactionFees = "//div[text()='Transaction Fees ']";
const block = "//div[text()='Block']";
const slot = "//div[text()='Slot']";
const summary = "//div[text()='Summary']";
const utxos = "//div[text()='UTXOs']";
const metadata = "//div[text()='Metadata']";
const inputAddress = "//div[text()='Input']/../../following-sibling::div//a";
const outputAddress = "//div[text()='Output']/../../following-sibling::div//a";
const createAtValue = "//div[contains(text(),'Created At ')]//..//..//following-sibling::div";
const totalOutputElement = "//div[contains(text(),'Total Output')]//..//..//following-sibling::div/span";
const feesElement = "//div[contains(text(),'Transaction Fees')]//..//..//following-sibling::div/span";
const blockElement = "//div[text()='Block']/../../following-sibling::div//a";
const slotElement = "//div[contains(text(),'Slot')]//..//..//following-sibling::div";
const fromAddress = "//div[text()='From']//../following-sibling::div//a";
const toAddress = "//div[text()='To']//../following-sibling::div//a";
const adaSent = "//div[text()='ADA sent:']//../following-sibling::div/span[1]";
const adaReceived = "//div[text()='ADA received:']//../following-sibling::div/span[1]";
const fullAddressTxt = "//div[contains(@class,'MuiTooltip-tooltip')]";
const titleStakeAddressDetail = "//div[text()='Stake Address Details']";
const toAddressList = "//div[text()='To']//following-sibling::div//a";
const totalInOutUtxo = "//div[contains(text(),'Total')]//following-sibling::div/span[1]";
const titleAddressDetail = "//div[contains(text(),'Address Details')]";


export default class TransactionDetailPage extends WebApi {
  goToHomePage() {
    this.openAnyUrl("/");
    return this;
  }
 
  verifyTransactionDetailPage(txHash: string) {
    cy.verifyElementDisplay(titleTxnDetailPage);
    this.getTextElement(txHashElement).then(txHashRedirect =>{
      expect(txHashRedirect).to.equal(txHash);
    })
    cy.verifyElementDisplay(inputSection);
    cy.verifyElementDisplay(outputSection);
    cy.verifyElementDisplay(createAt);
    cy.verifyElementDisplay(confirmation);
    cy.verifyElementDisplay(totalOutput);
    cy.verifyElementDisplay(transactionFees);
    cy.verifyElementDisplay(block);
    cy.verifyElementDisplay(slot);
    cy.verifyElementDisplay(summary);
    cy.verifyElementDisplay(utxos);
    return this;
  }

  verifyDisplayDataOnTransactionDetailSection(epoch: string, block: string , slot: string , fees: string, totalOutput: string) {
    this.getTextElement(epochElement).then(epochActual =>{
      expect(epochActual).to.equal(epoch);
    })
    this.getTextElement(blockElement).then(blockActual =>{
      expect(blockActual).to.equal(block);
    })
    this.getTextElement(slotElement).then(slotActual =>{
      expect(slotActual).to.equal(slot);
    })
    this.getTextElement(feesElement).then(feesActual =>{
      expect(feesActual).to.equal(fees);
    })
    this.getTextElement(totalOutputElement).then(totalOutputActual =>{
      expect(totalOutputActual).to.equal(totalOutput);
    })
    cy.checkDateTimeFormat(createAtValue, TransactionConstants.DATE_TIME[0]);
    cy.xpath(inputAddress).invoke("text").then(text => {
      expect(this.isFormatStringRight(text, 5, 5, 3)).be.true;
    })
    cy.xpath(outputAddress).invoke("text").then(text => {
      expect(this.isFormatStringRight(text, 5, 5, 3)).be.true;
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

  verifySummaryTab() {
    cy.verifyAllElementDisplay(fromAddress);
    cy.verifyAllElementDisplay(adaSent);
    cy.hoverToElement(fromAddress);
    cy.verifyElementDisplay(fullAddressTxt);
    cy.verifyAllElementDisplay(toAddress);
    cy.verifyAllElementDisplay(adaReceived);
    cy.hoverToElement(toAddress);
    cy.verifyElementDisplay(fullAddressTxt);
    return this;
  }

  clickOnFromAddress() {
    cy.clickElement(fromAddress);
    return this;
  }

  verifyStakeAddressDetailPageDisplay() {
    cy.verifyElementDisplay(titleStakeAddressDetail);
    return this;
  }

  goBackToPreviousPage() {
    cy.go('back');
    return this;
  }
  
  clickOnToAddress() {
    cy.clickElement(toAddress);
    return this;
  }

  verifyUtxoTab() {
    cy.verifyElementDisplay(fromAddress);
    cy.verifyElementDisplay(toAddressList);
    cy.verifyElementDisplay(totalInOutUtxo);
    return this;
  }

  clickOnRamdomlyInputAddress() {
    cy.clickElementRandomly(fromAddress);
    return this;
  }

  clickOnRamdomlyOutputAddress() {
    cy.clickElementRandomly(toAddressList);
    return this;
  }

  verifyAddressDetailPageDisplay() {
    cy.verifyElementDisplay(titleAddressDetail);
    return this;
  }
  
}
