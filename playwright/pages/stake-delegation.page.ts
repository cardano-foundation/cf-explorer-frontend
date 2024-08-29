import { Page } from "@playwright/test";

export function stakeDelegationPage(page: Page) {
  const goToStakeDelegationPage = async () => {
    await page.goto("/stake-address-delegations");
  };

  return { goToStakeDelegationPage };
}
