const { createDriver, By, until } = require("../../../../config/webdriver_config");
const axios = require("axios");

async function test_3_5() {
  const driver = await createDriver();
  let result = {
    name: "3.5 Search rỗng + Filter 'Cơm' + Sort 'rating' (so sánh với API)",
    status: "Failed",
  };

  const categoryId = "67c9128a8bdfd68d9d04b8fc"; // ID danh mục "Cơm"
  const categoryName = "Cơm";

  try {
    // 📡 Gọi API với filter 'Cơm' và sort theo 'rating'
    const apiRes = await axios.get("http://localhost:5000/api/v1/customerStore/", {
      params: {
        name: "",
        category: categoryId,
        sort: "rating",
        limit: 20,
        page: 1,
        lat: 10.762622,
        lon: 106.660172,
      },
    });

    if (!apiRes.data.success) {
      throw new Error("API trả về lỗi: " + apiRes.data.message);
    }

    const apiStores = apiRes.data.data;
    console.log(`📡 API trả về ${apiStores.length} store`);

    // 🧭 Vào trang UI
    await driver.get("http://localhost:3000/search?limit=20&page=1");
    await driver.wait(until.urlContains("/search?"), 10000);
    console.log("➡️ Vào trang tìm kiếm (search rỗng)");

    // Chọn filter "Cơm"
    const comCategory = await findVisibleCategory(driver, categoryName);
    if (!comCategory) throw new Error("Không tìm thấy danh mục 'Cơm'");
    await comCategory.click();
    await driver.sleep(2000);

    // Chọn sort theo "rating"
    const sortRatingOption = await driver.findElement(By.css('[data-testid="sort-by-rating"]'));
    await sortRatingOption.click();
    await driver.wait(until.urlContains("sort=rating"), 5000);
    console.log("✅ Đã chọn filter 'Cơm' và sort theo 'rating'");

    // Lấy store hiển thị trên UI
    const cards = await getVisibleStoreCards(driver);
    console.log(`🖼️ UI hiển thị ${cards.length} store`);

    if (cards.length === 0) throw new Error("Không có store nào được hiển thị");

    // So sánh số lượng
    if (cards.length !== apiStores.length) {
      throw new Error(`⚠️ Số lượng store UI (${cards.length}) khác với API (${apiStores.length})`);
    }

    // So sánh tên + kiểm tra danh mục + rating
    for (let i = 0; i < cards.length; i++) {
      const card = cards[i];
      const nameEl = await card.findElement(By.css("h4"));
      const uiName = (await nameEl.getText()).trim();
      const apiName = apiStores[i].name.trim();

      if (uiName !== apiName) {
        throw new Error(`❌ Tên store khác nhau tại vị trí ${i + 1}: UI='${uiName}', API='${apiName}'`);
      }

      // Kiểm tra danh mục có 'Cơm'
      const categoryEls = await card.findElements(By.xpath(".//a | .//span"));
      let hasCom = false;
      for (const el of categoryEls) {
        const text = (await el.getText()).trim().toLowerCase();
        if (text.includes("cơm")) {
          hasCom = true;
          break;
        }
      }
      if (!hasCom) {
        throw new Error(`❌ Store '${uiName}' không thuộc danh mục 'Cơm'`);
      }
    }

    console.log("✅ UI khớp hoàn toàn với API (lọc 'Cơm', sort 'rating')");
    result.status = "Passed";
  } catch (error) {
    console.error(`❌ ${result.name} Failed:`, error.message);
  } finally {
    await driver.quit();
  }

  return result;
}

// Hàm phụ
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

async function getVisibleStoreCards(driver) {
  const cards = await driver.findElements(By.css('[data-testid="store-card"]'));
  const visible = [];
  for (const card of cards) {
    if (await card.isDisplayed()) visible.push(card);
  }
  return visible;
}

module.exports = { test_3_5 };
