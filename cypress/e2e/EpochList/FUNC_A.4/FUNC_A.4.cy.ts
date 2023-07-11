import EpochPanel from "../../../pagesobject/EpochPanel";

const epochPanel = new EpochPanel();
it("Check action of 'Number items' pulldown",{"retries": 0}, () => {
    // Set the viewport to match the screen size
    cy.viewport(1920,1080);

    epochPanel.goToHomePage();

    epochPanel.clickOnBlockChainDropDownList()
              .clickOnEpochPanel()
              .verifyDefaulDisplayRow('50')
              .clickOnPerPageDropdown()
              .changePerPageValue('10')
              .verifyNumberOfDisplayRow('10')
              .clickOnPerPageDropdown()
              .changePerPageValue('20')
              .verifyNumberOfDisplayRow('20')
              .clickOnPerPageDropdown()
              .changePerPageValue('50')
              .verifyNumberOfDisplayRow('50')
              .clickOnPerPageDropdown()
              .changePerPageValue('100')
              .verifyNumberOfDisplayRow('100')
             
});
