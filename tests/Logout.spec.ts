import { test, expect } from "@playwright/test";
import { TestConfig } from "../test.config";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import { MyAccountPage } from "../pages/MyAccountPage";
import { LogoutPage } from "../pages/LogoutPage";

let config: TestConfig;
let homePage: HomePage;
let loginPage: LoginPage;
let myAccountPage: MyAccountPage;

test.beforeEach(async ({ page }) => {
  config = new TestConfig();
  await page.goto(config.appUrl);
  homePage = new HomePage(page);
  loginPage = new LoginPage(page);
  myAccountPage = new MyAccountPage(page);
});

test.afterEach(async ({ page }) => {
  await page.close();
});

test("User logout test @master @regression", async ({ page }) => {
  await homePage.clickMyAccount();
  await homePage.clickLogin();

  await loginPage.login(config.email, config.password);

  const isVisible = await myAccountPage.isMyAccountPageExists();
  console.log("Is My Account page visible:", isVisible);
  expect(isVisible).toBeTruthy();

  const logoutPage: LogoutPage = await myAccountPage.clickLogout();
  const isContinueButtonVisible = await logoutPage.isContinueButtonVisible();
  console.log("Is Continue button visible:", isContinueButtonVisible);
  expect(isContinueButtonVisible).toBeTruthy();

  homePage = await logoutPage.clickContinue();
  expect(await homePage.isPageExists()).toBeTruthy();
});
