require("dotenv").config();
const { loginAndReturnDriver, By, until } = require("../../../utils/loginUtil");

async function testSubmitOrder() {
    let driver = await loginAndReturnDriver();
    let result = { name: "Adding dish and topping to Cart", status: "Failed" };

    let cart = []; // Store selected items

    try {
        // Find and click the store
        const storeCard = await driver.wait(
            until.elementLocated(By.xpath("//h4[text()='Tasty Bites']")),
            5000
        );
        await storeCard.click();
        console.log("✅ Clicked 'Tasty Bites' store");

        // Wait for the restaurant page to load
        await driver.wait(until.urlContains("/restaurant/"), 5000);
        console.log("✅ Redirected to restaurant page");
        

        const dishCards = await driver.findElements(By.name("bigDishCard"));

        for (let i = 0; i < dishCards.length; i++) {
            let dish = {};

            // Re-fetch dishCards every loop iteration
            const updatedDishCards = await driver.findElements(By.name("bigDishCard"));
            const dishCard = updatedDishCards[i];

            // Scroll into view (optional, if dishCard is out of viewport)
            await driver.executeScript("arguments[0].scrollIntoView(true);", dishCard);

            // Click on the dish
            await dishCard.click();
            console.log(`✅ Clicked dish ${i + 1}`);

            // Wait for dish page
            await driver.wait(until.urlMatches(/\/restaurant\/[a-f0-9]{24}\/dish\/[a-f0-9]{24}$/), 5000);
            console.log("✅ Redirected to dish page");

            await driver.sleep(5000);

            // Locate dish name
            const dishNameElement = await driver.wait(until.elementLocated(By.name("dishName")), 5000);
            dish.dishName = await dishNameElement.getText();

            // Locate toppings (if available)
            const toppingElements = await driver.findElements(By.name("checkedBtn"));

            // add 1 product
            const increaseBtn = await driver.wait(
                until.elementLocated(By.name("increaseQuantityBtn")),
                5000
            );

            await driver.executeScript("arguments[0].scrollIntoView({block: 'center'});", increaseBtn);
            await driver.sleep(500);

            await increaseBtn.click();

            await driver.sleep(1000);
            const dishQuantity = await driver.wait(
                until.elementLocated(By.name("quantity")),
                5000
            );
            
            await driver.wait(until.elementIsVisible(dishQuantity), 5000);
            
            dish.quantity = parseInt(await dishQuantity.getAttribute("value"), 10);

            dish.topping = [];

            for (let toppingElement of toppingElements) {

                await driver.executeScript("arguments[0].scrollIntoView(true);", toppingElement);

                const imageElement = await toppingElement.findElement(By.tagName("img"));
                const imageClass = await imageElement.getAttribute("class");

                if (imageClass.includes("unchecked")) {
                    console.log("🔹 Topping is unchecked, clicking to select...");
                    await toppingElement.click();
                    await driver.sleep(500); // Allow UI update
                } else {
                    console.log("✅ Topping is already checked, skipping click.");
                }
                const toppingTextElement = await toppingElement.findElement(By.name("toppingName"));


                const toppingText = await toppingTextElement.getText();

                const totalPriceElement = await driver.wait(until.elementLocated(By.name("totalPrice")), 5000);
                let totalPriceText = await totalPriceElement.getText();

                dish.totalPrice = parseInt(totalPriceText.replace(/\D/g, ""), 10);

                dish.topping.push(toppingText);
            }

            // Click 'Add to Cart' button
            const addToCartBtn = await driver.wait(until.elementLocated(By.name("addCartBtn")), 5000);
            await addToCartBtn.click();
            console.log("✅ Added dish to cart");

            // Store selected dish in cart (without individual price, only total)
            cart.push(dish);

            await driver.sleep(1000);

            // Navigate back to restaurant page
            await driver.navigate().back();
            await driver.wait(until.urlContains("/restaurant/"), 5000);
        }
        await driver.sleep(1000);

        // Navigate to Cart
        const cartDetailBtn = await driver.wait(
            until.elementLocated(By.name("cartDetailBtn")),
            5000
        );
        await cartDetailBtn.click();
        console.log("✅ Navigated to Cart detail");

        await driver.wait(until.urlMatches(/\/restaurant\/[a-f0-9]{24}\/cart\/[a-f0-9]{24}$/), 5000);
        console.log("✅ Redirected to cart detail page");
        await driver.sleep(1000);
        // Verify items in the cart
        const cartItemsElements = await driver.findElements(By.name("cartItems"));
        let cartInUI = [];

        for (let i = 0; i < cartItemsElements.length; i++) {
            let cartDish = {};

            // Re-fetch elements in each iteration to avoid stale element issues
            const updatedCartItems = await driver.findElements(By.name("cartItems"));
            const cartItemElement = updatedCartItems[i];

            // Dish name
            const cartDishNameElement = await cartItemElement.findElement(By.name("dishName"));
            cartDish.dishName = await cartDishNameElement.getText();

            const CartDishQuantity = await driver.wait(
                until.elementLocated(By.name("quantity")),
                5000
            );

            cartDish.quantity = parseInt(await CartDishQuantity.getText(), 10)

            // Check for toppings
            const toppingElements = await cartItemElement.findElements(By.name("toppingName"));
            cartDish.topping = [];
            for (let toppingElement of toppingElements) {
                cartDish.topping.push(await toppingElement.getText());
            }

            // Total price (only total price is needed in cart)
            const cartTotalPriceElement = await cartItemElement.findElement(By.name("price"));
            const cartTotalPriceText = await cartTotalPriceElement.getText();
            cartDish.totalPrice = parseInt(cartTotalPriceText.replace(/\./g, ""), 10);
            cartInUI.push(cartDish);
        }

        // 🔹 **Comparison Logic**
        if (compareCarts(cart, cartInUI)) {
            console.log("✅ Cart matches UI correctly!");
        } else {
            console.error("❌ Cart mismatch detected!");
            console.log("📌 Expected Cart:", JSON.stringify(cart, null, 2));
            console.log("📌 Actual Cart in UI:", JSON.stringify(cartInUI, null, 2));
        }

        await driver.wait(until.urlMatches(/\/restaurant\/[a-f0-9]{24}\/cart\/[a-f0-9]{24}$/), 5000);
        console.log("✅ Still on cart detail page");

        const deliveryAddress = driver.findElement(By.name("deliveryAddress"));
        deliveryAddress.sendKeys("123")

        const completeCartBtn = await driver.findElement(By.name("completeCartBtn"));
        await completeCartBtn.click();
        console.log("✅ Submit the cart");

        await driver.wait(until.urlMatches(/\/home$/), 5000);
        console.log("✅ Redirected homepage");


        await driver.sleep(10000); // wait for the toat to disapear

        const orderLink = await driver.wait(
            until.elementLocated(By.xpath("//a[@href='/orders']")),
            5000
        );
        await orderLink.click();
        console.log("✅ Clicked order link");

        await driver.wait(until.urlMatches(/\/orders$/), 5000);
        console.log("✅ Redirected to orders page");


        const orderItems = await driver.findElements(By.name("orderItem"));
        if (orderItems.length === 0) {
            console.error("❌ No orders found!");
            return;
        }

        const detailBtn = await orderItems[0].findElement(By.name("detailBtn"));
        await detailBtn.click();
        await driver.wait(until.urlMatches(/\/orders\/order\/[a-f0-9]{24}$/), 5000);

        console.log("✅ Redirected to latest order detail");

        const orderItemsElements = await driver.findElements(By.name("cartItems"));
        let orderInUI = [];

        for (let i = 0; i < orderItemsElements.length; i++) {
            let orderDish = {};

            const updateOrderItems = await driver.findElements(By.name("cartItems"));
            const cartItemElement = updateOrderItems[i];

            const cartDishNameElement = await cartItemElement.findElement(By.name("dishName"));
            orderDish.dishName = await cartDishNameElement.getText();

            const dishQuantity = await driver.wait(
                until.elementLocated(By.name("quantity")),
                5000
            );
            orderDish.quantity = parseInt(await dishQuantity.getText())

            const toppingElements = await cartItemElement.findElements(By.name("toppingName"));
            orderDish.topping = [];
            for (let toppingElement of toppingElements) {
                orderDish.topping.push(await toppingElement.getText());
            }

            const cartTotalPriceElement = await cartItemElement.findElement(By.name("price"));
            const toatlPriceText = await cartTotalPriceElement.getText()
            orderDish.totalPrice = parseInt(toatlPriceText.replace(/\D/g, "").replace(/\./g, ""), 10);

            orderInUI.push(orderDish);
        }

        if (compareCarts(orderInUI, cartInUI)) {
            console.log("✅ Order matches UI correctly!");
            result.status = "Passed";
        } else {
            console.error("❌ Order mismatch detected!");
            console.log("📌 Expected Order:", JSON.stringify(cartInUI, null, 2));
            console.log("📌 Actual Order in UI:", JSON.stringify(orderInUI, null, 2));
        }
    } catch (error) {
        console.error(`❌ ${result.name} Failed:`, error);
    } finally {
        await driver.quit();
    }

    return result;
}

// 🔹 **Helper Function to Compare Carts**
function compareCarts(cart1, cart2) {
    if (cart1.length !== cart2.length) return false;

    // Sort both arrays before comparison
    const sortedCart1 = cart1.map(item => ({
        dishName: item.dishName,
        topping: item.topping.sort(),
        totalPrice: item.totalPrice
    })).sort((a, b) => a.dishName.localeCompare(b.dishName));

    const sortedCart2 = cart2.map(item => ({
        dishName: item.dishName,
        topping: item.topping.sort(),
        totalPrice: item.totalPrice
    })).sort((a, b) => a.dishName.localeCompare(b.dishName));

    return JSON.stringify(sortedCart1) === JSON.stringify(sortedCart2);
}

module.exports = { testSubmitOrder };
