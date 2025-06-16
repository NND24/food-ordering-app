const { createDriver, By, until, Key } = require("../../../../config/webdriver_config");

async function test_3_1() {
  const driver = await createDriver();
  const keyword = "gà ta";
  let result = {
    name: "1.2 Search từ khóa 'gà ta' + chọn danh mục 'Cơm'",
    status: "Failed",
  };

  try {
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

    if (!searchInput) throw new Error("Không tìm thấy ô tìm kiếm");

    await searchInput.clear();
    await searchInput.sendKeys(keyword, Key.RETURN);
    console.log(`✅ Đã nhập từ khóa "${keyword}" và nhấn Enter`);

    // ⏳ Chờ trang chuyển và kết quả hiện ra
    await driver.wait(until.urlContains("/search?"), 10000);
    await driver.wait(until.urlContains("name="), 10000);
    console.log("➡️ Đã chuyển hướng sang trang tìm kiếm");

    // ✅ Chọn danh mục "Cơm"
    const comCategory = await findVisibleCategory(driver, "Cơm");
    if (!comCategory) throw new Error("Không tìm thấy danh mục 'Cơm'");
    await comCategory.click();
    await driver.sleep(4000); // chờ lọc xong

    // 🕒 Lấy các store-card hiển thị
    await driver.wait(
      until.elementsLocated(By.css('[data-testid="store-card"]')),
      20000
    );
    const cards = await getVisibleStoreCards(driver);

    if (cards.length === 0)
      throw new Error("Không có cửa hàng nào sau khi tìm 'gà' + lọc 'Cơm'");

    console.log(`📦 Số cửa hàng hiển thị: ${cards.length}`);

    const expectedKeyword = keyword.toLowerCase();
    let allMatch = true;

    for (const [i, card] of cards.entries()) {
      // 🔎 Kiểm tra từ khóa trong tên
      const nameEl = await card.findElement(By.css("h4"));
      const name = (await nameEl.getText()).toLowerCase();

      if (!name.includes(expectedKeyword)) {
        console.error(`❌ Card ${i + 1} không chứa từ khóa 'gà' trong tên: "${name}"`);
        allMatch = false;
        break;
      }

      // 🔎 Kiểm tra danh mục
      const categoryEls = await card.findElements(By.xpath(".//a | .//span"));
      let hasComCategory = false;

      for (const el of categoryEls) {
        const text = (await el.getText()).trim().toLowerCase();
        if (text.includes("cơm")) {
          hasComCategory = true;
          break;
        }
      }

      if (!hasComCategory) {
        console.error(`❌ Card ${i + 1} không thuộc danh mục 'Cơm'`);
        allMatch = false;
        break;
      }
    }

    if (!allMatch) {
      throw new Error("Có cửa hàng không khớp từ khóa hoặc không thuộc 'Cơm'");
    }

    console.log("✅ Tất cả cửa hàng đều chứa 'gà' và thuộc 'Cơm'");
    result.status = "Passed";
  } catch (error) {
    console.error(`❌ ${result.name} Failed:`, error.message);
  } finally {
    await driver.quit();
  }

  return result;
}

// Dùng lại các hàm phụ
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
