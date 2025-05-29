require("dotenv").config();
const { Builder, By, until } = require("selenium-webdriver");
const { loginAndReturnDriver } = require("../../../utils/loginUtil");

async function forceClearInput(inputElement) {
    const currentValue = await inputElement.getAttribute("value");
    for (let i = 0; i < currentValue.length; i++) {
        await inputElement.sendKeys("\u0008"); // Backspace key
    }
}

async function testAdjustProfile() {
    let driver = await loginAndReturnDriver();
    let result = { name: "Adjust profile", status: "Failed" };

    try {
        // Go to profile
        await driver.sleep(7000); // Wait for page load
        const profileIcon = await driver.wait(until.elementLocated(By.name("accountBtn")), 5000);
        await profileIcon.click();
        console.log("✅ Clicked on profile icon -> Directing to profile page");

        const editProfileBtn = await driver.wait(until.elementLocated(By.name("editProfileBtn")), 5000);
        await editProfileBtn.click();
        console.log("✅ Clicked on edit profile button");

        await driver.wait(until.urlContains("/account/profile"), 5000);
        console.log("✅ Redirected to profile page");

        // Input fields
        const nameInput = await driver.wait(until.elementLocated(By.name("name")), 5000);
        const emailInput = await driver.wait(until.elementLocated(By.name("email")), 5000);
        const phoneInput = await driver.wait(until.elementLocated(By.name("phonenumber")), 5000);
        const genderMale = await driver.findElement(By.id("male"));
        const genderFemale = await driver.findElement(By.id("female"));
        const genderOther = await driver.findElement(By.id("other"));

        const inputNewProfile = {
            name: "SYSTEM TESTER",
            email: "n21dccn003@student.ptithcm.edu.vn",
            phonenumber: "0123456789",
            gender: "male", 
        };
        await driver.sleep(2000); // Wait for elements to be located
        console.log("✅ All input fields located successfully");
        // Fill inputs
        await forceClearInput(nameInput);
        await nameInput.sendKeys(inputNewProfile.name);
        console.log("✅ Entered new name");

        // Clear and input new email
        await forceClearInput(emailInput);
        await emailInput.sendKeys(inputNewProfile.email);
        console.log("✅ Entered new email");

        // Clear and input new phone number
        await forceClearInput(phoneInput);
        await phoneInput.sendKeys(inputNewProfile.phonenumber);
        console.log("✅ Entered new phone number");

        if (inputNewProfile.gender === "male") await genderMale.click();
        else if (inputNewProfile.gender === "female") await genderFemale.click();
        else await genderOther.click();
        console.log("✅ Selected gender");
        await driver.sleep(2000); // Wait for selection to be registered
    

        // Save
        const saveBtn = await driver.wait(until.elementLocated(By.name("saveBtn")), 5000);
        await saveBtn.click();
        console.log("✅ Clicked on save button");

        await driver.wait(
            until.elementLocated(By.className("Toastify__toast-container")),
            5000
        );
        console.log("✅ Success toast displayed: Profile updated successfully");

        // Refresh and re-locate fields
        await driver.navigate().refresh();
        console.log("✅ Reloaded the page to verify changes");

        const updatedName = await driver.wait(until.elementLocated(By.name("name")), 5000);
        const updatedEmail = await driver.wait(until.elementLocated(By.name("email")), 5000);
        const updatedPhone = await driver.wait(until.elementLocated(By.name("phonenumber")), 5000);
        const genderIsMale = await driver.findElement(By.id("male")).isSelected();
        const genderIsFemale = await driver.findElement(By.id("female")).isSelected();
        const genderIsOther = await driver.findElement(By.id("other")).isSelected();

        const newProfile = {
            name: (await updatedName.getAttribute("value")).trim(),
            email: (await updatedEmail.getAttribute("value")).trim(),
            phonenumber: (await updatedPhone.getAttribute("value")).trim(),
            gender: genderIsMale ? "male" : genderIsFemale ? "female" : genderIsOther ? "other" : "unknown"
        };

        let allMatch = true;

        if (newProfile.name !== inputNewProfile.name) {
            console.error(`❌ Name mismatch: expected "${inputNewProfile.name}", got "${newProfile.name}"`);
            allMatch = false;
        } else console.log("✅ Name matched");

        if (newProfile.email !== inputNewProfile.email) {
            console.error(`❌ Email mismatch: expected "${inputNewProfile.email}", got "${newProfile.email}"`);
            allMatch = false;
        } else console.log("✅ Email matched");

        if (newProfile.phonenumber !== inputNewProfile.phonenumber) {
            console.error(`❌ Phone mismatch: expected "${inputNewProfile.phonenumber}", got "${newProfile.phonenumber}"`);
            allMatch = false;
        } else console.log("✅ Phone number matched");

        if (newProfile.gender !== inputNewProfile.gender) {
            console.error(`❌ Gender mismatch: expected "${inputNewProfile.gender}", got "${newProfile.gender}"`);
            allMatch = false;
        } else console.log("✅ Gender matched");

        if (allMatch) {
            console.log("✅ Profile updated successfully: All values match");
            result.status = "Passed";
        } else {
            console.error("❌ Profile update failed: One or more values did not match");
        }

    } catch (error) {
        console.error("❌ Error during profile adjustment:", error);
    } finally {
        await driver.quit();
    }
    return result;
}

module.exports = { testAdjustProfile };
