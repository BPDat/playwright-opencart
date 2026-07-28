import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { SearchResultsPage } from '../pages/SearchResultsPage';
import { TestConfig } from '../test.config';

let config: TestConfig;
let homePage: HomePage;
let searchResultsPage: SearchResultsPage;

test.beforeEach(async ({ page }) => {
  config = new TestConfig();
  await page.goto(config.appUrl);
  homePage = new HomePage(page);
  searchResultsPage = new SearchResultsPage(page);
});

test.afterEach(async ({ page }) => {
  await page.close();
});

test('Product search test @master @regressionProduct search test @master @regression', async ({ page }) => {
  const productName = config.productName;

  await homePage.searchProduct(productName);

  const isSearchResultsPageExists = await searchResultsPage.isSearchResultsPageExists();
  expect(isSearchResultsPageExists).toBeTruthy();

  const isProductExists = await searchResultsPage.isProductExists();
  expect(isProductExists).toBeTruthy();
})
