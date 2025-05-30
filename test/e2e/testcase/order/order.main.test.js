require("dotenv").config({ path: require("path").resolve(__dirname, "../../../../.env") });
const { loginAndReturnDriver, loginNoDataAndReturnDriver, By, until } = require("../../../utils/loginUtil");
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

    // Gọi lại API để xác minh trạng thái đã bị hủy
    const updatedOrder = await axios
      .get(`${process.env.NEXT_PUBLIC_SERVER_URI}/api/v1/order/${pendingOrder._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => res.data.data);

    assert(updatedOrder.status === "cancelled", "Đơn hàng chưa bị hủy đúng");

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

async function testCancelNonPendingOrderShowsErrorToast() {
  const result = { name: "Cancel non-pending order and expect error message", status: "Failed" };
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
    const nonCancellableOrder = apiOrders.find((order) => !["pending", "preorder"].includes(order.status));

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

    const toastText = await errorToast.getText();
    assert(toastText.toLowerCase().includes("không thể hủy") || toastText.toLowerCase().includes("cannot cancel"));

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
  const result = { name: "Cancel non-existing order", status: "Failed" };
  const driver = await loginAndReturnDriver();

  try {
    let token = await driver.executeScript("return localStorage.getItem('token');");
    if (token.startsWith('"') && token.endsWith('"')) token = token.slice(1, -1);

    const fakeOrderId = "666666666666666666666666";

    await axios.delete(`${process.env.NEXT_PUBLIC_SERVER_URI}/api/v1/order/${fakeOrderId}/cancel`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    throw new Error("❌ Server không trả lỗi khi hủy đơn không tồn tại");
  } catch (err) {
    if (err.response && err.response.status === 404 && err.response.data.message === "Order not found") {
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
  const driver = await loginAndReturnDriver(); // login user B

  try {
    let token = await driver.executeScript("return localStorage.getItem('token');");
    if (token.startsWith('"') && token.endsWith('"')) token = token.slice(1, -1);

    const someoneElsesOrderId = "id_thuoc_user_khac"; // bạn cần gán thủ công hoặc mock

    await axios.delete(`${process.env.NEXT_PUBLIC_SERVER_URI}/api/v1/order/${someoneElsesOrderId}/cancel`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    throw new Error("Server không chặn hủy đơn của người khác");
  } catch (err) {
    if (err.response?.status === 403 && err.response?.data?.message === "You are not authorized to cancel this order") {
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
  const result = { name: "Test re-order", status: "Failed" };
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
    const doneOrder = apiOrders.find((order) => order.status === "done");
    if (!doneOrder) {
      console.log("⚠️ Không có đơn hàng nào ở trạng thái pending. Bỏ qua test.");
      result.status = "Skipped";
      return result;
    }

    const orderId = doneOrder._id;
    console.log("✅ Tìm thấy đơn hàng hoàn thành:", orderId);

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

        // Tìm và click nút "Đặt lại"
        const cancelBtn = await orderElement.findElement(By.xpath(".//span[text()='Đặt lại']"));
        await cancelBtn.click();
        matched = true;
        break;
      }
    }

    if (!matched) throw new Error("Không tìm thấy đơn hàng hoàn thành trên UI");

    // Xác nhận SweetAlert2
    const confirmButton = await driver.wait(until.elementLocated(By.css(".swal2-confirm")), 5000);
    await confirmButton.click();

    // Đợi toast "Đặt lại thành công"
    await driver.wait(until.elementLocated(By.css(".Toastify__toast--success")), 5000);

    console.log("✅ Đã hiện thông báo Toast thành công");

    result.status = "Passed";
    console.log("✅ Test passed: Đặt lại đơn hàng thành công");
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

    // Gọi API lấy danh sách đơn hàng DONE
    const apiOrders = await axios
      .get(`${process.env.NEXT_PUBLIC_SERVER_URI}/api/v1/order/`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => res.data.data);

    // Tìm đơn hàng có status DONE và store.status = BLOCK
    const blockedOrder = apiOrders.find((order) => order.status === "done" && order.store?.status === "BLOCK");

    if (!blockedOrder) {
      console.log("⚠️ Không có đơn hàng nào có store bị BLOCK. Bỏ qua test.");
      result.status = "Skipped";
      return result;
    }

    const orderId = blockedOrder._id;
    console.log("✅ Tìm thấy đơn hàng từ store bị BLOCK:", orderId);

    // Vào trang đơn hàng
    const orderBtn = await driver.findElement(By.name("orderBtn"));
    await orderBtn.click();
    await driver.sleep(3000);

    // Lấy tất cả order item hiện trên UI
    const ordersUI = await driver.findElements(By.css(".history-orders-container .order-item"));

    let matched = false;
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

    if (!matched) throw new Error("Không tìm thấy đơn hàng phù hợp trên UI");

    // Xác nhận SweetAlert2
    const confirmButton = await driver.wait(until.elementLocated(By.css(".swal2-confirm")), 5000);
    await confirmButton.click();

    // Kiểm tra xem có hiển thị thông báo lỗi không
    const errorToast = await driver.wait(until.elementLocated(By.css(".Toastify__toast--error")), 5000);

    const errorText = await errorToast.getText();
    if (!errorText.includes("cửa hàng không còn hoạt động") && !errorText.includes("BLOCK")) {
      throw new Error("Thông báo lỗi không đúng nội dung mong đợi");
    }

    console.log("✅ Hệ thống chặn đặt lại từ cửa hàng BLOCK thành công");

    result.status = "Passed";
  } catch (err) {
    console.error(`❌ ${result.name} Failed:`, err.message);
  } finally {
    await driver.quit();
  }

  return result;
}

module.exports = {
  testShowOrders,
  testShowOrdersNoData,
  testCancelPendingOrder,
  testCancelNonPendingOrderShowsErrorToast,
  testCancelNonExistingOrder,
  testCancelOtherUsersOrder,
};
