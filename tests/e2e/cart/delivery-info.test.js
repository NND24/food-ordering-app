const { test, expect } = require("@playwright/test");
const { LEGIT } = require("../../fixtures/auth");
const exp = require("constants");

test.describe("Delivery infomation (DT)", () => {
  test("TC09", async ({ browser }) => {
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
    await page
      .locator("div")
      .filter({ hasText: /^Sốt K-Chicken \(1 hủ\)$/ })
      .locator("img")
      .click();
    await page
      .locator("div")
      .filter({ hasText: /^Sốt Đậu \(1 hủ\)$/ })
      .locator("img")
      .click();
    await page
      .locator("div")
      .filter({ hasText: /^Sốt H&S \(1 hủ\)$/ })
      .locator("img")
      .click();
    await page
      .locator("div")
      .filter({ hasText: /^Phô mai \(1 miếng\)$/ })
      .locator("img")
      .click();
    await page
      .locator("div")
      .filter({ hasText: /^Trứng ốp la$/ })
      .locator("img")
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

  test("TC10", async ({ browser }) => {
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
    await page.getByRole('link', { name: 'Combo Burger Tôm 01 Burger Tô' }).nth(1).click();
    await page.getByRole('spinbutton').nth(0).fill('1');
    const addCartBtn = page.locator('div[name="addCartBtn"]');
    await addCartBtn.click();

    // Step 4: verify cart contents
    const cartDetailBtn = page.locator('a[name="cartDetailBtn"]');
    await cartDetailBtn.click();
    
    
    await page.waitForTimeout(3000); // await for 3 seconds to ensure the page is fully loaded
    const currentURL = await page.url();


    await context.close();
    const newContext = await browser.newContext(); // default context with no location
    const newPage = await newContext.newPage();
    await newPage.goto("http://localhost:3000/auth/login");
    await newPage.getByRole("textbox", { name: "Nhập email của bạn" }).click();
    await newPage
      .getByRole("textbox", { name: "Nhập email của bạn" })
      .fill(LEGIT.email);
    await newPage.getByRole("textbox", { name: "Nhập mật khẩu của bạn" }).click();
    await newPage
      .getByRole("textbox", { name: "Nhập mật khẩu của bạn" })
      .fill(LEGIT.password);
    await newPage.getByRole("button", { name: "Đăng nhập" }).click();
    await newPage.getByRole("button", { name: "close" }).click();
    await newPage.goto(currentURL);

    await newPage
      .locator("div")
      .filter({ hasText: /^Đặt đơn$/ })
      .click();

    const failAlert = newPage.getByText("Vui lòng chọn địa chỉ giao hàng", { exact: false });
    await expect(failAlert).toBeVisible();
  });
  test("TC11", async ({ browser }) => {
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
    await page.getByRole('link', { name: 'Combo Burger Tôm 01 Burger Tô' }).nth(1).click();
    await page.getByRole('spinbutton').nth(0).fill('1');
    const addCartBtn = page.locator('div[name="addCartBtn"]');
    await addCartBtn.click();

    // Step 4: verify cart contents
    const cartDetailBtn = page.locator('a[name="cartDetailBtn"]');
    await cartDetailBtn.click();
    
    
    await page.waitForTimeout(3000); // await for 3 seconds to ensure the page is fully loaded
    const currentURL = await page.url();


    await context.close();
    const newContext = await browser.newContext(); // default context with no location
    const newPage = await newContext.newPage();
    await newPage.goto("http://localhost:3000/auth/login");
    await newPage.getByRole("textbox", { name: "Nhập email của bạn" }).click();
    await newPage
      .getByRole("textbox", { name: "Nhập email của bạn" })
      .fill(LEGIT.email);
    await newPage.getByRole("textbox", { name: "Nhập mật khẩu của bạn" }).click();
    await newPage
      .getByRole("textbox", { name: "Nhập mật khẩu của bạn" })
      .fill(LEGIT.password);
    await newPage.getByRole("button", { name: "Đăng nhập" }).click();
    await newPage.getByRole("button", { name: "close" }).click();
    await newPage.goto(currentURL);

    await newPage.getByRole('link', { name: 'Thêm chi tiết địa chỉ và hướ' }).click();
    await newPage.locator('div:nth-child(6) > .bg-transparent').click();
    await newPage.locator('div:nth-child(6) > .bg-transparent').fill('0909123123');
    await newPage.getByRole('button', { name: 'Lưu' }).click();
    await newPage
      .locator("div")
      .filter({ hasText: /^Đặt đơn$/ })
      .click();

    const failAlert = newPage.getByText("Vui lòng chọn địa chỉ giao hàng", { exact: false });
    await expect(failAlert).toBeVisible();
  });
  test("TC12", async ({ browser }) => {
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
    await page.getByRole('link', { name: 'Combo Burger Tôm 01 Burger Tô' }).nth(1).click();
    await page.getByRole('spinbutton').nth(0).fill('1');
    const addCartBtn = page.locator('div[name="addCartBtn"]');
    await addCartBtn.click();

    // Step 4: verify cart contents
    const cartDetailBtn = page.locator('a[name="cartDetailBtn"]');
    await cartDetailBtn.click();
    
    
    await page.waitForTimeout(3000); // await for 3 seconds to ensure the page is fully loaded
    const currentURL = await page.url();


    await context.close();
    const newContext = await browser.newContext(); // default context with no location
    const newPage = await newContext.newPage();
    await newPage.goto("http://localhost:3000/auth/login");
    await newPage.getByRole("textbox", { name: "Nhập email của bạn" }).click();
    await newPage
      .getByRole("textbox", { name: "Nhập email của bạn" })
      .fill(LEGIT.email);
    await newPage.getByRole("textbox", { name: "Nhập mật khẩu của bạn" }).click();
    await newPage
      .getByRole("textbox", { name: "Nhập mật khẩu của bạn" })
      .fill(LEGIT.password);
    await newPage.getByRole("button", { name: "Đăng nhập" }).click();
    await newPage.getByRole("button", { name: "close" }).click();
    await newPage.goto(currentURL);

    await newPage.getByRole('link', { name: 'Thêm chi tiết địa chỉ và hướ' }).click();
    await newPage.locator('div:nth-child(5) > .bg-transparent').click();
    await newPage.locator('div:nth-child(5) > .bg-transparent').fill('TOM');
    await newPage.locator('div:nth-child(5) > .bg-transparent').click();
    await newPage.locator('div:nth-child(5) > .bg-transparent').fill('TOM');
    await newPage.getByRole('button', { name: 'Lưu' }).click();
    await newPage
      .locator("div")
      .filter({ hasText: /^Đặt đơn$/ })
      .click();

    const failAlert = newPage.getByText("Vui lòng chọn địa chỉ giao hàng", { exact: false });
    await expect(failAlert).toBeVisible();
  });
  test("TC13", async ({ browser }) => {
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
    
    await page.getByRole('link', { name: 'Vị trí hiện tại' }).click();
    await page.getByRole('heading', { name: 'Địa Chỉ', exact: true }).click();
    await page
      .locator("div")
      .filter({ hasText: /^Đặt đơn$/ })
      .click();

    const failAlert = page.getByText("Vui lòng nhập tên người nhận", { exact: false });
    await expect(failAlert).toBeVisible();
  });
  test("TC14", async ({ browser }) => {
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
    await page.getByRole('link', { name: 'Combo Burger Tôm 01 Burger Tô' }).nth(1).click();
    await page.getByRole('spinbutton').nth(0).fill('1');
    const addCartBtn = page.locator('div[name="addCartBtn"]');
    await addCartBtn.click();

    // Step 4: verify cart contents
    const cartDetailBtn = page.locator('a[name="cartDetailBtn"]');
    await cartDetailBtn.click();
    
    
    await page.waitForTimeout(3000); // await for 3 seconds to ensure the page is fully loaded
    const currentURL = await page.url();


    await context.close();
    const newContext = await browser.newContext(); // default context with no location
    const newPage = await newContext.newPage();
    await newPage.goto("http://localhost:3000/auth/login");
    await newPage.getByRole("textbox", { name: "Nhập email của bạn" }).click();
    await newPage
      .getByRole("textbox", { name: "Nhập email của bạn" })
      .fill(LEGIT.email);
    await newPage.getByRole("textbox", { name: "Nhập mật khẩu của bạn" }).click();
    await newPage
      .getByRole("textbox", { name: "Nhập mật khẩu của bạn" })
      .fill(LEGIT.password);
    await newPage.getByRole("button", { name: "Đăng nhập" }).click();
    await newPage.getByRole("button", { name: "close" }).click();
    await newPage.goto(currentURL);

    await newPage.getByRole('link', { name: 'Thêm chi tiết địa chỉ và hướ' }).click();
    await newPage.locator('div:nth-child(5) > .bg-transparent').click();
    await newPage.locator('div:nth-child(5) > .bg-transparent').fill('TOM');
    await newPage.locator('div:nth-child(5) > .bg-transparent').click();
    await newPage.locator('div:nth-child(5) > .bg-transparent').fill('TOM');
    await newPage.locator('div:nth-child(6) > .bg-transparent').click();
    await newPage.locator('div:nth-child(6) > .bg-transparent').fill('0909123123');
    await newPage.getByRole('button', { name: 'Lưu' }).click();
    await newPage
      .locator("div")
      .filter({ hasText: /^Đặt đơn$/ })
      .click();

    const failAlert = newPage.getByText("Vui lòng chọn địa chỉ giao hàng", { exact: false });
    await expect(failAlert).toBeVisible();
  });
  test("TC15", async ({ browser }) => {
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
    
    await page.getByRole('link', { name: 'Vị trí hiện tại' }).click();
    await page.getByRole('heading', { name: 'Tên + Địa chỉ', exact: true }).click();
    await page
      .locator("div")
      .filter({ hasText: /^Đặt đơn$/ })
      .click();

    const failAlert = page.getByText("Vui lòng nhập số điện thoại người nhận", { exact: false });
    await expect(failAlert).toBeVisible();
  });
  test("TC16", async ({ browser }) => {
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
    
    await page.getByRole('link', { name: 'Vị trí hiện tại' }).click();
    await page.getByRole('heading', { name: 'Số điện thoại + Địa chỉ', exact: true }).click();
    await page
      .locator("div")
      .filter({ hasText: /^Đặt đơn$/ })
      .click();

    const failAlert = page.getByText("Vui lòng nhập tên người nhận", { exact: false });
    await expect(failAlert).toBeVisible();
  });
});
