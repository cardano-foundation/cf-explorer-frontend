/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    getBySelector(dataTestAttribute: string, args?: any): Chainable<JQuery<HTMLElement>>;
  }
}
