import { expect, Page } from "@playwright/test";

import { assert } from "../helpers/assert";

export function signUp(page: Page) {
  const backArrowText = page.getByText("Back", { exact: true });
  const confirmEmailInput = page.getByPlaceholder("Confirm email address", { exact: true });
  const emailInput = page.getByPlaceholder("Email address", { exact: true });
  const confirmPasswordInput = page.getByPlaceholder("Confirm password", { exact: true });
  const passwordInput = page.getByPlaceholder("Password", { exact: true });
  const signUpButton = page.getByTestId("signup-button");
  const termsAndConditionsCheckbox = page.locator("input.PrivateSwitchBase-input");

  const goTo = async () => {
    await page.goto("/sign-up");
  };

  const assertItLoads = async () => {
    await assert(page).pageTitle("Sign Up | Cardano Blockchain Explorer");
    await expect(backArrowText).toBeVisible();
    await expect(emailInput).toBeVisible();
    await expect(confirmEmailInput).toBeVisible();
    await expect(passwordInput).toBeVisible();
    await expect(confirmPasswordInput).toBeVisible();
    await expect(termsAndConditionsCheckbox).toBeVisible();
    await expect(signUpButton).toBeVisible();
  };

  return {
    assertItLoads,
    goTo
  };
}
