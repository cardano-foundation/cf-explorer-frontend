import { expect, Page } from "@playwright/test";

import { assert } from "../helpers/assert";

export function forgotPassword(page: Page) {
  const backArrowText = page.getByText("Back", { exact: true });
  const emailInput = page.getByPlaceholder("Email address");
  const signInLink = page.getByText("Sign In", { exact: true });
  const signInButton = page.getByRole("button", { name: "Submit" });

  const goTo = async () => {
    await page.goto("/forgot-password");
  };

  const assertItLoads = async () => {
    await assert(page).pageTitle("Forgot Password");
    await expect(signInLink).toBeVisible();
    await expect(backArrowText).toBeVisible();
    await expect(emailInput).toBeVisible();
    await expect(signInButton).toBeVisible();
  };

  return {
    assertItLoads,
    goTo
  };
}
