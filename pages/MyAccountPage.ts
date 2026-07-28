import { Page, Locator } from "@playwright/test";
import { LogoutPage } from "./LogoutPage";

export class MyAccountPage {
  private readonly page: Page;

  private readonly msgHeading: Locator;
  private readonly lnkMyAccount: Locator;
  private readonly lnkLogout: Locator;

  constructor(page: Page) {
    this.page = page;
    this.lnkMyAccount = page.locator("span:has-text('My Account')");
    this.lnkLogout = page.getByRole("link", { name: "Logout" });
    this.msgHeading = page.locator("h1:has-text('My Account')");
  }

  async isMyAccountPageExists(): Promise<boolean> {
    try {
      await this.msgHeading.waitFor({
        state: "visible",
        timeout: 1000,
      });
      return true;
    } catch (error) {
      console.error(
        "Error occurred while checking My Account page existence:",
        error,
      );
      throw error;
    }
  }

  async clickMyAccount() {
    try {
      await this.lnkMyAccount.click();
    } catch (error) {
      console.error("Error occurred while clicking My Account link:", error);
      throw error;
    }
  }
  async clickLogout() {
    try {
      await this.lnkLogout.click();
      return new LogoutPage(this.page);
    } catch (error) {
      console.error("Error occurred while clicking Logout link:", error);
      throw error;
    }
  }
  getPageTitle(): Promise<string> {
    return this.page.title();
  }
}
