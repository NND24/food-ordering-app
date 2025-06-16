const {
  createDriver,
  By,
  until,
  Key,
} = require("../../../../config/webdriver_config");

const axios = require("axios");

async function test_1_1() {
  const driver = await createDriver();
  const keyword = "Tasty Bites";
  let result = {
    name: "1.1 Search đúng tên đầy đủ",
    status: "Failed",
  };

  try {
    // 🚀 Gửi request tới BE để lấy dữ liệu
    const apiRes = await axios.get("http://localhost:5000/api/v1/customerStore/", {
      params: { name: keyword },
    });

    if (!apiRes.data.success) {
      throw new Error("API trả về lỗi: " + apiRes.data.message);
    }

    const apiStores = apiRes.data.data;
    console.log(`📡 API trả về ${apiStores.length} store`);

    await driver.get("http://localhost:3000/home");

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

    if (!searchInput) throw new Error("Không tìm thấy ô tìm kiếm hiển thị!");

    await searchInput.clear();
    await searchInput.sendKeys(keyword, Key.RETURN);
    console.log(`✅ Đã nhập từ khóa: "${keyword}" và nhấn Enter`);

    await driver.wait(until.urlContains("/search?"), 10000);
    await driver.wait(until.urlContains("name="), 10000);

    await driver.wait(
      until.elementsLocated(By.css('[data-testid="store-card"]')),
      20000
    );
    const allCards = await driver.findElements(
      By.css('[data-testid="store-card"]')
    );
    const storeCards = [];
    for (const card of allCards) {
      if (await card.isDisplayed()) {
        storeCards.push(card);
      }
    }

    console.log(`🖼️ UI hiển thị ${storeCards.length} store`);

    // So sánh số lượng
    if (storeCards.length !== apiStores.length) {
      throw new Error(
        `⚠️ Số lượng UI (${storeCards.length}) ≠ API (${apiStores.length})`
      );
    }

    // So sánh tên từng cửa hàng
    for (let i = 0; i < storeCards.length; i++) {
      const nameEl = await storeCards[i].findElement(By.css("h4"));
      const displayedName = (await nameEl.getText()).trim();
      const expectedName = apiStores[i].name.trim();

      if (displayedName !== expectedName) {
        throw new Error(
          `❌ Tên store khác nhau tại vị trí ${i + 1}: UI="${displayedName}", API="${expectedName}"`
        );
      }
    }

    console.log("✅ UI và API khớp nhau hoàn toàn!");
    result.status = "Passed";
  } catch (error) {
    console.error(`❌ ${result.name} Failed:`, error.message);
  } finally {
    await driver.quit();
  }

  return result;
}

module.exports = { test_1_1 };
