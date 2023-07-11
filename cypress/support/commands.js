// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
const format = require('string-format');
Cypress.Commands.add("clickElement", (selector) => {
  if (selector.startsWith("/") || selector.startsWith("(")) {
    cy.xpath(selector).click();
  } else {
    cy.get(selector).click();
  }
});

Cypress.Commands.add("getTextContent", { prevSubject: true }, (subject) => {
  return cy.wrap(subject).invoke("text");
});
Cypress.Commands.add("getAllTextContent", { prevSubject: false }, (ele, callback, ...value) => {
  ele = format(ele, value);
  cy.xpath(ele).each((el) => {
    cy.wrap(el).invoke("text").then((txt) => {
      callback(txt);
    });
  });
});

Cypress.Commands.add("verifyElementDisplay", (locator, ...values) => {
  let ele = format(locator, values);
  if (ele.startsWith("/") || ele.startsWith("(")) {
    cy.xpath(ele).should("be.visible");
  } else {
    cy.get(ele).should("be.visible");
  }
});
Cypress.Commands.add("verifyAllElementDisplay", (locator, ...values) => {
  let ele = format(locator, values);
  if (ele.startsWith("/") || ele.startsWith("(")) {
    cy.xpath(ele).each(e => {
      cy.wrap(e).scrollIntoView().should("be.visible");
    });
  } else {
    cy.xpath(ele).each(e => {
      cy.wrap(e).scrollIntoView().should("be.visible");
    });
  }
});

Cypress.Commands.add(
  "verifyElementDisplayChainable",
  { prevSubject: "element" },
  (subject) => {
    return cy.wrap(subject).should("be.visible");
  }
);

Cypress.Commands.add("verifyText", (selector, expectedText) => {
  if (selector.startsWith("/") || selector.startsWith("(")) {
    cy.xpath(selector).should("contain.text", expectedText);
  } else {
    cy.get(selector).should("contain.text", expectedText);
  }
});

Cypress.Commands.add("verifyElementNotVisible", (selector) => {
  if (selector.startsWith("/") || selector.startsWith("(")) {
    cy.xpath(selector).should("not.be.visible");
  } else {
    cy.get(selector).should("not.be.visible");
  }
});

Cypress.Commands.add("verifyElementNotExist", (selector) => {
  if (selector.startsWith("/") || selector.startsWith("(")) {
    cy.xpath(selector).should("not.exist");
  } else {
    cy.get(selector).should("not.exist");
  }
});
Cypress.Commands.add("verifyValueNotNull", (locator, ...value) => {
  let ele = format(locator, value)
  if (ele.startsWith("/") || ele.startsWith("(")) {
    cy.xpath(ele).should("not.be.null");
  } else {
    cy.get(ele).should("not.be.null");
  }
});

Cypress.Commands.add(
  "checkDateTimeFormat",
  { prevSubject: true },
  (subject, format) => {
    const dateTimeRegex = /^\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}:\d{2}$/; // mm/dd/yyyy hh:mm:ss

    cy.wrap(subject).should("match", dateTimeRegex);
  }
);

Cypress.Commands.add(
  "getAttributeValue",
  { prevSubject: true },
  (subject, attributeName) => {
    return cy.wrap(subject).invoke("attr", attributeName);
  }
);

Cypress.Commands.add(
  "setAttributeValue",
  { prevSubject: true },
  (subject, attributeName, attributeValue) => {
    return cy.wrap(subject).invoke("attr", attributeName, attributeValue);
  }
);

Cypress.Commands.add(
  "verifyElementEnabled",
  { prevSubject: true },
  (subject) => {
    cy.wrap(subject).should("not.be", "disabled");
  }
);

Cypress.Commands.add(
  "setInputValue",
  { prevSubject: true },
  (subject, value) => {
    return cy.wrap(subject).clear().type(value);
  }
);
