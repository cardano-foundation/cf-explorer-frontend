import WebApi from "../../core/WebApi"
import format from "@stdlib/string-format";

//epoch list
const networkDropdownList = "//div[@id='main']//div[@data-testid='header-network']";
const networkDropdownListSelection = "//div[@id='menu-']//ul//li";
const blockchainDropdownList = "//span[text()='Blockchain']/..";
const allFiltersDropdown ="//div[@id='main']//div[@data-testid='all-filters-dropdown']";
const searchBar ="//div[@data-testid='search-bar']";



export default class DashboardPage extends WebApi{
  
  constructor(){
    super();
  }
  
  goToDashboardPage() {  
    this.openAnyUrl("/")
    return this;
  }

  clickNetworkDropDownList() {
    cy.clickElement(networkDropdownList);
    return this;
  }

  clickAllFiltersDropDownList() {
    cy.xpath(allFiltersDropdown).click();
    return this;
  }

  clickOnBlockChainDropDownList() {
    cy.clickElement(blockchainDropdownList);
    return this;
  }

  
  verifyNetworkSelection(networkSelection:string[]){
    cy.xpath(networkDropdownListSelection).each((listItem, index) => {
      cy.wrap(listItem).should('have.text', networkSelection[index]);
  })
  return this;
}

  verifyNumberOfDisplayRow(expectedCount:string){
    // cy.get(epochNumberList).should('have.length', parseInt(expectedCount)-1);
    return this;
  }
 
}
