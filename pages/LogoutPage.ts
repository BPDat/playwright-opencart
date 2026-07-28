import { Page, Locator } from "@playwright/test";
import { HomePage } from "./HomePage";

export class LogoutPage {
  private readonly page: Page;
  private readonly btncontinue: Locator;

  constructor(page: Page) {
    this.page = page;
    this.btncontinue = page.getByRole("link", { name: "Continue" });
  }

  async clickContinue() {
    await this.btncontinue.click();
    return new HomePage(this.page);
  }

  async isContinueButtonVisible(): Promise<boolean> {
    return await this.btncontinue.isVisible();
  }
}
