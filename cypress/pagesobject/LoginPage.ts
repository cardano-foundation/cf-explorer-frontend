import WebApi from "../core/WebApi"

const priceLocator = "//a[normalize-space()='Pricing']";
export default class LoginPage extends WebApi{
  constructor(){
    super();
  }
  goToHomePage() {
    this.openAnyUrl("/")
    return this;
  }
  clickToPriceField() {
    this.clickToElementByXpath(priceLocator);
    return this;
  }

  verifyPriceName() {
    cy.xpath(priceLocator).should("have.text", "Pricing");
    return this;
  }
}
