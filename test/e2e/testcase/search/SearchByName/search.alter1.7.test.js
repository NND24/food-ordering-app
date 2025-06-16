const {
  createDriver,
  By,
  until,
  Key,
} = require("../../../../config/webdriver_config");
const axios = require("axios");

// ✅ Hàm loại bỏ dấu tiếng Việt
const removeVietnameseTones = (str) =>
  str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D");

async function test_1_7() {
  const driver = await createDriver();
  const keyword = "Tam ky";
  let result = {
    name: "1.7 Search tên không dấu",
    status: "Failed",
  };

  try {
    // 🟡 Bước 1: Gọi API để xác nhận backend có hỗ trợ tìm không dấu
    const apiRes = await axios.get("http://localhost:5000/api/v1/customerStore/", {
      params: { name: keyword },
    });

    if (!apiRes.data.success) throw new Error("API trả về thất bại!");

    const apiStores = apiRes.data.data;
    const normalizedKeyword = removeVietnameseTones(keyword.toLowerCase());
    const matchedStores = apiStores.filter((store) =>
      removeVietnameseTones(store.name.toLowerCase()).includes(normalizedKeyword)
    );

    if (matchedStores.length === 0) {
      throw new Error(
        `API không có cửa hàng nào khớp với từ khóa "${keyword}" (bỏ dấu)`
      );
    }

    console.log(`🟢 API trả về ${matchedStores.length} kết quả khớp (không dấu)`);

    // 🟢 Bước 2: Mở giao diện và test UI
    await driver.get("http://localhost:3000/home");

    // 🔍 Tìm ô tìm kiếm
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

    if (!searchInput) throw new Error("Không tìm thấy ô tìm kiếm hiển thị!");

    await searchInput.clear();
    await searchInput.sendKeys(keyword, Key.RETURN);
    console.log(`✅ Đã nhập từ khóa: "${keyword}" và nhấn Enter`);

    // 🕒 Chờ chuyển trang
    await driver.wait(until.urlContains("/search?"), 10000);
    await driver.wait(until.urlContains("name="), 10000);
    console.log("➡️ Đã chuyển hướng sang trang tìm kiếm");

    // 🌐 Xác nhận URL
    const currentUrl = await driver.getCurrentUrl();
    console.log("🌐 Đã chuyển sang URL:", currentUrl);

    // 🕒 Chờ các store-card render
    await driver.wait(
      until.elementsLocated(By.css('[data-testid="store-card"]')),
      20000
    );
    const allCards = await driver.findElements(
      By.css('[data-testid="store-card"]')
    );
    const storeCards = [];

    for (const card of allCards) {
      if (await card.isDisplayed()) {
        storeCards.push(card);
      }
    }

    console.log(`📦 Số lượng cửa hàng hiển thị: ${storeCards.length}`);

    if (storeCards.length === 0) {
      throw new Error("Không có cửa hàng nào hiển thị trên UI");
    }

    // 📛 Kiểm tra tên từng cửa hàng có khớp (không dấu)
    for (const card of storeCards) {
      const nameEl = await card.findElement(By.css("h4"));
      const displayedName = await nameEl.getText();

      const normalizedDisplayed = removeVietnameseTones(displayedName.toLowerCase());

      if (!normalizedDisplayed.includes(normalizedKeyword)) {
        throw new Error(`"${displayedName}" không khớp với từ khóa "${keyword}" (không dấu)`);
      }
    }

    console.log("✅ Tất cả cửa hàng hiển thị khớp từ khóa (không dấu)!");
    result.status = "Passed";
  } catch (error) {
    console.error(`❌ ${result.name} Failed:`, error.message);
  } finally {
    await driver.quit();
  }

  return result;
}

module.exports = { test_1_7 };
