const {
  testShowOrders,
  testShowOrdersNoData,
  testCancelPendingOrder,
  testCancelNonPendingOrder,
  testCancelNonExistingOrder,
  testCancelOtherUsersOrder,
  testReOrder,
  testReOrderBlockedStore,
  testReOrderWithEmptyItem,
  testReOrderWithOutOfStockDish,
  testDisplayCorrectRatingPage,
  testNoStarSelected,
  testNoCommentEntered,
  testSuccessfulRating,
  testRatingNonExistentOrder,
} = require("../testcase/order/order.main.test");

async function runOrderTests() {
  console.log("\n▶▶▶ Running ORDER Tests...\n");

  let results = [];
  const testCases = [testRatingNonExistentOrder];

  for (let testCase of testCases) {
    console.log(`▶ Running test: ${testCase.name}`);
    const result = await testCase();
    results.push(result);
  }

  return { name: "ORDER", testResults: results };
}

runOrderTests();

module.exports = { runOrderTests };
