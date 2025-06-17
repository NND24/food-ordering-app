const axios = require("axios");
const {
  createDriver,
  By,
  until,
  Key,
} = require("../../../../config/webdriver_config");

// 🔧 Hàm loại bỏ dấu tiếng Việt
function normalizeText(str) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

async function test_1_6() {
  const driver = await createDriver();
  const keyword = "Tam kỳ";
  let result = {
    name: "1.6 Search tên có dấu",
    status: "Failed",
  };

  try {
    // 🟡 Gọi API
    const apiRes = await axios.get("http://localhost:5000/api/v1/customerStore/", {
      params: { name: keyword },
    });

    if (!apiRes.data.success || apiRes.data.total !== 1) {
      throw new Error(`API trả về ${apiRes.data.total} cửa hàng (kỳ vọng 1)`);
    }

    const expectedName = apiRes.data.data[0].name.trim().toLowerCase();

    // 🟢 Mở trang và nhập keyword
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
    if (!searchInput) throw new Error("Không tìm thấy ô tìm kiếm hiển thị!");

    await searchInput.clear();
    await searchInput.sendKeys(keyword, Key.RETURN);
    console.log(`✅ Đã nhập từ khóa: "${keyword}" và nhấn Enter`);

    await driver.wait(until.urlContains("/search?"), 10000);
    await driver.wait(until.urlContains("name="), 10000);
    console.log("➡️ Đã chuyển hướng sang trang tìm kiếm");

    const currentUrl = await driver.getCurrentUrl();
    console.log("🌐 Đã chuyển sang URL:", currentUrl);

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

    if (storeCards.length !== 1) {
      throw new Error(`Kỳ vọng 1 cửa hàng, nhưng thấy ${storeCards.length}`);
    }

    const nameEl = await storeCards[0].findElement(By.css("h4"));
    const displayedName = (await nameEl.getText()).trim().toLowerCase();

    // So sánh tên API
    if (displayedName !== expectedName) {
      throw new Error(`Tên không khớp: UI="${displayedName}", API="${expectedName}"`);
    }

    // ✅ Black-box: keyword phải nằm trong tên hiển thị
    if (!displayedName.includes(keyword.toLowerCase())) {
      throw new Error(`Tên hiển thị không chứa keyword. UI="${displayedName}", keyword="${keyword}"`);
    }

    // ✅ Bonus: keyword không dấu khớp với tên không dấu
    const normalizedKeyword = normalizeText(keyword);
    const normalizedName = normalizeText(displayedName);
    if (!normalizedName.includes(normalizedKeyword)) {
      throw new Error(`Tên không dấu không khớp keyword. UI="${normalizedName}", keyword="${normalizedKeyword}"`);
    }

    console.log("✅ Tìm đúng cửa hàng, tên khớp API, có chứa keyword và cả dạng không dấu!");
    result.status = "Passed";
  } catch (error) {
    console.error(`❌ ${result.name} Failed:`, error.message);
  } finally {
    await driver.quit();
  }

  return result;
}

function normalizeText(str) {
  return str
    .normalize("NFD")                // Tách dấu ra khỏi ký tự
    .replace(/[\u0300-\u036f]/g, "") // Xoá toàn bộ dấu
    .toLowerCase()
    .trim();
}


module.exports = { test_1_6 };
