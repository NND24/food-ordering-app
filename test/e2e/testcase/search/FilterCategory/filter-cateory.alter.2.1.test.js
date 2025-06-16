const {
  createDriver,
  By,
  until,
} = require("../../../../config/webdriver_config");
const axios = require("axios");

async function test_2_1() {
  const driver = await createDriver();
  let result = {
    name: "2.1 Lọc theo danh mục 'Cơm' và so sánh với API",
    status: "Failed",
  };

  const categoryName = "Cơm";

  try {
    // 📡 Gọi API để lấy store theo danh mục
    const apiRes = await axios.get("http://localhost:5000/api/v1/customerStore/", {
      params: { category: "67c9128a8bdfd68d9d04b8fc" },
    });

    if (!apiRes.data.success) {
      throw new Error("API trả về lỗi: " + apiRes.data.message);
    }

    const apiStores = apiRes.data.data;
    console.log(`📡 API trả về ${apiStores.length} cửa hàng thuộc '${categoryName}'`);

    await driver.get("http://localhost:3000/search?limit=20&page=1");

    await driver.wait(until.urlContains("/search?"), 10000);
    console.log("➡️ Đã chuyển sang trang tìm kiếm");

    await driver.wait(
      until.elementsLocated(By.css('[data-testid="store-card"]')),
      20000
    );

    // 📌 Click vào danh mục "Cơm"
    const categoryElements = await driver.findElements(
      By.xpath(
        `//div[contains(@class, 'category-item')]//span[text()='${categoryName}']/ancestor::div[contains(@class, 'category-item')]`
      )
    );

    let comCategory = null;
    for (const el of categoryElements) {
      if (await el.isDisplayed()) {
        comCategory = el;
        break;
      }
    }

    if (!comCategory) {
      throw new Error(`Không tìm thấy danh mục '${categoryName}' đang hiển thị`);
    }

    await comCategory.click();
    await driver.sleep(10000); // Chờ render lại

    const filteredCards = await driver.findElements(
      By.css('[data-testid="store-card"]')
    );

    const visibleCards = [];
    for (const card of filteredCards) {
      if (await card.isDisplayed()) {
        visibleCards.push(card);
      }
    }

    console.log(`🖼️ UI hiển thị ${visibleCards.length} cửa hàng`);

    // 🔁 So sánh số lượng
    if (visibleCards.length !== apiStores.length) {
      throw new Error(
        `⚠️ Số lượng UI (${visibleCards.length}) ≠ API (${apiStores.length})`
      );
    }

    // 🔍 So sánh từng tên cửa hàng
    for (let i = 0; i < visibleCards.length; i++) {
      const nameEl = await visibleCards[i].findElement(By.css("h4"));
      const displayedName = (await nameEl.getText()).trim();
      const expectedName = apiStores[i].name.trim();

      if (displayedName !== expectedName) {
        throw new Error(
          `❌ Tên store khác nhau tại vị trí ${i + 1}: UI='${displayedName}', API='${expectedName}'`
        );
      }
    }

    console.log("✅ UI và API khớp hoàn toàn theo danh mục!");
    result.status = "Passed";
  } catch (error) {
    console.error(`❌ ${result.name} Failed:`, error.message);
  } finally {
    await driver.quit();
  }

  return result;
}

module.exports = { test_2_1 };
