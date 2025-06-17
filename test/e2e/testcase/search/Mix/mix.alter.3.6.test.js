const { createDriver, By, until } = require("../../../../config/webdriver_config");
const axios = require("axios");

async function test_3_6() {
  const driver = await createDriver();
  let result = {
    name: "3.6 Chỉ Sort theo rating (không search, không filter) + So sánh API",
    status: "Failed",
  };

  try {
    // 📡 Gọi API trước để lấy danh sách đã sort theo rating
    const apiRes = await axios.get("http://localhost:5000/api/v1/customerStore/", {
      params: {
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
    console.log(`📡 API trả về ${apiStores.length} cửa hàng`);

    // 🖥️ Mở giao diện UI
    await driver.get("http://localhost:3000/search?limit=20&page=1");
    await driver.wait(until.urlContains("/search?"), 10000);
    console.log("➡️ Đã vào trang tìm kiếm rỗng");

    // 👉 Click sort theo rating
    const sortRatingBtn = await driver.findElement(
      By.css('[data-testid="sort-by-rating"]')
    );
    await sortRatingBtn.click();
    await driver.wait(until.urlContains("sort=rating"), 5000);
    await driver.sleep(3000); // đợi UI render lại

    const cards = await getVisibleStoreCards(driver);
    console.log(`📦 UI hiển thị ${cards.length} cửa hàng`);

    if (cards.length < 2) {
      throw new Error("Không đủ store để kiểm tra sắp xếp");
    }

    // 🔍 Duyệt qua từng card và lấy tên + rating
    const uiStores = [];

    for (const card of cards) {
      const nameEl = await card.findElement(By.css("h4"));
      const name = (await nameEl.getText()).trim();

      const ratingEls = await card.findElements(
        By.xpath(".//span[contains(@class, 'text-[#fc6011]')]")
      );

      let rating = null;
      if (ratingEls.length > 0) {
        const ratingText = await ratingEls[0].getText();
        rating = parseFloat(ratingText);
        if (isNaN(rating)) rating = null;
      }

      uiStores.push({ name, rating });
    }

    console.log("🖼️ UI rating list:", uiStores.map((s) => s.rating));

    // 🧠 Từ API lấy name + rating (nếu có rating)
    const apiStoreData = apiStores.map((store) => ({
      name: store.name.trim(),
      rating: store.rating ?? null,
    }));

    console.log("🌐 API rating list:", apiStoreData.map((s) => s.rating));

    // 🔁 So sánh thứ tự theo rating
    const uiRatings = uiStores.map((s) => s.rating).filter((r) => r !== null);
    const sortedRatings = [...uiRatings].sort((a, b) => b - a);

    if (JSON.stringify(uiRatings) !== JSON.stringify(sortedRatings)) {
      throw new Error("❌ Rating UI không sắp xếp đúng thứ tự giảm dần");
    }

    // 🔁 So sánh từng tên cửa hàng tương ứng
    for (let i = 0; i < Math.min(uiStores.length, apiStoreData.length); i++) {
      const uiName = uiStores[i].name;
      const apiName = apiStoreData[i].name;

      if (uiName !== apiName) {
        throw new Error(
          `❌ Khác tên tại vị trí ${i + 1}: UI='${uiName}' ≠ API='${apiName}'`
        );
      }
    }

    console.log("✅ UI và API khớp hoàn toàn theo sort rating");
    result.status = "Passed";
  } catch (error) {
    console.error(`❌ ${result.name} Failed:`, error.message);
  } finally {
    await driver.quit();
  }

  return result;
}

// Hàm phụ: lấy danh sách các store hiển thị
async function getVisibleStoreCards(driver) {
  const cards = await driver.findElements(By.css('[data-testid="store-card"]'));
  const visible = [];
  for (const card of cards) {
    if (await card.isDisplayed()) visible.push(card);
  }
  return visible;
}

module.exports = { test_3_6 };
