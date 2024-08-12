import { Page } from "@playwright/test";

export function stakeRegistrationPage(page: Page) {
  const goToStakeRegistrationPage = async () => {
    await page.goto("/stake-address-registrations");
  };

  return { goToStakeRegistrationPage };
}
