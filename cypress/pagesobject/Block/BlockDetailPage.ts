import WebApi from "../../core/WebApi";
import {BlockConstants} from "../../fixtures/constants/BlockConstants"
//locators
const viewDetailTxt = "//a[contains(text(),'View Details')]";
const closeBtn = "//button[contains(@aria-label,'Close')]";
export default class BlockDetailPage extends WebApi {
  goToHomePage() {
    this.openAnyUrl("/");
    return this;
  }
  goToBlockPage() {
    this.openAnyUrl("/blocks");
    return this;
  }
  verifyBlockdetailScreenDisplay() {
    cy.verifyElementDisplay(viewDetailTxt);
    return this;
  }

  clickToCloseBtn() {
    cy.clickElement(closeBtn);
    return this;
  }
}