const axios = require("axios");
const { testLoginSucess } = require("./testcase/login.success.test");
const { testLoginFail } = require("./testcase/login.fail.test");
const { testRedirectCart } = require("./testcase/redirect.cart.test");
const { testRedirectOrder } = require("./testcase/redirect.order.test");
const { testRedirectAccount } = require("./testcase/redirect.user.test");


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
    try {
        console.log("\n🔍 Checking API Server...\n");

        if (!(await isServerRunning())) {
            console.log("❌ Server is down. Tests cannot proceed.");
            process.exit(1); // Exit with failure code
        }

        console.log("✅ Server is running. Proceeding with tests...\n");

        const testCases = [testLoginSucess, testLoginFail, testRedirectAccount, testRedirectCart, testRedirectOrder];
        let results = [];

        console.log("\n🔍 Running E2E Tests...\n");
        for (let testCase of testCases) {
            console.log(`▶ Running test: ${testCase.name}`);
            const result = await testCase();
            results.push(result);
            console.log(`📌 ${result.name}: ${result.status}`);
        }

        console.log("\n📊 TEST SUMMARY:");
        let passed = results.filter(r => r.status === "Passed").length;
        let failed = results.length - passed;

        console.log(`✅ Passed: ${passed}`);
        console.log(`❌ Failed: ${failed}`);

        if (failed > 0) {
            console.log("\n❌ Some tests failed. Please check the logs.");
            process.exit(1);
        } else {
            console.log("\n🎉 All tests passed successfully!");
            process.exit(0);
        }
    }
    catch (error) {
        console.log(error)
    }

}

// Run all tests
runTests();
