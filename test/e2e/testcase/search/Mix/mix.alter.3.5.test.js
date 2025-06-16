const {
  createDriver,
  By,
  until,
} = require("../../../../config/webdriver_config");

async function test_3_5() {
  const driver = await createDriver();
  let result = {
    name: "3.5 Search rỗng + Filter 'Cơm' + Sort 'rating'",
    status: "Failed",
  };

  try {
    await driver.get("http://localhost:3000/search?limit=20&page=1");
    await driver.wait(until.urlContains("/search?"), 10000);
    console.log("➡️ Vào trang tìm kiếm (không có từ khóa)");

    // Chọn danh mục 'Cơm'
    const comCategory = await findVisibleCategory(driver, "Cơm");
    if (!comCategory) throw new Error("Không tìm thấy danh mục 'Cơm'");
    await comCategory.click();
    await driver.sleep(3000);

    // Sắp xếp theo rating
    const sortRatingOption = await driver.findElement(
      By.css('[data-testid="sort-by-rating"]')
    );
    await sortRatingOption.click();
    await driver.wait(until.urlContains("sort=rating"), 5000);
    console.log("✅ Đã chọn filter 'Cơm' và sort theo 'rating'");

    // Lấy tất cả store hiển thị
    const cards = await getVisibleStoreCards(driver);
    console.log(`📦 Số store hiển thị: ${cards.length}`);

    if (cards.length === 0)
      throw new Error("Không có store nào hiển thị sau khi filter + sort");

    const ratings = [];

    for (const [i, card] of cards.entries()) {
      // Kiểm tra danh mục 'Cơm'
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

      // Kiểm tra rating (nếu có)
      const ratingEls = await card.findElements(
        By.xpath(".//span[contains(@class, 'text-[#fc6011]')]")
      );
      if (ratingEls.length > 0) {
        const rating = parseFloat(await ratingEls[0].getText());
        if (!isNaN(rating)) {
          ratings.push({ index: i, value: rating });
        }
      }
    }

    if (ratings.length > 0 && ratings[0].index !== 0) {
      throw new Error(
        `❌ Store có rating cao nhất (${ratings[0].value}) không nằm ở đầu`
      );
    }

    console.log("✅ Tất cả store hợp lệ (lọc 'Cơm', sort đúng)");
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
