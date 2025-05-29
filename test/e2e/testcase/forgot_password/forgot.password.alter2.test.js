/*
TESTCASE FORGOT PASSWORD SUCCESS

Input:
    email: Correct email -> Submit to redirect to /auth/confirm-otp
    otp: Expired otp ( fetch from email ) -> Submit to get error

Expected output:
    RESET PASSWORD FAIL -> Given otp exprire in the system

*/

require("dotenv").config();
const { createDriver, By, until } = require("../../../config/webdriver_config");
const getOTPFromEmail = require("../../../utils/getOTPFromEmail");

async function testForgotPasswordExpireOTP() {
    let driver = await createDriver();
    let result = { name: "Forgot Password Full Flow Test", status: "Failed" };

    try {
        console.log("✅ Navigating to Forgot Password page...");
        await driver.get("http://localhost:3000/auth/forgot-password");

        const emailField = await driver.findElement(By.name("email"));
        if (emailField) await emailField.sendKeys(process.env.LEGIT_EMAIL);
        else throw new Error("Email field not found");

        console.log("✅ Entered registered email");

        const submitBtn = await driver.findElement(By.name("submitBtn"));
        if (submitBtn) await submitBtn.click();
        else throw new Error("Submit button not found");

        console.log("✅ Clicked send OTP button");

        // Wait for redirection to /auth/confirm-otp
        await driver.wait(until.urlContains("/auth/confirm-otp"), 10000);
        console.log("✅ Redirected to OTP confirmation page");

        console.log("✅ Start wait 2 minutes to get the OTP expire");
        await new Promise(resolve => setTimeout(resolve, 120000));
        console.log("✅ 2 minutes end");
        // Wait for OTP inputs to appear
        await driver.wait(until.elementLocated(By.id("otp-input-0")), 5000);

        // Fetch OTP from email
        const otp = await getOTPFromEmail();
        if (!otp) throw new Error("OTP not received");

        console.log(`✅ OTP received: ${otp}`);

        // Enter OTP into fields
        for (let i = 0; i < otp.length; i++) {
            const otpField = await driver.findElement(By.id(`otp-input-${i}`));
            if (otpField) await otpField.sendKeys(otp[i]);
        }

        console.log("✅ Entered OTP");

        const verifyBtn = await driver.findElement(By.name("submitBtn"));
        if (verifyBtn) await verifyBtn.click();
        else throw new Error("Verify button not found");

        console.log("✅ Clicked verify button");

        // Wait for the error toast notification
        await driver.wait(
            until.elementLocated(By.className("Toastify__toast-container Toastify__toast-container--top-right")),
            10000
        );

        console.log("✅ Error notification displayed: Expire OTP.");


        result.status = "Passed";
    } catch (error) {
        console.error(`❌ ${result.name} Failed:`, error);
    } finally {
        await driver.quit();
    }

    return result;
}

module.exports = { testForgotPasswordExpireOTP };
