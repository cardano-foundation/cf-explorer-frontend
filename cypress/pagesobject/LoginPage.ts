import WebApi from "../core/WebApi"

const signInBtn = "//span[contains(text(),'Sign In')]//parent::button";
const fieldEmail = "//input[@name='email']";
const fieldPassword = "//input[@name='password']";
const loginBtn = "[data-testid='login-btn']";
const successfullNotification = "//div[contains(text(),'You are now signed in')]";
export default class LoginPage extends WebApi{

  clickToSignInBtn(){
    cy.clickElement(signInBtn);
    return this;
  }
  enterEmail(email: string){
    cy.xpath(fieldEmail).setInputValue(email);
    return this;
  }
  enterPassword(password: string){
    cy.xpath(fieldPassword).setInputValue(password);
    return this;
  }
  clickToLoginBtn(){
    cy.clickElement(loginBtn);
    return this;
  }
  verifySignInSuccessFull(){
    cy.verifyElementDisplay(successfullNotification);
    return this;
  }
}
