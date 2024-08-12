import { Page } from "@playwright/test";

export function PoolRegistrationPage(page: Page) {
  const goToPoolRegistrationPage = async () => {
    await page.goto("/pool-certificates");
  };

  return { goToPoolRegistrationPage };
}
