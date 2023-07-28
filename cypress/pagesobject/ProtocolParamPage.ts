import { ProtocolParameterConstants } from "cypress/fixtures/constants/ProtocolParameterConstants";
import WebApi from "../core/WebApi"

const cell = "//div[contains(text(),'Updatable Parameters')]//parent::div//following-sibling::div//td[count(//th[contains(text(),'{0}')]//preceding-sibling::th) + boolean(//th[contains(text(),'{0}')])]";
const row = "//div[contains(text(),'Updatable Parameters')]//parent::div//following-sibling::div//tr";
const viewUpdateHistoryBtn = "//button[contains(text(),'View update history')]";
const pPupdateHistory = "//h2[contains(text(),'Protocol parameters update history')]";
const cellByRow = "//div[contains(text(),'Updatable Parameters')]//parent::div//following-sibling::div//td";

const cellParamByHistory = "//div//following-sibling::div//td[count(//th[contains(text(),'Parameter Name')]//preceding-sibling::th) + boolean(//th[contains(text(),'Parameter Name')])]"
export default class ProtocolParemPage extends WebApi{

  goToProtocolParametersPage(){
    this.openAnyUrl('/en/protocol-parameters');
    return this;
  }
  verifyEnoughParameterOnList(){
    cy.xpath(row).should("have.length",30)
    return this;
  }
  verifyViewUpdateHistoryBtnEnable(){
    cy.xpath(viewUpdateHistoryBtn).verifyElementEnabled();
    return this;
  }
  veriyParameterNameCellDisplay(){
    cy.verifyAllElementDisplay(cell, ProtocolParameterConstants.COLUMN_NAME[0]);
    return this;
  }
  veriyValueCellDisplay(){
    cy.verifyAllElementDisplay(cell, ProtocolParameterConstants.COLUMN_NAME[1]);
    return this;
  }
  veriyLastUpdatedEpochCellDisplay(){
    cy.verifyAllElementDisplay(cell, ProtocolParameterConstants.COLUMN_NAME[2]);
    return this;
  }
  veriyCreatedAtDisplay(){
    cy.verifyAllElementDisplay(cell, ProtocolParameterConstants.COLUMN_NAME[3]);
    return this;
  }
  verifyDateTimeFormat() {
    cy.checkDateTimeFormat(cell, ProtocolParameterConstants.DATE_TIME[0], ProtocolParameterConstants.COLUMN_NAME[3]);
    return this;
  }
  veriyProParamUpdateHistoryDisplayed() {
    cy.verifyElementDisplay(pPupdateHistory);
    return this;
  }
  clickToViewUpdateHistory() {
    cy.clickElement(viewUpdateHistoryBtn);
    return this;
  }
  async getParameterNameCellDisplay(){
    const paramList: string[] = [];
    for(let x = 0; x < 29; x ++){
    const value = await this.getTextSpecificElement(cellParamByHistory, x);
    paramList.push(value);
    }
    return paramList;
  }
  async getUpdateParam() {
    class param {
      parameterName: any;
      value: any;
      lastUpdatedEpoch: any;
      createdAt: any;
    
    }
    const paramList: param[] = [];

    for(let x = 0; x < 4 * 29; x += 4){
      const p = new param();
      p.parameterName = await this.getTextSpecificElement(cellByRow, x);
      p.value = await this.getTextSpecificElement(cellByRow, x + 1);
      p.lastUpdatedEpoch = await this.getTextSpecificElement(cellByRow, x + 2);
      p.createdAt = await this.getTextSpecificElement(cellByRow, x + 3);
      paramList.push(p);
    }
    return paramList;
  }
}
