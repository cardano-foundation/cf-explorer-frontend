import test from "@playwright/test";
import { allure } from "allure-playwright";

import { Error } from "../constants/error.constants";
import { assert } from "../helpers/assert";
import { forgotPassword } from "../pages/forgot-password.page";
import { signIn } from "../pages/sign-in.page";
import { signUp } from "../pages/sign-up.page";

const signInFeature = "SignIn";

test.use({ storageState: { cookies: [], origins: [] } });
test.beforeEach(async ({ page }) => {
  await signIn(page).goTo();
});

test.describe(signInFeature, () => {
  test.beforeEach(async () => {
    await allure.feature(signInFeature);
  });

  test("Page loads correctly", async ({ page }) => {
    await signIn(page).assertItLoads();
  });

  test("User can't login with wrong email", async ({ page }) => {
    await signIn(page).enterEmail("asdf");
    await assert(page).errorMessage(Error.PleaseEnterAValidEmailAddress);
  });

  test("User can go to Forgot Password page", async ({ page }) => {
    await signIn(page).clickForgotPasswordLink();
    await forgotPassword(page).assertItLoads();
  });

  test("User can go to Sign Up page", async ({ page }) => {
    await signIn(page).clickSignUpLink();
    await signUp(page).assertItLoads();
  });
});
