require("dotenv").config();
const { Builder, By, until } = require("selenium-webdriver");
const { loginAndReturnDriver } = require("../../../utils/loginUtil");

async function forceClearInput(inputElement) {
    const currentValue = await inputElement.getAttribute("value");
    for (let i = 0; i < currentValue.length; i++) {
        await inputElement.sendKeys("\u0008"); // Backspace key
    }
}

async function testEmptyProfileSubmission() {
    let driver = await loginAndReturnDriver();
    let result = { name: "Empty profile submission", status: "Failed" };

    try {
        // Go to profile
        await driver.sleep(7000);
        const profileIcon = await driver.wait(until.elementLocated(By.name("accountBtn")), 5000);
        await profileIcon.click();
        console.log("✅ Clicked on profile icon -> Directing to profile page");

        const editProfileBtn = await driver.wait(until.elementLocated(By.name("editProfileBtn")), 5000);
        await editProfileBtn.click();
        console.log("✅ Clicked on edit profile button");

        await driver.wait(until.urlContains("/account/profile"), 5000);
        console.log("✅ Redirected to profile page");

        // Locate input fields
        const nameInput = await driver.wait(until.elementLocated(By.name("name")), 5000);
        const emailInput = await driver.wait(until.elementLocated(By.name("email")), 5000);
        const phoneInput = await driver.wait(until.elementLocated(By.name("phonenumber")), 5000);

        // Clear all inputs
        await forceClearInput(nameInput);
        await forceClearInput(emailInput);
        await forceClearInput(phoneInput);
        console.log("✅ Cleared all input fields");

        // Locate save button
        const saveBtn = await driver.wait(until.elementLocated(By.name("saveBtn")), 5000);
        const btnClass = await saveBtn.getAttribute("class");

        const isDisabledByClass = btnClass.includes("cursor-not-allowed");

        if (isDisabledByClass) {
            console.log("✅ Save button appears disabled via class (cursor-not-allowed)");
            result.status = "Passed";
        } else {
            console.error("❌ Save button is NOT disabled via class");
        }

    } catch (error) {
        console.error("❌ Error during empty profile submission test:", error);
    } finally {
        await driver.quit();
    }
    return result;
}

module.exports = { testEmptyProfileSubmission };
