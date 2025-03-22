require("dotenv").config();
const { createDriver, By, until } = require("../../config/webdriver-config");

async function testRedirectOrder() {
    let driver = await createDriver();
    let result = { name: "Redirect Order via Navbar", status: "Failed" };

    try {
        // Navigate to the home page
        await driver.get("http://localhost:3000/home");

        // Wait for the navbar to load and locate the cart link
        await driver.wait(until.elementLocated(By.id("ordersUrl")), 10000);
        const orderLink = await driver.wait(until.elementIsVisible(driver.findElement(By.id("ordersUrl"))), 5000);

        console.log("✅ Found cart link, clicking...");

        // Click the cart link
        await orderLink.click();

        await driver.wait(until.urlContains("/orders"), 5000);

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

testRedirectOrder()

module.exports = { testRedirectOrder };
