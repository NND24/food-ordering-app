const axios = require("axios");
const {
  createDriver,
  By,
  until,
  Key,
} = require("../../../../config/webdriver_config");

async function test_1_3() {
  const driver = await createDriver();
  const keyword = "TASTY BITES";
  let result = {
    name: "1.3 Search tên viết hoa",
    status: "Failed",
  };

  try {
    // 🔁 Gọi API với keyword viết hoa
    const apiRes = await axios.get("http://localhost:5000/api/v1/customerStore/", {
      params: { name: keyword },
    });

    if (!apiRes.data.success || apiRes.data.total !== 1) {
      throw new Error(`API trả về ${apiRes.data.total} cửa hàng (kỳ vọng 1)`);
    }

    const expectedName = apiRes.data.data[0].name.trim().toLowerCase();

    // 🧭 Điều hướng đến trang chính
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
    const displayedName = (await nameEl.getText()).trim().toLowerCase();

    // 🔍 So sánh với kết quả API
    if (displayedName !== expectedName) {
      throw new Error(`Tên không khớp: UI="${displayedName}", API="${expectedName}"`);
    }

    // 🔍 So sánh tên hiển thị có chứa từ khóa không (black-box)
    if (!displayedName.includes(keyword.toLowerCase())) {
      throw new Error(`Tên hiển thị không chứa từ khóa. UI="${displayedName}", keyword="${keyword}"`);
    }

    console.log("✅ Tìm đúng cửa hàng, tên trùng với kết quả từ API và khớp từ khóa!");
    result.status = "Passed";
  } catch (error) {
    console.error(`❌ ${result.name} Failed:`, error.message);
  } finally {
    await driver.quit();
  }

  return result;
}

module.exports = { test_1_3 };
