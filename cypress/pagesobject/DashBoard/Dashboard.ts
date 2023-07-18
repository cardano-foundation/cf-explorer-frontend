import exp from "constants";
import WebApi from "../../core/WebApi"
import * as util from 'util';

//epoch list
const networkDropdownList = "//div[@id='main']//div[@data-testid='header-network']";
const networkDropdownListSelection = "//div[@id='menu-']//ul//li";
const blockchainDropdownList = "//span[text()='Blockchain']/..";
const allFiltersDropdown ="//div[@id='main']//div[@data-testid='all-filters-dropdown']";
const allFiltersDropdownSelected ="//div[@id='main']//div[@data-testid='all-filters-dropdown']//div";
const allFiltersDropdownSelection ="//li[@data-testid='filter-options']";
const allFiltersDropdownOption ="//li[@data-testid='filter-options' and text()='%s']";
const searchBar ="//div[@data-testid='search-bar']";
const searchBarInput ="//div[@data-testid='search-bar']//input";
const searchBarButton ="//div[@data-testid='search-bar']/following-sibling::button"



export default class DashboardPage extends WebApi{
  
  constructor(){
    super();
  }
  
  goToDashboardPage() {  
    this.openAnyUrl("/")
    return this;
  }

  clickNetworkDropDownList() {
    cy.xpath(networkDropdownList).click();
    return this;
  }

  clickNetworkDropDownListRandom() {
    cy.clickElementRandomly(networkDropdownListSelection);
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

selectFilterOption(option:string){
  cy.clickElement(util.format(allFiltersDropdownOption,option));
  return this;
}

  verifyAllFilterSelection(allFIlterSelection:string[]){
    cy.xpath(allFiltersDropdownSelection).each((listItem, index) => {
      cy.wrap(listItem).should('have.text', allFIlterSelection[index]);
  })
  return this;
}

  verifyAllFilterSelectionIsEnable(){
    cy.xpath(allFiltersDropdownSelection).each((listItem) => {
      cy.wrap(listItem).should('exist').and('not.have.attr', 'disabled');
    });
  return this;
}

verifySearchBoxDisplay(){
  cy.verifyAllElementDisplay(searchBar);
  return this;
}

verifyOptionFilterSelected(option:string){
  cy.verifyText(allFiltersDropdownSelected,option);
  return this;
}

verifySearchBarInnerText(innerText:string){
  cy.xpath(searchBar).getAttributeValue('title').then((value)=>{
    expect(value).to.equal(innerText);
  })
  return this;
}

verifySearchBarBUttonDisplayed(){
  cy.verifyElementDisplay(searchBarButton);
  return this;
}

inputValueToSearchBar(value:string){
  cy.xpath(searchBarInput).setInputValue(value);
  return this;
}

clickSearchButton(){
  cy.clickElement(searchBarButton);
  return this;
}

  verifyNumberOfDisplayRow(expectedCount:string){
    // cy.get(epochNumberList).should('have.length', parseInt(expectedCount)-1);
    return this;
  }
 
}
