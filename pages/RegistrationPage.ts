import { Page, expect, Locator } from "@playwright/test";

export class RegistrationPage {
  private readonly page: Page;

  private readonly txtFirstName: Locator;
  private readonly txtLastName: Locator;
  private readonly txtEmail: Locator;
  private readonly txtPassword: Locator;
  private readonly chkSubscribe: Locator;
  private readonly chkPolicy: Locator;
  private readonly btnContinue: Locator;
  private readonly msgConfirmation: Locator;

  constructor(page: Page) {
    this.page = page;
    this.txtFirstName = page.getByLabel("First Name");
    this.txtLastName = page.getByLabel("Last Name");
    this.txtEmail = page.getByLabel("E-Mail");
    this.txtPassword = page.getByLabel("Password");
    this.chkSubscribe = page.locator("#input-newsletter");
    this.chkPolicy = page.locator("input[name='agree']");
    this.btnContinue = page.getByRole("button", { name: "Continue" });
    this.msgConfirmation = page.locator(
      "h1:has-text('Your Account Has Been Created!')",
    );
  }

  async setFirstName(firstName: string): Promise<void> {
    await this.txtFirstName.fill(firstName);
  }

  async setLastName(lastName: string): Promise<void> {
    await this.txtLastName.fill(lastName);
  }

  async setEmail(email: string): Promise<void> {
    await this.txtEmail.fill(email);
  }

  async setPassword(password: string): Promise<void> {
    await this.txtPassword.fill(password);
  }

  async getConfirmationMessage(): Promise<string> {
    return (await this.msgConfirmation.textContent()) ?? "";
  }

  async checkSubscribe(): Promise<void> {
    await this.chkSubscribe.check();
  }

  async checkPolicy(): Promise<void> {
    await this.chkPolicy.check();
  }

  async clickContinue(): Promise<void> {
    await this.btnContinue.click();
  }

  async completeRegistration(userData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }): Promise<void> {
    await this.setFirstName(userData.firstName);
    await this.setLastName(userData.lastName);
    await this.setEmail(userData.email);
    await this.setPassword(userData.password);
    await this.checkPolicy();

    await this.clickContinue();
    expect(await this.msgConfirmation).toBeVisible();
  }
}
