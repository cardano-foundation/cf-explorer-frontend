import { expect, Page } from "@playwright/test";

export function scriptDetailPage(page: Page) {
  const checkScriptHash = async ({ scriptHash }: { scriptHash: string | null }) => {
    const url = await page.url();
    expect(url, "Check url Native Script Detail").toContain(`${scriptHash}`);
  };

  return { checkScriptHash };
}
