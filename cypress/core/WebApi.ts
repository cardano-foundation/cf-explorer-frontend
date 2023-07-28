const format = require('string-format');
export default class WebApi {
  openAnyUrl(url: string) {
    cy.visit(url);
  }
  getPageTitle() {
    return cy.title;
  }
  clickToElementByXpath(locator: string) {
    cy.xpath(locator).click();
  }
  clickToElement(locator: any) {
    cy.get(locator).click();
  }

  verifyElementAttribute(locator:string,attributeName:string){
    cy.get(locator).should('have.attr',attributeName);
  }

  verifyElementAttributeValue(locator:string,attributeName:string,attributeValue:string){
    cy.get(locator)
      .invoke('attr', attributeName)
      .should('eq', attributeValue);
  }

  verifyListElementAttribute(locatorOfListElement:string,attributeName:string){
    if (locatorOfListElement.startsWith("/") || locatorOfListElement.startsWith("(")) {
      cy.xpath(locatorOfListElement).each(($element) => {
        // Perform assertions on each element
        cy.wrap($element).should('have.attr', attributeName);
      });;
    } else {
      cy.get(locatorOfListElement).each(($element) => {
        // Perform assertions on each element
        cy.wrap($element).should('have.attr', attributeName);
      });;
    }
  }

  verifyNumberOfListElement(locatorOfListElement:string,numberOfElement:number){
    cy.get(locatorOfListElement).each(($element) => {
      cy.wrap($element).should('have.length', numberOfElement);
    });
  }

  isElementVisibleByXpath(locator: any, ...values: any[]) {
    let ele = format(locator, values);
    cy.xpath(ele).should("be.visible");
  }
  
  isControlEnabledByXpath(locator: string, ...values: undefined[]) {
    let ele = format(locator, values);
    cy.xpath(ele).should("be.enabled");
  }
  async getTextElement(locator: string, ...values: any) {
    let ele = format(locator, values);
    const text = await new Cypress.Promise<string>((resolve) => {
      if (ele.startsWith("/") || ele.startsWith("(")) {
      cy.xpath(ele)
        .invoke('text')
        .then((txt) => resolve(txt.toString()))
      }else {
      cy.get(ele)
        .invoke('text')
        .then((txt) => resolve(txt.toString()))  
      }
    })
    return text;
  }
  async getTextSpecificElement(locator: string,no: number,...values: undefined[]) {
    let ele = format(locator, values);
    const text = await new Cypress.Promise<string>((resolve) => {
      if (ele.startsWith("/") || ele.startsWith("(")) {
      cy.xpath(ele)
        .eq(no)
        .invoke('text')
        .then((txt) => resolve(txt.toString()))
      }else {
      cy.get(ele)
        .invoke('text')
        .then((txt) => resolve(txt.toString()))  
      }
    })
    return text;
  }
}
