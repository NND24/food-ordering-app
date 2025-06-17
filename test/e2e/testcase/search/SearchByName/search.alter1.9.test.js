const axios = require("axios");
const {
  createDriver,
  By,
  until,
} = require("../../../../config/webdriver_config");

async function test_1_9() {
  const driver = await createDriver();
  let result = {
    name: "1.9 Tổng số store qua nhiều trang",
    status: "Failed",
  };

  try {
    // 1️⃣ Gọi API lấy tổng số và số item mỗi trang
    const limit = 20;
    const apiRes = await axios.get(
      "http://localhost:5000/api/v1/customerStore/",
      {
        params: {
          name: "",
          limit: 1,
          page: 1,
          lat: 10.762622,
          lon: 106.660172,
        },
      }
    );

    if (!apiRes.data.success || typeof apiRes.data.total !== "number") {
      throw new Error("Không lấy được total từ API");
    }

    const totalFromAPI = apiRes.data.total;
    const totalPages = Math.ceil(totalFromAPI / limit);
    console.log(`📊 API: ${totalFromAPI} store, cần duyệt ${totalPages} trang`);

    let totalFromUI = 0;

    // 2️⃣ Duyệt qua từng trang
    for (let page = 1; page <= totalPages; page++) {
      const url = `http://localhost:3000/search?limit=${limit}&page=${page}`;
      await driver.get(url);
      console.log(`➡️ Đang ở trang ${page}: ${url}`);

      // Chờ store-card render
      await driver.wait(
        until.elementsLocated(By.css('[data-testid="store-card"]')),
        10000
      );

      const allCards = await driver.findElements(
        By.css('[data-testid="store-card"]')
      );
      const visibleCards = [];

      for (const card of allCards) {
        if (await card.isDisplayed()) {
          visibleCards.push(card);
        }
      }

      console.log(`🔹 Trang ${page} có ${visibleCards.length} store`);
      totalFromUI += visibleCards.length;
    }

    // 3️⃣ So sánh kết quả
    if (totalFromUI !== totalFromAPI) {
      throw new Error(
        `Tổng UI (${totalFromUI}) không khớp API (${totalFromAPI})`
      );
    }

    console.log("✅ Tổng số store hiển thị khớp với API!");
    result.status = "Passed";
  } catch (error) {
    console.error(`❌ ${result.name} Failed:`, error.message);
  } finally {
    await driver.quit();
  }

  return result;
}

module.exports = { test_1_9 };
