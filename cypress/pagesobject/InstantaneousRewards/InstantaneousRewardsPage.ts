import WebApi from "cypress/core/WebApi";

const itemLists = "(//table//tbody//tr//td[count(//th[contains(text(),'{0}')]//preceding-sibling::th) + boolean(//th[contains(text(),'{0}')])])";
const listbtnNextAndPre = "//ul//button"
const numberOfPage = "//ul//input"
const selectPerPage = "//span[text()='Per page']/parent::div"
const listNumberPerPage = "//ul[@role='listbox']//li"

export default class InstantaneousRewardsPage extends WebApi{
    gotoInstantaneousRewards(){
        this.openAnyUrl("/instantaneous-rewards");
        return this;
    } 
}