import { Page } from "@playwright/test";

import { assert } from "../helpers/assert";

export function dashboard(page: Page) {
  const goTo = async () => {
    await page.goto("/");
  };

  const assertItLoads = async () => {
    await assert(page).pageTitle("Cardano Blockchain Explorer");
  };

  return {
    assertItLoads,
    goTo
  };
}
