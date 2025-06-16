const {
  createDriver,
  By,
  until,
  Key,
} = require("../../../../config/webdriver_config");

async function test_4_1() {
  const driver = await createDriver();
  const injectionPayload = '{"$ne": null}';
  let result = {
    name: "4.1 NoSQL Injection trên ô tìm kiếm",
    status: "Failed",
  };

  try {
    await driver.get("http://localhost:3000/home");

    // 🔍 Tìm ô tìm kiếm hiển thị
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
    await searchInput.sendKeys(injectionPayload, Key.RETURN);
    console.log(`🚨 Đã nhập payload: ${injectionPayload}`);

    // ⏳ Chờ điều hướng sang trang tìm kiếm
    await driver.wait(until.urlContains("/search?"), 10000);

    let cards = [];
    try {
      // ⏳ Chờ phần tử store-card hiển thị
      await driver.wait(
        until.elementsLocated(By.css('[data-testid="store-card"]')),
        10000
      );
      cards = await driver.findElements(By.css('[data-testid="store-card"]'));
    } catch (waitError) {
      // Timeout không thấy card là điều OK
      console.log("✅ Không có store nào hiển thị (timeout) → Không bị NoSQL injection");
      result.status = "Passed";
      return result;
    }

    if (cards.length === 0) {
      console.log("✅ Không có store nào trả về → Không bị NoSQL injection");
      result.status = "Passed";
    } else {
      throw new Error(`Kỳ vọng không có store nào, nhưng tìm thấy ${cards.length}`);
    }
  } catch (error) {
    console.error(`❌ ${result.name} Failed:`, error.message);
  } finally {
    await driver.quit();
  }

  return result;
}

module.exports = { test_4_1 };
