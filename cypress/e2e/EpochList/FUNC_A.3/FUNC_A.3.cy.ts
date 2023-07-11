import EpochPanel from "../../../pagesobject/EpochPanel";

const epochPanel = new EpochPanel();

it("Check click on [Sort up] with Blocks",{"retries": 0}, () => {
    // Set the viewport to match the screen size
    cy.viewport(1920,1080);

    epochPanel.goToHomePage();

    //precondition:Check immediately after TCs FUNC_A.1.2
    epochPanel.clickOnBlockChainDropDownList()
              .clickOnEpochPanel()
              .verifyEpochNumberIsHyperLink()
              .verifyOrtherFieldIsTextLabel()
              .verifyDefaultInputPage('1')
              .verifyPagingNavigatorDisplay();

    epochPanel.clickOnSort('Blocks')
              .clickOnSort('Blocks')
              .verifySortField('Blocks','ASC')
});

xit("Check click on [Sort decreasing] Blocks",{"retries": 0}, () => {
    // Set the viewport to match the screen size
    cy.viewport(1920,1080);

    epochPanel.goToHomePage();

    //precondition:Check immediately after TCs FUNC_A.1.2
    epochPanel.clickOnBlockChainDropDownList()
              .clickOnEpochPanel()
              .verifyEpochNumberIsHyperLink()
              .verifyOrtherFieldIsTextLabel()
              .verifyDefaultInputPage('1')
              .verifyPagingNavigatorDisplay();

    epochPanel.clickOnSort('Blocks')
              .verifySortField('Blocks','DESC')
});

xit("Check click on [Sort up] with Total Output",{"retries": 0}, () => {
    // Set the viewport to match the screen size
    cy.viewport(1920,1080);

    epochPanel.goToHomePage();

    //precondition:Check immediately after TCs FUNC_A.1.2
    epochPanel.clickOnBlockChainDropDownList()
              .clickOnEpochPanel()
              .verifyEpochNumberIsHyperLink()
              .verifyOrtherFieldIsTextLabel()
              .verifyDefaultInputPage('1')
              .verifyPagingNavigatorDisplay();

    epochPanel.clickOnSort('Total Output')
              .clickOnSort('Total Output')
              .verifySortField('Total Output','ASC')
});

xit("Check click on [Sort decreasing]  Total Output",{"retries": 0}, () => {
    // Set the viewport to match the screen size
    cy.viewport(1920,1080);

    epochPanel.goToHomePage();

    //precondition:Check immediately after TCs FUNC_A.1.2
    epochPanel.clickOnBlockChainDropDownList()
              .clickOnEpochPanel()
              .verifyEpochNumberIsHyperLink()
              .verifyOrtherFieldIsTextLabel()
              .verifyDefaultInputPage('1')
              .verifyPagingNavigatorDisplay();

    epochPanel.clickOnSort('Total Output')
              .verifySortField('Total Output','DESC')
});

xit("Check action click on one record or click on icon [Quick View Icon] ",{"retries": 0}, () => {
    // Set the viewport to match the screen size
    cy.viewport(1920,1080);

    epochPanel.goToHomePage();

    epochPanel.clickOnBlockChainDropDownList()
              .clickOnEpochPanel()
              .clickOnOneEpochRecord()
              .verifyDetailEpochPopUpIsDisplayed()
});