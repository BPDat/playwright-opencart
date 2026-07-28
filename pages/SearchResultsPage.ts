import { Page, Locator, expect } from "@playwright/test";
import { ProductPage } from "./ProductPage";

export class SearchResultsPage {
  private readonly page: Page;

  private readonly searchPageHeader: Locator;
  private readonly searchProducts: Locator;
  private readonly cnfMsg: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchPageHeader = page.locator("#content>h1");
    this.searchProducts = page.locator("h4>a");
    this.cnfMsg = page.locator(".alert.alert-success.alert-dismissible");
  }

  async isSearchResultsPageExists(): Promise<boolean> {
    try {
      const header = await this.searchPageHeader.textContent();
      return header?.includes("Search - ") ?? false;
    } catch (error) {
      console.error(
        "Error occurred while checking search results page:",
        error,
      );
      return false;
    }
  }

  async isProductExists(): Promise<boolean> {
    try {
      const product = await this.page.getByPlaceholder("Search").inputValue();
      const count = await this.searchProducts.count();
      for (let i = 0; i < count; i++) {
        const productName = await this.searchProducts.nth(i).textContent();
        if (productName === product) {
          console.log(`Product found: ${productName}`);
          return true;
        }
      }
      return false;
    } catch (error) {
      console.error("Error occurred while checking search results:", error);
      throw error;
    }
  }

  async addProductToCart(): Promise<void> {
    try {
      const product = (
        await this.page.getByPlaceholder("Search").inputValue()
      ).toLowerCase();
      const count = await this.searchProducts.count();
      for (let i = 0; i < count; i++) {
        const productName = (
          await this.searchProducts.nth(i).textContent()
        )?.toLowerCase();
        if (productName === product) {
          const productCurrent = this.searchProducts
            .nth(i)
            .locator("xpath=ancestor::div[@class='content']")
            .locator("button[title='Add to Cart']");
          await productCurrent.click();
          break;
        }
      }
    } catch (error) {
      console.error("Error occurred while adding product to cart:", error);
      throw error;
    }
  }

  async selectProduct(): Promise<ProductPage | null> {
    try {
      const product = (
        await this.page.getByPlaceholder("Search").inputValue()
      ).toLowerCase();
      const count = await this.searchProducts.count();
      for (let i = 0; i < count; i++) {
        const productName = (
          await this.searchProducts.nth(i).textContent()
        )?.toLowerCase();
        if (productName === product) {
          console.log(`Product found: ${productName}`);
          await this.searchProducts.nth(i).click();
          return new ProductPage(this.page);
        }
        console.log(`Product not found: ${productName}`);
      }
    } catch (error) {
      console.error("Error occurred while selecting product:", error);
      throw error;
    }
    return null;
  }

  async isConfirmationMessageVisible(): Promise<boolean> {
    try {
      await expect(this.cnfMsg).toBeVisible();
      return true;
    } catch {
      return false;
    }
  }

  async getProductCount(): Promise<number> {
    return await this.searchProducts.count();
  }
}
