const {
  createDriver,
  By,
  until,
} = require("../../../../config/webdriver_config");
const axios = require("axios");

async function test_2_3() {
  const driver = await createDriver();
  let result = {
    name: "2.3 Chuyển danh mục từ 'Cơm' sang 'Thức Ăn Nhanh' (có xác thực API)",
    status: "Failed",
  };

  const fastFoodCategoryId = "67c9120d2840623cd5723936";

  try {
    // 📡 Gọi API để lấy store thuộc 'Thức Ăn Nhanh'
    const apiRes = await axios.get("http://localhost:5000/api/v1/customerStore/", {
      params: { category: fastFoodCategoryId },
    });

    if (!apiRes.data.success) {
      throw new Error("API trả về lỗi: " + apiRes.data.message);
    }

    const apiStores = apiRes.data.data;
    console.log(`📡 API trả về ${apiStores.length} cửa hàng thuộc 'Thức Ăn Nhanh'`);

    if (apiStores.length === 0) {
      throw new Error("❌ API không có cửa hàng nào thuộc 'Thức Ăn Nhanh'");
    }

    // 🚀 Mở trang search ban đầu
    await driver.get("http://localhost:3000/search?limit=20&page=1");
    await driver.wait(until.urlContains("/search?"), 10000);

    // Bấm "Cơm"
    const comCategory = await findVisibleCategory(driver, "Cơm");
    if (!comCategory) throw new Error("Không tìm thấy danh mục 'Cơm'");
    await comCategory.click();
    await driver.sleep(4000);

    const comCards = await getVisibleStoreCards(driver);
    console.log(`📦 Có ${comCards.length} cửa hàng thuộc danh mục 'Cơm'`);

    // Bỏ chọn "Cơm"
    await comCategory.click();
    await driver.sleep(4000);

    // Bấm "Thức Ăn Nhanh"
    const fastFoodCategory = await findVisibleCategory(driver, "Thức Ăn Nhanh");
    if (!fastFoodCategory) throw new Error("Không tìm thấy danh mục 'Thức Ăn Nhanh'");
    await fastFoodCategory.click();
    await driver.sleep(5000);

    const fastFoodCards = await getVisibleStoreCards(driver);
    console.log(`🖼️ UI hiển thị ${fastFoodCards.length} cửa hàng sau khi chọn 'Thức Ăn Nhanh'`);

    // ✅ So sánh số lượng với API
    if (fastFoodCards.length !== apiStores.length) {
      throw new Error(
        `Số lượng cửa hàng không khớp: UI = ${fastFoodCards.length}, API = ${apiStores.length}`
      );
    }

    // ✅ Xác minh có ít nhất 1 cửa hàng chứa 'Thức Ăn Nhanh' trong danh mục
    let foundAtLeastOne = false;
    for (const [i, card] of fastFoodCards.entries()) {
      const categoryEls = await card.findElements(By.xpath(".//a | .//span"));
      for (const el of categoryEls) {
        const text = (await el.getText()).trim().toLowerCase();
        console.log(`🔎 Card ${i + 1} chứa danh mục: "${text}"`);
        if (text.includes("thức ăn nhanh")) {
          foundAtLeastOne = true;
          break;
        }
      }
      if (foundAtLeastOne) break;
    }

    if (!foundAtLeastOne) {
      throw new Error("Không có cửa hàng nào có danh mục 'Thức Ăn Nhanh' trong UI");
    }

    console.log("✅ UI hiển thị đầy đủ và đúng các cửa hàng thuộc danh mục 'Thức Ăn Nhanh'");
    result.status = "Passed";
  } catch (error) {
    console.error(`❌ ${result.name} Failed:`, error.message);
  } finally {
    await driver.quit();
  }

  return result;
}

// 🔍 Hàm tìm danh mục đang hiển thị
async function findVisibleCategory(driver, name) {
  const elements = await driver.findElements(
    By.xpath(
      `//div[contains(@class, 'category-item')]//span[text()='${name}']/ancestor::div[contains(@class, 'category-item')]`
    )
  );
  for (const el of elements) {
    if (await el.isDisplayed()) return el;
  }
  return null;
}

// 🔍 Hàm lấy danh sách các store hiển thị
async function getVisibleStoreCards(driver) {
  const cards = await driver.findElements(By.css('[data-testid="store-card"]'));
  const visibleCards = [];
  for (const card of cards) {
    if (await card.isDisplayed()) visibleCards.push(card);
  }
  return visibleCards;
}

module.exports = { test_2_3 };
