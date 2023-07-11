import WebApi from "../core/WebApi"

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
const btnSortCreated = "//th[normalize-space()='Created']//button[@type='button']//*[name()='svg']"
const txbPageNumber = "//input[@value='1']"
const selectNumberItemsPage = "//span[text()= 'Per page']/preceding-sibling::div"

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
}