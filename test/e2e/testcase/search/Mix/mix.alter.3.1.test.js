const {
  createDriver,
  By,
  until,
  Key,
} = require("../../../../config/webdriver_config");
const axios = require("axios");

async function test_3_1() {
  const driver = await createDriver();
  const keyword = "gà ta";
  const categoryName = "Cơm";
  let result = {
    name: "3.1 Search 'gà ta' + chọn danh mục 'Cơm' và so sánh với API",
    status: "Failed",
  };

  try {
    // 📡 Gọi API để lấy danh sách store theo keyword và category
    const apiRes = await axios.get(
      "http://localhost:5000/api/v1/customerStore/",
      {
        params: {
          name: keyword,
          category: "67c9128a8bdfd68d9d04b8fc",
          lat: 10.762622,
          lon: 106.660172, 
        },
      }
    );

    if (!apiRes.data.success) {
      throw new Error("API trả về lỗi: " + apiRes.data.message);
    }

    const apiStores = apiRes.data.data;
    console.log(`📡 API trả về ${apiStores.length} cửa hàng`);

    // 🖥️ Mở trang home và nhập từ khóa
    await driver.get("http://localhost:3000/home");

    const searchInputs = await driver.findElements(
      By.css('input[placeholder="Tìm kiếm quán ăn..."]')
    );

    let searchInput = null;
    for (const input of searchInputs) {
      if (await input.isDisplayed()) {
        searchInput = input;
        break;
      }
    }

    if (!searchInput) throw new Error("Không tìm thấy ô tìm kiếm");

    await searchInput.clear();
    await searchInput.sendKeys(keyword, Key.RETURN);

    await driver.wait(until.urlContains("/search?"), 10000);
    console.log("➡️ Đã chuyển hướng sang trang tìm kiếm");

    // 📌 Chọn danh mục "Cơm"
    const comCategory = await findVisibleCategory(driver, categoryName);
    if (!comCategory) throw new Error("Không tìm thấy danh mục 'Cơm'");
    await comCategory.click();
    await driver.sleep(6000); // chờ lọc

    // 🕒 Lấy store hiển thị
    const cards = await getVisibleStoreCards(driver);
    console.log(`🖼️ UI hiển thị ${cards.length} cửa hàng`);

    // 🔁 So sánh số lượng
    if (cards.length !== apiStores.length) {
      throw new Error(
        `⚠️ Số lượng UI (${cards.length}) ≠ API (${apiStores.length})`
      );
    }

    // 🔍 So sánh từng tên
    for (let i = 0; i < cards.length; i++) {
      const nameEl = await cards[i].findElement(By.css("h4"));
      const uiName = (await nameEl.getText()).trim();
      const apiName = apiStores[i].name.trim();

      if (uiName !== apiName) {
        throw new Error(
          `❌ Khác tên tại vị trí ${i + 1}: UI='${uiName}' ≠ API='${apiName}'`
        );
      }
    }

    console.log("✅ UI và API khớp hoàn toàn theo keyword + category");
    result.status = "Passed";
  } catch (error) {
    console.error(`❌ ${result.name} Failed:`, error.message);
  } finally {
    await driver.quit();
  }

  return result;
}

// Dùng lại hàm phụ
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

module.exports = { test_3_1 };
