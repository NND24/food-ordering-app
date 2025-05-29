const { testAddingCart } = require("../testcase/cart/cart.addItems.main.test");
const { testAddingCartNoLogin } = require("../testcase/cart/cart.addItems.alter.test");

async function runCartTests() {
  console.log("\n▶▶▶ Running CART Tests...\n");

  let results = [];
  const testCases = [testAddingCart, testAddingCartNoLogin];

  for (let testCase of testCases) {
    console.log(`▶ Running test: ${testCase.name}`);
    const result = await testCase();
    results.push(result);
  }

  return { name: "CART", testResults: results };
}


module.exports = { runCartTests };
