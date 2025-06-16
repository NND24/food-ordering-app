const {
  createDriver,
  By,
  until,
} = require("../../../../config/webdriver_config");
const axios = require("axios");

async function test_2_2() {
  const driver = await createDriver();
  let result = {
    name: "2.2 Search theo category ID không có cửa hàng",
    status: "Failed",
  };

  const categoryId = "680ca2456e4529b0f6a3f04d";

  try {
    // 📡 Gọi API để kiểm tra số lượng store theo category ID
    const apiRes = await axios.get("http://localhost:5000/api/v1/customerStore/", {
      params: { category: categoryId },
    });

    if (!apiRes.data.success) {
      throw new Error("API trả về lỗi: " + apiRes.data.message);
    }

    const apiStores = apiRes.data.data;
    console.log(`📡 API trả về ${apiStores.length} cửa hàng`);

    if (apiStores.length > 0) {
      throw new Error(
        `❗API trả về ${apiStores.length} cửa hàng, không đúng với kỳ vọng là 0`
      );
    }

    // 🚀 Truy cập frontend
    await driver.get(`http://localhost:3000/search?category=${categoryId}&limit=20&page=1`);

    await driver.wait(until.urlContains("/search?"), 10000);
    await driver.wait(until.urlContains("category="), 10000);
    console.log("➡️ Đã chuyển sang trang tìm kiếm");

    // 🕒 Chờ 1 lúc cho dữ liệu load
    await driver.sleep(3000);

    const allCards = await driver.findElements(
      By.css('[data-testid="store-card"]')
    );

    const visibleCards = [];
    for (const card of allCards) {
      if (await card.isDisplayed()) {
        visibleCards.push(card);
      }
    }

    console.log(`🖼️ UI hiển thị ${visibleCards.length} cửa hàng`);

    if (visibleCards.length > 0) {
      throw new Error(
        `❌ Không kỳ vọng có cửa hàng nào, nhưng thấy ${visibleCards.length} cửa hàng`
      );
    }

    console.log("✅ Không có cửa hàng nào trên UI, đúng với dữ liệu API.");
    result.status = "Passed";
  } catch (error) {
    console.error(`❌ ${result.name} Failed:`, error.message);
  } finally {
    await driver.quit();
  }

  return result;
}

module.exports = { test_2_2 };
