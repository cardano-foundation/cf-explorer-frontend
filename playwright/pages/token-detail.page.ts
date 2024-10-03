import { expect, Page } from "@playwright/test";

export function tokenDetailPage(page: Page) {
  const checkTokenID = async ({ tokenID }: { tokenID: string | null }) => {
    const url = await page.url();
    expect(url, "Check url token ID").toContain(`${tokenID}`);
  };

  return { checkTokenID };
}
