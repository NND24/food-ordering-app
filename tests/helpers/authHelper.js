const { chromium } = require('@playwright/test');
const path = require('path');
const authData = require(path.resolve(__dirname, '../fixtures/authData.json'));

async function loginAndReturnPage() {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    console.log('🔄 Logging in...');
    await page.goto('http://localhost:3000/auth/login');

    const { LEGIT_EMAIL, LEGIT_PASSWORD } = authData;
    if (!LEGIT_EMAIL || !LEGIT_PASSWORD) {
      throw new Error('❌ Missing LEGIT_EMAIL or LEGIT_PASSWORD in fixtures');
    }

    await page.fill('input[name="email"]', LEGIT_EMAIL);
    await page.fill('input[name="password"]', LEGIT_PASSWORD);
    await page.click('button[name="submitBtn"]');

    await page.waitForSelector('[name="home_page"]', { timeout: 15000 });
    console.log('✅ Login successful!');

    return { browser, page };
  } catch (error) {
    console.error('❌ Login failed:', error);
    await browser.close();
    throw error;
  }
}

async function loginNoDataAndReturnPage() {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    console.log('🔄 Logging in with no data...');
    await page.goto('http://localhost:3000/auth/login');

    const { UNLEGIT_EMAIL, UNLEGIT_PASSWORD } = authData;
    if (!UNLEGIT_EMAIL || !UNLEGIT_PASSWORD) {
      throw new Error('❌ Missing UNLEGIT_EMAIL or UNLEGIT_PASSWORD in fixtures');
    }

    await page.fill('input[name="email"]', UNLEGIT_EMAIL);
    await page.fill('input[name="password"]', UNLEGIT_PASSWORD);
    await page.click('button[name="submitBtn"]');

    await page.waitForSelector('[name="home_page"]', { timeout: 15000 });
    console.log('✅ Login successful!');

    return { browser, page };
  } catch (error) {
    console.error('❌ Login failed:', error);
    await browser.close();
    throw error;
  }
}

module.exports = {
  loginAndReturnPage,
  loginNoDataAndReturnPage,
  authData
};
