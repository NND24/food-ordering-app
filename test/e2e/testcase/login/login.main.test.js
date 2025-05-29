/*
TESTCASE LOGIN SUCCESS

Input:
    email: Correct email
    password: Correct password
Expected output:
    Login and redirect to homepage

*/
require("dotenv").config();
const { createDriver, By, until } = require("../../../config/webdriver_config");

async function testLoginSucess() {
    let driver = await createDriver();
    let result = { name: "Login Test", status: "Failed" };

    try {
        await driver.get("http://localhost:3000/auth/login");

        const emailField = await driver.findElement(By.name("email"));
        if (emailField) await emailField.sendKeys(process.env.LEGIT_EMAIL);
        else throw new Error("Email field not found");

        const passwordField = await driver.findElement(By.name("password"));
        if (passwordField) await passwordField.sendKeys(process.env.LEGIT_PASSWORD);
        else throw new Error("Password field not found");

        console.log("✅ Entered invalid login credentials");

        const submitBtn = await driver.findElement(By.name("submitBtn"));
        if (submitBtn) await submitBtn.click();
        else throw new Error("Submit button not found");

        console.log("✅ Clicked login button");

        await driver.wait(until.elementLocated(By.name("home_page")), 5000);
        console.log("✅ Dashboard loaded");

        result.status = "Passed";
    } catch (error) {
        console.error(`❌ ${result.name} Failed:`, error);
    } finally {
        await driver.quit();
    }
    return result;
}

module.exports = { testLoginSucess };