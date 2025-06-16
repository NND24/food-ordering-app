const {
  createDriver,
  By,
  until,
  Key,
} = require("../../../../config/webdriver_config");

async function test_4_2() {
  const driver = await createDriver();
  const injectionPayload = '{"$gt": ""}';
  let result = {
    name: "4.2 NoSQL Injection với $gt rỗng",
    status: "Failed",
  };

  try {
    await driver.get("http://localhost:3000/home");

    const searchInput = await getVisibleSearchInput(driver);
    if (!searchInput) throw new Error("Không tìm thấy ô tìm kiếm");

    await searchInput.clear();
    await searchInput.sendKeys(injectionPayload, Key.RETURN);
    console.log(`🚨 Đã nhập payload: ${injectionPayload}`);

    await driver.wait(until.urlContains("/search?"), 10000);

    let cards = [];
    try {
      await driver.wait(
        until.elementsLocated(By.css('[data-testid="store-card"]')),
        10000
      );
      cards = await driver.findElements(By.css('[data-testid="store-card"]'));
    } catch (e) {
      result.status = "Passed";
      console.log("✅ Không có store nào hiển thị → Passed");
      return result;
    }

    if (cards.length === 0) {
      result.status = "Passed";
      console.log("✅ Không có store nào trả về → Passed");
    } else {
      throw new Error(`Có ${cards.length} store → Có thể dính injection`);
    }
  } catch (error) {
    console.error(`❌ ${result.name} Failed:`, error.message);
  } finally {
    await driver.quit();
  }

  return result;
}
async function getVisibleSearchInput(driver) {
  const inputs = await driver.findElements(
    By.css('input[placeholder="Tìm kiếm quán ăn..."]')
  );
  for (const input of inputs) {
    if (await input.isDisplayed()) return input;
  }
  return null;
}

module.exports = { test_4_2 };
