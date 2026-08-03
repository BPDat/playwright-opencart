import { test, expect } from "@playwright/test";
import { TestConfig } from "../test.config";
import { HomePage } from "../pages/HomePage";
import { SearchResultsPage } from "../pages/SearchResultsPage";
import { ProductPage } from "../pages/ProductPage";

let config: TestConfig;
let homePage: HomePage;
let searchResultsPage: SearchResultsPage;
let productPage: ProductPage;

test.beforeEach(async ({ page }) => {
  config = new TestConfig();
  await page.goto(config.appUrl, {
    waitUntil: "networkidle",
    timeout: 60000,
  });

  homePage = new HomePage(page);
  searchResultsPage = new SearchResultsPage(page);
  productPage = new ProductPage(page);
});

test.afterEach(async ({ page }) => {
  page.close();
});

test("Add product to cart test @master @regression @sanity", async ({
  page,
}) => {
  const productName = config.productName;

  await homePage.searchProduct(productName);

  const isSearchResultsPageExists =
    await searchResultsPage.isSearchResultsPageExists();
  expect(isSearchResultsPageExists).toBeTruthy();

  const isProductExists = await searchResultsPage.isProductExists();
  expect(isProductExists).toBeTruthy();

  await searchResultsPage.addProductToCart();
  const isConfirmationMessageVisible =
    await searchResultsPage.isConfirmationMessageVisible();
  expect(isConfirmationMessageVisible).toBeTruthy();

  const productPage = await searchResultsPage.selectProduct();
  const isProductPageExists = await productPage?.isProductPageExists(
    config.productName,
  );
  expect(isProductPageExists).toBeTruthy();
});
