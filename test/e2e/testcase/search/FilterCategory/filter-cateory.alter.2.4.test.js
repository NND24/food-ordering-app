const {
  createDriver,
  By,
  until,
} = require("../../../../config/webdriver_config");
const axios = require("axios");

async function test_2_4() {
  const driver = await createDriver();
  let result = {
    name: "2.4 Chọn đồng thời 'Cơm' và 'Thức Ăn Nhanh' (tất cả card phải phù hợp)",
    status: "Failed",
  };

  const comCategoryId = "67c9128a8bdfd68d9d04b8fc"; // ← Thay đúng ID backend
  const fastFoodCategoryId = "67c9120d2840623cd5723936"; // ← Thay đúng ID backend

  try {
    // 🧠 B1: Gọi API để lấy tất cả cửa hàng thuộc 'Cơm' hoặc 'Thức Ăn Nhanh'
    const [comRes, fastFoodRes] = await Promise.all([
      axios.get("http://localhost:5000/api/v1/customerStore/", {
        params: { category: comCategoryId },
      }),
      axios.get("http://localhost:5000/api/v1/customerStore/", {
        params: { category: fastFoodCategoryId },
      }),
    ]);

    const apiStores = [
      ...(comRes.data?.data || []),
      ...(fastFoodRes.data?.data || []),
    ];

    if (apiStores.length === 0) {
      throw new Error("❌ API không trả về cửa hàng nào thuộc 2 danh mục");
    }

    console.log(`📡 API trả về tổng cộng ${apiStores.length} cửa hàng`);

    // 🧭 B2: Mở trang tìm kiếm
    await driver.get("http://localhost:3000/search?limit=20&page=1");
    await driver.wait(until.urlContains("/search?"), 10000);
    console.log("➡️ Đã chuyển hướng sang trang tìm kiếm");

    await driver.wait(
      until.elementsLocated(By.css('[data-testid="store-card"]')),
      20000
    );

    // 🖱️ B3: Chọn cả 'Cơm' và 'Thức Ăn Nhanh'
    const comCategory = await findVisibleCategory(driver, "Cơm");
    const fastFoodCategory = await findVisibleCategory(driver, "Thức Ăn Nhanh");

    if (!comCategory || !fastFoodCategory)
      throw new Error("Không tìm thấy danh mục 'Cơm' hoặc 'Thức Ăn Nhanh'");

    await comCategory.click();
    await driver.sleep(3000);
    await fastFoodCategory.click();
    await driver.sleep(5000);

    // 🧾 B4: Kiểm tra các card hiển thị
    const visibleCards = await getVisibleStoreCards(driver);
    if (visibleCards.length === 0)
      throw new Error("❌ Không có cửa hàng nào sau khi chọn 2 danh mục");

    console.log(`📦 Tổng số cửa hàng hiển thị trên UI: ${visibleCards.length}`);

    const expectedCategories = ["cơm", "thức ăn nhanh"];
    let allMatched = true;

    for (const [i, card] of visibleCards.entries()) {
      const categoryEls = await card.findElements(By.xpath(".//a | .//span"));
      let matchedOne = false;

      for (const el of categoryEls) {
        const text = (await el.getText()).trim().toLowerCase();
        console.log(`🔎 Card ${i + 1} chứa danh mục: "${text}"`);
        if (expectedCategories.some((cat) => text.includes(cat))) {
          matchedOne = true;
          break;
        }
      }

      if (!matchedOne) {
        console.error(
          `❌ Card ${i + 1} không chứa danh mục 'Cơm' hoặc 'Thức Ăn Nhanh'`
        );
        allMatched = false;
        break;
      }
    }

    if (!allMatched) {
      throw new Error(
        "❌ Có ít nhất 1 cửa hàng không khớp danh mục đã chọn"
      );
    }

    console.log("✅ Tất cả cửa hàng đều thuộc 'Cơm' hoặc 'Thức Ăn Nhanh'");
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

module.exports = { test_2_4 };
