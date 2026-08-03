export class TestConfig {
  appUrl = process.env.APP_URL || "http://localhost/opencart/upload/";

  email = process.env.TEST_EMAIL || "test@test.com";
  password = process.env.TEST_PASSWORD || "test@123";

  //product details
  productName = "MacBook";
  productQuantity = "2";
  totalPrice = "$1,204.00";
}
