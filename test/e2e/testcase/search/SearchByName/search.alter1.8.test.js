const axios = require("axios");
const {
  createDriver,
  By,
  until,
  Key,
} = require("../../../../config/webdriver_config");

async function test_1_8() {
  const driver = await createDriver();
  const keyword = "@#!!!";
  let result = {
    name: "1.8 Search ký tự đặc biệt",
    status: "Failed",
  };

  try {
    // 🔶 Gọi API để lấy dữ liệu tham chiếu
    const apiRes = await axios.get("http://localhost:5000/api/v1/customerStore/", {
      params: { name: keyword },
    });

    if (!apiRes.data.success) {
      throw new Error(`API trả về lỗi: ${JSON.stringify(apiRes.data)}`);
    }

    const apiCount = apiRes.data.total;
    if (apiCount > 0) {
      throw new Error(`API trả về ${apiCount} cửa hàng, kỳ vọng là 0`);
    }
    console.log("✅ API không trả về cửa hàng nào (đúng kỳ vọng)");

    // 🔍 Tìm kiếm trên UI
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

    await driver.sleep(3000); // chờ render

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

    if (storeCards.length > 0) {
      throw new Error(`Không kỳ vọng có cửa hàng nào, nhưng thấy ${storeCards.length}`);
    }

    console.log("✅ UI không hiển thị cửa hàng nào, khớp với kết quả từ API.");
    result.status = "Passed";
  } catch (error) {
    console.error(`❌ ${result.name} Failed:`, error.message);
  } finally {
    await driver.quit();
  }

  return result;
}

module.exports = { test_1_8 };
