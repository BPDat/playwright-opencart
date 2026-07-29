import { Page, expect, Locator } from "@playwright/test";

export class HomePage {
  private readonly page: Page;

  private readonly lnkMyAccount: Locator;
  private readonly lnkRegister: Locator;
  private readonly lnkLogin: Locator;
  private readonly txtSearchbox: Locator;
  private readonly btnSearch: Locator;

  constructor(page: Page) {
    this.page = page;
    this.lnkRegister = page.getByRole("link", { name: "Register" });
    this.lnkLogin = page.getByRole("link", { name: "Login" });
    this.lnkMyAccount = page.getByRole("link", { name: "My Account" });
    this.txtSearchbox = page.locator("input[name='search']");
    this.btnSearch = page.locator("button[type='submit']");
  }

  async isPageExists() {
    const title: string = await this.page.title();
    if (title) return true;
    return false;
  }

  async clickMyAccount() {
    try {
      await this.lnkMyAccount.waitFor();
      await this.lnkMyAccount.click();
    } catch (error) {
      console.error("Error occurred while clicking My Account link:", error);
      throw error;
    }
  }
  async clickRegister() {
    try {
      await this.lnkRegister.click();
    } catch (error) {
      console.error("Error occurred while clicking Register link:", error);
      throw error;
    }
  }
  async clickLogin() {
    try {
      await this.lnkLogin.click();
    } catch (error) {
      console.error("Error occurred while clicking Login link:", error);
      throw error;
    }
  }

  async searchProduct(productName: string): Promise<void> {
    try {
      await this.txtSearchbox.waitFor();
      await this.txtSearchbox.fill(productName);
      await this.btnSearch.click();
    } catch (error) {
      console.error("Error occurred while searching for product:", error);
      throw error;
    }
  }
}
