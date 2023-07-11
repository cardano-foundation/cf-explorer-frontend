import EpochPanel from "../../../pagesobject/EpochPanel";

const epochPanel = new EpochPanel();
it("Check display data of [Epoch number] column ",{"retries": 0}, () => {
    // Set the viewport to match the screen size
    cy.viewport(1920,1080);

    epochPanel.goToHomePage();

    epochPanel.clickOnBlockChainDropDownList()
              .clickOnEpochPanel()
              .verifyEpochRecordIsInDesc()
              .verifyProgressCircleIsDisplayed();
});

it("Check display data of [Transaction Count] column ",{"retries": 0}, () => {
    // Set the viewport to match the screen size
    cy.viewport(1920,1080);

    epochPanel.goToHomePage();

    epochPanel.clickOnBlockChainDropDownList()
              .clickOnEpochPanel()
              .verifyDisplayOfTransaction();
});

it("Check display data of [Start Timestamp] column  ",{"retries": 0}, () => {
    // Set the viewport to match the screen size
    cy.viewport(1920,1080);

    epochPanel.goToHomePage();

    epochPanel.clickOnBlockChainDropDownList()
              .clickOnEpochPanel()
              .verifyDateTimeFormat('Start Timestamp');
});

it("Check display data of [End Timestamp] column",{"retries": 0}, () => {
    // Set the viewport to match the screen size
    cy.viewport(1920,1080);

    epochPanel.goToHomePage();
    epochPanel.clickOnBlockChainDropDownList()
              .clickOnEpochPanel()
              .verifyDateTimeFormat('End Timestamp');
});

it("Check display data of [Blocks] column ",{"retries": 0}, () => {
    // Set the viewport to match the screen size
    cy.viewport(1920,1080);

    epochPanel.goToHomePage();
    epochPanel.clickOnBlockChainDropDownList()
              .clickOnEpochPanel()
              .verifyDisplayOfBlock();
});

it("Check display data of [Total Output] column ",{"retries": 0}, () => {
    // Set the viewport to match the screen size
    cy.viewport(1920,1080);

    epochPanel.goToHomePage();
    epochPanel.clickOnBlockChainDropDownList()
              .clickOnEpochPanel()
              .verifyDisplayOfTotalOutput();
});

it("Check display data of [Reward Distributed] column",{"retries": 0}, () => {
    // Set the viewport to match the screen size
    cy.viewport(1920,1080);

    epochPanel.goToHomePage();
    epochPanel.clickOnBlockChainDropDownList()
              .clickOnEpochPanel()
              .verifyDisplayOfRewardDistributed();
});