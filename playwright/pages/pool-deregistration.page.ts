import { Page } from "@playwright/test";

export function PoolDeregistrationPage(page: Page) {
  const goToPoolDeregistrationPage = async () => {
    await page.goto("/pool-de-registrations");
  };

  return { goToPoolDeregistrationPage };
}
