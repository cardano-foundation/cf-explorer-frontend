import WebApi from "../core/WebApi"

const myProfileColor = "//div[contains(text(),'My Profile')]//parent::div//*[local-name()='svg' ]";
const bookMarkColor = "//div[text()='Bookmark']//parent::div//*[local-name()='svg' ]";
const bookMarkBtn = "//div[contains(text(),'Bookmark')]//ancestor::a[contains(@href,'bookmark')]";
const blockBtn = "//button[contains(@id,'T-BLOCK')]";
const blockIdCell = "//a[contains(text(),'{0}')]";
export default class ProfilePage extends WebApi{

    clickToBookMarkBtn(){
        cy.clickElement(bookMarkBtn);
        return this;
    }

    verifyBookMarkColorIsBlue(){
        cy.xpath(bookMarkColor).getAttributeValue("style").then(value =>{
            expect(value).to.be.equal("color: rgb(20, 102, 53);")
        })
        return this;
    }
    gotoBookMark(){
        cy.visit("/en/account/bookmark");
        return this;
    }
    clickToBlockBtn(){
        cy.clickElement(blockBtn);
        return this;
    }
    verifyAddBlockToBookMarkSuccessfully(blockId: string){
        cy.verifyElementDisplay(blockIdCell, blockId);
        return this;
    }
}
