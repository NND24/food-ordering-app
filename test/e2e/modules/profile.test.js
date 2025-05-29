const { testAdjustProfile } = require("../testcase/profile/profile.main.test");
const { testEmptyProfileSubmission } = require("../testcase/profile/profile.alt.test");
async function runProfileTests() {
  console.log("\n▶▶▶ Running PROFILE Tests...\n");

  let results = [];
  const testCases = [testAdjustProfile, testEmptyProfileSubmission];

  for (let testCase of testCases) {
    console.log(`▶ Running test: ${testCase.name}`);
    const result = await testCase();
    results.push(result);
  }

  return { name: "PROFILE", testResults: results };
}


module.exports = { runProfileTests };
