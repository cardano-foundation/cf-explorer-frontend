import { expect, Page } from "@playwright/test";

export function stakeDetailPage(page: Page) {
  const addressDetailTitle = page.getByTestId("stake-address-detail-title");
  const addressId = page.getByTestId("ellipsis-text");
  const transactionsTab = page.locator("div[class='MuiAccordionSummary-expandIconWrapper Mui-expanded css-1fx8m19']");
  const totalTransactions = page.locator("span[class='css-11m0x7h']");

  const checkStakeDetail = async ({ address }: { address: string | null }) => {
    const url = page.url();
    await expect(addressDetailTitle, "Check title on address detail").toHaveText("Stake Address Details");
    expect(url, "Check url address detail").toContain(`/stake-address/${address}`);
  };

  const getStakeAddressId = async () => {
    return await addressId.textContent();
  };

  const getStakeAddressTx = async () => {
    await transactionsTab.click();
    return totalTransactions?.textContent();
  };

  return {
    checkStakeDetail,
    getStakeAddressId,
    getStakeAddressTx
  };
}
