import { expect, Page } from "@playwright/test";

import { assert } from "../helpers/assert";

export function signIn(page: Page) {
  const connectWalletButton = page.getByTestId("connect-wallet");
  const emailInput = page.getByPlaceholder("Email address");
  const forgotPasswordLink = page.locator('[data-testid="forgot-password-link"] > span');
  const headerText = page.getByTestId("signin-title");
  const passwordInput = page.getByPlaceholder("Password");
  const signInButton = page.getByTestId("login-btn");
  const signUpLink = page.getByText("Sign Up");

  const goTo = async () => {
    await page.goto("/sign-in");
  };

  const assertItLoads = async () => {
    await assert(page).pageTitle("Sign In | Cardano Blockchain Explorer");
    await expect(headerText).toHaveText("Sign In");
    await expect(emailInput).toBeEditable();
    await expect(passwordInput).toBeEditable();
    await expect(forgotPasswordLink).toBeVisible();
    await expect(signInButton).toBeDisabled();
    await expect(connectWalletButton).toBeVisible();
  };

  const clickForgotPasswordLink = async () => {
    await expect(forgotPasswordLink).toBeEnabled();
    await forgotPasswordLink.click();
  };

  const clickSignUpLink = async () => {
    await expect(signUpLink).toBeEnabled();
    await signUpLink.click();
  };

  const enterEmail = async (username: string) => {
    await emailInput.fill(username);
  };

  const loginAs = async (email: string, password: string) => {
    await enterEmail(email);
    await passwordInput.fill(password);
    await signInButton.click();
    await expect(signInButton).not.toBeVisible();
  };

  return {
    assertItLoads,
    clickForgotPasswordLink,
    clickSignUpLink,
    enterEmail,
    goTo,
    loginAs
  };
}
