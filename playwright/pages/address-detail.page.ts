import { expect, Page } from "@playwright/test";

export function addressDetailPage(page: Page) {
  const addressDetailTitle = page.getByTestId("address-detail-title");

  const checkAddressDetail = async ({ address }: { address: string | null }) => {
    const url = await page.url();
    await expect(addressDetailTitle, "Check title on address detail").toHaveText("Address Details");
    expect(url, "Check url address detail").toContain(`${address}`);
  };

  return { checkAddressDetail };
}
