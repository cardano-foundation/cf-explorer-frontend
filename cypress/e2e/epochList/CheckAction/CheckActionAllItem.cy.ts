import EpochPanel from "../../../pagesobject/Epoch/EpochPanel";

const epochPanel = new EpochPanel();
describe('Check action of all item',()=>{
    beforeEach(() => {
        epochPanel.goToEpochPage();
      })

    xit("Check click on [Sort up] with Blocks", () => {
        epochPanel
                  .verifyEpochNumberIsHyperLink()
                  .verifyOrtherFieldIsTextLabel()
                  .verifyDefaultInputPage('1')
                  .verifyPagingNavigatorDisplay();
    
        epochPanel.clickOnSort('Blocks')
                  .clickOnSort('Blocks')
                  .verifySortField('Blocks','ASC')
    });
    
    it("Check click on [Sort decreasing] Blocks", () => {
        
        epochPanel
                  .verifyEpochNumberIsHyperLink()
                  .verifyOrtherFieldIsTextLabel()
                  .verifyDefaultInputPage('1')
                  .verifyPagingNavigatorDisplay();
    
        epochPanel.clickOnSort('Blocks')
                  .verifySortField('Blocks','DESC')
    });
    
    xit("Check click on [Sort up] with Total Output", () => {
        
        epochPanel
                  .verifyEpochNumberIsHyperLink()
                  .verifyOrtherFieldIsTextLabel()
                  .verifyDefaultInputPage('1')
                  .verifyPagingNavigatorDisplay();
    
        epochPanel.clickOnSort('Total Output')
                  .clickOnSort('Total Output')
                  .verifySortField('Total Output','ASC')
    });
    
    xit("Check click on [Sort decreasing]  Total Output", () => {
        epochPanel
                  .verifyEpochNumberIsHyperLink()
                  .verifyOrtherFieldIsTextLabel()
                  .verifyDefaultInputPage('1')
                  .verifyPagingNavigatorDisplay();
    
        epochPanel.clickOnSort('Total Output')
                  .verifySortField('Total Output','DESC')
    });
    
    xit("Check action click on one record or click on icon [Quick View Icon] ", () => {
        epochPanel
                  .clickOnOneEpochRecord()
                  .verifyDetailEpochPopUpIsDisplayed()
    });
})
