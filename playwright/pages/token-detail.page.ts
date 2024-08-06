import { expect, Page } from "@playwright/test";

export function tokenDetailPage(page: Page) {
  const checkTokenDetail = async ({ tokenId }: { tokenId: string | null }) => {
    const deatailPageHash = page.getByTestId("detail.header.hash");

    await expect(deatailPageHash, "Check token hash detail").toContainText(tokenId?.slice(0, 12) || "");
  };
  return { checkTokenDetail };
}
