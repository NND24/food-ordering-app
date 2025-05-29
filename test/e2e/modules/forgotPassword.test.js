const { testForgotPasswordFlow } = require("../testcase/forgot_password/forgot.password.main.test");
const { testForgotPasswordWrongEmail } = require("../testcase/forgot_password/forgot.password.alter1.test");
const { testForgotPasswordExpireOTP } = require("../testcase/forgot_password/forgot.password.alter2.test");
const { testForgotPasswordWrongOTP } = require("../testcase/forgot_password/forgot.password.alter3.test");

async function runForgotPasswordTests() {
  console.log("\n▶▶▶ Running FORGOT PASSWORD Tests...\n");

  let results = [];
  const testCases = [
    testForgotPasswordFlow,
    testForgotPasswordWrongEmail,
    testForgotPasswordExpireOTP,
    testForgotPasswordWrongOTP,
  ];

  for (let testCase of testCases) {
    console.log(`▶ Running test: ${testCase.name}`);
    const result = await testCase();
    results.push(result);
  }

  return { name: "FORGOT_PASSWORD", testResults: results };
}


module.exports = { runForgotPasswordTests };
