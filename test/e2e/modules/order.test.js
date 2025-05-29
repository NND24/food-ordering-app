const { testSubmitOrder } = require("../testcase/order/order.main.test");

async function runOrderTests() {
    console.log("\n▶▶▶ Running CART Tests...\n");

    let results = [];
    const testCases = [testSubmitOrder];

    for (let testCase of testCases) {
        console.log(`▶ Running test: ${testCase.name}`);
        const result = await testCase();
        results.push(result);
    }

    return { name: "CART", testResults: results };
}


module.exports = { runOrderTests };
