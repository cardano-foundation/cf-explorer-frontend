/// <reference types="cypress" />

declare namespace Cypress {
  interface ResolvedConfigOptions {
    hideXHRInCommandLog?: boolean;
  }
}

declare namespace Cypress {
  interface Chainable {
    withLogin(): void;
  }
}
