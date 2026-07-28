import { Page, Locator } from "@playwright/test";

export class LoginPage {
  private readonly page: Page;

  private readonly txtEmail: Locator;
  private readonly txtPassword: Locator;
  private readonly btnLogin: Locator;
  private readonly txtErrorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.txtEmail = page.getByLabel("E-Mail Address");
    this.txtPassword = page.getByLabel("Password");
    this.btnLogin = page.getByRole("button", { name: "Login" });
    this.txtErrorMessage = page.locator(
      ".alert.alert-danger.alert-dismissible",
    );
  }
  async setEmail(email: string): Promise<void> {
    await this.txtEmail.fill(email);
  }

  async setPassword(password: string): Promise<void> {
    await this.txtPassword.fill(password);
  }

  async clickLogin(): Promise<void> {
    await this.btnLogin.click();
  }

  async getLoginErrorMessage(): Promise<string | null> {
    return await this.txtErrorMessage.textContent();
  }

  async login(email: string, password: string): Promise<void> {
    await this.setEmail(email);
    await this.setPassword(password);
    await this.clickLogin();
  }
}
