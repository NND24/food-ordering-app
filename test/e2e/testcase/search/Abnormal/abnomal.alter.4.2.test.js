const {
  createDriver,
  By,
  until,
  Key,
} = require("../../../../config/webdriver_config");
const axios = require("axios");

async function test_4_2() {
  const driver = await createDriver();
  const injectionPayload = '{"$gt": ""}';
  let result = {
    name: "4.2 NoSQL Injection với $gt rỗng (UI + API)",
    status: "Failed",
  };

  try {
    // 🧪 Gửi payload lên API
    const apiRes = await axios.get("http://localhost:5000/api/v1/customerStore/", {
      params: { name: injectionPayload },
    });

    const apiStores = apiRes.data?.data || [];
    console.log(`📡 API trả về ${apiStores.length} cửa hàng`);

    if (apiStores.length > 0) {
      throw new Error(`⚠️ API bị dính injection, trả về ${apiStores.length} cửa hàng`);
    }

    // 🖥️ Truy cập UI
    await driver.get("http://localhost:3000/home");

    const searchInput = await getVisibleSearchInput(driver);
    if (!searchInput) throw new Error("Không tìm thấy ô tìm kiếm");

    await searchInput.clear();
    await searchInput.sendKeys(injectionPayload, Key.RETURN);
    console.log(`🚨 Đã nhập payload: ${injectionPayload}`);

    await driver.wait(until.urlContains("/search?"), 10000);

    let cards = [];
    try {
      await driver.wait(
        until.elementsLocated(By.css('[data-testid="store-card"]')),
        8000
      );
      cards = await getVisibleStoreCards(driver);
    } catch (e) {
      cards = [];
    }

    console.log(`🖼️ UI hiển thị ${cards.length} cửa hàng`);

    if (cards.length === 0) {
      result.status = "Passed";
      console.log("✅ Không có store nào hiển thị → Passed (UI + API)");
    } else {
      throw new Error(`UI vẫn hiển thị ${cards.length} store → Có thể dính injection`);
    }
  } catch (error) {
    console.error(`❌ ${result.name} Failed:`, error.message);
  } finally {
    await driver.quit();
  }

  return result;
}

// Helpers
async function getVisibleSearchInput(driver) {
  const inputs = await driver.findElements(
    By.css('input[placeholder="Tìm kiếm quán ăn..."]')
  );
  for (const input of inputs) {
    if (await input.isDisplayed()) return input;
  }
  return null;
}

async function getVisibleStoreCards(driver) {
  const cards = await driver.findElements(By.css('[data-testid="store-card"]'));
  const visible = [];
  for (const card of cards) {
    if (await card.isDisplayed()) visible.push(card);
  }
  return visible;
}

module.exports = { test_4_2 };
