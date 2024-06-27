import { expect, Page } from "@playwright/test";

export function transactionDetailPage(page: Page) {
  const checkAddressDetail = async ({ addressId }: { addressId: string | null }) => {
    const url = await page.url();
    expect(url, "Check url address detail").toContain(`${addressId}`);
  };
  return { checkAddressDetail };
}
