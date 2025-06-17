const { createDriver, By, until, Key } = require("../../../../config/webdriver_config");
const axios = require("axios");

async function test_3_3() {
  const driver = await createDriver();
  const keyword = "gà ta";
  const categoryName = "Cơm";
  const categoryId = "67c9128a8bdfd68d9d04b8fc"; // ⚠️ Thay bằng ID thật
  let result = {
    name: "3.3 Search từ khóa 'gà ta' + chọn danh mục 'Cơm' và sort by name (UI vs API)",
    status: "Failed",
  };

  try {
    // 📡 Gọi API để lấy danh sách theo filter
    const apiRes = await axios.get("http://localhost:5000/api/v1/customerStore/", {
      params: {
        name: keyword,
        category: categoryId,
        sort: "name",
        lat: 10.762622,
        lon: 106.660172,
        limit: 100,
        page: 1,
      },
    });

    if (!apiRes.data.success) {
      throw new Error("API lỗi: " + apiRes.data.message);
    }

    const apiStores = apiRes.data.data;
    console.log(`📡 API trả về ${apiStores.length} cửa hàng theo từ khóa + 'Cơm' + sort=name`);

    // 👉 Truy cập UI trang home và tìm kiếm
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
    console.log(`✅ Đã nhập từ khóa "${keyword}"`);

    await driver.wait(until.urlContains("/search?"), 10000);
    await driver.wait(until.urlContains("name="), 10000);

    // 👉 Click danh mục "Cơm"
    const comCategory = await findVisibleCategory(driver, categoryName);
    if (!comCategory) throw new Error("Không tìm thấy danh mục 'Cơm'");
    await comCategory.click();
    await driver.sleep(4000);

    // 👉 Click sort by name
    const nameSortOption = await driver.findElement(
      By.css('[data-testid="sort-by-name"]')
    );
    await nameSortOption.click();
    await driver.wait(until.urlContains("sort=name"), 5000);
    await driver.sleep(5000);

    // 👉 Lấy danh sách hiển thị
    const visibleCards = await getVisibleStoreCards(driver);
    const uiStoreNames = [];

    for (const card of visibleCards) {
      const nameEl = await card.findElement(By.css("h4"));
      const name = (await nameEl.getText()).trim();
      uiStoreNames.push(name);
    }

    console.log(`🖼️ UI hiển thị ${uiStoreNames.length} cửa hàng`);

    // 👉 So sánh tên cửa hàng giữa UI và API
    const apiNames = apiStores.map((s) => s.name.trim());
    const isSameLength = uiStoreNames.length === apiNames.length;

    if (!isSameLength) {
      throw new Error(
        `⚠️ Số lượng khác nhau: UI=${uiStoreNames.length}, API=${apiNames.length}`
      );
    }

    let allMatch = true;
    for (let i = 0; i < uiStoreNames.length; i++) {
      if (uiStoreNames[i] !== apiNames[i]) {
        console.error(
          `❌ Khác tại vị trí ${i + 1}: UI='${uiStoreNames[i]}', API='${apiNames[i]}'`
        );
        allMatch = false;
        break;
      }
    }

    if (!allMatch) {
      throw new Error("Danh sách cửa hàng không khớp giữa UI và API");
    }

    console.log("✅ UI và API hiển thị cùng danh sách đã sort theo tên A-Z");
    result.status = "Passed";
  } catch (error) {
    console.error(`❌ ${result.name} Failed:`, error.message);
  } finally {
    await driver.quit();
  }

  return result;
}

// 🔁 Các hàm phụ dùng lại
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

module.exports = { test_3_3 };
