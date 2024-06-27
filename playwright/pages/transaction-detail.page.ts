import { expect, Page } from "@playwright/test";

export function transactionDetailPage(page: Page) {
  const checkTransactionsDetail = async ({ transactionHash }: { transactionHash: string | null }) => {
    const deatailPageTitle = page.getByTestId("detail.page.title");

    const url = await page.url();
    await expect(deatailPageTitle, "Check title on transaction detail").toHaveText("Transaction Details");
    expect(url, "Check url transaction detail").toContain(`${transactionHash}`);
  };

  const checkAddressDetail = async ({ addressId }: { addressId: string | null }) => {
    const url = await page.url();
    expect(url, "Check url address detail").toContain(`${addressId}`);
  };
  return { checkTransactionsDetail, checkAddressDetail };
}
