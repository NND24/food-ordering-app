/*
TESTCASE LOGIN FAIL 3

Input:
    email: Correct email
    password: Incorrect password
Expected output:
    Error toast popup

*/

require("dotenv").config();
const { createDriver, By, until } = require("../../../config/webdriver_config");

async function testLoginFail3() {
    let driver = await createDriver();
    let result = { name: "Login Failure Test", status: "Failed" };

    try {
        await driver.get("http://localhost:3000/auth/login");

        const emailField = await driver.findElement(By.name("email"));
        if (emailField) await emailField.sendKeys(process.env.LEGIT_EMAIL);
        else throw new Error("Email field not found");

        const passwordField = await driver.findElement(By.name("password"));
        if (passwordField) await passwordField.sendKeys(process.env.UNLEGIT_PASSWORD);
        else throw new Error("Password field not found");

        console.log("✅ Entered invalid login credentials");

        const submitBtn = await driver.findElement(By.name("submitBtn"));
        if (submitBtn) await submitBtn.click();
        else throw new Error("Submit button not found");

        console.log("✅ Clicked login button");

        try {
            await driver.wait(until.elementLocated(By.className("Toastify__toast-container Toastify__toast-container--top-right")), 10000);
            console.log("✅ Login failed as expected");
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

module.exports = { testLoginFail3 };