const { testShowOrders, testShowOrdersNoData, testCancelPendingOrder } = require("../testcase/order/order.main.test");

async function runOrderTests() {
  console.log("\n▶▶▶ Running ORDER Tests...\n");

  let results = [];
  const testCases = [testCancelPendingOrder];

  for (let testCase of testCases) {
    console.log(`▶ Running test: ${testCase.name}`);
    const result = await testCase();
    results.push(result);
  }

  return { name: "ORDER", testResults: results };
}

runOrderTests();

module.exports = { runOrderTests };
