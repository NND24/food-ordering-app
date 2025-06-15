require("dotenv").config({ path: require("path").resolve(__dirname, "../../../../.env") });
const { loginAndReturnDriver, loginNoDataAndReturnDriver, By, until } = require("../../../utils/loginUtil");
const { createDriver } = require("../../../config/webdriver_config");
const assert = require("assert");
const axios = require("axios");

async function testShowOrders() {
  let driver = await loginAndReturnDriver();
  let result = { name: "Show order in order page", status: "Failed" };

  try {
    // 1. Gọi API lấy đơn hàng
    let token = await driver.executeScript("return localStorage.getItem('token');");
    if (token.startsWith('"') && token.endsWith('"')) {
      token = token.slice(1, -1); // Loại bỏ dấu ngoặc kép
    }

    const apiOrders = await axios
      .get(`${process.env.NEXT_PUBLIC_SERVER_URI}/api/v1/order/`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => res.data.data);

    // 2. Tách đơn chưa done và done
    const currentOrdersFromApi = apiOrders.filter((order) => order.status !== "done");
    const doneOrdersFromApi = apiOrders.filter((order) => order.status === "done");

    await driver.sleep(7000);
    const orderIcon = await driver.wait(until.elementLocated(By.name("orderBtn")), 5000);
    await orderIcon.click();
    console.log("✅ Clicked on order icon -> Directing to order page");

    const currentOrdersUI = await driver.findElements(By.css(".current-orders-container .order-item"));
    const doneOrdersUI = await driver.findElements(By.css(".done-orders-container .order-item"));

    // 4. So sánh số lượng
    assert(currentOrdersUI.length === currentOrdersFromApi.length, "Số lượng đơn chưa hoàn thành không khớp");
    assert(doneOrdersUI.length === doneOrdersFromApi.length, "Số lượng đơn đã hoàn thành không khớp");

    // 5. So sánh nội dung từng đơn hàng
    for (let i = 0; i < currentOrdersUI.length; i++) {
      const uiName = await currentOrdersUI[i].findElement(By.css(".store-name")).getText();
      const apiName = currentOrdersFromApi[i].store.name;
      assert(uiName === apiName, `Tên cửa hàng đơn hàng thứ ${i + 1} không khớp`);

      const uiAddress = await currentOrdersUI[i].findElement(By.css(".address")).getText();
      const apiAddress = currentOrdersFromApi[i].shipLocation.address;
      assert(uiAddress.includes(apiAddress), `Địa chỉ đơn hàng thứ ${i + 1} không khớp`);
    }

    for (let i = 0; i < doneOrdersUI.length; i++) {
      const uiName = await doneOrdersUI[i].findElement(By.css(".store-name")).getText();
      const apiName = doneOrdersFromApi[i].store.name;
      assert(uiName === apiName, `Tên cửa hàng đơn hàng thứ ${i + 1} không khớp`);

      const uiAddress = await doneOrdersUI[i].findElement(By.css(".address")).getText();
      const apiAddress = doneOrdersFromApi[i].shipLocation.address;
      assert(uiAddress.includes(apiAddress), `Địa chỉ đơn hàng thứ ${i + 1} không khớp`);
    }

    result.status = "Passed";
    console.log("✅ Test passed");
  } catch (error) {
    console.error(`❌ ${result.name} Failed:`, error);
  } finally {
    await driver.quit();
  }

  return result;
}

async function testShowOrdersNoData() {
  let driver = await loginNoDataAndReturnDriver();
  let result = { name: "Show order in order page", status: "Failed" };

  try {
    await driver.sleep(7000);
    const orderIcon = await driver.wait(until.elementLocated(By.name("orderBtn")), 5000);
    await orderIcon.click();
    console.log("✅ Clicked on order icon -> Directing to order page");

    const noCurrentOrderText = await driver.wait(until.elementLocated(By.css(".no-current-orders")), 5000).getText();
    assert.strictEqual(
      noCurrentOrderText.trim(),
      "Không có đơn hàng nào",
      "Không hiển thị đúng nội dung khi không có đơn hàng"
    );

    const noHistoryOrderText = await driver.wait(until.elementLocated(By.css(".no-history-orders")), 5000).getText();
    assert.strictEqual(
      noHistoryOrderText.trim(),
      "Không có đơn hàng nào",
      "Không hiển thị đúng nội dung khi không có đơn hàng"
    );

    result.status = "Passed";
    console.log("✅ Test passed - Không có đơn hàng");
    return result;
  } catch (error) {
    console.error(`❌ ${result.name} Failed:`, error);
  } finally {
    await driver.quit();
  }

  return result;
}

async function testGetOrdersNoJWT() {
  let driver = await createDriver();
  const result = { name: "Test Get Orders No JWT", status: "Failed" };

  try {
    await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URI}/api/v1/order/`);

    throw new Error("❌ Server không trả lỗi khi lấy đơn hàng không có jwt");
  } catch (err) {
    if (err.response && err.response.status === 401) {
      console.error("❌ Server response:", err.response?.data || err.message);
      console.log("✅ Server trả lỗi đúng khi lấy danh sách khi không có token");
      result.status = "Passed";
    } else {
      console.error("❌ Test thất bại. Lỗi:", err.message);
    }
  } finally {
    await driver.quit();
  }

  return result;
}

async function testCancelPendingOrder() {
  const result = { name: "Cancel pending order and verify it disappears", status: "Failed" };
  const driver = await loginAndReturnDriver();

  try {
    // Lấy token để gọi API
    let token = await driver.executeScript("return localStorage.getItem('token');");
    if (token.startsWith('"') && token.endsWith('"')) token = token.slice(1, -1);

    // Gọi API lấy danh sách đơn hàng pending
    const apiOrders = await axios
      .get(`${process.env.NEXT_PUBLIC_SERVER_URI}/api/v1/order/`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => res.data.data);

    // Lấy đơn hàng pending đầu tiên
    const pendingOrder = apiOrders.find((order) => order.status === "pending");
    if (!pendingOrder) {
      console.log("⚠️ Không có đơn hàng nào ở trạng thái pending. Bỏ qua test.");
      result.status = "Skipped";
      return result;
    }

    const orderId = pendingOrder._id;
    console.log("✅ Tìm thấy đơn hàng pending:", orderId);

    // Vào trang đơn hàng
    const orderBtn = await driver.findElement(By.name("orderBtn"));
    await orderBtn.click();
    await driver.sleep(3000);

    // Lấy tất cả order item hiện trên UI
    const ordersUI = await driver.findElements(By.css(".current-orders-container .order-item"));

    let matched = false;
    for (const orderElement of ordersUI) {
      // Lấy data-order-id của từng order element
      const orderIdOnUI = await orderElement.getAttribute("data-order-id");

      if (orderIdOnUI === orderId) {
        // Cuộn đến đơn hàng cần thao tác
        await driver.executeScript("arguments[0].scrollIntoView(true);", orderElement);

        // Tìm và click nút "Hủy đơn hàng"
        const cancelBtn = await orderElement.findElement(By.xpath(".//span[text()='Hủy đơn hàng']"));
        await cancelBtn.click();
        matched = true;
        break;
      }
    }

    if (!matched) throw new Error("Không tìm thấy đơn hàng pending trên UI");

    // Xác nhận SweetAlert2
    const confirmButton = await driver.wait(until.elementLocated(By.css(".swal2-confirm")), 5000);
    await confirmButton.click();

    // Đợi toast "Hủy đơn thành công"
    await driver.wait(until.elementLocated(By.css(".Toastify__toast--success")), 5000);

    console.log("✅ Đã hiện thông báo Toast thành công");

    // Chờ 2-3s cho UI cập nhật
    await driver.sleep(3000);

    // Kiểm tra lại UI để chắc chắn đơn hàng đã biến mất
    const ordersAfterCancel = await driver.findElements(By.css(".current-orders-container .order-item"));
    const stillExists = await Promise.any(
      ordersAfterCancel.map(async (el) => {
        const id = await el.getAttribute("data-order-id");
        return id === orderId;
      })
    ).catch(() => false);

    assert.strictEqual(stillExists, false, "Đơn hàng vẫn còn trên UI sau khi hủy");

    result.status = "Passed";
    console.log("✅ Test passed: Đơn hàng bị hủy thành công và cập nhật chính xác");
  } catch (err) {
    console.error(`❌ ${result.name} Failed:`, err.message);
  } finally {
    await driver.quit();
  }

  return result;
}

async function testCancelNonPendingOrder() {
  const result = { name: "Cancel non-pending order", status: "Failed" };
  const driver = await loginAndReturnDriver();

  try {
    // Lấy token
    let token = await driver.executeScript("return localStorage.getItem('token');");
    if (token.startsWith('"') && token.endsWith('"')) token = token.slice(1, -1);

    // Gọi API lấy danh sách đơn hàng
    const apiOrders = await axios
      .get(`${process.env.NEXT_PUBLIC_SERVER_URI}/api/v1/order/`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => res.data.data);

    // Lọc đơn hàng có status khác 'pending' hoặc 'preorder'
    const nonCancellableOrder = apiOrders.find((order) => !["pending", "preorder", "done"].includes(order.status));

    if (!nonCancellableOrder) {
      console.log("⚠️ Không có đơn hàng nào không thể hủy. Bỏ qua test.");
      result.status = "Skipped";
      return result;
    }

    const orderId = nonCancellableOrder._id;
    console.log("✅ Tìm thấy đơn hàng không thể hủy:", orderId, "với status:", nonCancellableOrder.status);

    // Vào trang đơn hàng
    const orderBtn = await driver.findElement(By.name("orderBtn"));
    await orderBtn.click();
    await driver.sleep(3000);

    // Tìm đơn hàng trong UI
    const ordersUI = await driver.findElements(By.css(".current-orders-container .order-item"));
    let matched = false;
    for (const orderElement of ordersUI) {
      const orderIdOnUI = await orderElement.getAttribute("data-order-id");
      if (orderIdOnUI === orderId) {
        await driver.executeScript("arguments[0].scrollIntoView(true);", orderElement);
        const cancelBtn = await orderElement.findElement(By.xpath(".//span[text()='Hủy đơn hàng']"));
        await cancelBtn.click();
        matched = true;
        break;
      }
    }

    if (!matched) throw new Error("Không tìm thấy đơn hàng trên UI");

    // Xác nhận SweetAlert2
    const confirmButton = await driver.wait(until.elementLocated(By.css(".swal2-confirm")), 5000);
    await confirmButton.click();

    // Đợi toast lỗi hiện ra (trong trường hợp bị chặn ở backend)
    const errorToast = await driver.wait(until.elementLocated(By.css(".Toastify__toast--error")), 5000);

    console.log("✅ Hiển thị thông báo lỗi đúng khi hủy đơn hàng không hợp lệ");
    result.status = "Passed";
  } catch (err) {
    console.error(`❌ ${result.name} Failed:`, err.message);
  } finally {
    await driver.quit();
  }

  return result;
}

async function testCancelNonExistingOrder() {
  const driver = await loginAndReturnDriver();
  const result = { name: "Cancel non-existing order", status: "Failed" };

  try {
    let token = await driver.executeScript("return localStorage.getItem('token');");
    if (token.startsWith('"') && token.endsWith('"')) {
      token = token.slice(1, -1);
    }

    const fakeOrderId = "666666666666666666666666";

    await axios.put(
      `${process.env.NEXT_PUBLIC_SERVER_URI}/api/v1/order/${fakeOrderId}/cancel-order`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    throw new Error("❌ Server không trả lỗi khi hủy đơn không tồn tại");
  } catch (err) {
    if (err.response && err.response.status === 404 && err.response.data.message === "Order not found") {
      console.error("❌ Server response:", err.response?.data || err.message);
      console.log("✅ Server trả lỗi đúng khi hủy đơn không tồn tại");
      result.status = "Passed";
    } else {
      console.error("❌ Test thất bại. Lỗi:", err.message);
    }
  } finally {
    await driver.quit();
  }

  return result;
}

async function testCancelOtherUsersOrder() {
  const result = { name: "Cancel order of another user", status: "Failed" };
  const driver = await loginAndReturnDriver();

  try {
    let token = await driver.executeScript("return localStorage.getItem('token');");
    if (token.startsWith('"') && token.endsWith('"')) {
      token = token.slice(1, -1);
    }

    const someoneElsesOrderId = "6846b8fbb7cc933f97140450";

    await axios.put(
      `${process.env.NEXT_PUBLIC_SERVER_URI}/api/v1/order/${someoneElsesOrderId}/cancel-order`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    throw new Error("Server không chặn hủy đơn của người khác");
  } catch (err) {
    if (err.response?.status === 403 && err.response?.data?.message === "You are not authorized to cancel this order") {
      console.error("❌ Server response:", err.response?.data || err.message);
      console.log("✅ Server chặn đúng khi user khác cố hủy đơn không phải của mình");
      result.status = "Passed";
    } else {
      console.error("❌ Server không phản hồi đúng khi hủy đơn của người khác:", err.message);
    }
  } finally {
    await driver.quit();
  }

  return result;
}

async function testReOrder() {
  const driver = await loginAndReturnDriver();
  const result = { name: "Test re-order", status: "Failed" };

  try {
    // Lấy token để gọi API
    let token = await driver.executeScript("return localStorage.getItem('token');");
    if (token.startsWith('"') && token.endsWith('"')) token = token.slice(1, -1);

    // Gọi API lấy danh sách đơn hàng done
    const apiOrders = await axios
      .get(`${process.env.NEXT_PUBLIC_SERVER_URI}/api/v1/order/`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => res.data.data);

    // Lấy đơn hàng done đầu tiên
    let doneOrder = null;
    for (const order of apiOrders) {
      for (const item of order.items) {
        if (item.dish.stockStatus === "AVAILABLE" && order.status === "done") {
          doneOrder = order;
          break;
        }
      }
      if (doneOrder) break;
    }
    if (!doneOrder) {
      console.log("⚠️ Không có đơn hàng nào ở trạng thái done. Bỏ qua test.");
      result.status = "Skipped";
      return result;
    }

    const orderId = doneOrder._id;
    const storeId = doneOrder.store._id;
    console.log("✅ Tìm thấy đơn hàng hoàn thành:", orderId);

    // Vào trang đơn hàng
    const orderBtn = await driver.findElement(By.name("orderBtn"));
    await orderBtn.click();
    await driver.sleep(3000);

    // Lấy tất cả order item hiện trên UI
    let matched = false;
    let lastCount = 0;

    while (true) {
      const ordersUI = await driver.findElements(By.css(".done-orders-container .order-item"));

      for (const orderElement of ordersUI) {
        const orderIdOnUI = await orderElement.getAttribute("data-order-id");
        if (orderIdOnUI === orderId) {
          await driver.executeScript("arguments[0].scrollIntoView(true);", orderElement);
          const reOrderBtn = await orderElement.findElement(By.xpath(".//span[text()='Đặt lại']"));
          await reOrderBtn.click();
          matched = true;
          break;
        }
      }

      if (matched) break;

      // Nếu không thấy đơn, kéo xuống cuối trang để load thêm
      await driver.executeScript("window.scrollBy(0, window.innerHeight);");
      await driver.sleep(1000);

      const currentCount = (await driver.findElements(By.css(".done-orders-container .order-item"))).length;
      if (currentCount === lastCount) break; // Không load thêm => dừng
      lastCount = currentCount;
    }

    if (!matched) throw new Error("Không tìm thấy đơn hàng hoàn thành trên UI sau khi scroll");

    // Xác nhận SweetAlert2
    const confirmButton = await driver.wait(until.elementLocated(By.css(".swal2-confirm")), 5000);
    await confirmButton.click();

    // Đợi toast "Đặt lại thành công"
    await driver.wait(until.elementLocated(By.css(".Toastify__toast--success")), 5000);

    console.log("✅ Đã hiện thông báo Toast thành công");

    // Chuyển hướng về trang chi tiết giỏ hàng
    await driver.get(`http://localhost:3000/restaurant/${storeId}/cart`);
    await driver.wait(until.elementsLocated(By.css('[name="cartItems"]')), 5000);

    // Thu thập thông tin món ăn từ UI
    const cartItemElements = await driver.findElements(By.css('[name="cartItems"]'));
    const cartItems = [];

    for (const el of cartItemElements) {
      const quantityEl = await el.findElement(By.css('[name="quantity"]'));
      const dishNameEl = await el.findElement(By.css('[name="dishName"]'));
      const toppingEls = await el.findElements(By.css('[name="toppingName"]'));
      const priceEl = await el.findElement(By.css('[name="price"]'));

      const quantity = parseInt((await quantityEl.getText()).replace("x", ""));
      const dishName = await dishNameEl.getText();
      const toppings = [];
      for (const top of toppingEls) toppings.push(await top.getText());
      const priceText = await priceEl.getText(); // "20.000đ"
      const price = parseInt(priceText.replace(/\D/g, "")); // bỏ ký tự không phải số

      cartItems.push({
        dishName,
        quantity,
        toppings: toppings.sort(),
        price,
      });
    }

    // So sánh với đơn hàng gốc
    const originalItems = doneOrder.items.map((item) => {
      const dishPrice = (item.dish?.price || 0) * item.quantity;
      const toppingsPrice = (item.toppings || []).reduce((sum, t) => sum + (t.price || 0), 0) * item.quantity;
      return {
        dishName: item.dish?.name,
        quantity: item.quantity,
        toppings: (item.toppings || []).map((t) => t.name).sort(),
        price: dishPrice + toppingsPrice,
      };
    });

    let allMatch = true;
    for (const original of originalItems) {
      const found = cartItems.find(
        (item) =>
          item.dishName === original.dishName &&
          item.quantity === original.quantity &&
          JSON.stringify(item.toppings) === JSON.stringify(original.toppings) &&
          item.price === original.price
      );
      if (!found) {
        console.error("❌ Không khớp món:", original);
        allMatch = false;
        break;
      }
    }

    if (!allMatch) throw new Error("❌ Dữ liệu giỏ hàng KHÔNG khớp đơn hàng đã đặt");

    result.status = "Passed";
    console.log("✅ Test passed: Dữ liệu món ăn và giá khớp với đơn hàng gốc");
  } catch (err) {
    console.error(`❌ ${result.name} Failed:`, err.message);
  } finally {
    await driver.quit();
  }

  return result;
}

async function testReOrderBlockedStore() {
  const result = { name: "Test re-order with BLOCKED store", status: "Failed" };
  const driver = await loginAndReturnDriver();

  try {
    // Lấy token để gọi API
    let token = await driver.executeScript("return localStorage.getItem('token');");
    if (token.startsWith('"') && token.endsWith('"')) token = token.slice(1, -1);

    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_URI}/api/v1/cart/re-order`,
      {
        storeId: "6817586286b61f2b3494c30a",
        items: [
          {
            dish: "665afc16b5ff85226d999999",
            quantity: 1,
            toppings: [],
            _id: "6826c185646384bcd6c89382",
          },
        ],
      },
      {
        headers: { Authorization: `Bearer ${token}` },
        validateStatus: () => true,
      }
    );

    if (
      res.status === 403 &&
      res.data.success === false &&
      res.data.message === "Cannot reorder from a blocked store"
    ) {
      console.log("✅ Hệ thống chặn đặt lại từ cửa hàng bị BLOCK thành công");
      result.status = "Passed";
    } else {
      console.error("❌ FAIL: Phản hồi không đúng khi đặt lại đơn hàng từ cửa hàng bị BLOCK:", res.data);
    }
  } catch (err) {
    console.error(`❌ ${result.name} Failed:`, err.message);
  } finally {
    await driver.quit();
  }

  return result;
}

async function testReOrderWithOutOfStockDish() {
  const result = { name: "Re-order with out of stock dish", status: "Failed" };
  const driver = await loginAndReturnDriver();

  try {
    // Lấy token để gọi API
    let token = await driver.executeScript("return localStorage.getItem('token');");
    if (token.startsWith('"') && token.endsWith('"')) token = token.slice(1, -1);

    // Gọi API lấy danh sách đơn hàng done
    const apiOrders = await axios
      .get(`${process.env.NEXT_PUBLIC_SERVER_URI}/api/v1/order/`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => res.data.data);

    // Lấy đơn hàng done đầu tiên
    let doneOrder = null;
    for (const order of apiOrders) {
      for (const item of order.items) {
        if (item.dish.stockStatus === "OUT_OF_STOCK" && order.status === "done") {
          doneOrder = order;
          break;
        }
      }
      if (doneOrder) break;
    }
    if (!doneOrder) {
      console.log("⚠️ Không có đơn hàng nào ở trạng thái done. Bỏ qua test.");
      result.status = "Skipped";
      return result;
    }

    const orderId = doneOrder._id;
    const storeId = doneOrder.store._id;
    console.log("✅ Tìm thấy đơn hàng hoàn thành:", orderId);

    // Vào trang đơn hàng
    const orderBtn = await driver.findElement(By.name("orderBtn"));
    await orderBtn.click();
    await driver.sleep(3000);

    // Lấy tất cả order item hiện trên UI
    let matched = false;
    let lastCount = 0;

    while (true) {
      const ordersUI = await driver.findElements(By.css(".done-orders-container .order-item"));

      for (const orderElement of ordersUI) {
        const orderIdOnUI = await orderElement.getAttribute("data-order-id");
        if (orderIdOnUI === orderId) {
          await driver.executeScript("arguments[0].scrollIntoView(true);", orderElement);
          const reOrderBtn = await orderElement.findElement(By.xpath(".//span[text()='Đặt lại']"));
          await reOrderBtn.click();
          matched = true;
          break;
        }
      }

      if (matched) break;

      // Nếu không thấy đơn, kéo xuống cuối trang để load thêm
      await driver.executeScript("window.scrollBy(0, window.innerHeight);");
      await driver.sleep(1000);

      const currentCount = (await driver.findElements(By.css(".done-orders-container .order-item"))).length;
      if (currentCount === lastCount) break; // Không load thêm => dừng
      lastCount = currentCount;
    }

    if (!matched) throw new Error("Không tìm thấy đơn hàng hoàn thành trên UI sau khi scroll");

    // Xác nhận SweetAlert2 nếu có
    const confirmButton = await driver.wait(until.elementLocated(By.css(".swal2-confirm")), 5000);
    await confirmButton.click();

    // Chờ thông báo Toast lỗi
    const errorToast = await driver.wait(until.elementLocated(By.css(".Toastify__toast--error")), 5000);

    console.log("✅ Thông báo lỗi đúng khi món không còn được phục vụ");
    result.status = "Passed";
  } catch (err) {
    console.error(`❌ ${result.name} Failed:`, err.message);
  } finally {
    await driver.quit();
  }

  return result;
}

async function testReOrderWithEmptyItem() {
  const driver = await loginAndReturnDriver();
  const result = { name: "Re-order với danh sách món ăn rỗng", status: "Failed" };

  try {
    let token = await driver.executeScript("return localStorage.getItem('token');");
    if (token.startsWith('"') && token.endsWith('"')) {
      token = token.slice(1, -1);
    }

    // Gọi API lấy danh sách đơn hàng done
    const apiOrders = await axios
      .get(`${process.env.NEXT_PUBLIC_SERVER_URI}/api/v1/order/`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => res.data.data);

    // Lấy đơn hàng done đầu tiên
    const doneOrder = apiOrders.find((order) => order.status === "done");
    if (!doneOrder) {
      console.log("⚠️ Không có đơn hàng nào ở trạng thái done. Bỏ qua test.");
      result.status = "Skipped";
      return result;
    }

    const orderId = doneOrder._id;
    const storeId = doneOrder.store._id;
    console.log("✅ Tìm thấy đơn hàng hoàn thành:", orderId);

    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_URI}/api/v1/cart/re-order`,
      {
        storeId,
        items: [],
      },
      {
        headers: { Authorization: `Bearer ${token}` },
        validateStatus: () => true, // Cho phép nhận 400 response mà không throw
      }
    );

    if (res.status === 400 && res.data.success === false && res.data.message === "Items cannot be empty") {
      console.log("✅ PASS: Đặt lại đơn hàng không có món ăn trả về đúng lỗi");
      result.status = "Passed";
    } else {
      console.error("❌ FAIL: Phản hồi không đúng khi không có món ăn:", res.data);
    }
  } catch (err) {
    console.error("❌ Lỗi khi gọi API:", err.message);
  } finally {
    await driver.quit();
  }

  return result;
}

async function testDisplayCorrectRatingPage() {
  const result = { name: "Test Display Correct Rating Page", status: "Failed" };
  const driver = await loginAndReturnDriver();

  try {
    // Lấy token
    let token = await driver.executeScript("return localStorage.getItem('token');");
    if (token.startsWith('"') && token.endsWith('"')) token = token.slice(1, -1);

    // Gọi API lấy đơn hàng done
    const apiOrders = await axios
      .get(`${process.env.NEXT_PUBLIC_SERVER_URI}/api/v1/order/`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => res.data.data);

    const doneOrder = apiOrders.find((order) => order.status === "done");
    if (!doneOrder) {
      console.log("⚠️ Không có đơn hàng nào ở trạng thái done. Bỏ qua test.");
      result.status = "Skipped";
      return result;
    }

    const { _id: orderId, store, orderDetails } = doneOrder;
    const storeName = store.name;

    // Vào trang đơn hàng
    const orderBtn = await driver.findElement(By.name("orderBtn"));
    await orderBtn.click();
    await driver.sleep(3000);

    let matched = false;
    let lastCount = 0;

    while (true) {
      const ordersUI = await driver.findElements(By.css(".done-orders-container .order-item"));

      for (const orderElement of ordersUI) {
        const orderIdOnUI = await orderElement.getAttribute("data-order-id");
        if (orderIdOnUI === orderId) {
          await driver.executeScript("arguments[0].scrollIntoView(true);", orderElement);
          const ratingBtn = await orderElement.findElement(By.xpath(".//span[text()='Đánh giá']"));
          await ratingBtn.click();
          matched = true;
          break;
        }
      }

      if (matched) break;

      // Nếu không thấy đơn, kéo xuống cuối trang để load thêm
      await driver.executeScript("window.scrollBy(0, window.innerHeight);");
      await driver.sleep(1000);

      const currentCount = (await driver.findElements(By.css(".done-orders-container .order-item"))).length;
      if (currentCount === lastCount) break; // Không load thêm => dừng
      lastCount = currentCount;
    }

    if (!matched) throw new Error("Không tìm thấy đơn hàng hoàn thành trên UI sau khi scroll");

    // Đợi điều hướng tới trang đánh giá
    await driver.sleep(1000);

    // Kiểm tra tiêu đề tên cửa hàng
    const storeTitle = await driver.wait(until.elementLocated(By.css(".rating-store-name")), 15000);
    const storeTitleText = await storeTitle.getText();
    assert.strictEqual(storeTitleText.trim(), storeName.trim(), "Tên cửa hàng không đúng");

    // Kiểm tra danh sách món đã đặt
    const dishNamesFromAPI = doneOrder.items.map((d) => d.dish.name).sort();

    const dishesElement = await driver.wait(until.elementLocated(By.css(".ordered-dishes")), 10000);
    const dishesText = await dishesElement.getText(); // VD: "Đã đặt: Phở bò, Bún chả, Trà đào"

    const dishNamesFromUI = dishesText
      .replace("Đã đặt:", "")
      .split(",")
      .map((d) => d.trim())
      .sort();

    assert.deepStrictEqual(
      dishNamesFromUI,
      dishNamesFromAPI,
      `Danh sách món đã đặt không khớp: UI = [${dishNamesFromUI}], API = [${dishNamesFromAPI}]`
    );

    result.status = "Passed";
    console.log("✅ Test passed: Hiển thị đúng trang đánh giá với thông tin hợp lệ");
  } catch (err) {
    console.error(`❌ ${result.name} Failed:`, err.message);
  } finally {
    await driver.quit();
  }

  return result;
}

async function testNoStarSelected() {
  const result = { name: "Test No Star Selected", status: "Failed" };
  const driver = await loginAndReturnDriver();

  try {
    // Lấy token
    let token = await driver.executeScript("return localStorage.getItem('token');");
    if (token.startsWith('"') && token.endsWith('"')) token = token.slice(1, -1);

    // Gọi API lấy đơn hàng done
    const apiOrders = await axios
      .get(`${process.env.NEXT_PUBLIC_SERVER_URI}/api/v1/order/`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => res.data.data);

    const doneOrder = apiOrders.find((order) => order.status === "done");
    if (!doneOrder) {
      console.log("⚠️ Không có đơn hàng nào ở trạng thái done. Bỏ qua test.");
      result.status = "Skipped";
      return result;
    }

    const { _id: orderId, store, orderDetails } = doneOrder;

    // Vào trang đơn hàng
    const orderBtn = await driver.findElement(By.name("orderBtn"));
    await orderBtn.click();
    await driver.sleep(3000);

    let matched = false;
    let lastCount = 0;

    while (true) {
      const ordersUI = await driver.findElements(By.css(".done-orders-container .order-item"));

      for (const orderElement of ordersUI) {
        const orderIdOnUI = await orderElement.getAttribute("data-order-id");
        if (orderIdOnUI === orderId) {
          await driver.executeScript("arguments[0].scrollIntoView(true);", orderElement);
          const ratingBtn = await orderElement.findElement(By.xpath(".//span[text()='Đánh giá']"));
          await ratingBtn.click();
          matched = true;
          break;
        }
      }

      if (matched) break;

      // Nếu không thấy đơn, kéo xuống cuối trang để load thêm
      await driver.executeScript("window.scrollBy(0, window.innerHeight);");
      await driver.sleep(1000);

      const currentCount = (await driver.findElements(By.css(".done-orders-container .order-item"))).length;
      if (currentCount === lastCount) break; // Không load thêm => dừng
      lastCount = currentCount;
    }

    if (!matched) throw new Error("Không tìm thấy đơn hàng hoàn thành trên UI sau khi scroll");

    // Đợi điều hướng tới trang đánh giá
    await driver.sleep(1000);

    // Đợi trang load
    await driver.wait(until.elementLocated(By.css("textarea")), 5000);

    // Không chọn sao (giữ ratingValue = 0 mặc định)

    // Nhập bình luận
    const commentBox = await driver.findElement(By.css("textarea"));
    await commentBox.sendKeys("Đánh giá hợp lệ");

    // Nhấn nút đánh giá
    const submitBtn = await driver.findElement(By.xpath("//span[text()='Đánh giá']/.."));
    await submitBtn.click();

    // Đợi toast lỗi hiện ra
    const toast = await driver.wait(until.elementLocated(By.css(".Toastify__toast--error")), 5000);
    const toastText = await toast.getText();

    assert.strictEqual(toastText, "Vui lòng chọn số sao để tiếp tục đánh giá!");

    console.log("✅ Test passed: Hiển thị lỗi khi không chọn sao");
  } catch (err) {
    console.error("❌ Test failed:", err.message);
  } finally {
    await driver.quit();
  }
}

async function testNoCommentEntered() {
  const result = { name: "Test No Comment Entered", status: "Failed" };
  const driver = await loginAndReturnDriver();

  try {
    // Lấy token
    let token = await driver.executeScript("return localStorage.getItem('token');");
    if (token.startsWith('"') && token.endsWith('"')) token = token.slice(1, -1);

    // Gọi API lấy đơn hàng done
    const apiOrders = await axios
      .get(`${process.env.NEXT_PUBLIC_SERVER_URI}/api/v1/order/`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => res.data.data);

    const doneOrder = apiOrders.find((order) => order.status === "done");
    if (!doneOrder) {
      console.log("⚠️ Không có đơn hàng nào ở trạng thái done. Bỏ qua test.");
      result.status = "Skipped";
      return result;
    }

    const { _id: orderId, store, orderDetails } = doneOrder;

    // Vào trang đơn hàng
    const orderBtn = await driver.findElement(By.name("orderBtn"));
    await orderBtn.click();
    await driver.sleep(3000);

    let matched = false;
    let lastCount = 0;

    while (true) {
      const ordersUI = await driver.findElements(By.css(".done-orders-container .order-item"));

      for (const orderElement of ordersUI) {
        const orderIdOnUI = await orderElement.getAttribute("data-order-id");
        if (orderIdOnUI === orderId) {
          await driver.executeScript("arguments[0].scrollIntoView(true);", orderElement);
          const ratingBtn = await orderElement.findElement(By.xpath(".//span[text()='Đánh giá']"));
          await ratingBtn.click();
          matched = true;
          break;
        }
      }

      if (matched) break;

      // Nếu không thấy đơn, kéo xuống cuối trang để load thêm
      await driver.executeScript("window.scrollBy(0, window.innerHeight);");
      await driver.sleep(1000);

      const currentCount = (await driver.findElements(By.css(".done-orders-container .order-item"))).length;
      if (currentCount === lastCount) break; // Không load thêm => dừng
      lastCount = currentCount;
    }

    if (!matched) throw new Error("Không tìm thấy đơn hàng hoàn thành trên UI sau khi scroll");

    // Đợi điều hướng tới trang đánh giá
    await driver.sleep(1000);

    // Đợi trang load
    await driver.wait(until.elementLocated(By.css("textarea")), 5000);

    // Chọn sao (ví dụ chọn sao thứ 4)
    const starToClick = await driver.findElement(By.xpath("(//img[contains(@src, 'star')])[4]"));
    await starToClick.click();

    // Để ô bình luận trống, không nhập gì

    // Nhấn nút đánh giá
    const submitBtn = await driver.findElement(By.xpath("//span[text()='Đánh giá']/.."));
    await submitBtn.click();

    // Đợi toast lỗi hiện ra
    const toast = await driver.wait(until.elementLocated(By.css(".Toastify__toast--error")), 5000);

    console.log("✅ Test passed: Hiển thị lỗi khi không nhập bình luận");
  } catch (err) {
    console.error("❌ Test failed:", err.message);
  } finally {
    await driver.quit();
  }
}

async function testSuccessfulRating() {
  const result = { name: "Test No Comment Entered", status: "Failed" };
  const driver = await loginAndReturnDriver();

  try {
    // Lấy token
    let token = await driver.executeScript("return localStorage.getItem('token');");
    if (token.startsWith('"') && token.endsWith('"')) token = token.slice(1, -1);

    // Gọi API lấy đơn hàng done
    const apiOrders = await axios
      .get(`${process.env.NEXT_PUBLIC_SERVER_URI}/api/v1/order/`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => res.data.data);

    const doneOrder = apiOrders.find((order) => order.status === "done");
    if (!doneOrder) {
      console.log("⚠️ Không có đơn hàng nào ở trạng thái done. Bỏ qua test.");
      result.status = "Skipped";
      return result;
    }

    const { _id: orderId, store, orderDetails } = doneOrder;

    // Vào trang đơn hàng
    const orderBtn = await driver.findElement(By.name("orderBtn"));
    await orderBtn.click();
    await driver.sleep(3000);

    let matched = false;
    let lastCount = 0;

    while (true) {
      const ordersUI = await driver.findElements(By.css(".done-orders-container .order-item"));

      for (const orderElement of ordersUI) {
        const orderIdOnUI = await orderElement.getAttribute("data-order-id");
        if (orderIdOnUI === orderId) {
          await driver.executeScript("arguments[0].scrollIntoView(true);", orderElement);
          const ratingBtn = await orderElement.findElement(By.xpath(".//span[text()='Đánh giá']"));
          await ratingBtn.click();
          matched = true;
          break;
        }
      }

      if (matched) break;

      // Nếu không thấy đơn, kéo xuống cuối trang để load thêm
      await driver.executeScript("window.scrollBy(0, window.innerHeight);");
      await driver.sleep(1000);

      const currentCount = (await driver.findElements(By.css(".done-orders-container .order-item"))).length;
      if (currentCount === lastCount) break; // Không load thêm => dừng
      lastCount = currentCount;
    }

    if (!matched) throw new Error("Không tìm thấy đơn hàng hoàn thành trên UI sau khi scroll");

    // Đợi điều hướng tới trang đánh giá
    await driver.sleep(1000);

    // Đợi trang load
    await driver.wait(until.elementLocated(By.css("textarea")), 5000);

    // Chọn sao (ví dụ chọn sao thứ 4)
    const starToClick = await driver.findElement(By.xpath("(//img[contains(@src, 'star')])[4]"));
    await starToClick.click();

    // Nhập bình luận
    const commentBox = await driver.findElement(By.css("textarea"));
    await commentBox.sendKeys("Good");

    // Nhấn nút đánh giá
    const submitBtn = await driver.findElement(By.name("submitBtn"));
    await submitBtn.click();
    console.log("✅ Clicked on submitBtn");

    // Đợi toast thành công hiện ra
    //await driver.wait(until.elementLocated(By.css(".Toastify__toast--success")), 10000);

    // Đợi trang chuyển hướng về trang cửa hàng (ví dụ URL chứa /restaurant/storeId)
    await driver.wait(until.urlContains("/restaurant"), 5000);

    console.log("✅ Test passed: Đánh giá thành công và chuyển hướng đúng");
  } catch (err) {
    console.error("❌ Test failed:", err.message);
  } finally {
    await driver.quit();
  }
}

async function testRatingNonExistentOrder() {
  const driver = await loginAndReturnDriver();
  const result = { name: "Test Rating Non Existent Order", status: "Failed" };

  try {
    // Truy cập trang đánh giá với orderId sai
    await driver.get(
      "http://localhost:3000/restaurant/67c90ca539aedef56bddbffa/rating/add-rating/6826c08dc9c241cf07fc847b"
    );

    // Đợi 5s để trang xử lý fetch
    await driver.sleep(3000);

    // Tìm thông báo "Không tìm thấy đơn hàng"
    const errorText = await driver.wait(until.elementLocated(By.css(".no-current-orders")), 5000);
    const isVisible = await errorText.isDisplayed();
    assert.strictEqual(isVisible, true, "Không hiển thị thông báo đơn hàng không tồn tại");

    // Kiểm tra nút Đánh giá có bị ẩn/không tồn tại
    const ratingButtons = await driver.findElements(By.name("submitBtn"));
    const isBtnActive = ratingButtons.length > 0 && (await ratingButtons[0].isDisplayed());

    assert.strictEqual(isBtnActive, false, "Nút đánh giá vẫn hiển thị khi đơn hàng không tồn tại");

    console.log("✅ Test passed: Xử lý đúng khi đánh giá đơn hàng không tồn tại");
    result.status = "Passed";
  } catch (err) {
    console.error("❌ Test failed:", err.message);
  } finally {
    await driver.quit();
    return result;
  }
}

async function testShowDetailOrder() {
  const result = { name: "Test Show Detail Order", status: "Failed" };
  const driver = await loginAndReturnDriver();

  try {
    // Lấy token để gọi API
    let token = await driver.executeScript("return localStorage.getItem('token');");
    if (token.startsWith('"') && token.endsWith('"')) token = token.slice(1, -1);

    // Gọi API lấy danh sách đơn hàng pending
    const apiOrders = await axios
      .get(`${process.env.NEXT_PUBLIC_SERVER_URI}/api/v1/order/`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => res.data.data);

    // Lấy đơn hàng pending đầu tiên
    const pendingOrder = apiOrders.find((order) => order.status === "pending");
    if (!pendingOrder) {
      console.log("⚠️ Không có đơn hàng nào ở trạng thái pending. Bỏ qua test.");
      result.status = "Skipped";
      return result;
    }

    const orderId = pendingOrder._id;
    console.log("✅ Tìm thấy đơn hàng pending:", orderId);

    // Vào trang đơn hàng
    const orderBtn = await driver.findElement(By.name("orderBtn"));
    await orderBtn.click();
    await driver.sleep(3000);

    // Lấy tất cả order item hiện trên UI
    const ordersUI = await driver.findElements(By.css(".current-orders-container .order-item"));

    let matched = false;
    for (const orderElement of ordersUI) {
      // Lấy data-order-id của từng order element
      const orderIdOnUI = await orderElement.getAttribute("data-order-id");

      if (orderIdOnUI === orderId) {
        // Cuộn đến đơn hàng cần thao tác
        await driver.executeScript("arguments[0].scrollIntoView(true);", orderElement);

        // Tìm và click nút "Xem tiến trình"
        const detailBtn = await orderElement.findElement(By.xpath(".//span[text()='Xem tiến trình']"));
        await detailBtn.click();
        matched = true;
        break;
      }
    }

    if (!matched) throw new Error("Không tìm thấy đơn hàng pending trên UI");

    // Chờ 2-3s cho UI cập nhật
    await driver.sleep(5000);

    let status = "";

    if (pendingOrder.status === "cancelled") {
      status = "Đơn hàng đã bị hủy";
    } else if (pendingOrder.status === "pending") {
      status = "Đơn hàng đang chờ quán xác nhận";
    } else if (pendingOrder.status === "confirmed") {
      status = "Quán đã xác nhận đơn hàng";
    } else if (pendingOrder.status === "preparing") {
      status = "Quán đang chuẩn bị món ăn";
    } else if (pendingOrder.status === "finished") {
      status = "Món ăn đã hoàn thành";
    } else if (pendingOrder.status === "taken") {
      status = "Shipper đã lấy món ăn";
    } else if (pendingOrder.status === "delivering") {
      status = "Shipper đang vận chuyển đến chỗ bạn";
    } else if (pendingOrder.status === "delivered") {
      status = "Đơn hàng đã được giao tới nơi";
    } else if (pendingOrder.status === "done") {
      status = "Đơn hàng được giao hoàn tất";
    } else {
      status = "";
    }

    const orderStatus = await driver.wait(until.elementLocated(By.css(".order-status")), 5000);
    const orderStatusText = await orderStatus.getText();

    assert.strictEqual(status, orderStatusText, "Nút đánh giá vẫn hiển thị khi đơn hàng không tồn tại");

    // Thu thập thông tin món ăn từ UI
    const cartItemElements = await driver.findElements(By.css('[name="cartItems"]'));
    const cartItems = [];

    for (const el of cartItemElements) {
      const quantityEl = await el.findElement(By.css('[name="quantity"]'));
      const dishNameEl = await el.findElement(By.css('[name="dishName"]'));
      const toppingEls = await el.findElements(By.css('[name="toppingName"]'));
      const priceEl = await el.findElement(By.css('[name="price"]'));

      const quantity = parseInt((await quantityEl.getText()).replace("x", ""));
      const dishName = await dishNameEl.getText();
      const toppings = [];
      for (const top of toppingEls) toppings.push(await top.getText());
      const priceText = await priceEl.getText(); // "20.000đ"
      const price = parseInt(priceText.replace(/\D/g, "")); // bỏ ký tự không phải số

      cartItems.push({
        dishName,
        quantity,
        toppings: toppings.sort(),
        price,
      });
    }

    // So sánh với đơn hàng gốc
    const originalItems = pendingOrder.items.map((item) => {
      const dishPrice = (item.dish?.price || 0) * item.quantity;
      const toppingsPrice = (item.toppings || []).reduce((sum, t) => sum + (t.price || 0), 0) * item.quantity;
      return {
        dishName: item.dish?.name,
        quantity: item.quantity,
        toppings: (item.toppings || []).map((t) => t.name).sort(),
        price: dishPrice + toppingsPrice,
      };
    });

    let allMatch = true;
    for (const original of originalItems) {
      const found = cartItems.find(
        (item) =>
          item.dishName === original.dishName &&
          item.quantity === original.quantity &&
          JSON.stringify(item.toppings) === JSON.stringify(original.toppings) &&
          item.price === original.price
      );
      if (!found) {
        console.error("❌ Không khớp món:", original);
        allMatch = false;
        break;
      }
    }

    if (!allMatch) throw new Error("❌ Dữ liệu giỏ hàng KHÔNG khớp đơn hàng đã đặt");

    result.status = "Passed";
    console.log("✅ Test passed: Hiển thị chi tiết đơn hàng chính xác");
  } catch (err) {
    console.error(`❌ ${result.name} Failed:`, err.message);
  } finally {
    await driver.quit();
  }

  return result;
}

async function testShowDetailNonExistentOrder() {
  const result = { name: "Test Show Detail NonExistent Order", status: "Failed" };
  const driver = await loginAndReturnDriver();

  try {
    await driver.get("http://localhost:3000/orders/order/684b8e027374c435d3dea6989");

    // Chờ 2-3s cho UI cập nhật
    await driver.sleep(3000);

    // Tìm thông báo "Không tìm thấy đơn hàng"
    const errorText = await driver.wait(until.elementLocated(By.css(".no-order-data")), 5000);
    const isVisible = await errorText.isDisplayed();
    assert.strictEqual(isVisible, true, "Không hiển thị thông báo đơn hàng không tồn tại");

    result.status = "Passed";
    console.log("✅ Test passed: Hiển thị chi tiết đơn hàng không tồn tại chính xác");
  } catch (err) {
    console.error(`❌ ${result.name} Failed:`, err.message);
  } finally {
    await driver.quit();
  }

  return result;
}

async function testShowDetailOtherUserOrder() {
  const result = { name: "Test Show Detail Other User Order", status: "Failed" };
  const driver = await loginAndReturnDriver();

  try {
    await driver.get("http://localhost:3000/orders/order/6846b8fbb7cc933f97140450");

    // Chờ 2-3s cho UI cập nhật
    await driver.sleep(3000);

    // Tìm thông báo "Không tìm thấy đơn hàng"
    const errorText = await driver.wait(until.elementLocated(By.css(".other-user-order-data")), 5000);
    const isVisible = await errorText.isDisplayed();
    assert.strictEqual(isVisible, true, "Không hiển thị thông báo đơn hàng không thuộc người dùng");

    result.status = "Passed";
    console.log("✅ Test passed: Hiển thị chi tiết đơn hàng không thuộc người dùng chính xác");
  } catch (err) {
    console.error(`❌ ${result.name} Failed:`, err.message);
  } finally {
    await driver.quit();
  }

  return result;
}

async function testGetOrderDetailNoJWT() {
  let driver = await createDriver();
  const result = { name: "Test Get Order Detail No JWT", status: "Failed" };

  try {
    await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URI}/api/v1/order/684b8e027374c435d3dea697`);

    throw new Error("❌ Server không trả lỗi khi lấy chi tiết đơn hàng không có jwt");
  } catch (err) {
    if (err.response && err.response.status === 401) {
      console.error("❌ Server response:", err.response?.data || err.message);
      console.log("✅ Server trả lỗi đúng khi lấy chi tiết đơn hàng khi không có token");
      result.status = "Passed";
    } else {
      console.error("❌ Test thất bại. Lỗi:", err.message);
    }
  } finally {
    await driver.quit();
  }

  return result;
}

module.exports = {
  testShowOrders,
  testShowOrdersNoData,
  testGetOrdersNoJWT,
  testCancelPendingOrder,
  testCancelNonPendingOrder,
  testCancelNonExistingOrder,
  testCancelOtherUsersOrder,
  testReOrder,
  testReOrderBlockedStore,
  testReOrderWithOutOfStockDish,
  testReOrderWithEmptyItem,
  testDisplayCorrectRatingPage,
  testNoStarSelected,
  testNoCommentEntered,
  testSuccessfulRating,
  testRatingNonExistentOrder,
  testShowDetailOrder,
  testShowDetailNonExistentOrder,
  testShowDetailOtherUserOrder,
  testGetOrderDetailNoJWT,
};
