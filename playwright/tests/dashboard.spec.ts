import test from "@playwright/test";
import { allure } from "allure-playwright";

import { dashboard } from "../pages/dashboard.page";
import { Path } from "../constants/path.constants";

const dashboardFeature = "Dashboard";

test.use({ storageState: Path.StorageStateForUser });
test.beforeEach(async ({ page }) => {
  await dashboard(page).goTo();
});

test.describe(dashboardFeature, () => {
  test.beforeEach(async () => {
    await allure.feature(dashboardFeature);
  });

  test("Page loads correctly", async ({ page }) => {
    await dashboard(page).assertItLoads();
  });
});
