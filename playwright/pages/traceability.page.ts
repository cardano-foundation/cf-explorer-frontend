import { Page } from "@playwright/test";

export function traceabilityPage(page: Page) {
  const traceabilityTitle = page.locator("div[class='MuiBox-root css-18jylq9']");
  const oivLink = page.locator("a[href='https://www.oiv.int/']");
  const nationalWineAgency = page.locator("a[href='https://wine.gov.ge/En/']");
  const caseStudyButton = page.locator("a[class='MuiBox-root css-1ubm4vv']");

  const openTraceabilityPage = async () => {
    await page.goto("/bolnisi");
    await traceabilityTitle.isVisible();
  };

  const openOivPage = async () => {
    const pagePromise = page.context().waitForEvent("page");
    await oivLink.click();
    return await pagePromise;
  };

  const openNationalWineAgency = async () => {
    const pagePromise = page.context().waitForEvent("page");
    await nationalWineAgency.click();
    return await pagePromise;
  };

  const openCaseStudyPage = async () => {
    const pagePromise = page.context().waitForEvent("page");
    await caseStudyButton.click();
    return await pagePromise;
  };

  return {
    openTraceabilityPage,
    openOivPage,
    openNationalWineAgency,
    openCaseStudyPage
  };
}
