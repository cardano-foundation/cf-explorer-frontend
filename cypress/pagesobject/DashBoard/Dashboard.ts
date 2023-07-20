import exp from "constants";
import WebApi from "../../core/WebApi"
import * as util from 'util';

const networkDropdownList = "//div[@id='main']//div[@data-testid='header-network']";
const networkDropdownListSelection = "//div[@id='menu-']//ul//li[text()='Mainnet']";
const blockchainDropdownList = "//div[@data-testid='menu-button-blockchain']";
const allFiltersDropdown ="//div[@id='main']//div[@data-testid='all-filters-dropdown']";
const allFiltersDropdownSelected ="//div[@id='main']//div[@data-testid='all-filters-dropdown']//div";
const allFiltersDropdownSelection ="//li[@data-testid='filter-options']";
const allFiltersDropdownOption ="//li[@data-testid='filter-options' and text()='%s']";
const searchBar ="//div[@data-testid='search-bar']";
const searchBarInput ="//div[@data-testid='search-bar']//input";
const searchBarButton ="//div[@data-testid='search-bar']/following-sibling::button";
const noResultAlert ="//div[@data-testid='search-bar']//following-sibling::div//div";

const pageTitleEle ="//header[@data-testid='header']/following-sibling::div//div[text()='%s']";
const detailValue = "//header[@data-testid='header']/following-sibling::div//p/div/span";

const epochNumber ="//div[@data-test-id='CircularProgressbarWithChildren__children']//a";
const addressDetail ="//div[text()='Address']//following-sibling::div/small";

//side bar
const blockchainDropdownListOption ="//div[@data-testid='menu-button-blockchain']/following-sibling::div//ul//a/div/span";
const blockchainDropdownOption ="//div[@data-testid='menu-button-blockchain']/following-sibling::div//ul//a/div/span[text()='%s']";
const operationalCertificate ="//div[@data-testid='menu-button-operational_certificates']";
const operationalCertificateOption ="//div[@data-testid='menu-button-operational_certificates']/following-sibling::div//ul//a//div/span";
const browse ="//span[text()='Browse']/../..";
const browseOptionList ="//span[text()='Browse']/../../following-sibling::div//ul/div/div/span";
const browseOption ="//span[text()='Browse']/../../following-sibling::div//ul/div/div/span[text()='{0}']";
const browseOptions ="//span[text()='Browse']/../../following-sibling::div//ul/div/div/span[text()='%s']";
const resources ="//span[text()='Resources']/../..";
const resourcesOption ="//span[text()='Resources']/../../following-sibling::div//ul/div/div/span";
const resourcesOptionList ="//span[text()='Resources']/../../following-sibling::div//ul/div/div/span[text()='%s']";
const expandCollapseBtn ="//button[@data-testid='toggle-sidebar-toggle-menu']";
const sidebar ="nav >div[sidebar]";
const logo ="//img[@alt='logo cardano']/..";
const dashboardContainer ="//div[@data-testid='home-container']";
const pageTitle ="//h2";

//footer
const footer ="//footer[@data-testid='footer']";
const termAndPolicy ="//small[@data-testid='footer-text']";
const footerNavigate ="//button[@data-testid='toggle-sidebar-toggle-menu']/following-sibling::nav//ul[@bottom]//a[@title='%s']"
const navigatedPage ="//*[contains(text(),'%s')]"

export default class DashboardPage extends WebApi{
  
  constructor(){
    super();
  }
  
  goToDashboardPage() {  
    this.openAnyUrl("/")
    return this;
  }

  goToDashboardPage1() {  
    this.openAnyUrl("/")
    return this;
  }

  clickOperationalCertificate() {
    cy.xpath(operationalCertificate).click();
    return this;
  }

  clickBrowse() {
    cy.xpath(browse).click();
    return this;
  }

  clickResources() {
    cy.xpath(resources).click();
    return this;
  }

  clickNetworkDropDownList() {
    cy.xpath(networkDropdownList).click();
    return this;
  }

  clickNetworkDropDownListOption() {
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

  clickOnBlockChainDropDownOption() {
    cy.clickElementRandomly(blockchainDropdownListOption);
    return this;
  }

  clickOnSpecificBlockChainDropDownOption(option:string) {
    cy.clickElement(util.format(blockchainDropdownOption,option));
    return this;
  }

  clickOnExpandCollapseBtn() {
    cy.hoverToElementRandomly(blockchainDropdownList);
    cy.clickElement(expandCollapseBtn)
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

verifySearchButtonDisabled(){
  cy.xpath(searchBarButton).should('be.disabled');
  return this;
}

verifyNavigatedToPage(pageTitle:string){
  cy.wait(2000)
  cy.verifyElementDisplay(util.format(pageTitleEle,pageTitle))
  return this;
}

verifyDetailValueAfterSearch(valueExpected:string){
  cy.verifyText(detailValue,valueExpected)
  return this;
}

verifyDetailEpochAfterSearch(valueExpected:string){
  cy.verifyText(epochNumber,valueExpected)
  return this;
}

verifyDetailAddressAfterSearch(valueExpected:string){
  cy.verifyText(addressDetail,valueExpected)
  return this;
}

verifyNoResultDisplay(){
  cy.xpath(noResultAlert,{timeout:20000}).should("be.visible");
  return this;
}

verifyBlockchainDropdownSelection(blockchainSelection:string[]){
  cy.xpath(blockchainDropdownListOption).each((listItem, index) => {
    cy.wrap(listItem).should('have.text', blockchainSelection[index]);
})
return this;
}

verifyOperationalDropdownSelection(operationalSelection:string[]){
  cy.xpath(operationalCertificateOption).each((listItem, index) => {
    cy.wrap(listItem).should('have.text', operationalSelection[index]);
})
return this;
}

verifyBrowseDropdownSelection(browseSelection:string[]){
  cy.xpath(browseOptionList).each((listItem, index) => {
    cy.wrap(listItem).should('have.text', browseSelection[index]);
})
return this;
}

verifyResourceslDropdownSelection(resourcesSelection:string[]){
  cy.xpath(resourcesOption).each((listItem, index) => {
    cy.wrap(listItem).should('have.text', resourcesSelection[index]);
})
return this;
}

verifySideBarIsCollapsed(){
  cy.get(sidebar).getAttributeValue('sidebar').then((value)=>{
    expect(value).to.equal('0')
  })
  return this;
}

verifySideBarIsExpanded(){
  cy.get(sidebar).getAttributeValue('sidebar').then((value)=>{
    expect(value).to.equal('1')
  })
  return this;
}

clickOnLogo(){
  cy.clickElement(logo);
  return this;
}

verifyReturnToHomePage(){
  cy.wait(2000)
  cy.verifyElementDisplay(dashboardContainer);
  return this;
}

verifyPageNavigated(page:string){
  cy.xpath(pageTitle).getTextContent().then((value)=>{
    expect(value).to.equal(page);
  })
  return this;
}

verifyBlockchainDropdownIsCollapsed(){
  cy.verifyElementNotVisible(blockchainDropdownListOption);
  return this;
}

clickBrowseOption(option:string){
  cy.clickElement(browseOption,option);
  return this;
}

clickOnButtonAndVerifyURLNavigated(button:string ,URL:string){
  let buttonEle ='';
  let buttonEleOption ='';
  switch (button){
    case 'About Us':
    case 'Contact Us':
    case 'Cardano Docs':
    case 'News and Blog':
      buttonEle = browse;
      buttonEleOption = util.format(browseOptions,button);
      break;

    case 'Blockchain Course':
    case 'Builder Tools':
    case 'Github':
      buttonEle = resources;
      buttonEleOption = util.format(resourcesOptionList,button);
      break;   
  }
  cy.xpath(buttonEle).click();
  cy.window().then((win) => {
    cy.stub(win, 'open').as('windowOpenStub');
  });

  cy.xpath(buttonEleOption).click();
  if(button!='Cardano Docs'){
    cy.get('@windowOpenStub').its('firstCall.args.0').then((url) =>{
      expect(url).to.contain(URL)
    });
  }
  return this;
}

clickOnButtonInFooterAndVerifyPageNavigated(button:string,URL:string){
  cy.xpath(util.format(footerNavigate,button)).invoke('attr','href').then(value=>{
    expect(value).to.contain(URL)
  })
  cy.xpath(util.format(footerNavigate,button)).click();
  return this;
}

verifyTermAndPolicy(value:string){
  cy.xpath(termAndPolicy).getTextContent().then((text)=>{
    expect(text).toContain(value)
  })
  return this;
}

verifyFooterDisplayed(){
  cy.verifyElementDisplay(footer)
  return this;
}
}
