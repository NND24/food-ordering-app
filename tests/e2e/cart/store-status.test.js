const { test, expect } = require("@playwright/test");
const { LEGIT } = require("../../fixtures/auth");
const exp = require("constants");

test.describe("Store Status (DT)", () => {
  test("TC17", async ({ browser }) => {
    const context = await browser.newContext({
      permissions: ["geolocation"],
      geolocation: { latitude: 10.762622, longitude: 106.660172 }, // example: Ho Chi Minh City
      locale: "vi-VN",
    });

    const page = await context.newPage();
    // Step 1: Login

    await page.goto("http://localhost:3000/auth/login");
    await page.getByRole("textbox", { name: "Nhập email của bạn" }).click();
    await page
      .getByRole("textbox", { name: "Nhập email của bạn" })
      .fill(LEGIT.email);
    await page.getByRole("textbox", { name: "Nhập mật khẩu của bạn" }).click();
    await page
      .getByRole("textbox", { name: "Nhập mật khẩu của bạn" })
      .fill(LEGIT.password);
    await page.getByRole("button", { name: "Đăng nhập" }).click();
    await page.getByRole("button", { name: "close" }).click();

    // Step 2: Click 'Tasty Bites'
    await page.goto(
      "http://localhost:3000/restaurant/67c6e409f1c07122e88619d6"
    );

    // Step 3: Add Dish with all toppings to cart
    await page
      .getByRole("link", { name: "Combo Burger Tôm 01 Burger Tô" })
      .nth(1)
      .click();
      await page.getByRole('spinbutton').nth(0).fill('1');
      const addCartBtn = page.locator('div[name="addCartBtn"]');
      await addCartBtn.click();

    // Step 4: verify cart contents
    const cartDetailBtn = page.locator('a[name="cartDetailBtn"]');
    await cartDetailBtn.click();

    await page
      .locator("div")
      .filter({ hasText: /^Đặt đơn$/ })
      .click();

    const successAlert = page.getByText("Đặt thành công", { exact: false });
    await expect(successAlert).toBeVisible();
  });
  test("TC18", async ({ browser }) => {
    const context = await browser.newContext({
      permissions: ["geolocation"],
      geolocation: { latitude: 10.762622, longitude: 106.660172 }, // example: Ho Chi Minh City
      locale: "vi-VN",
    });

    const page = await context.newPage();
    // Step 1: Login

    await page.goto("http://localhost:3000/auth/login");
    await page.getByRole("textbox", { name: "Nhập email của bạn" }).click();
    await page
      .getByRole("textbox", { name: "Nhập email của bạn" })
      .fill(LEGIT.email);
    await page.getByRole("textbox", { name: "Nhập mật khẩu của bạn" }).click();
    await page
      .getByRole("textbox", { name: "Nhập mật khẩu của bạn" })
      .fill(LEGIT.password);
    await page.getByRole("button", { name: "Đăng nhập" }).click();
    await page.getByRole("button", { name: "close" }).click();

    // Step 2: Click 'Tasty Bites'
    await page.goto(
      "http://localhost:3000/restaurant/67c6e409f1c07122e88619d6"
    );

    // Step 3: Add Dish with all toppings to cart
    await page
      .getByRole("link", { name: "Combo Burger Tôm 01 Burger Tô" })
      .nth(1)
      .click();
      await page.getByRole('spinbutton').nth(0).fill('1');
      const addCartBtn = page.locator('div[name="addCartBtn"]');
      await addCartBtn.click();

    // Step 4: verify cart contents
    const cartDetailBtn = page.locator('a[name="cartDetailBtn"]');
    await cartDetailBtn.click();
    await page.request.post("http://localhost:5000/api/v1/store/test/changeStatus");
    await page.waitForTimeout(5000);
    await page.reload();
    await page
      .locator("div")
      .filter({ hasText: /^Đặt đơn$/ })
      .click();

    const successAlert = page.getByText("Cửa hàng đã đóng cửa, không thể đặt hàng. Vui lòng quay lại sau!", { exact: false });
    await page.request.post("http://localhost:5000/api/v1/store/test/changeStatus");
    await expect(successAlert).toBeVisible();
  });
});
