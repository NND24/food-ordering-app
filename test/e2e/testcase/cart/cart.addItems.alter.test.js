require("dotenv").config();
const { createDriver, By, until } = require("../../../config/webdriver_config");
async function testAddingCartNoLogin() {
    let driver = await createDriver();
    let result = { name: "Adding dish and topping to Cart", status: "Failed" };

    let cart = []; // Store selected items

    try {
        await driver.get("http://localhost:3000/home");
        // Find and click the store
        const storeCard = await driver.wait(
            until.elementLocated(By.xpath("//h4[text()='Tasty Bites']")),
            5000
        );
        await storeCard.click();
        console.log("✅ Clicked 'Tasty Bites' store");

        // Wait for the restaurant page to load
        await driver.wait(until.urlContains("/restaurant/"), 5000);
        console.log("✅ Redirected to restaurant page");

        const dishCards = await driver.findElement(By.name("bigDishCard"));

        const addingItemsIcon = await dishCards.findElement(By.name("addingCart"))
        await addingItemsIcon.click()

        try {
            await driver.wait(until.elementLocated(By.className("Toastify__toast-container Toastify__toast-container--top-right")), 10000);
            console.log("✅ Login require to add items to cart");
            result.status = "Passed";
        } catch (error) {
            console.error("❌ Login error message not found. Test failed.");
        }
    } catch (error) {
        console.error(`❌ ${result.name} Failed:`, error);
    } finally {
        await driver.quit();
    }

    return result;
}

// 🔹 **Helper Function to Compare Carts**
function compareCarts(cart1, cart2) {
    if (cart1.length !== cart2.length) return false;

    // Sort both arrays before comparison
    const sortedCart1 = cart1.map(item => ({
        dishName: item.dishName,
        topping: item.topping.sort(),
        totalPrice: item.totalPrice
    })).sort((a, b) => a.dishName.localeCompare(b.dishName));

    const sortedCart2 = cart2.map(item => ({
        dishName: item.dishName,
        topping: item.topping.sort(),
        totalPrice: item.totalPrice
    })).sort((a, b) => a.dishName.localeCompare(b.dishName));

    return JSON.stringify(sortedCart1) === JSON.stringify(sortedCart2);
}

module.exports = { testAddingCartNoLogin };
