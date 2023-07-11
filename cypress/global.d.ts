/// <reference types="cypress" />

declare namespace Cypress {
  interface ResolvedConfigOptions {
    hideXHRInCommandLog?: boolean;
  }
}

declare namespace Cypress {
  interface Chainable {
    clickElement(locator: string, args?: any): Chainable<JQuery<HTMLElement>>;
    verifyElementDisplay(locator: string, args?: any): Chainable<JQuery<HTMLElement>>;
    verifyAllElementDisplay(locator: string, args?: any): Chainable<JQuery<HTMLElement>>;
    verifyElementDisplayCssChainable(): Chainable<JQuery<HTMLElement>>;
    verifyElementNotVisible(locator: string, args?: any): Chainable<JQuery<HTMLElement>>;
    verifyElementNotExistXpath(locator: string, args?: any): Chainable<JQuery<HTMLElement>>;
    verifyText(locator: string, expectedText:string): Chainable<JQuery<HTMLElement>>;
    verifyValueNotNull(locator: string, args?: any): Chainable<JQuery<HTMLElement>>;
    getTextContent(): Chainable<string>;
    getAllTextContent(locator: any, txt:any, value:any);
    checkDateTimeFormat(): Chainable<JQuery<HTMLElement>>;
    getAttributeValue(attName:string): Chainable<string>;
    setAttributeValue(attName:string,attValue:string): Chainable<JQuery<HTMLElement>>;
    verifyElementEnabled(locator: string, args?: any): Chainable<JQuery<HTMLElement>>;
    setInputValue(inputValue: string, args?: any): Chainable<JQuery<HTMLElement>>;
  }
}

