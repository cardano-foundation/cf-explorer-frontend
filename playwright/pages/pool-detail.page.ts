import { expect, Page } from "@playwright/test";

export function poolDetailPage(page: Page) {
  const checkPoolDetail = async () => {
    const url = await page.url();
    expect(url, "Check url pool detail").toContain("/pool/");
  };

  return { checkPoolDetail };
}
