/// <reference types="cypress" />

declare namespace Cypress {
  interface ResolvedConfigOptions {
    hideXHRInCommandLog?: boolean;
  }
}

declare namespace Cypress {
  interface Chainable {
    clickElement(locator: string, args?: any): Chainable<JQuery<HTMLElement>>;
    clickToSpecificElement(locator: string, index: number, args?: any): Chainable<JQuery<HTMLElement>>;
    clickElementRandomly(locator: string, args?: any): Chainable<JQuery<HTMLElement>>;
    hoverToElement(locator: string, args?: any): Chainable<JQuery<HTMLElement>>;
    hoverToElementRandomly(locator: string, args?: any): Chainable<JQuery<HTMLElement>>;
    verifyElementDisplay(locator: string, args?: any): Chainable<JQuery<HTMLElement>>;
    verifyElementInvisible(locator: string, args?: any): Chainable<JQuery<HTMLElement>>;
    verifyAllElementDisplay(locator: string, args?: any): Chainable<JQuery<HTMLElement>>;
    verifyElementNotVisible(locator: string, args?: any): Chainable<JQuery<HTMLElement>>;
    verifyElementNotExist(selector: string, args?: any): Chainable<JQuery<HTMLElement>>;
    verifyDateTimeIsSorted(locator: any, sortOrder?: any, ...value: any);
    verifyFieldSorted(locator: any, sortOrder?: any, ...value: any);
    verifyText(locator: string, expectedText: string): Chainable<JQuery<HTMLElement>>;
    verifyValueNotNull(locator: string, args?: any): Chainable<JQuery<HTMLElement>>;
    getTextContent(): Chainable<string>;
    getAllTextContent(locator: any, txt: any, ...value: any);
    checkDateTimeFormat(dateTime: any, format: any, ...value: any): Chainable<JQuery<HTMLElement>>;
    getAttributeValue(attName: string): Chainable<string>;
    setAttributeValue(attName: string, attValue: string): Chainable<JQuery<HTMLElement>>;
    verifyElementEnabled(): Chainable<JQuery<HTMLElement>>;
    verifyElementUnabled(): Chainable<JQuery<HTMLElement>>;
    setInputValue(inputValue: string, args?: any): Chainable<JQuery<HTMLElement>>;
    compareArrayText(selector: string, expectedText:string[]): Chainable<JQuery<HTMLElement>>;
    compareArrayAttribute(selector: string,attName:string, expectedText:string[]): Chainable<JQuery<HTMLElement>>;
    verifyFieldIsConsecutive(selector: any,...value: any): Chainable<JQuery<HTMLElement>>;
    getBySelector(dataTestAttribute: string, args?: any): Chainable<JQuery<HTMLElement>>;
    withLogin(): void;
  }
}
