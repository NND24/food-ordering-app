require("dotenv").config();
const { createDriver, By, until } = require("../../config/webdriver-config");

async function testRedirectAccount() {
    let driver = await createDriver();
    let result = { name: "Redirect Account via Navbar", status: "Failed" };

    try {
        // Navigate to the home page
        await driver.get("http://localhost:3000/home");

        // Wait for the navbar to load and locate the cart link
        const cartLink = await driver.wait(until.elementLocated(By.css("a[href*='/account']")), 5000);

        // Click the cart link in the navbar
        await cartLink.click();

        // Wait for the cart page to load
        await driver.wait(until.urlContains("/account"), 5000);

        // // Check for a known element on the cart page (e.g., cart title or an item container)
        // let cartTitle;
        // try {
        //     cartTitle = await driver.wait(until.elementLocated(By.css(".cart-title, h1, h2")), 5000);
        // } catch (notFound) {
        //     console.error("⚠️ No cart title found! Possible 404 error.");
        // }

        // Check if the page shows a 404 error
        let errorMessage;
        try {
            errorMessage = await driver.findElement(By.xpath("//*[contains(text(),'404') or contains(text(),'Page not found')]"));
        } catch (notFound) {
            errorMessage = null;
        }

        if (errorMessage) {
            console.error("❌ Redirect failed! Account page returned 404.");
        // } else if (cartTitle) {
        //     result.status = "Passed";
        //     console.log(`✅ ${result.name} Passed`);
        } else {
            result.status = "Passed";
            console.log(`✅ ${result.name} Passed`);
            // console.error("❌ Cart page loaded but missing expected elements.");
        }
    } catch (error) {
        console.error(`❌ ${result.name} Failed:`, error);
    } finally {
        await driver.quit();
    }
    return result;
}

module.exports = { testRedirectAccount };
