import { expect, Page } from "@playwright/test";

export function addressDetailPage(page: Page) {
  const addressDetailTitle = page.getByTestId("address-detail-title");

  const checkTransactionsDetail = async ({ transactionHash }: { transactionHash: string | null }) => {
    const deatailPageTitle = page.getByTestId("detail.page.title");

    const url = await page.url();
    await expect(deatailPageTitle, "Check title on transaction detail").toHaveText("Transaction Details");
    expect(url, "Check url transaction detail").toContain(`${transactionHash}`);
  };

  const checkAddressDetail = async ({ address }: { address: string | null }) => {
    const url = await page.url();
    await expect(addressDetailTitle, "Check title on address detail").toHaveText("Address Details");
    expect(url, "Check url address detail").toContain(`/address/${address}`);
  };

  return { checkAddressDetail, checkTransactionsDetail };
}
