/*
TESTCASE FORGOT PASSWORD SUCCESS

Input:
    email: Correct email -> Submit to redirect to /auth/confirm-otp
    otp: Correct otp ( fetch from email ) -> Submit to redirect to /auth/reset-password
    new_password: Correct new password
    confirmed_password: Sane password as new_password -> Submit to redirect to /auth/login

Expected output:
    RESET PASSWORD SUCCESSFULLY -> User can login to homepage

*/
require("dotenv").config();
const { createDriver, By, until } = require("../../../config/webdriver_config");
const getOTPFromEmail = require("../../../utils/getOTPFromEmail");

async function testForgotPasswordFlow() {
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

        // Wait for redirection to /auth/reset-password
        await driver.wait(until.urlContains("/auth/reset-password"), 10000);
        console.log("✅ Redirected to Reset Password page");

        const newPasswordField = await driver.findElement(By.name("newPassword"));
        if (newPasswordField) await newPasswordField.sendKeys(process.env.LEGIT_PASSWORD);
        else throw new Error("Email field not found");
        console.log("✅ Enter new password");

        const confirmPassword = await driver.findElement(By.name("confirmPassword"));
        if (confirmPassword) await confirmPassword.sendKeys(process.env.LEGIT_PASSWORD);
        else throw new Error("Email field not found");
        console.log("✅ Enter confirmed password");

        const submitNewPwBtn = await driver.findElement(By.name("submitBtn"));
        if (submitNewPwBtn) await submitNewPwBtn.click();
        else throw new Error("Verify button not found");
        console.log("✅ Submit new password");

        await driver.wait(until.urlContains("/auth/login"), 10000);
        console.log("✅ Redirected to Login page");
        
        const emailFieldAfter = await driver.findElement(By.name("email"));
        if (emailFieldAfter) await emailFieldAfter.sendKeys(process.env.LEGIT_EMAIL);
        else throw new Error("Email field not found");

        const passwordField = await driver.findElement(By.name("password"));
        if (passwordField) await passwordField.sendKeys(process.env.LEGIT_PASSWORD);
        else throw new Error("Password field not found");

        console.log("✅ Entered valid login credentials");

        const submitBtnAfter = await driver.findElement(By.name("submitBtn"));
        if (submitBtnAfter) await submitBtnAfter.click();
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

module.exports = { testForgotPasswordFlow };
