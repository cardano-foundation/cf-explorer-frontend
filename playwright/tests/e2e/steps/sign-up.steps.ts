import { createBdd } from "playwright-bdd";
import { faker } from "@faker-js/faker";
import process from "process";

import { signUp } from "../../../pages/sign-up.page";
import { assert } from "../../../helpers/assert";
import { Error } from "../../../constants/error.constants";

const { Given, When, Then } = createBdd();
const username = process.env.USERNAME as string;
const password = process.env.PASSWORD as string;

Given(/^the user go to explorer sign up page$/, async ({ page }) => {
  await signUp(page).goTo();
});
When(/^the user enter and invalid email in sign up form$/, async ({ page }) => {
  await signUp(page).enterEmail(faker.internet.email().replace("@", ""));
});
Then(/^the user should see an error displayed in sign un page$/, async ({ page }) => {
  await assert(page).errorMessage(Error.PleaseEnterAValidEmailAddress);
});

Given(/^the user enter his email$/, async ({ page }) => {
  await signUp(page).enterEmail(faker.internet.email());
});
When(/^the user enter a different email in confirm email field$/, async ({ page }) => {
  await signUp(page).confirmEmail(faker.internet.email());
});
Then(/^the user should see an error indicating the email does not match$/, async ({ page }) => {
  await assert(page).errorMessage(Error.EmailAddressDoesNotMatch);
});

Given(/^the user enter a password$/, async ({ page }) => {
  await signUp(page).enterPassword("CardanoTest1$");
});
When(/^the user enter a different password in password confirm field$/, async ({ page }) => {
  await signUp(page).confirmPassword("CardanoTest2$");
});
Then(/^the user should see an error indicating the password does not match$/, async ({ page }) => {
  await assert(page).errorMessage(Error.PasswordDoesNotMatch);
});

When(/^the user enter all the credentials information without accept terms and conditions$/, async ({ page }) => {
  await signUp(page).registerAs(faker.internet.email(), faker.internet.password(10) + "1$");
});
Then(/^the user should be not able to click the sign up option$/, async ({ page }) => {
  await signUp(page).assertSignUpIsEnable(false);
});

When(/^the user try to register with a registered email$/, async ({ page }) => {
  await signUp(page).registerAs(username, password);
  await signUp(page).acceptTermsAndConditionsAndSignUp();
});
Then(/^the user should see an error indicating the email is already registered$/, async ({ page }) => {
  await assert(page).errorMessage(Error.EmailAlreadyExist);
});
