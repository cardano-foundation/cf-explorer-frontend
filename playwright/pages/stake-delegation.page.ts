import { Page } from "@playwright/test";

export function stakeDelegationPage(page: Page) {
  const stakeAddress = page.getByTestId("stakeDelegations.stakeAddressValue").first();
  const goToStakeDelegationPage = async () => {
    await page.goto("/stake-address-delegations");
  };

  const openStakeAddressDetailPage = async () => {
    await stakeAddress.click();
  };

  return {
    goToStakeDelegationPage,
    openStakeAddressDetailPage
  };
}
