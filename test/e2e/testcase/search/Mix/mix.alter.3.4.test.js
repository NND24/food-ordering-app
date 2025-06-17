const { createDriver, By, until } = require("../../../../config/webdriver_config");
const axios = require("axios");

async function test_3_4() {
  const driver = await createDriver();
  let result = {
    name: "3.4 Filter 'Cơm' + Sort theo rating (so sánh với API)",
    status: "Failed",
  };

  const categoryId = "67c9128a8bdfd68d9d04b8fc"; // ID danh mục "Cơm"
  const categoryName = "Cơm";
  const lat = 10.762622;
  const lon = 106.660172;

  try {
    // 📡 Gọi API để lấy store đã filter "Cơm" và sort "rating"
    const apiRes = await axios.get("http://localhost:5000/api/v1/customerStore/", {
      params: {
        category: categoryId,
        sort: "rating",
        limit: 20,
        page: 1,
        lat,
        lon,
      },
    });

    if (!apiRes.data.success) {
      throw new Error("API trả về lỗi: " + apiRes.data.message);
    }

    const apiStores = apiRes.data.data;
    console.log(`📡 API trả về ${apiStores.length} cửa hàng thuộc '${categoryName}' và đã sort rating`);

    // 🧭 Mở trang và thực hiện UI actions
    await driver.get("http://localhost:3000/search?limit=20&page=1");
    await driver.wait(until.urlContains("/search?"), 10000);
    console.log("➡️ Đã chuyển hướng sang trang tìm kiếm");

    // Chọn danh mục 'Cơm'
    const comCategory = await findVisibleCategory(driver, categoryName);
    if (!comCategory) throw new Error("Không tìm thấy danh mục 'Cơm'");
    await comCategory.click();
    await driver.sleep(3000);

    // Chọn sort theo rating
    const sortRatingOption = await driver.findElement(By.css('[data-testid="sort-by-rating"]'));
    await sortRatingOption.click();
    await driver.wait(until.urlContains("sort=rating"), 5000);
    console.log("✅ Đã chọn sắp xếp theo rating");

    // Lấy store hiển thị sau filter & sort
    await driver.wait(until.elementsLocated(By.css('[data-testid="store-card"]')), 10000);
    const cards = await getVisibleStoreCards(driver);
    console.log(`🖼️ UI hiển thị ${cards.length} cửa hàng`);

    if (cards.length === 0) throw new Error("Không có cửa hàng nào hiển thị");

    // 🔍 So sánh UI vs API
    const uiStores = [];
    for (const [i, card] of cards.entries()) {
      // Check danh mục 'Cơm'
      const categoryEls = await card.findElements(By.xpath(".//a | .//span"));
      let hasCom = false;
      for (const el of categoryEls) {
        const text = (await el.getText()).trim().toLowerCase();
        if (text.includes("cơm")) {
          hasCom = true;
          break;
        }
      }

      if (!hasCom) throw new Error(`❌ Card ${i + 1} không thuộc danh mục 'Cơm'`);

      // Lấy tên cửa hàng
      const nameEl = await card.findElement(By.css("h4"));
      const name = (await nameEl.getText()).trim();

      // Lấy rating nếu có
      const ratingEls = await card.findElements(
        By.xpath(".//span[contains(@class, 'text-[#fc6011]')]")
      );
      let rating = null;
      if (ratingEls.length > 0) {
        const ratingText = await ratingEls[0].getText();
        rating = parseFloat(ratingText);
      }

      uiStores.push({ name, rating });
    }

    console.log("✅ Tất cả store đều thuộc danh mục 'Cơm'");

    // So sánh từng tên (và nếu cần thì rating)
    const compareCount = Math.min(uiStores.length, apiStores.length);

    for (let i = 0; i < compareCount; i++) {
      const uiName = uiStores[i].name;
      const apiName = apiStores[i].name;
      if (uiName !== apiName) {
        throw new Error(`❌ Tên khác nhau tại index ${i}: UI='${uiName}' ≠ API='${apiName}'`);
      }

      const uiRating = uiStores[i].rating;
      const apiRating = apiStores[i].rating;

      if (uiRating !== undefined && apiRating !== undefined && uiRating !== apiRating) {
        console.warn(`⚠️ Rating lệch tại ${uiName}: UI=${uiRating}, API=${apiRating}`);
      }
    }

    console.log("✅ UI và API khớp tên (và gần đúng rating theo thứ tự)");
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

module.exports = { test_3_4 };
