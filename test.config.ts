import process from "process";

export class TestConfig {
  appUrl = process.env.APP_URL ?? "http://localhost/opencart/upload/";

  email = "test@test.com";
  password = "test@123";

  //product details
  productName = "MacBook";
  productQuantity = "2";
  totalPrice = "$1,204.00";
}
