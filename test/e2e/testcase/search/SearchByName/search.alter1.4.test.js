const axios = require("axios");
const {
  createDriver,
  By,
  until,
  Key,
} = require("../../../../config/webdriver_config");

async function test_1_4() {
  const driver = await createDriver();
  const keyword = "Tast";
  let result = {
    name: "1.4 Search tên gần đúng",
    status: "Failed",
  };

  try {
    // 🔍 Gọi API để kiểm tra dữ liệu trả về có hợp lệ không
    const apiRes = await axios.get("http://localhost:5000/api/v1/customerStore/", {
      params: { name: keyword },
    });

    const apiStores = apiRes.data.data;
    if (!apiStores || apiStores.length === 0) {
      throw new Error(`API không trả về kết quả nào với từ khóa: "${keyword}"`);
    }

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

    if (storeCards.length === 0) {
      throw new Error("Không có cửa hàng nào được hiển thị!");
    }

    // ✅ Kiểm tra ít nhất 1 tên cửa hàng chứa từ khóa
    let found = false;
    for (const card of storeCards) {
      const nameEl = await card.findElement(By.css("h4"));
      const displayedName = await nameEl.getText();

      if (displayedName.toLowerCase().includes(keyword.toLowerCase())) {
        found = true;
        break;
      }
    }

    if (!found) {
      throw new Error("Không có tên cửa hàng nào chứa từ khóa gần đúng!");
    }

    console.log("✅ Có ít nhất 1 cửa hàng tên gần đúng với từ khóa!");
    result.status = "Passed";
  } catch (error) {
    console.error(`❌ ${result.name} Failed:`, error.message);
  } finally {
    await driver.quit();
  }

  return result;
}

module.exports = { test_1_4 };
