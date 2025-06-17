const { createDriver, By, until, Key } = require("../../../../config/webdriver_config");
const axios = require("axios");

async function test_4_3() {
  const driver = await createDriver();
  const injectionPayload = "'|| 1==1 ||'";
  let result = {
    name: "4.3 Chuỗi lạ || 1==1 ||",
    status: "Failed",
  };

  try {
    // === 📡 Gọi API trực tiếp với payload ===
    const apiRes = await axios.get("http://localhost:5000/api/v1/customerStore/", {
      params: {
        name: injectionPayload,
        lat: 10.762622,
        lon: 106.660172,
      },
    });

    if (!apiRes.data.success) {
      throw new Error("API trả về lỗi: " + apiRes.data.message);
    }

    const apiStores = apiRes.data.data;
    console.log(`📡 API trả về ${apiStores.length} cửa hàng với payload '${injectionPayload}'`);

    // === 🖥️ Gửi payload từ phía UI ===
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
      // Không tìm thấy store nào, vẫn tiếp tục
      cards = [];
    }

    console.log(`🖼️ UI hiển thị ${cards.length} cửa hàng`);

    // === ✅ Kiểm tra kết quả ===
    if (cards.length === 0 && apiStores.length === 0) {
      console.log("✅ Không có kết quả trả về từ cả API và UI → Không bị injection");
      result.status = "Passed";
    } else {
      throw new Error(
        `⚠️ Có thể bị injection: API(${apiStores.length}) - UI(${cards.length})`
      );
    }
  } catch (error) {
    console.error(`❌ ${result.name} Failed:`, error.message);
  } finally {
    await driver.quit();
  }

  return result;
}

// === Các hàm phụ ===
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

module.exports = { test_4_3 };
