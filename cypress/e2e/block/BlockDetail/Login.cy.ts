import BlockPage from "../../../pagesobject/Block/BlockPage";
import BlockDetailPage from "../../../pagesobject/Block/BlockDetailPage";
import Utils from "cypress/core/Utils";

const blockPage = new BlockPage();
describe("block list", () => {
  it("Check initialzation the screen", () => {
    cy.request({
      method: 'POST',
      url: 'https://api.auth.ex-c.sotatek.works/api/v1/auth/sign-in',
      body: {
          email: 'binh.nguyen@sotatek.com',
          password: 'Test1234@',
          "type": 0
        
      }
    })
    .then((resp) => {
      window.localStorage.setItem('token', resp.body.token)
    })
    blockPage
    .goToBlockPage()
    cy.visit("/en/account/bookmark")
  });
});
  