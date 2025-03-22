require("dotenv").config();
const { createDriver, By, until } = require("../../config/webdriver-config");

async function testRedirectCart() {
    let driver = await createDriver();
    let result = { name: "Redirect Cart via Navbar", status: "Failed" };

    try {
        // Navigate to the home page
        await driver.get("http://localhost:3000/home");

        // ✅ Wait until the cart link is both present & visible
        await driver.wait(until.elementLocated(By.id("cartUrl")), 10000);
        const cartLink = await driver.wait(until.elementIsVisible(driver.findElement(By.id("cartUrl"))), 5000);

        console.log("✅ Found cart link, clicking...");

        // Click the cart link
        await cartLink.click();

        // Wait for the cart page to load
        await driver.wait(until.urlContains("/carts"), 5000);

        // Check if the page shows a 404 error
        let errorMessage;
        try {
            errorMessage = await driver.findElement(By.xpath("//*[contains(text(),'404') or contains(text(),'Page not found')]"));
        } catch (notFound) {
            errorMessage = null;
        }

        if (errorMessage) {
            console.error("❌ Redirect failed! Cart page returned 404.");
        } else {
            result.status = "Passed";
            console.log(`✅ ${result.name} Passed`);
        }
    } catch (error) {
        console.error(`❌ ${result.name} Failed:`, error);
    } finally {
        await driver.quit();
    }
    return result;
}

// Run test
testRedirectCart();

module.exports = { testRedirectCart };
