import WebApi from "../../core/WebApi";
import {BlockConstants} from "../../fixtures/constants/BlockConstants"
//locators

export default class LoginPage extends WebApi {
  goToHomePage() {
    this.openAnyUrl("/");
    return this;
  }
  goToBlockPage() {
    this.openAnyUrl("/blocks");
    return this;
  }
}