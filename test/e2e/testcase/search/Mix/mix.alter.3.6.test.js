const {
  createDriver,
  By,
  until,
} = require("../../../../config/webdriver_config");

async function test_3_6() {
  const driver = await createDriver();
  let result = {
    name: "3.6 Chỉ Sort theo rating (không search, không filter)",
    status: "Failed",
  };

  try {
    await driver.get("http://localhost:3000/search?limit=20&page=1");
    await driver.wait(until.urlContains("/search?"), 10000);
    console.log("➡️ Đã vào trang tìm kiếm rỗng");

    // 👉 Click sort theo rating
    const sortRatingBtn = await driver.findElement(
      By.css('[data-testid="sort-by-rating"]')
    );
    await sortRatingBtn.click();
    await driver.wait(until.urlContains("sort=rating"), 5000);
    await driver.sleep(3000);

    const cards = await getVisibleStoreCards(driver);
    console.log(`📦 Tổng số store: ${cards.length}`);

    if (cards.length < 2) {
      throw new Error("Không đủ store để kiểm tra sắp xếp");
    }

    const ratings = [];

    for (const [i, card] of cards.entries()) {
      const ratingEls = await card.findElements(
        By.xpath(".//span[contains(@class, 'text-[#fc6011]')]")
      );

      if (ratingEls.length > 0) {
        const ratingText = await ratingEls[0].getText();
        const rating = parseFloat(ratingText);
        ratings.push(isNaN(rating) ? null : rating);
      } else {
        ratings.push(null); // Store chưa có rating
      }
    }

    console.log("⭐ Các rating thu được:", ratings);

    // Kiểm tra: các giá trị số nên đứng trước null
    const numericRatings = ratings.filter((r) => r !== null);
    const sorted = [...numericRatings].sort((a, b) => b - a); // giảm dần
    const matched = JSON.stringify(numericRatings) === JSON.stringify(sorted);

    if (!matched) {
      throw new Error(
        "❌ Các store không được sắp xếp đúng theo rating giảm dần"
      );
    }

    console.log("✅ Các store đã được sắp xếp đúng theo rating");
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

module.exports = { test_3_6 };
