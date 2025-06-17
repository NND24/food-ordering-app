const { createDriver, By, until, Key } = require("../../../../config/webdriver_config");
const axios = require("axios");

async function test_4_1() {
  const driver = await createDriver();
  const injectionPayload = '{"$ne": null}';
  let result = {
    name: "4.1 NoSQL Injection trên ô tìm kiếm (UI + API)",
    status: "Failed",
  };

  try {
    // 🧪 Gọi API với payload injection
    const apiRes = await axios.get("http://localhost:5000/api/v1/customerStore/", {
      params: {
        name: injectionPayload,
      },
    });

    if (!apiRes.data.success) {
      throw new Error("API trả về lỗi: " + apiRes.data.message);
    }

    const apiStores = apiRes.data.data;
    console.log(`📡 API trả về ${apiStores.length} store với payload`);

    if (apiStores.length > 0) {
      throw new Error(`❌ API KHÔNG chống được NoSQL injection. Trả về ${apiStores.length} store.`);
    }

    // 🖥️ Giao diện người dùng
    await driver.get("http://localhost:3000/home");

    // 🔍 Tìm ô input tìm kiếm
    const searchInputs = await driver.findElements(
      By.css('input[placeholder="Tìm kiếm quán ăn..."]')
    );
    let searchInput = null;
    for (const input of searchInputs) {
      if (await input.isDisplayed()) {
        searchInput = input;
        break;
      }
    }

    if (!searchInput) throw new Error("Không tìm thấy ô tìm kiếm trên UI");

    await searchInput.clear();
    await searchInput.sendKeys(injectionPayload, Key.RETURN);
    console.log(`🚨 Đã nhập payload: ${injectionPayload}`);

    // ⏳ Chờ điều hướng
    await driver.wait(until.urlContains("/search?"), 10000);

    let cards = [];
    try {
      await driver.wait(
        until.elementsLocated(By.css('[data-testid="store-card"]')),
        10000
      );
      cards = await driver.findElements(By.css('[data-testid="store-card"]'));
    } catch {
      // timeout = không có store nào là đúng
    }

    if (cards.length > 0) {
      throw new Error(`❌ UI KHÔNG chống được NoSQL injection. Tìm thấy ${cards.length} store.`);
    }

    console.log("✅ UI và API đều không trả về dữ liệu → Chống được NoSQL injection");
    result.status = "Passed";
  } catch (error) {
    console.error(`❌ ${result.name} Failed:`, error.message);
  } finally {
    await driver.quit();
  }

  return result;
}

module.exports = { test_4_1 };
