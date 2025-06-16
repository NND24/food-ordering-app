const { Builder, By, Key, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

async function createDriver() {
    try {
        // Set Chrome options
        let options = new chrome.Options();
        // options.addArguments("--headless"); // Run Chrome in headless mode (no UI)
        options.addArguments("--disable-gpu"); // Improve performance in some environments
        options.addArguments("--window-size=1280,800"); // Set a default window size
        options.addArguments("--no-sandbox"); // Bypass OS security policies (for CI/CD)
        options.addArguments("--disable-dev-shm-usage"); // Prevent crashes in Docker/Linux

        // Build WebDriver
        let driver = await new Builder()
            .forBrowser("chrome")
            .setChromeOptions(options)
            .build();

        // Set global implicit wait
        await driver.manage().setTimeouts({ implicit: 5000 });

        return driver;
    } catch (error) {
        console.error("🚨 Error creating WebDriver:", error);
        throw error;
    }
}

module.exports = { createDriver, By, Key, until };