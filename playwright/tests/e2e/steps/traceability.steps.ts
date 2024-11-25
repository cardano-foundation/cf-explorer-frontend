import { createBdd } from "playwright-bdd";
import { expect, Page } from "@playwright/test";

import { traceabilityPage } from "../../../pages/traceability.page";

const { Given, When, Then } = createBdd();
let externalLink: Page;

Given(/^The user goes to Traceability program page in explorer portal$/, async ({ page }) => {
  await traceabilityPage(page).openTraceabilityPage();
});
When(/^the user clicks the OIV link$/, async ({ page }) => {
  externalLink = await traceabilityPage(page).openOivPage();
});
Then(/^the user should be redirected to "([^"]*)" page$/, async ({ page }, expectedUrl: string) => {
  page.url();
  expect(externalLink.url(), "User should be redirected to the external link").toContain(expectedUrl);
});
When(/^the user clicks in the National Wine Agency link$/, async ({ page }) => {
  externalLink = await traceabilityPage(page).openNationalWineAgency();
});
When(/^the user clicks in the Case Study button$/, async ({ page }) => {
  externalLink = await traceabilityPage(page).openCaseStudyPage();
});
