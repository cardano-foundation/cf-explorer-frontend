import { createBdd } from "playwright-bdd";
import process from "process";

import { signIn } from "../../pages/sign-in.page";
import { dashboard } from "../../pages/dashboard.page";
import { assert } from "../../helpers/assert";
import { Error } from "../../constants/error.constants";
import { forgotPassword } from "../../pages/forgot-password.page";

const { Given, When, Then } = createBdd();
const username = process.env.USERNAME as string;
const password = process.env.PASSWORD as string;

Given(/^the user go to explorer sign in page$/, async ({ page }) => {
  await signIn(page).goTo();
});
When(/^the user enter his credentials for sign in$/, async ({ page }) => {
  await signIn(page).loginAs(username, password);
});
Then(/^the user should see the explorer dashboard page with his user account info$/, async ({ page }) => {
  await dashboard(page).assertUserLoggedIn(username);
  await dashboard(page).assertItLoads();
});

When(/^the user enter and invalid email$/, async ({ page }) => {
  await signIn(page).enterEmail("afakhfa");
});
Then(/^the user should see an error displayed in sign in page$/, async ({ page }) => {
  await assert(page).errorMessage(Error.PleaseEnterAValidEmailAddress);
});

When(/^the user selects the forgot password option$/, async ({ page }) => {
  await signIn(page).clickForgotPasswordLink();
});
Then(/^the user should see the forgot password page with field for submit his email$/, async ({ page }) => {
  await forgotPassword(page).assertItLoads();
});
