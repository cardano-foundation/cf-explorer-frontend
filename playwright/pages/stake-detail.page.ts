import { expect, Page } from "@playwright/test";

export function stakeDetailPage(page: Page) {
  const addressDetailTitle = page.getByTestId("stake-address-detail-title");

  const checkStakeDetail = async ({ address }: { address: string | null }) => {
    const url = page.url();
    await expect(addressDetailTitle, "Check title on address detail").toHaveText("Stake Address Details");
    expect(url, "Check url address detail").toContain(`/stake-address/${address}`);
  };

  return { checkStakeDetail };
}
