const {
  createDriver,
  By,
  until,
} = require("../../../../config/webdriver_config");

async function test_3_4() {
  const driver = await createDriver();
  let result = {
    name: "3.4 Filter 'Cơm' + Sort theo rating",
    status: "Failed",
  };

  try {
    await driver.get("http://localhost:3000/search?limit=20&page=1");
    await driver.wait(until.urlContains("/search?"), 10000);
    console.log("➡️ Đã chuyển hướng sang trang tìm kiếm");

    // Chọn danh mục 'Cơm'
    const comCategory = await findVisibleCategory(driver, "Cơm");
    if (!comCategory) throw new Error("Không tìm thấy danh mục 'Cơm'");
    await comCategory.click();
    await driver.sleep(3000);

    // Click sort theo rating
    const sortRatingOption = await driver.findElement(
      By.css('[data-testid="sort-by-rating"]')
    );
    await sortRatingOption.click();
    await driver.wait(until.urlContains("sort=rating"), 5000);
    console.log("✅ Đã chọn sắp xếp theo rating");

    // Lấy tất cả store-card hiển thị
    await driver.wait(
      until.elementsLocated(By.css('[data-testid="store-card"]')),
      10000
    );
    const cards = await getVisibleStoreCards(driver);
    console.log(`📦 Có ${cards.length} store sau lọc 'Cơm' + sort 'rating'`);

    if (cards.length === 0) throw new Error("Không có cửa hàng nào hiển thị");

    const ratings = [];

    for (const [i, card] of cards.entries()) {
      // 🔍 Kiểm tra danh mục 'Cơm'
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
        throw new Error(`❌ Card ${i + 1} không thuộc danh mục 'Cơm'`);
      }

      // 🔍 Kiểm tra rating nếu có
      const ratingEls = await card.findElements(
        By.xpath(".//span[contains(@class, 'text-[#fc6011]')]")
      );

      if (ratingEls.length > 0) {
        const ratingText = await ratingEls[0].getText();
        const rating = parseFloat(ratingText);
        if (!isNaN(rating)) {
          ratings.push({ index: i, value: rating });
        }
      }
    }

    console.log("✅ Tất cả store đều thuộc danh mục 'Cơm'");

    if (ratings.length > 0) {
      const topRated = ratings[0];
      if (topRated.index !== 0) {
        throw new Error(
          `❌ Store có rating (${topRated.value}) không nằm ở đầu danh sách (index=${topRated.index})`
        );
      }
      console.log(
        `✅ Store có rating (${topRated.value}) nằm ở vị trí đầu tiên`
      );
    } else {
      console.log("⚠️ Không có store nào có rating trong danh sách");
    }

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
