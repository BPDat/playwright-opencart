import { test, expect, Page } from "@playwright/test";
import { RegistrationPage } from "../pages/RegistrationPage";
import { HomePage } from "../pages/HomePage";
import { RandomDataUtil } from "../utils/randomDataGenerator";
import { TestConfig } from "../test.config";
import { LogoutPage } from "../pages/LogoutPage";
import { LoginPage } from "../pages/LoginPage";
import { MyAccountPage } from "../pages/MyAccountPage";
import { SearchResultsPage } from "../pages/SearchResultsPage";
import { ProductPage } from "../pages/ProductPage";
import { ShoppingCartPage } from "../pages/ShoppingCartPage";
import { CheckoutPage } from "../pages/CheckoutPage";

test("execute end-to-end test flow @end-to-end", async ({ page }) => {
  const config = new TestConfig();

  await page.goto(config.appUrl);

  let { email, password }: { email: string; password: string } =
    await performRegistration(page);
  console.log("✅ Registration is completed!");

  await performLogout(page);
  console.log("✅ Logout is completed!");

  await performLogin(page, email, password);
  console.log("✅ Login is completed!");

  await addProductToCart(page);
  console.log("✅ Product added to cart!");

  await verifyShoppingCart(page);
  console.log("✅ Shopping cart verification completed!");
});

async function performRegistration(
  page: Page,
): Promise<{ email: string; password: string }> {
  const homePage = new HomePage(page);
  await homePage.clickMyAccount();
  await homePage.clickRegister();

  const registrationPage = new RegistrationPage(page);

  await registrationPage.setFirstName(RandomDataUtil.getFirstName());
  await registrationPage.setLastName(RandomDataUtil.getLastName());
  const email = RandomDataUtil.getEmail();
  await registrationPage.setEmail(email);
  const password = RandomDataUtil.getPassword();
  await registrationPage.setPassword(password);

  await registrationPage.checkPolicy();
  await registrationPage.clickContinue();

  const confirmationMessage = await registrationPage.getConfirmationMessage();
  expect(confirmationMessage).toContain("Your Account Has Been Created!");

  return { email, password };
}

async function performLogout(page: Page) {
  const myAccountPage = new MyAccountPage(page);
  const logoutPage: LogoutPage = await myAccountPage.clickLogout();

  expect(await logoutPage.isContinueButtonVisible()).toBe(true);

  const homePage = await logoutPage.clickContinue();
  expect(await homePage.isPageExists()).toBe(true);
}

async function performLogin(page: Page, email: string, password: string) {
  const config = new TestConfig();
  await page.goto(config.appUrl);

  const homePage = new HomePage(page);
  await homePage.clickMyAccount();
  await homePage.clickLogin();

  const loginPage = new LoginPage(page);
  await loginPage.login(email, password);

  const myAccountPage = new MyAccountPage(page);
  expect(await myAccountPage.isMyAccountPageExists()).toBeTruthy();
}

async function addProductToCart(page: Page) {
  const homePage = new HomePage(page);

  const config = new TestConfig();
  const productName: string = config.productName;
  const productQuantity: string = config.productQuantity;

  await homePage.searchProduct(productName);

  const searchResultsPage = new SearchResultsPage(page);

  expect(await searchResultsPage.isSearchResultsPageExists()).toBeTruthy();

  expect(await searchResultsPage.isSearchResultsPageExists()).toBeTruthy();

  const productPage = await searchResultsPage.selectProduct();
  await productPage?.setQuantity(productQuantity);
  await productPage?.addProductToCart("2");

  expect(await productPage?.isConfirmationMessageVisible()).toBe(true);
}

async function verifyShoppingCart(page: Page) {
  const productPage = new ProductPage(page);

  await productPage.clickItemsToNavigateToCart();
  const shoppingCartPage: ShoppingCartPage = await productPage.clickViewCart();

  console.log("🛒 Navigated to shopping cart!");

  const config = new TestConfig();
  console.log("testtest", await shoppingCartPage.getTotalPrice());
  expect(await shoppingCartPage.getTotalPrice()).toBe(config.totalPrice);
}

async function performCheckout(page: Page) {
  // checkout
}
