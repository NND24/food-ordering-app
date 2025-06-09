const { test, expect } = require('@playwright/test');
const { LEGIT } = require('../../fixtures/auth');

test.describe('Main success case (CEG)', () => {
  test('TC01', async ({ browser }) => {
    const context = await browser.newContext({
      permissions: ['geolocation'],
      geolocation: { latitude: 10.762622, longitude: 106.660172 },
      locale: 'vi-VN'
    });

    const page = await context.newPage();

    // Login
    await page.goto('http://localhost:3000/auth/login');
    await page.getByRole('textbox', { name: 'Nhập email của bạn' }).click();
    await page.getByRole('textbox', { name: 'Nhập email của bạn' }).fill(LEGIT.email);
    await page.getByRole('textbox', { name: 'Nhập mật khẩu của bạn' }).click();
    await page.getByRole('textbox', { name: 'Nhập mật khẩu của bạn' }).fill(LEGIT.password);
    await page.getByRole('button', { name: 'Đăng nhập' }).click();
    await page.getByRole('button', { name: 'close' }).click();

    // Navigate to restaurant
    await page.goto('http://localhost:3000/restaurant/67c6e409f1c07122e88619d6');

    // Add dish with all toppings
    await page.getByRole('link', { name: 'Combo Burger Tôm 01 Burger Tô' }).nth(1).click();
    await page.locator('div').filter({ hasText: /^Sốt K-Chicken \(1 hủ\)$/ }).locator('img').click();
    await page.locator('div').filter({ hasText: /^Sốt Đậu \(1 hủ\)$/ }).locator('img').click();
    await page.locator('div').filter({ hasText: /^Sốt H&S \(1 hủ\)$/ }).locator('img').click();
    await page.locator('div').filter({ hasText: /^Phô mai \(1 miếng\)$/ }).locator('img').click();
    await page.locator('div').filter({ hasText: /^Trứng ốp la$/ }).locator('img').click();
    await page.locator('img:nth-child(3)').click();

    const addCartBtn = page.locator('div[name="addCartBtn"]');
    await addCartBtn.click();

    // Proceed to cart and place order
    const cartDetailBtn = page.locator('a[name="cartDetailBtn"]');
    await cartDetailBtn.click();
    await page.locator('div').filter({ hasText: /^Đặt đơn$/ }).click();

    // Expect success message
    const successAlert = page.getByText('Đặt thành công', { exact: false });
    await expect(successAlert).toBeVisible();
  });
});
