import { expect, Page } from "@playwright/test";

export function assert(page: Page) {
  const errorMessage = async (expectedErrorMessage: string) => {
    await expect(page.locator('p[class="MuiFormHelperText-root css-1eoar7b"]')).toHaveText(expectedErrorMessage);
  };

  const pageTitle = async (title: string) => {
    await expect(page).toHaveTitle(title);
  };

  return {
    errorMessage,
    pageTitle
  };
}
