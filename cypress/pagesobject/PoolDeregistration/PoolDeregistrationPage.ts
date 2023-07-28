import WebApi from "cypress/core/WebApi";
import * as util from 'util';
import { PoolDeregistrationConstants } from "cypress/fixtures/constants/PoolDeregistrationConstants";
import { parse } from "path";

//locators
const operationalCertificatesMenu = "//span[contains(text(), 'Operational Certificates')]";
const poolDeregistrationMenu = "//span[contains(text(), 'Pool Deregistration')]"; 
const titlePoolDeregistrationPage = "//h2[contains(text(), 'Pool Deregistration')]";
const poolDeregistrationColumnName = "//th[contains(text(),'{0}')]";
const currentPage = "nav[aria-label='pagination navigation'] input";
const totalResults = "//div[text()='Results']/span";
const pagingNavigator = "nav[aria-label='pagination navigation']";
const itemListWithLink = "//table//tbody//tr//td[count(//th[contains(text(),'{0}')]//preceding-sibling::th) + boolean(//th[contains(text(),'{0}')])]//a";
const itemListWithLinkJs = "//table//tbody//tr//td[count(//th[contains(text(),'%s')]//preceding-sibling::th) + boolean(//th[contains(text(),'%s')])]//a";
const itemList = "//table//tbody//tr//td[count(//th[contains(text(),'{0}')]//preceding-sibling::th) + boolean(//th[contains(text(),'{0}')])]";
const itemBlock = "//table//tbody//tr//td[count(//th[contains(text(),'Block')]//preceding-sibling::th) + boolean(//th[contains(text(),'Block')])]//a[1]";
const itemEpoch = "//table//tbody//tr//td[count(//th[contains(text(),'Block')]//preceding-sibling::th) + boolean(//th[contains(text(),'Block')])]//a[2]";
const displayFullData = "//div[contains(@class,'MuiTooltip-tooltip')]";
const titleTransactionDetailPage = "//div[contains(text(),'Transaction details')]";
const titleBlockDetailPage = "//div[contains(text(),'Block details')]";
const titleEpochDetailPage = "//div[contains(text(),'Epoch details')]";
const titlePoolDetailPage = "//h2[contains(text(),'{0}')]";
const titleStakeAddressDetailPage = "//div[contains(text(),'Stake Address Details')]";
const firstPool = "//table//tbody//tr[1]//td[count(//th[contains(text(),'Pool')]//preceding-sibling::th) + boolean(//th[contains(text(),'Pool')])]//span";
const sortTxHashBtn = "//th[contains(text(),'Tx Hash')]//button";
const sortPledgeBtn = "//th[contains(text(),'Pledge (A)')]//button";
const sortFixedCostBtn = "//th[contains(text(),'Fixed Cost (A)')]//button";
const sortMarginBtn = "//th[contains(text(),'Margin')]//button";
const waitingIcon = "//span[contains(@class,'MuiCircularProgress-root')]";
const records = "//table//tbody/tr";
const numberRecordPerPage = '//span[contains(text(),"Per page")]//preceding-sibling::div/div';
const numberPerPageList = "//ul[@role='listbox']//li";
const optionPerPage = "//ul//li[text()='{0}']";
const nextPagingBtn = "//ul//li[10]//button";
const backPagingBtn = "//ul//li[2]//button";
const lastestPageBtn = "//ul//li[11]//button";
const firstPageBtn = "//ul//li[1]//button";
const inputPage = "//li/div/input";

export default class PoolDeregistrationPage extends WebApi {
    goToHomePage() {
        this.openAnyUrl("/");
        return this;
    }

    clickOnOperationalCertificatesMenu() {
        cy.clickElement(operationalCertificatesMenu);
        return this;
    }

    clickOnPoolDeregistrationMenu() {
        cy.clickElement(poolDeregistrationMenu);
        return this;
    }

    verifyPoolDeregistrationTable() {
        this.isElementVisibleByXpath(titlePoolDeregistrationPage);
        this.isElementVisibleByXpath(poolDeregistrationColumnName, "Tx Hash");
        this.isElementVisibleByXpath(poolDeregistrationColumnName, "Created At");
        this.isElementVisibleByXpath(poolDeregistrationColumnName, "Block");
        this.isElementVisibleByXpath(poolDeregistrationColumnName, "Pool");
        this.isElementVisibleByXpath(poolDeregistrationColumnName, "Pledge (A)");
        this.isElementVisibleByXpath(poolDeregistrationColumnName, "Fixed Cost (A)");
        this.isElementVisibleByXpath(poolDeregistrationColumnName, "Margin");
        this.isElementVisibleByXpath(poolDeregistrationColumnName, "Stake Address");
        return this;
    }

    verifyDefaultPage(defaultPage:string){
        this.verifyElementAttributeValue(currentPage,'value',defaultPage);
        return this;
    }

    verifyPagingNavigatorDisplay(){
        cy.xpath(totalResults).getTextContent().then((value)=>{
            const number = parseInt(value.replace(",",""));
            cy.log(number.toString());
            if(number>10){
            cy.verifyElementDisplay(pagingNavigator);
            }
            else{
            cy.verifyElementNotVisible(pagingNavigator);
            }
        })
        return this;
    }
    
    goToPoolDeregistrationPage() {
        this.openAnyUrl("/pool-de-registrations");
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

    verifyDataOfTxHashColumn() {
        cy.verifyAllElementDisplay(itemListWithLink, PoolDeregistrationConstants.COLUMN_NAME[0]);
        cy.getAllTextContent(itemListWithLink, (txHash: string) => {
          expect(this.isFormatStringRight(txHash, 10, 7, 3)).be.true;
        }, PoolDeregistrationConstants.COLUMN_NAME[0]);
        this.verifyListElementAttribute(util.format(itemListWithLinkJs, PoolDeregistrationConstants.COLUMN_NAME[0], PoolDeregistrationConstants.COLUMN_NAME[0]),'href');
        return this;
    }

    verifyDataOfCreateAtColumn() {
        cy.verifyAllElementDisplay(itemList, PoolDeregistrationConstants.COLUMN_NAME[1]);
        cy.checkDateTimeFormat(itemList, PoolDeregistrationConstants.DATE_TIME[0], PoolDeregistrationConstants.COLUMN_NAME[1]);
        return this;
    }
    
    verifyDataOfBlockColumn() {
        cy.verifyAllElementDisplay(itemListWithLink, PoolDeregistrationConstants.COLUMN_NAME[2]);
        this.verifyListElementAttribute(util.format(itemListWithLinkJs, PoolDeregistrationConstants.COLUMN_NAME[2], PoolDeregistrationConstants.COLUMN_NAME[2]),'href');
        return this;
    }

    verifyDataOfPoolColumn() {
        cy.verifyAllElementDisplay(itemListWithLink, PoolDeregistrationConstants.COLUMN_NAME[3]);
        this.verifyListElementAttribute(util.format(itemListWithLinkJs, PoolDeregistrationConstants.COLUMN_NAME[3], PoolDeregistrationConstants.COLUMN_NAME[3]),'href');
        return this;
    }

    verifyDataOfPledgeColumn() {
        cy.verifyAllElementDisplay(itemList, PoolDeregistrationConstants.COLUMN_NAME[4]);
        return this;
    }

    verifyDataOfFixedCostColumn() {
        cy.verifyAllElementDisplay(itemList, PoolDeregistrationConstants.COLUMN_NAME[5]);
        return this;
    }

    verifyDataOfMarginColumn() {
        cy.verifyAllElementDisplay(itemList, PoolDeregistrationConstants.COLUMN_NAME[6]);
        return this;
    }
    
    verifyDataOfStakeAddressColumn() {
        cy.verifyAllElementDisplay(itemListWithLink, PoolDeregistrationConstants.COLUMN_NAME[7]);
        cy.getAllTextContent(itemListWithLink, (stakeAdd: string) => {
            expect(this.isFormatStringRight(stakeAdd, 5, 5, 3)).be.true;
          }, PoolDeregistrationConstants.COLUMN_NAME[7]);
        this.verifyListElementAttribute(util.format(itemListWithLinkJs, PoolDeregistrationConstants.COLUMN_NAME[7], PoolDeregistrationConstants.COLUMN_NAME[7]),'href');
        return this;
    }

    hoverToTxHash() {
        cy.hoverToElementRandomly(itemListWithLink, PoolDeregistrationConstants.COLUMN_NAME[0]);
        return this;
    }

    hoverToPool() {
        cy.hoverToElementRandomly(itemListWithLink, PoolDeregistrationConstants.COLUMN_NAME[3]);
        return this;
    }

    hoverToStakeAddress() {
        cy.hoverToElementRandomly(itemListWithLink, PoolDeregistrationConstants.COLUMN_NAME[7]);
        return this;
    }
    
    verifyDisplayFullData() {
        cy.verifyElementDisplay(displayFullData);
        return this;
    }

    clickOnAnyTxHash() {
        cy.clickElementRandomly(itemListWithLink, PoolDeregistrationConstants.COLUMN_NAME[0]);
        return this;
    }

    verifyDisplayTransactionDetailPage() {
        cy.verifyElementDisplay(titleTransactionDetailPage);
        return this;
    }
    
    goBackToPreviousPage() {
        cy.go('back');
        return this;
    }

    clickToAnyBlock() {
        cy.clickElementRandomly(itemBlock);
        return this;
    }
    
    verifyDisplayBlockDetailPage() {
        cy.verifyElementDisplay(titleBlockDetailPage);
        return this;
    }
    
    clickOnAnyEpoch() {
        cy.clickElementRandomly(itemEpoch);
        return this;
    }
    
    verifyDisplayEpochDetailPage() {
        cy.verifyElementDisplay(titleEpochDetailPage);
        return this;
    }

    clickOnFirstPool() {
        cy.clickElement(firstPool);
        return this;
    }
    
    async getFirstPoolName() {
        return await this.getTextElement(firstPool);
    }

    verifyDisplayPoolDetailPage(poolName: string) {
        cy.verifyElementDisplay(titlePoolDetailPage, poolName);
        return this;
    }
    
    clickOnAnyStakeAddress() {
        cy.clickElementRandomly(itemListWithLink, PoolDeregistrationConstants.COLUMN_NAME[7]);
        return this;
    }
    
    verifyDisplayStakeAddressDetailPage() {
        cy.verifyElementDisplay(titleStakeAddressDetailPage);
        return this;
    }

    clickOnSortTxHashBtn() {
        cy.clickElement(sortTxHashBtn);
        return this;
    }

    clickOnSortPledgeBtn() {
        cy.clickElement(sortPledgeBtn);
        return this;
    }

    clickOnSortFixedCostBtn() {
        cy.clickElement(sortFixedCostBtn);
        return this;
    }

    clickOnSortMarginBtn() {
        cy.clickElement(sortMarginBtn);
        return this;
    }
    
    verifySortedData(sortOrder: string, value: string) {
        cy.verifyElementInvisible(waitingIcon);
        cy.verifyFieldSorted(itemList, sortOrder, value);
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
          expect(expected).to.deep.equal(PoolDeregistrationConstants.PER_PAGE);
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
        cy.clickElementRandomly(nextPagingBtn);
        return this;
    }
    
    clickOnBackPagingBtn() {
        cy.clickElementRandomly(backPagingBtn);
        return this;
    }
    
    verifyNextPagingSuccessfully() {
        cy.xpath(inputPage).getAttributeValue("value").then(textBefore => {
            cy.log(textBefore);
          this.clickOnNextPagingBtn();
          cy.xpath(inputPage).getAttributeValue("value").then(textAfter => {
            cy.log(textAfter);
          expect(textBefore).not.to.equal(textAfter);
          })
        })
        return this;
    }
    
    verifyBackPagingSuccessfully() {
        cy.xpath(inputPage).getAttributeValue("value").then(textBefore => {
            cy.log(textBefore);
          this.clickOnBackPagingBtn();
          cy.xpath(inputPage).getAttributeValue("value").then(textAfter => {
            cy.log(textAfter);
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
        cy.xpath(inputPage).setInputValue(numberPage);
        cy.xpath(inputPage).type('{enter}');
        return this;
    }
}