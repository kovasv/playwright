import { test as base } from "@playwright/test";
import LoginPage from "./loginPage";
import MainPage from "./mainPage";
import CartPage from "./cartPage";

// Extend basic test by providing a two new fixtures (our page object pages)
export const test = base.extend<{
  loginPage: LoginPage;
  mainPage: MainPage;
  cartPage: CartPage;
}>({
  // Define a fixture. Note that it can use built-in fixture "page"
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  mainPage: async ({ page }, use) => {
    await use(new MainPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
});