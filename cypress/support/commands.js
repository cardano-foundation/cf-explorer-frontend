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
import moment from 'moment';
const format = require('string-format');

Cypress.Commands.add("clickElement", (selector, ...value) => {
  selector = format(selector, value);
  if (selector.startsWith("/") || selector.startsWith("(")) {
    cy.xpath(selector).click({force: true});
  } else {
    cy.get(selector).click({force: true});
  }
});
Cypress.Commands.add("clickToSpecificElement", (selector, index,...value) => {
  selector = format(selector, value);
  if (selector.startsWith("/") || selector.startsWith("(")) {
    cy.xpath(selector).eq(index).click();
  } else {
    cy.get(selector).eq(index).click();
  }
});
Cypress.Commands.add("clickElementRandomly", (selector, ...value) => {
  selector = format(selector, value);
  if (selector.startsWith("/") || selector.startsWith("(")) {
    cy.xpath(selector).then($elements => {
      const elements = $elements.toArray();
      const randomIndex = Math.floor(Math.random() * elements.length);
      const randomElement = elements[randomIndex];
      cy.wrap(randomElement).click({force: true});
    });
  } else {
    cy.get(selector).then($elements => {
      const elements = $elements.toArray();
      const randomIndex = Math.floor(Math.random() * elements.length);
      const randomElement = elements[randomIndex];
      cy.wrap(randomElement).click({force: true});
    });
  }
});
Cypress.Commands.add("hoverToElementRandomly", (selector, ...value) => {
  selector = format(selector, value);
  if (selector.startsWith("/") || selector.startsWith("(")) {
    cy.xpath(selector).then($elements => {
      const elements = $elements.toArray();
      const randomIndex = Math.floor(Math.random() * elements.length);
      const randomElement = elements[randomIndex];
      cy.wrap(randomElement).trigger('mouseover');
    });
  } else {
    cy.get(selector).then($elements => {
      const elements = $elements.toArray();
      const randomIndex = Math.floor(Math.random() * elements.length);
      const randomElement = elements[randomIndex];
      cy.wrap(randomElement).trigger('mouseover');
    });
  }
});
Cypress.Commands.add("hoverToElement", (selector) => {
  if (selector.startsWith("/") || selector.startsWith("(")) {
    cy.xpath(selector).trigger();
  } else {
    cy.get(selector).trigger();
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
Cypress.Commands.add("verifyDateTimeIsSorted", (locator, sortOrder = "asc", ...value) => {
  let ele = format(locator, value);

  const datetimeList = [];

  cy.xpath(ele).each(locator => {
    const promise = cy.wrap(locator).invoke("text").then(text => {
      const datetime = new Date(text);
      datetimeList.push(datetime);
    });
  }).then(() => {
    let sortedList;
    if (sortOrder === "asc") {
      sortedList = [...datetimeList].sort((a, b) => a.getTime() - b.getTime());
    } else if (sortOrder === "desc") {
      sortedList = [...datetimeList].sort((a, b) => b.getTime() - a.getTime());
    } else {
      cy.log("Invalid sorting order specified");
      return;
    }
    const isSorted = datetimeList.every((value, index) => value === sortedList[index]);
    expect(isSorted).to.be.true
  });
});
Cypress.Commands.add("verifyFieldSorted", (locator, sortOrder = "asc", ...value) => {
  let ele = format(locator, value);

  const numberList = [];

  cy.xpath(ele).each(locator => {
    const promise = cy.wrap(locator).invoke("text").then(text => {
      numberList.push(text);
    });
  }).then(() => {
    let sortedList;
    if (sortOrder === "asc") {
      sortedList = [...numberList].sort((a, b) => a - b);
    } else if (sortOrder === "desc") {
      sortedList = [...numberList].sort((a, b) => b - a);
    } else {
      cy.log("Invalid sorting order specified");
      return;
    }
    const isSorted = numberList.every((value, index) => value === sortedList[index]);
    expect(isSorted).to.be.true
  });
});

Cypress.Commands.add("verifyElementDisplay", (locator, ...values) => {
  let ele = format(locator, values);
  if (ele.startsWith("/") || ele.startsWith("(")) {
    cy.xpath(ele, { timeout: 10000 }).scrollIntoView().should("be.visible");
  } else {
    cy.get(ele, { timeout: 10000 }).scrollIntoView().should("be.visible");
  }
});
Cypress.Commands.add("verifyElementInvisible", (locator, ...values) => {
  let ele = format(locator, values);
  if (ele.startsWith("/") || ele.startsWith("(")) {
    cy.xpath(ele, { timeout: 10000 }).should('not.exist');
  } else {
    cy.get(ele, { timeout: 10000 }).should('not.exist');
  }
});
Cypress.Commands.add("verifyAllElementDisplay", (locator, ...values) => {
  let ele = format(locator, values);
  if (ele.startsWith("/") || ele.startsWith("(")) {
    cy.xpath(ele, { timeout: 5000 }).each(e => {
      cy.wrap(e).scrollIntoView().should("be.visible");
    });
  } else {
    cy.xpath(ele, { timeout: 5000 }).each(e => {
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

Cypress.Commands.add('checkDateTimeFormat', (locator, dateFormat, ...value) => {
  let ele = format(locator, value);
  if (ele.startsWith("/") || ele.startsWith("(")) {
    cy.xpath(ele).each((ele) =>{
      cy.wrap(ele).scrollIntoView().invoke("text").then(text => {
        const isValidFormat = moment(text, dateFormat, true).isValid();
        expect(isValidFormat).to.be.true;
      });
    });
  } else {
    cy.get(ele).each((ele) =>{
      cy.wrap(ele).scrollIntoView().invoke("text").then(text => {
        const isValidFormat = moment(text, dateFormat, true).isValid();
        expect(isValidFormat).to.be.true;
      });
    });
  }
});

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
  "verifyElementUnabled",
  { prevSubject: true },
  (subject) => {
    cy.wrap(subject).should("be.disabled");
  }
);

Cypress.Commands.add(
  "setInputValue",
  { prevSubject: true },
  (subject, value) => {
    return cy.wrap(subject).clear().type(value);
  }
);

Cypress.Commands.add('compareArrayText', (selector, expectedText) => {
  cy.get(selector).each((element, index) => {
    cy.wrap(element).should('have.text', expectedText[index]);
  });
});

Cypress.Commands.add('compareArrayAttribute', (selector, attribute, expectedValues) => {
  cy.get(selector).each((element, index) => {
    cy.wrap(element).should('have.attr', attribute, expectedValues[index]);
  });
});

Cypress.Commands.add('verifyFieldIsConsecutive', (selector, ...value) => {
  let ele = format(selector, value)
  if (ele.startsWith("/") || ele.startsWith("(")) {
    cy.xpath(ele).invoke('text').then((list)=>{
      const numbers = list.split('\n').map((itemText) => parseInt(itemText.trim()));
      const areConsecutive = numbers.every((number, index) => {
        if (index === 0) {
          return true;
        }
        return number === numbers[index - 1] + 1;
      });
      expect(areConsecutive).to.be.true;
    });
  } else {
    cy.get(ele).invoke('text').then((list)=>{
      const numbers = list.split('\n').map((itemText) => parseInt(itemText.trim()));
      const areConsecutive = numbers.every((number, index) => {
        if (index === 0) {
          return true; 
        }
        return number === numbers[index - 1] + 1;
      });
      expect(areConsecutive).to.be.true;
    });
  }
});