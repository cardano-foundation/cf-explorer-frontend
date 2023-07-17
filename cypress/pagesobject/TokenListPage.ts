// import format from "@stdlib/string-format";
import WebApi from "../core/WebApi"
import { TokenConstants } from "../fixtures/constants/TokenConstants";
import { log } from "console";

const blockchainDropdownList = "//span[text()='Blockchain']/..";
const nativeTokensPanel = "//span[text()='Native Tokens']/..";
const listIcon = "//img[@class='css-1nkc52']";
const listHyperLink = "a[class='css-1f770t5']"
const btnNextPage = "//ul[contains(@class, 'MuiPagination-ul')]/li[10]//button"
const btnPrePage = "//ul[contains(@class, 'MuiPagination-ul')]/li[2]//button"
const btnFirstPage = "//ul[contains(@class, 'MuiPagination-ul')]/li[1]//button"
const btnEndPage = "//ul[contains(@class, 'MuiPagination-ul')]/li[11]//button"
const btnSortTotalTransactions = "//th[normalize-space()='Total Transactions']//button[@type='button']//*[name()='svg']"
const btnSortTotalSupply = "//th[normalize-space()='Total Supply']//button[@type='button']//*[name()='svg']"
const btnSortCreated = "//th[normalize-space()='Created At']//button[@type='button']//*[name()='svg']"
const txbPageNumber = "//input[@value='1']"
const selectNumberItemsPage = "//span[text()= 'Per page']/preceding-sibling::div"
const listTitleColumn = "//thead[@class='css-1dz0v3k']//tr//th[normalize-space()='{0}']";

const itemListsWithTitle = "(//table//tbody//tr//td[count(//th[contains(text(),'{0}')]//preceding-sibling::th) + boolean(//th[contains(text(),'{0}')])])";
const btnViewDetail = "//a[normalize-space()='View Details']"
const labelTokenId = "//small[contains(text(), 'Token ID')]"
const btnBack = "//small[contains(text(), 'Back')]"
const listRowItems = "//tr[@class='css-1ius8pw']"

const labelTotalSupplyInQuickView = "//small[normalize-space()='Total Supply']"
const totalSupplyInQuickView = "//small[normalize-space()='Total Supply']/following-sibling::span"
const labelDecimalInQuickView = "//small[normalize-space()='Decimal']"
const decimalInQuickView = "//small[normalize-space()='Decimal']/following-sibling::span"
const policyIdInQuickView = "//small[normalize-space()='Policy ID']/following-sibling::small/a"
const tokenIdInQuickView = "//small[normalize-space()='Token ID']/following-sibling::small/a"
const assetNameInQuickView = "//small[normalize-space()='Asset name']/following-sibling::small//small"
const totalTransactionsInQuickView = "//small[normalize-space()='Total Transactions']/following-sibling::small"
const numberOfHoldersInQuickView = "//small[normalize-space()='Number of Holders']/following-sibling::small"
const totalVolumeInQuickView = "//small[normalize-space()='Total Volume']/following-sibling::small"
const volume24HInQuickView = "//small[normalize-space()='Volume 24H']/following-sibling::small"
const iconCopyInQuickView = "//small[normalize-space()='Policy ID']/following-sibling::small//button"
const tabTransactionInQuickView = "//h4[normalize-space()='Transactions']"
const tabTopHolders = "//h4[normalize-space()='Top Holders']"
const tabTokenMint = "//h4[normalize-space()='Token Mint']"
const tabTopHoldersInTokenDetail = "//div[text()='Top Holders']/ancestor::button"
const tabTransactionInTokenDetail = "//div[text()='Transactions']/ancestor::button"
const tabMintingInTokenDetail = "//div[text()='Minting']/ancestor::button"
const btnClose = "//button[@aria-label='Close']"


export default class TokenListPage extends WebApi{
    constructor(){
        super();
    }

    goToHomePage() {
        this.openAnyUrl("tokens")
        return this;
    }

    clickToBlockChainMenu() {
        this.clickToElementByXpath(blockchainDropdownList);
        return this;
    }

    clickToNativeTokensPanel() {
        this.clickToElementByXpath(nativeTokensPanel);
        return this;
    } 

    verifyIconIsEnable(){
        cy.xpath(listIcon, { timeout: 10000 }).each((ele)=>{
            cy.wrap(ele).should('not.have.attr', 'disabled');
        })
        return this;
    }

    checkTitleColumn(){
        cy.verifyElementDisplay(listTitleColumn, TokenConstants.COLUMN_NAME[0])
        cy.verifyElementDisplay(listTitleColumn, TokenConstants.COLUMN_NAME[1])
        cy.verifyElementDisplay(listTitleColumn, TokenConstants.COLUMN_NAME[2])
        cy.verifyElementDisplay(listTitleColumn, TokenConstants.COLUMN_NAME[3])
        cy.verifyElementDisplay(listTitleColumn, TokenConstants.COLUMN_NAME[4])
        cy.verifyElementDisplay(listTitleColumn, TokenConstants.COLUMN_NAME[5])
        cy.verifyElementDisplay(listTitleColumn, TokenConstants.COLUMN_NAME[6])
        cy.verifyElementDisplay(listTitleColumn, TokenConstants.COLUMN_NAME[7])
        cy.verifyElementDisplay(listTitleColumn, TokenConstants.COLUMN_NAME[8])
        return this;
    }

    clickToBtnNextPage() {
        this.clickToElementByXpath(btnNextPage);
        return this;
    }

    clickToBtnSortTotalTransaction() {
        this.clickToElementByXpath(btnSortTotalTransactions);
        return this;
    }

    clickToBtnSortTotalSupply() {
        this.clickToElementByXpath(btnSortTotalSupply);
        return this;
    }

    clickToBtnSortCreated() {
        this.clickToElementByXpath(btnSortCreated);
        return this;
    }

    verifyButtonNextPage(){
        cy.xpath(btnNextPage).should('not.have.attr', 'disabled');
        return this;
    }

    verifyButtonSortTotalTransaction(){
        cy.xpath(btnSortTotalTransactions).should('not.have.attr', 'disabled');
        return this;
    }

    verifyButtonSortTotalSuplly(){
        cy.xpath(btnSortTotalSupply).should('not.have.attr', 'disabled');
        return this;
    }

    verifyButtonSortCreated(){
        cy.xpath(btnSortCreated).should('not.have.attr', 'disabled');
        return this;
    }

    verifySelectNumberItemPage(){
        cy.xpath(selectNumberItemsPage).should('not.have.attr', 'disabled');
        return this;
    }

    verifyTxbPageNumberEnterNumber(){
        cy.xpath(txbPageNumber).should('have.attr', 'type', 'string');
        return this;
    }

    checkNumberPage(){
        cy.xpath(selectNumberItemsPage + '/div').invoke('text').then((text)=>{
            const pageNumber = parseInt(text);
            cy.get(listHyperLink).then((items)=>{
                expect(items.length).to.be.at.most(pageNumber);
            })
        })
        return this;
    }

    verifyColumnName() {
        for(var i = 0; i<TokenConstants.COLUMN_NAME.length; i++){
            const title = TokenConstants.COLUMN_NAME[i];
            const txtColumnName = `//th[contains(text(),'${title}')]`;
            cy.xpath(txtColumnName).scrollIntoView().should('be.visible')
        }
        return this;
    }

    verifyFormatOfCreatedAt(){
        cy.checkDateTimeFormat(itemListsWithTitle, TokenConstants.DATE_TIME[0], TokenConstants.COLUMN_NAME[7]);
        return this;
    }

    verifyDataColumnCreateAt(){
        cy.verifyAllElementDisplay(itemListsWithTitle, TokenConstants.COLUMN_NAME[7])
        return this;
    }

    verifyDataColumnTotalSupply(){
        cy.verifyAllElementDisplay(itemListsWithTitle, TokenConstants.COLUMN_NAME[8])
        return this;
    }

    verifyDataColumnVolume24H(){
        cy.verifyAllElementDisplay(itemListsWithTitle, TokenConstants.COLUMN_NAME[6])
        return this;
    }
    verifyDataColumnTotalVolume(){
        cy.verifyAllElementDisplay(itemListsWithTitle, TokenConstants.COLUMN_NAME[5])
        return this;
    }
    verifyDataColumnTotalTransaction(){
        cy.verifyAllElementDisplay(itemListsWithTitle, TokenConstants.COLUMN_NAME[3])
        return this;
    }

    checkActionClickOnAssetName(){
        cy.clickElement(itemListsWithTitle + "[1]/a", TokenConstants.COLUMN_NAME[1])
        cy.wait(10000)
        cy.verifyElementDisplay(labelTokenId)
        cy.clickElement(btnBack)
        return this;
    }

    verifyTotalTransactionsIsSorted(typeSorted: string){
        cy.verifyFieldSorted(itemListsWithTitle, typeSorted, TokenConstants.COLUMN_NAME[3])
        return this;
    }

    verifyTotalSupplyIsSorted(typeSorted: string){
        cy.verifyFieldSorted(itemListsWithTitle, typeSorted, TokenConstants.COLUMN_NAME[8])
        return this;
    }

    verifyCreatedAtIsSorted(typeSorted: string){
        cy.verifyFieldSorted(itemListsWithTitle, typeSorted, TokenConstants.COLUMN_NAME[7])
        return this;
    }

    clickRowFirst(){
        cy.clickElement(listRowItems+"[1]")
        return this;
    }

    verifyTokenId(){
        cy.xpath(tokenIdInQuickView).invoke("text").then((text)=>{
            cy.contains(text).should("contain", "asset")
        })
    }
    verifyQuickViewIcon(){
        cy.verifyElementDisplay(totalSupplyInQuickView)
        cy.verifyElementDisplay(decimalInQuickView)
        this.verifyTokenId()
        cy.verifyElementDisplay(policyIdInQuickView)
        cy.verifyElementDisplay(assetNameInQuickView)
        cy.verifyElementDisplay(totalTransactionsInQuickView)
        cy.verifyElementDisplay(numberOfHoldersInQuickView)
        cy.verifyElementDisplay(volume24HInQuickView)
        cy.xpath(iconCopyInQuickView).verifyElementEnabled()
        cy.xpath(btnViewDetail).verifyElementEnabled()
        cy.xpath(tabTransactionInQuickView).verifyElementEnabled()
        cy.xpath(tabTopHolders).verifyElementEnabled()
        cy.xpath(tabTokenMint).verifyElementEnabled()
        return this;
    }

    clickTokenId(){
        cy.clickElement(tokenIdInQuickView)
        return this;
    }

    verifyOpenTokenDetail(){
        cy.verifyElementDisplay(labelTokenId)
        cy.clickElement(btnBack)
        return this;
    }

    verifyFocusTabTransaction(){
        cy.clickElement(tabTransactionInQuickView)
        cy.xpath(tabTransactionInTokenDetail).scrollIntoView().should('have.attr', 'aria-selected', 'true')
        cy.xpath(btnBack).scrollIntoView().click()
        return this;
    }

    verifyFocusTabTopHolders(){
        cy.clickElement(tabTopHolders)
        cy.xpath(tabTopHoldersInTokenDetail).scrollIntoView().should('have.attr', 'aria-selected', 'true')
        cy.xpath(btnBack).scrollIntoView().click()
        return this;
    }

    verifyFocusTabMint(){
        cy.clickElement(tabTokenMint)
        cy.xpath(tabMintingInTokenDetail).scrollIntoView().should('have.attr', 'aria-selected', 'true')
        cy.xpath(btnBack).scrollIntoView().click()
        return this;
    }

    clickButtonClose(){
        cy.clickElement(btnClose)
        return this;
    }

    clickButtonViewDetail(){
        cy.clickElement(btnViewDetail)
        return this;
    }

    reload(){
        cy.reload()
        return this;
    }
}
