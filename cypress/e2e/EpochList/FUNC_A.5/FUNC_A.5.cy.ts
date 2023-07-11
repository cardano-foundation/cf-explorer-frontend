import EpochPanel from "../../../pagesobject/EpochPanel";

const epochPanel = new EpochPanel();
it("Check action of Paging : Check paging navigator when gridview have ((10*n)+1) records",{"retries": 0}, () => {
    // Set the viewport to match the screen size
    cy.viewport(1920,1080);

    epochPanel.goToHomePage();

    epochPanel.clickOnBlockChainDropDownList()
              .clickOnEpochPanel()
              .clickOnPerPageDropdown()
              .changePerPageValue('10')
              .verifyPagingNavigatorDisplay()
              .clickToNextPageTillTheEndAndCheckNumberRecord('10')
              .verifyTotalPage('10')

});

it("Check action of Paging : Check button [Next>] is enabled",{"retries": 0}, () => {
    // Set the viewport to match the screen size
    cy.viewport(1920,1080);

    epochPanel.goToHomePage();

    epochPanel.clickOnBlockChainDropDownList()
              .clickOnEpochPanel()
              .clickToNextPageAndVerifyNextButtonIsEnable(50);
});

it("Check action of Paging : Check button [Next>] is disabled",{"retries": 0}, () => {
    // Set the viewport to match the screen size
    cy.viewport(1920,1080);

    epochPanel.goToHomePage();

    epochPanel.clickOnBlockChainDropDownList()
              .clickOnEpochPanel()
              .clickToTheEndPage()
              .verifyNextButtonIsDisable();
});

it("Check button [<Prev] is enabled",{"retries": 0}, () => {
    // Set the viewport to match the screen size
    cy.viewport(1920,1080);

    epochPanel.goToHomePage();

    epochPanel.clickOnBlockChainDropDownList()
              .clickOnEpochPanel()
              .clickToNextPageAndVerifyPrevButtonIsEnable(50);
});

it("Check action of Paging : Check button [<Prev] is disabled",{"retries": 0}, () => {
    // Set the viewport to match the screen size
    cy.viewport(1920,1080);

    epochPanel.goToHomePage();

    epochPanel.clickOnBlockChainDropDownList()
              .clickOnEpochPanel()
              .verifyPrevButtonIsDisable();
});

it("Check action of Paging : Check input [Page] textbox success",{"retries": 0}, () => {
    // Set the viewport to match the screen size
    cy.viewport(1920,1080);

    epochPanel.goToHomePage();

    epochPanel.clickOnBlockChainDropDownList()
              .clickOnEpochPanel()
              .inputPage('2')
              .verifyInputPage()
});
