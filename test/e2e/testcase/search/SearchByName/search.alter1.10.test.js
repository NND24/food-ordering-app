const axios = require("axios");
const {
  createDriver,
  By,
  until,
  Key,
} = require("../../../../config/webdriver_config");

async function test_1_10() {
  const driver = await createDriver();
  const keyword = "            Tasty Bites            ";
  const trimmedKeyword = keyword.trim();
  let result = {
    name: "1.10 Search có khoảng trắng",
    status: "Failed",
  };

  try {
    // 🟩 Gọi API để lấy kết quả
    const apiRes = await axios.get("http://localhost:5000/api/v1/customerStore/", {
      params: { name: trimmedKeyword },
    });

    const apiStores = apiRes.data.data || [];
    if (apiStores.length !== 1) {
      throw new Error(`API trả về ${apiStores.length} cửa hàng (mong muốn 1)`);
    }

    const expectedName = apiStores[0].name;

    await driver.get("http://localhost:3000/home");

    // 🔍 Tìm ô tìm kiếm hiển thị
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
    console.log("➡️ Đã chuyển hướng sang trang tìm kiếm");

    const currentUrl = await driver.getCurrentUrl();
    console.log("🌐 Đã chuyển sang URL:", currentUrl);

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

    console.log(`📦 Số lượng cửa hàng hiển thị: ${storeCards.length}`);
    if (storeCards.length !== 1) {
      throw new Error(`Kỳ vọng 1 cửa hàng, nhưng thấy ${storeCards.length}`);
    }

    const nameEl = await storeCards[0].findElement(By.css("h4"));
    const displayedName = await nameEl.getText();

    if (displayedName.trim() !== expectedName.trim()) {
      throw new Error(`Tên không khớp. Giao diện: "${displayedName}" ≠ API: "${expectedName}"`);
    }

    console.log("✅ Tìm đúng cửa hàng, tên khớp chính xác!");
    result.status = "Passed";
  } catch (error) {
    console.error(`❌ ${result.name} Failed:`, error.message);
  } finally {
    await driver.quit();
  }

  return result;
}

module.exports = { test_1_10 };
