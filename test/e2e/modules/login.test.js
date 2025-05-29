const { testLoginSucess } = require("../testcase/login/login.main.test");
const { testLoginFail1 } = require("../testcase/login/login.alter1.test");
const { testLoginFail2 } = require("../testcase/login/login.alter2.test");
const { testLoginFail3 } = require("../testcase/login/login.alter3.test");

async function runLoginTests() {
  console.log("\n▶▶▶ Running LOGIN Tests...\n");

  let results = [];
  const testCases = [testLoginSucess, testLoginFail1, testLoginFail2, testLoginFail3];

  for (let testCase of testCases) {
    console.log(`▶ Running test: ${testCase.name}`);
    const result = await testCase();
    results.push(result);
  }

  return { name: "LOGIN", testResults: results };
}

module.exports = { runLoginTests };
