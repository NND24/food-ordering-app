const {
  createDriver,
  By,
  until,
  Key,
} = require("../../../../config/webdriver_config");
const axios = require("axios");

async function test_3_2() {
  const driver = await createDriver();
  const keyword = "gà ta";
  const categoryId = "67c9128a8bdfd68d9d04b8fc"; // ID danh mục 'Cơm' trong DB
  const lat = 10.762622;
  const lon = 106.660172;

  let result = {
    name: "3.2 Search từ khóa 'gà ta' + chọn danh mục 'Cơm' + sort by name (so sánh API)",
    status: "Failed",
  };

  try {
    // 📡 Gọi API trước để có dữ liệu kỳ vọng
    const apiRes = await axios.get("http://localhost:5000/api/v1/customerStore/", {
      params: {
        name: keyword,
        category: categoryId,
        sort: "name",
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
    const expectedNames = apiStores.map(store => store.name.trim());

    console.log(`📡 API trả về ${expectedNames.length} cửa hàng`);

    // 🖥️ Mở trang và thao tác UI
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
    console.log(`✅ Đã nhập từ khóa "${keyword}" và nhấn Enter`);

    await driver.wait(until.urlContains("/search?"), 10000);
    await driver.wait(until.urlContains("name="), 10000);
    console.log("➡️ Đã chuyển hướng sang trang tìm kiếm");

    // Chọn danh mục 'Cơm'
    const comCategory = await findVisibleCategory(driver, "Cơm");
    if (!comCategory) throw new Error("Không tìm thấy danh mục 'Cơm'");
    await comCategory.click();
    await driver.sleep(3000);

    // Sort theo tên
    const sortByNameButton = await driver.findElement(
      By.css('[data-testid="sort-by-name"]')
    );
    await sortByNameButton.click();
    await driver.wait(until.urlContains("sort=name"), 5000);
    await driver.sleep(3000);

    // Lấy các store hiển thị
    const cards = await getVisibleStoreCards(driver);
    const storeNames = [];

    for (const card of cards) {
      const nameEl = await card.findElement(By.css("h4"));
      const name = (await nameEl.getText()).trim();
      storeNames.push(name);
    }

    console.log(`🖼️ UI hiển thị ${storeNames.length} cửa hàng`);
    console.log("📋 Tên từ UI:", storeNames);
    console.log("📋 Tên từ API:", expectedNames);

    if (storeNames.length !== expectedNames.length) {
      throw new Error(
        `⚠️ Số lượng cửa hàng khác nhau: UI (${storeNames.length}) vs API (${expectedNames.length})`
      );
    }

    for (let i = 0; i < storeNames.length; i++) {
      if (storeNames[i] !== expectedNames[i]) {
        throw new Error(
          `❌ Tên không khớp tại vị trí ${i + 1}: UI='${storeNames[i]}', API='${expectedNames[i]}'`
        );
      }
    }

    console.log("✅ Tất cả cửa hàng hiển thị đúng theo tên (API và UI trùng khớp)");
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

module.exports = { test_3_2 };
