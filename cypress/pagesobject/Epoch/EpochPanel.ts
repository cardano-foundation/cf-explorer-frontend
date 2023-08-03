/* eslint-disable no-var */
import * as util from "util";

import { BlockConstants } from "cypress/fixtures/constants/BlockConstants";

import WebApi from "../../core/WebApi";
import { EpochConstants } from "../../fixtures/constants/EpochConstants";

//epoch list
const blockchainDropdownList = "//span[text()='Blockchain']/..";
const epochPanel = "//span[text()='Epochs']/..";
const epochNumberHyperLink = "tr[class] > td>a";
const epochNumberList = "tr[class] > td>a>div>div";
const dataInEpochTable = "tr[class]";
const pagingNavigator = "nav[aria-label='pagination navigation']";
const textboxInputPage = "nav[aria-label='pagination navigation'] input";
const latestEpochNumber = "//div[contains(@class,'MuiGrid-container')]//span[contains(@class,'MuiBox-root')]";
const footer = "footer[data-testid]";
const perPage = "//span[text()='Per page']/preceding-sibling::div/div";
const perPageSelect = "//div[@id='menu-']/div[@class]/ul/li";
const displayRowSelect = "ul[role='listbox'] li";
const progressCircle = "div[data-test-id='CircularProgressbarWithChildren']";
const blockSortButton = "//th[text()='Blocks']/button";
const totalOutputSortButton = "//th[text()='Total Output']/button";
const epochDetailPanel = "//a[text()='View Details']/..";
const epochDetailPanelViewDetailButton = "//a[text()='View Details']";
const epochDetailPanelProgressCircle =
  "//a[text()='View Details']/..//div[@data-test-id='CircularProgressbarWithChildren__children']";
const epochDetailPanelBlock = "//small[text()='Block']/..";
const epochDetailPanelSlot = "//small[text()='slot']/..";
const epochDetailPanelStartTime = "//small[text()='Start Timestamp']/following-sibling::small";
const epochDetailPanelEndTime = "//small[text()='End Timestamp']/following-sibling::small";
const epochDetailPanelTxCount = "//small[text()='Tx Count']/..";
const epochDetailPanelTotalOutput = "//small[text()='Total Output']/following-sibling::small";
const epochDetailPanelBlocksTab = "//a/small[text()='Blocks']/..";
const epochDetailPanelCloseButton = "//a[text()='View Details']/..//button";
const epochDetailPanelTitle = "//div[text()='Epoch details']";
const totalRecord = "//div[text()='Results']/span";
const itemListsWithLink =
  "//table//tbody//tr//td[count(//th[contains(text(),'{0}')]//preceding-sibling::th) + boolean(//th[contains(text(),'{0}')])]//a";
const itemListsWithLink2 =
  "//table//tbody//tr//td[count(//th[contains(text(),'%s')]//preceding-sibling::th) + boolean(//th[contains(text(),'%s')])]//a";
const itemListsWithLinkAndText =
  "//table//tbody//tr//td[count(//th[contains(text(),'%s')]//preceding-sibling::th) + boolean(//th[contains(text(),'%s')])]//div[text()='%s']";
const itemLists =
  "//table//tbody//tr//td[count(//th[contains(text(),'{0}')]//preceding-sibling::th) + boolean(//th[contains(text(),'{0}')])]//span";
const itemLists2 =
  "//table//tbody//tr//td[count(//th[contains(text(),'%s')]//preceding-sibling::th) + boolean(//th[contains(text(),'%s')])]/span";

//epoch current
const epochCurrentElement =
  "//div[contains(@class,'MuiGrid-container')]//div[contains(text(),'%s')]/../../following-sibling::div/span";

//epoch detail
const epochDetailStatus = "//div[text()='Epoch details']/following-sibling::small";
const epochDetailStartTimeStamp = "//div[text()='Start Timestamp ']/../../following-sibling::div";
const epochDetailEndTimeStamp = "//div[text()='End Timestamp ']/../../following-sibling::div";
const epochDetailTotalOutput = "//div[text()=' Total Output']/../../following-sibling::div/span/span";
const epochDetailBlock = "//div[text()=' Blocks']/../../..";
const epochDetailSlot = "//div[text()=' Slot']/../../following-sibling::div";
const epochDetailTransactionCount = "//div[text()=' Transaction Count']/../../..";
const epochDetailRewardsDistributed = "//div[text()=' Rewards Distributed']/../../..";
const backButton = "//small[text()='Back']/..";
const bookMarkButton = "//div[text()='Epoch details']/following-sibling::div//button";
const popUpMessage = "//div[contains(@class,'MuiAlert-message')]";

const blockPanelTitle = "//div[text()='Block details']";
const blockListRecord = "//tbody//tr";

const signInButton = "//span[text()='Sign In']/..";
const inputEmail = "//input[@name='email']";
const inputPassword = "//input[@name='password']";
const logInButton = "//button[@data-testid='login-btn']";
const buttonAccount = "//div[@data-testid='header-top']/div/div//button";
const userProfile = "//h4[text()='User Profile']/..";
const signOutBtn = "//h4[text()='Sign Out']/..";
const bookMarkPanel = "//div[text()='Bookmark']/..";
const epochTab = "//div[text()='Epoch']";
const epochBookMarked = "(//tbody/tr/td/a)[1]";
const deleteBookmarkButton = "(//tbody//button)[1]";
const confirmDelete = "//button[contains(text(),'Continue')]";

export default class EpochPanel extends WebApi {
  constructor() {
    super();
  }

  goToEpochPage() {
    this.openAnyUrl("/epochs");
    return this;
  }

  goToSpecificEpochDetails(epochNumber: string) {
    const specificEpoch = util.format(
      itemListsWithLinkAndText,
      EpochConstants.COLUMN_NAME[0],
      EpochConstants.COLUMN_NAME[0],
      epochNumber
    );
    cy.clickElement(specificEpoch);
    return this;
  }

  clickOnBlockChainDropDownList() {
    this.clickToElementByXpath(blockchainDropdownList);
    return this;
  }

  clickOnEpochPanel() {
    this.clickToElementByXpath(epochPanel);
    return this;
  }

  clickOnOneEpochRecord() {
    cy.get(dataInEpochTable).eq(0).click();
    return this;
  }

  clickOnCloseEpochDetailPopUp() {
    cy.clickElement(epochDetailPanelCloseButton);
    return this;
  }

  clickOnViewDetailInEpochDetailPopUp() {
    cy.clickElement(epochDetailPanelViewDetailButton);
    return this;
  }

  clickOnBlockTabInEpochDetailPopUp() {
    cy.clickElement(epochDetailPanelBlocksTab);
    return this;
  }

  clickOnPerPageDropdown() {
    cy.xpath(perPage).scrollIntoView().click();
    return this;
  }

  changePerPageValue(value: string) {
    switch (value) {
      case "10":
        cy.xpath(perPageSelect).eq(0).click();
        break;
      case "20":
        cy.xpath(perPageSelect).eq(1).click();
        break;
      case "50":
        cy.xpath(perPageSelect).eq(2).click();
        break;
      case "100":
        cy.xpath(perPageSelect).eq(3).click();
        break;
    }
    return this;
  }

  verifyDefaulDisplayRow(defaultValue: string) {
    cy.verifyText(perPage, defaultValue).scrollIntoView();
    return this;
  }

  verifyDisplayRowSelection(displayRowSelection: string[]) {
    cy.compareArrayText(displayRowSelect, displayRowSelection);
    return this;
  }

  verifyNumberOfDisplayRow(expectedCount: string) {
    cy.get(epochNumberList).should("have.length", parseInt(expectedCount) - 1);
    return this;
  }

  verifyNumberOfBlockDisplayRow(expectedCount: string) {
    cy.xpath(blockListRecord).should("have.length.lte", parseInt(expectedCount));
    return this;
  }

  verifyEpochPopupDisapper() {
    cy.verifyElementNotExist(epochDetailPanel);
    return this;
  }

  verifyEpochDetail() {
    cy.verifyElementDisplay(epochDetailPanelTitle);
    return this;
  }

  clickOnSort(field: string) {
    if (field === "Blocks") {
      cy.wait(1000);
      cy.xpath(blockSortButton).click();
      cy.wait(1000);
    } else if (field === "Total Output") {
      cy.wait(1000);
      cy.xpath(totalOutputSortButton).click();
      cy.wait(1000);
    }
    return this;
  }

  verifyPagingNavigatorDisplay(caseOfTotalRecord: number) {
    let totalRecords: number;
    cy.xpath(totalRecord)
      .invoke("text")
      .then((text) => {
        totalRecords = parseInt(text);
        if (totalRecords >= caseOfTotalRecord) {
          cy.get(footer).scrollIntoView();
          cy.verifyElementDisplay(pagingNavigator);
        } else {
          cy.verifyElementNotVisible(pagingNavigator);
        }
      });

    return this;
  }

  verifyDetailEpochPopUpIsDisplayed() {
    cy.verifyElementDisplay(epochDetailPanel);
    cy.verifyElementDisplay(epochDetailPanelProgressCircle);
    cy.verifyElementDisplay(epochDetailPanelBlock);
    cy.verifyElementDisplay(epochDetailPanelSlot);
    cy.verifyElementDisplay(epochDetailPanelStartTime);
    cy.verifyElementDisplay(epochDetailPanelEndTime);
    cy.verifyElementDisplay(epochDetailPanelTxCount);
    cy.verifyElementDisplay(epochDetailPanelTotalOutput);
    cy.verifyElementDisplay(epochDetailPanelBlocksTab);
    cy.verifyElementDisplay(epochDetailPanelViewDetailButton);
    cy.verifyElementDisplay(epochDetailPanelCloseButton);
    return this;
  }

  verifyDetailEpochPopUpFormat() {
    cy.checkDateTimeFormat(epochDetailPanelStartTime, EpochConstants.DATE_TIME[0], "");
    cy.checkDateTimeFormat(epochDetailPanelEndTime, EpochConstants.DATE_TIME[0], "");

    cy.xpath(epochDetailPanelTotalOutput)
      .invoke("text")
      .then((text) => {
        expect(text.endsWith("₳")).to.be.true;
      });
    return this;
  }

  verifyEpochNumberIsHyperLink() {
    this.verifyListElementAttribute(epochNumberHyperLink, "href");
    return this;
  }

  verifyBlockNoIsHyperLink() {
    const blockNoList = util.format(itemListsWithLink2, BlockConstants.COLUMN_NAME[0], BlockConstants.COLUMN_NAME[0]);
    this.verifyListElementAttribute(blockNoList, "href");
    return this;
  }

  verifyBlockIDIsHyperLink() {
    const blockNoList = util.format(itemListsWithLink2, BlockConstants.COLUMN_NAME[1], BlockConstants.COLUMN_NAME[1]);
    this.verifyListElementAttribute(blockNoList, "href");
    return this;
  }

  verifySlotAlongWithEpoch() {
    const blockNoList =
      util.format(itemLists2, EpochConstants.DETAILS_COLUMN_NAME[2], EpochConstants.DETAILS_COLUMN_NAME[2]) +
      "/following-sibling::div";
    cy.xpath(blockNoList).each(($li) => {
      cy.wrap($li).should("contain", "/");
    });
    return this;
  }

  verifyTransactionDisplayAmount() {
    const blockNoList =
      util.format(itemLists2, EpochConstants.DETAILS_COLUMN_NAME[2], EpochConstants.DETAILS_COLUMN_NAME[2]) +
      "/following-sibling::div";
    cy.xpath(blockNoList).each(($element) => {
      cy.wrap($element).should(($el) => {
        expect($el.text().trim()).not.to.be.empty;
      });
    });
    return this;
  }
  verifyFeeDisplay() {
    const blockNoList =
      util.format(itemLists2, EpochConstants.DETAILS_COLUMN_NAME[2], EpochConstants.DETAILS_COLUMN_NAME[2]) +
      "/following-sibling::div";
    cy.xpath(blockNoList).each(($element) => {
      cy.wrap($element).should(($el) => {
        expect($el.text().trim()).not.to.be.empty;
      });
    });
    return this;
  }
  verifyOutputDisplay() {
    const blockNoList =
      util.format(itemLists2, EpochConstants.DETAILS_COLUMN_NAME[2], EpochConstants.DETAILS_COLUMN_NAME[2]) +
      "/following-sibling::div";
    cy.xpath(blockNoList).each(($element) => {
      cy.wrap($element).should(($el) => {
        expect($el.text().trim()).not.to.be.empty;
      });
    });
    return this;
  }

  verifyCreateAtTimeFormat() {
    cy.checkDateTimeFormat(itemLists, EpochConstants.DATE_TIME[0], EpochConstants.DETAILS_COLUMN_NAME[6]);
    return this;
  }

  verifyOrtherFieldIsTextLabel() {
    cy.xpath(perPage)
      .invoke("text")
      .then((page) => {
        for (let i = 0; i < parseInt(page) - 1; i++) {
          cy.get(dataInEpochTable)
            .eq(i)
            .find("td>span")
            .each(($element) => {
              cy.wrap($element).should(($el) => {
                expect($el.text().trim()).not.to.be.empty;
              });
            });
        }
      });

    return this;
  }

  verifyDefaultInputPage(defaultPage: string) {
    this.verifyElementAttributeValue(textboxInputPage, "value", defaultPage);
    return this;
  }

  verifyProgressCircleIsDisplayed() {
    cy.verifyElementDisplay(progressCircle);
    return this;
  }

  verifyEpochCurrentDetailDisplay() {
    cy.verifyElementDisplay(latestEpochNumber);
    cy.checkDateTimeFormat(
      util.format(epochCurrentElement, EpochConstants.COLUMN_NAME[1]),
      EpochConstants.DATE_TIME[0],
      ""
    );
    cy.checkDateTimeFormat(
      util.format(epochCurrentElement, EpochConstants.COLUMN_NAME[2]),
      EpochConstants.DATE_TIME[0],
      ""
    );
    cy.verifyElementDisplay(util.format(epochCurrentElement, EpochConstants.COLUMN_NAME[3]));
    cy.verifyElementDisplay(util.format(epochCurrentElement, EpochConstants.COLUMN_NAME[7]));
    return this;
  }

  verifyEpochRecordIsInDesc() {
    cy.get(epochNumberList).then((list) => {
      const currentElement = Cypress.$(list[0]);
      cy.xpath(latestEpochNumber, { timeout: 5000 })
        .invoke("text")
        .then((text) => {
          const currentValue = parseInt(currentElement.text().trim(), 10);
          expect(parseInt(text)).to.be.greaterThan(currentValue);
        });
    });

    cy.get(epochNumberList).then((list) => {
      for (let i = 0; i < list.length - 1; i++) {
        const currentElement = Cypress.$(list[i]);
        const nextElement = Cypress.$(list[i + 1]);

        const currentValue = parseInt(currentElement.text().trim(), 10);
        const nextValue = parseInt(nextElement.text().trim(), 10);
        expect(currentValue).to.be.greaterThan(nextValue);
      }
    });
    return this;
  }

  verifyDisplayOfTransaction() {
    cy.verifyAllElementDisplay(itemLists, EpochConstants.COLUMN_NAME[4]);
  }

  verifyDisplayOfBlock() {
    cy.verifyAllElementDisplay(itemLists, EpochConstants.COLUMN_NAME[3]);
  }

  verifyDisplayOfTotalOutput() {
    cy.verifyAllElementDisplay(itemLists, EpochConstants.COLUMN_NAME[6]);
  }

  verifyDisplayOfRewardDistributed() {
    cy.verifyAllElementDisplay(itemLists, EpochConstants.COLUMN_NAME[5]);

    cy.getAllTextContent(
      itemLists,
      (txt: string) => {
        expect(txt).to.satisfy((text: string) => {
          return text === "Not Available" || text.endsWith("₳");
        });
      },
      EpochConstants.COLUMN_NAME[5]
    );
    return this;
  }

  verifyDateTimeFormat(time: string) {
    switch (time) {
      case "Start Timestamp":
        cy.checkDateTimeFormat(itemLists, EpochConstants.DATE_TIME[0], EpochConstants.COLUMN_NAME[1]);
        break;

      case "End Timestamp":
        cy.checkDateTimeFormat(itemLists, EpochConstants.DATE_TIME[0], EpochConstants.COLUMN_NAME[2]);
        break;
    }
  }

  async verifySortField(field: string, sortType: string) {
    switch (field) {
      case "Blocks":
        var blockList = util.format(itemLists2, EpochConstants.COLUMN_NAME[3], EpochConstants.COLUMN_NAME[3]);
        cy.verifyFieldSorted(blockList, sortType);
        break;

      case "Total Output":
        var totalOutputList = util.format(itemLists2, EpochConstants.COLUMN_NAME[6], EpochConstants.COLUMN_NAME[6]);
        cy.xpath(totalOutputList).then((list) => {
          for (let i = 0; i < list.length - 1; i++) {
            const currentElement = Cypress.$(list[i]);
            const nextElement = Cypress.$(list[i + 1]);

            const currentValue = parseFloat(currentElement.text().replace(/,/g, ""));
            const nextValue = parseFloat(nextElement.text().replace(/,/g, ""));
            if (sortType === "DESC") {
              expect(currentValue).to.be.gte(nextValue);
            } else if (sortType === "ASC") {
              expect(currentValue).to.be.lte(nextValue);
            }
          }
        });
        break;
    }
  }

  clickToNextPage() {
    cy.get(pagingNavigator).find("ul>li").eq(9).click();
    return this;
  }

  clickToNextPageTillTheEndAndCheckNumberRecord(number: string) {
    cy.xpath(totalRecord)
      .getTextContent()
      .then((text) => {
        const number1 = parseInt(text);
        const integerPart = Math.floor(number1 / 10) + 1;
        for (let i = 0; i < integerPart + 1; i++) {
          if (i == integerPart - 1) {
            cy.get(epochNumberList).should(($list) => {
              const length = $list.length;
              expect(length).to.be.at.most(parseInt(number));
            });
          } else if (i == 0) {
            cy.get(epochNumberList).should("have.length", parseInt(number) - 1);
          } else {
            cy.get(epochNumberList).should("have.length", parseInt(number));
          }
          this.clickToNextPage();
        }
      });
    return this;
  }

  clickToNextPageAndVerifyNextButtonIsEnable(numberOfrecord: number) {
    cy.xpath(totalRecord)
      .getTextContent()
      .then((text) => {
        const number1 = parseInt(text);
        const integerPart = Math.floor(number1 / numberOfrecord);
        for (let i = 0; i <= integerPart; i++) {
          cy.get(pagingNavigator).find("ul>li").eq(9).should("not.be", "disabled");
          this.clickToNextPage();
        }
      });
    return this;
  }

  clickToNextPageAndVerifyPrevButtonIsEnable(numberOfrecord: number) {
    cy.xpath(totalRecord)
      .getTextContent()
      .then((text) => {
        const number1 = parseInt(text);
        const integerPart = Math.floor(number1 / numberOfrecord);
        for (let i = 0; i <= integerPart; i++) {
          this.clickToNextPage();
          cy.get(pagingNavigator).find("ul>li").eq(1).should("not.be", "disabled");
        }
      });
    return this;
  }

  verifyNextButtonIsEnable() {
    cy.get(pagingNavigator).find("ul>li").eq(9).should("not.be", "disabled");
    return this;
  }

  verifyPrevButtonIsEnable() {
    cy.get(pagingNavigator).find("ul>li").eq(1).should("not.be", "disabled");
    return this;
  }

  verifyNextButtonIsDisable() {
    cy.get(pagingNavigator).find("ul>li").eq(9).find("button").should("have.attr", "disabled");
    return this;
  }

  verifyPrevButtonIsDisable() {
    cy.get(pagingNavigator).find("ul>li").eq(1).find("button").should("have.attr", "disabled");
    return this;
  }

  verifyFirstPageButtonIsDisable() {
    cy.get(pagingNavigator).find("ul>li").eq(0).find("button").should("have.attr", "disabled");
    return this;
  }

  verifyLastPageButtonIsDisable() {
    cy.get(pagingNavigator).find("ul>li").eq(10).find("button").should("have.attr", "disabled");
    return this;
  }

  verifyFirstPageButtonIsEnable() {
    cy.get(pagingNavigator).find("ul>li").eq(0).find("button").should("not.be", "disabled");
    return this;
  }

  verifyLastPageButtonIsEnable() {
    cy.get(pagingNavigator).find("ul>li").eq(10).find("button").should("not.be", "disabled");
    return this;
  }

  clickToTheEndPage() {
    cy.get(pagingNavigator).find("ul>li").eq(10).click();
    return this;
  }

  clickToTheFirstPage() {
    cy.get(pagingNavigator).find("ul>li").eq(0).click();
    return this;
  }

  getTotalPage() {
    return cy.get(textboxInputPage).getAttributeValue("value");
  }

  verifyTotalPage(perPage: string) {
    cy.xpath(totalRecord)
      .getTextContent()
      .then((text) => {
        const number = parseInt(text.replace(/,/g, ""));
        const integerPart = Math.floor(number / parseInt(perPage));

        cy.get(textboxInputPage)
          .getAttributeValue("value")
          .then((value) => {
            expect(value).to.equal(String(integerPart + 1));
          });
      });
    return this;
  }

  inputPage(pageNumber: string) {
    cy.get(textboxInputPage).setInputValue(pageNumber);
    cy.get(textboxInputPage).type("{enter}");
    return this;
  }

  inputRandomPage(perpage1: string) {
    cy.xpath(totalRecord)
      .getTextContent()
      .then((text) => {
        const number: number = parseInt(text.replace(/,/g, ""));
        const integerPart: number = Math.floor(number / parseInt(perpage1));
        const randomPage = Math.floor(Math.random() * (integerPart - 2)) + 2;
        cy.get(textboxInputPage).setInputValue(randomPage.toString());
        cy.get(textboxInputPage).type("{enter}");
      });
    return this;
  }

  verifyInputPage() {
    cy.xpath(perPage)
      .getTextContent()
      .then((numberOfPerPage) => {
        cy.xpath(totalRecord)
          .getTextContent()
          .then((text) => {
            const number1 = parseInt(text);
            const integerPart = Math.floor(number1 / parseInt(numberOfPerPage));
            for (let i = 1; i <= integerPart + 1; i++) {
              this.inputPage(String(i));
              cy.get(pagingNavigator)
                .find("ul>li")
                .eq(2)
                .find("div>span")
                .getTextContent()
                .then((text) => {
                  if (i == 1) {
                    expect(text).contain("1");
                    expect(text).contain(numberOfPerPage);
                  } else {
                    expect(text).contain(String(parseInt(numberOfPerPage) * (i - 1) + 1));
                  }
                });
            }
          });
      });
  }

  verifyEpochDetailStatusIsDisplayed() {
    cy.verifyElementDisplay(epochDetailStatus);
    cy.verifyElementDisplay(epochDetailStartTimeStamp);
    cy.verifyElementDisplay(epochDetailEndTimeStamp);
    cy.verifyElementDisplay(epochDetailTotalOutput);
    cy.verifyElementDisplay(epochDetailBlock);
    cy.verifyElementDisplay(epochDetailSlot);
    cy.verifyElementDisplay(epochDetailTransactionCount);
    cy.verifyElementDisplay(epochDetailRewardsDistributed);
    return this;
  }

  verifyBackButtonIsEnable() {
    cy.xpath(backButton).verifyElementEnabled();
    return this;
  }

  verifyEpochDetailsDateTimeFormat() {
    cy.checkDateTimeFormat(epochDetailStartTimeStamp, EpochConstants.DATE_TIME[0], "");
    cy.checkDateTimeFormat(epochDetailEndTimeStamp, EpochConstants.DATE_TIME[0], "");
    return this;
  }

  verifyEpochDetailsSlotDisplay() {
    cy.xpath(epochDetailSlot).should("contain", "/");
    return this;
  }

  verifyEpochDetailsTotalOutputDisplay() {
    cy.xpath(epochDetailTotalOutput)
      .invoke("text")
      .then((text) => {
        expect(text.endsWith("₳")).to.be.true;
      });
    return this;
  }

  clickOnBackButton() {
    cy.clickElement(backButton);
    return this;
  }

  signIn() {
    cy.clickElement(signInButton);
    cy.xpath(inputEmail).setInputValue("hanh.luu+2@sotatek.com");
    cy.xpath(inputPassword).setInputValue("Test1234@");
    cy.clickElement(logInButton);
    return this;
  }

  clickBookMark() {
    cy.clickElement(bookMarkButton);
    return this;
  }

  verifyBookMarkButtonStatusChanged() {
    cy.xpath(bookMarkButton + "/*[local-name()='svg']")
      .getAttributeValue("fill")
      .then((value) => {
        expect(value).to.equal("none");
      });
    return this;
  }

  verifyMessagePopUpDisplayed() {
    cy.verifyElementDisplay(popUpMessage);
    return this;
  }

  verifyClickProfile() {
    cy.clickElement(buttonAccount);
    cy.clickElement(userProfile);
    return this;
  }

  clickOnBookMarkPanelThenVerify(epochBookMarkedValue: string) {
    cy.clickElement(bookMarkPanel);
    cy.clickElement(epochTab);
    cy.xpath(epochBookMarked)
      .getTextContent()
      .then((value) => {
        expect(value).to.be.equal(epochBookMarkedValue);
      });
    return this;
  }

  clickOnSignOutButton() {
    cy.clickElement(buttonAccount);
    cy.clickElement(signOutBtn);
    return this;
  }

  clickDeleteBookmark() {
    cy.clickElement(deleteBookmarkButton);
    cy.clickElement(confirmDelete);
    return this;
  }

  clickOnBlockRecordByBlockNo() {
    cy.clickElementRandomly(itemListsWithLink, EpochConstants.DETAILS_COLUMN_NAME[0]);
    return this;
  }

  clickOnBlockRecordByBlockID() {
    cy.clickElementRandomly(itemListsWithLink, EpochConstants.DETAILS_COLUMN_NAME[1]);
    return this;
  }

  clickOnBlockRecordByEpochSlot() {
    cy.clickElementRandomly(itemLists, EpochConstants.DETAILS_COLUMN_NAME[2]);
    return this;
  }

  verifyBlockPanelDisplayed() {
    cy.verifyElementDisplay(blockPanelTitle);
    return this;
  }
}
