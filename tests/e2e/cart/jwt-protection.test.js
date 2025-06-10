const { test, expect } = require("@playwright/test");
const { LEGIT } = require("../../fixtures/auth");

test.describe("API Token test", () => {
  const cartBaseUrl = "http://localhost:5000/api/v1/cart";

  test("TC_A01", async ({ browser }) => {
    const context = await browser.newContext({
      permissions: ["geolocation"],
      geolocation: { latitude: 10.762622, longitude: 106.660172 },
      locale: "vi-VN",
    });

    const page = await context.newPage();

    // Step 1: Login
    await page.goto("http://localhost:3000/auth/login");
    await page
      .getByRole("textbox", { name: "Nhập email của bạn" })
      .fill(LEGIT.email);
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
    await page.getByRole("spinbutton").nth(0).fill("1");
    const addCartBtn = page.locator('div[name="addCartBtn"]');
    await addCartBtn.click();

    const successAlert = page.getByText("Cập nhật giỏ hàng thành công", {
      exact: false,
    });
    await expect(successAlert).toBeVisible();
  });

  test("TC_A02", async ({ browser }) => {
    const context = await browser.newContext({
      permissions: ["geolocation"],
      geolocation: { latitude: 10.762622, longitude: 106.660172 },
      locale: "vi-VN",
    });

    const page = await context.newPage();

    // Step 2: Click 'Tasty Bites'
    await page.goto(
      "http://localhost:3000/restaurant/67c6e409f1c07122e88619d6"
    );

    // Step 3: Add Dish with all toppings to cart
    await page
      .getByRole("link", { name: "Combo Burger Tôm 01 Burger Tô" })
      .nth(1)
      .click();
    await page.getByRole("spinbutton").nth(0).fill("1");
    const addCartBtn = page.locator('div[name="addCartBtn"]');
    await addCartBtn.click();
    await context.clearCookies({ name: "refreshToken" });
    await page.evaluate(() => {
      localStorage.clear();
    });

    const successAlert = page.getByText(
      "Vui lòng đăng nhập để tiếp tục đặt hàng!",
      { exact: false }
    );
    await expect(successAlert).toBeVisible();
  });

  test("TC_A03", async ({ browser }) => {
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
    await page.getByRole("spinbutton").nth(0).fill("1");
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

  test("TC_A04", async ({ browser }) => {
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
    await page.getByRole("spinbutton").nth(0).fill("1");
    const addCartBtn = page.locator('div[name="addCartBtn"]');
    await addCartBtn.click();

    // Step 4: verify cart contents
    const cartDetailBtn = page.locator('a[name="cartDetailBtn"]');
    await cartDetailBtn.click();

    await page.waitForTimeout(3000)

    await page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });
    await context.clearCookies();

    await page
      .locator("div")
      .filter({ hasText: /^Đặt đơn$/ })
      .click();

    const reulst =  await page.waitForURL("http://localhost:3000/home")
    expect(page.url()).toBe("http://localhost:3000/home");
  });
});
