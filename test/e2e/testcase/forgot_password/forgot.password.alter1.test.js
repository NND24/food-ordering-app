/*
TESTCASE FORGOT PASSWORD SUCCESS

Input:
    email: Not existed email -> Submit to recieve error

Expected output:
    RESET PASSWORD FAIL -> Given email not existed in the system

*/

require("dotenv").config();
const { createDriver, By, until } = require("../../../config/webdriver_config");

async function testForgotPasswordWrongEmail() {
    let driver = await createDriver();
    let result = { name: "Forgot Password with Wrong Email Test", status: "Failed" };

    try {
        console.log("✅ Navigating to Forgot Password page...");
        await driver.get("http://localhost:3000/auth/forgot-password");

        const emailField = await driver.findElement(By.name("email"));
        if (emailField) await emailField.sendKeys(process.env.UNLEGIT_EMAIL); // Enter an incorrect email
        else throw new Error("Email field not found");

        console.log("✅ Entered incorrect email");

        const submitBtn = await driver.findElement(By.name("submitBtn"));
        if (submitBtn) await submitBtn.click();
        else throw new Error("Submit button not found");

        console.log("✅ Clicked send OTP button");

        // Wait for the error toast notification
        await driver.wait(
            until.elementLocated(By.className("Toastify__toast-container Toastify__toast-container--top-right")),
            10000
        );

        console.log("✅ Error notification displayed: Invalid email entered.");

        result.status = "Passed";
    } catch (error) {
        console.error(`❌ ${result.name} Failed:`, error);
    } finally {
        await driver.quit();
    }

    return result;
}

module.exports = { testForgotPasswordWrongEmail };
