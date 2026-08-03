import { test, expect, Page } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { MyAccountPage } from "../pages/MyAccountPage";
import { DataProvider } from "../utils/dataProvider";
import { HomePage } from "../pages/HomePage";
import { TestConfig } from "../test.config";

const jsonPath = "data/logindata.json";
const jsonTestData = DataProvider.getDataFromJson(jsonPath);

for (const data of jsonTestData) {
  test(`login test with email: ${data.email} and password: ${data.password} @datadriven`, async ({
    page,
  }) => {
    const config = new TestConfig();
    await page.goto(config.appUrl, {
      waitUntil: "networkidle",
      timeout: 60000,
    });

    const homePage = new HomePage(page);
    await homePage.clickMyAccount();
    await homePage.clickLogin();

    const loginPage = new LoginPage(page);
    await loginPage.login(data.email, data.password);

    if (data.expected.toLowerCase() === "success") {
      const myAccountPage = new MyAccountPage(page);
      const isVisible = await myAccountPage.isMyAccountPageExists();
      console.log("Is My Account page visible:", isVisible);
      expect(isVisible).toBeTruthy();
    } else {
      const errorMessage = await loginPage.getLoginErrorMessage();
      console.log("Error message:", errorMessage);
      expect(errorMessage).toContain(
        "Warning: No match for E-Mail Address and/or Password.",
      );
    }
  });
}
