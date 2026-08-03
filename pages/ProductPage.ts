import { Page, Locator, expect } from "@playwright/test";
import { ShoppingCartPage } from "./ShoppingCartPage"; // I

export class ProductPage {
  private readonly page: Page;

  private readonly txtQuantity: Locator;
  private readonly btnAddToCart: Locator;
  private readonly cnfMsg: Locator;
  private readonly btnItems: Locator;
  private readonly lnkViewCart: Locator;
  private readonly productHeading: Locator;

  constructor(page: Page) {
    this.page = page;
    this.txtQuantity = page.locator("#input-quantity");
    this.btnAddToCart = page.locator("#button-cart");
    this.cnfMsg = page.locator(".alert.alert-success.alert-dismissible");
    this.btnItems = page.locator("#cart>div>button");
    this.lnkViewCart = page.locator('strong:has-text("View Cart")');
    this.productHeading = page.locator("#content h1");
  }

  async isProductPageExists(productName: string): Promise<boolean> {
    try {
      return (await this.productHeading.textContent())?.toLowerCase() ===
        productName.toLowerCase()
        ? true
        : false;
    } catch (error) {
      console.error("Error occurred while checking product page:", error);
      return false;
    }
  }

  async setQuantity(quantity: string): Promise<void> {
    await this.txtQuantity.fill("");
    await this.txtQuantity.fill(quantity);
  }

  async clickAddToCart(): Promise<void> {
    await this.btnAddToCart.click();
  }

  async isConfirmationMessageVisible(): Promise<boolean> {
    return await this.cnfMsg.isVisible();
  }

  async clickItemsToNavigateToCart(): Promise<void> {
    await this.btnItems.click();
  }

  async clickViewCart(): Promise<ShoppingCartPage> {
    await this.lnkViewCart.click();
    return new ShoppingCartPage(this.page);
  }

  async addProductToCart(quantity?: string): Promise<void> {
    await this.setQuantity(quantity ?? "1");
    await this.clickAddToCart();
    await this.isConfirmationMessageVisible();
  }
}
