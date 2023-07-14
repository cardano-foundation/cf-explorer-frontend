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
        cy.verifyElementDisplay(labelTokenId)
        cy.clickElement(btnBack)
        return this;
    }
    verifyTotalTransactionsIsSorted(){
        cy.clickElement(btnSortTotalTransactions)
        cy.verifyFieldSorted(itemListsWithTitle, TokenConstants.COLUMN_NAME[3])
        return this;
    }

}
