require("dotenv").config();
const axios = require("axios");
const { runLoginTests } = require("./modules/login.test");
const { runForgotPasswordTests } = require("./modules/forgotPassword.test");
const { runCartTests } = require("./modules/cart.test");
const { runOrderTests } = require("./modules/order.test");
const { runProfileTests } = require("./modules/profile.test");

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URI || "http://localhost:5000";

async function isServerRunning() {
  try {
    const response = await axios.get(`${SERVER_URL}/health`, { timeout: 5000 });
    return response.status === 200;
  } catch (error) {
    console.error(`🚨 API Server is NOT running at ${SERVER_URL}`);
    return false;
  }
}

async function runTests() {
  console.log("\n🔍 Checking API Server...\n");

  if (!(await isServerRunning())) {
    console.log("❌ Server is down. Tests cannot proceed.");
    process.exit(1);
  }

  console.log("✅ Server is running. Proceeding with tests...\n");

  let groupResults = [];
  let testGroups = [
    // runLoginTests,
    // runForgotPasswordTests,
    // runCartTests,
    runOrderTests,
    // runProfileTests
  ];
  console.log("\n🔍 Running E2E Tests...\n");

  for (let testGroup of testGroups) {
    let result = await testGroup();
    groupResults.push(result);
  }

  console.log("\n\n📊 TEST SUMMARY:");
  let totalFailed = 0;

  for (let testResult of groupResults) {
    console.log(`▶▶▶▶ Result test group: ${testResult.name}`);
    let passed = testResult.testResults.filter((r) => r.status === "Passed").length;
    let failed = testResult.testResults.length - passed;
    totalFailed += failed;

    console.log(`✅ Passed: ${passed}`);
    console.log(`❌ Failed: ${failed}`);
  }

  if (totalFailed > 0) {
    console.log("\n❌ Some tests failed. Please check the logs.");
    process.exit(1);
  } else {
    console.log("\n🎉 All tests passed successfully!");
    process.exit(0);
  }
}

// Run all tests
runTests();
