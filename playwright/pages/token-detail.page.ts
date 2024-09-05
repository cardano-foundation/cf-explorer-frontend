import { expect, Page } from "@playwright/test";

export function tokenDetailPage(page: Page) {
  const checkTokenDetail = async ({ tokenId }: { tokenId: string | null }) => {
    const deatailPageHash = page.getByTestId("detail.header.hash");

    await expect(deatailPageHash, "Check token hash detail").toContainText(tokenId?.slice(0, 12) || "");
  };

  const checkTokenID = async ({ tokenID }: { tokenID: string | null }) => {
    const url = await page.url();
    expect(url, "Check url token ID").toContain(`${tokenID}`);
  };

  return { checkTokenID, checkTokenDetail };
}
