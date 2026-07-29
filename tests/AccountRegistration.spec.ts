import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/Homepage";
import { RegistrationPage } from "../pages/RegistrationPage";
import { RandomDataUtil } from "../utils/randomDataGenerator";
import { TestConfig } from "../test.config";

let homePage: HomePage;
let registrationPage: RegistrationPage;
let config: TestConfig;

test.beforeEach(async ({ page }) => {
  config = new TestConfig();
  await page.goto(config.appUrl);
  homePage = new HomePage(page);
  registrationPage = new RegistrationPage(page);
});

test.afterEach(async ({ page }) => {
  await page.close();
});

test("User Registration test", async ({ page }) => {
  await homePage.clickMyAccount();
  await homePage.clickRegister();

  await registrationPage.setFirstName(RandomDataUtil.getFirstName());
  await registrationPage.setLastName(RandomDataUtil.getLastName());
  await registrationPage.setEmail(RandomDataUtil.getEmail());
  await registrationPage.setPassword(RandomDataUtil.getPassword());

  await registrationPage.checkPolicy();
  await registrationPage.clickContinue();

  const confirmationMessage = await registrationPage.getConfirmationMessage();
  expect(confirmationMessage).toContain("Your Account Has Been Created!");
});
