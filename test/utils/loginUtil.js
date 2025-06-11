require("dotenv").config({ path: require("path").resolve(__dirname, "../../.env") });
const { createDriver, By, until } = require("../config/webdriver_config");

async function loginAndReturnDriver() {
  let driver = await createDriver();

  try {
    console.log("🔄 Logging in...");
    await driver.get("http://localhost:3000/auth/login");

    if (!process.env.LEGIT_EMAIL || !process.env.LEGIT_PASSWORD) {
      throw new Error("❌ Missing environment variables LEGIT_EMAIL or LEGIT_PASSWORD");
    }

    const emailField = await driver.findElement(By.name("email"));
    if (emailField) await emailField.sendKeys(process.env.LEGIT_EMAIL);
    else throw new Error("Email field not found");

    const passwordField = await driver.findElement(By.name("password"));
    if (passwordField) await passwordField.sendKeys(process.env.LEGIT_PASSWORD);
    else throw new Error("Password field not found");

    const submitBtn = await driver.findElement(By.name("submitBtn"));
    if (submitBtn) await submitBtn.click();
    else throw new Error("Submit button not found");

    console.log("✅ Clicked login button");

    // Wait for homepage to load
    await driver.wait(until.elementLocated(By.name("home_page")), 15000);
    console.log("✅ Login successful!");

    return driver; // Return the logged-in driver instance
  } catch (error) {
    console.error("❌ Login failed:", error);
    await driver.quit();
    throw error;
  }
}

async function loginNoDataAndReturnDriver() {
  let driver = await createDriver();

  try {
    console.log("🔄 Logging in...");
    await driver.get("http://localhost:3000/auth/login");

    if (!process.env.LEGIT_EMAIL_NO_DATA || !process.env.LEGIT_PASSWORD) {
      throw new Error("❌ Missing environment variables LEGIT_EMAIL_NO_DATA or LEGIT_PASSWORD");
    }

    const emailField = await driver.findElement(By.name("email"));
    if (emailField) await emailField.sendKeys(process.env.LEGIT_EMAIL_NO_DATA);
    else throw new Error("Email field not found");

    const passwordField = await driver.findElement(By.name("password"));
    if (passwordField) await passwordField.sendKeys(process.env.LEGIT_PASSWORD);
    else throw new Error("Password field not found");

    const submitBtn = await driver.findElement(By.name("submitBtn"));
    if (submitBtn) await submitBtn.click();
    else throw new Error("Submit button not found");

    console.log("✅ Clicked login button");

    // Wait for homepage to load
    await driver.wait(until.elementLocated(By.name("home_page")), 15000);
    console.log("✅ Login successful!");

    return driver; // Return the logged-in driver instance
  } catch (error) {
    console.error("❌ Login failed:", error);
    await driver.quit();
    throw error;
  }
}

module.exports = { loginAndReturnDriver, loginNoDataAndReturnDriver, By, until };
