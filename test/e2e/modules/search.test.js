const { test_1_1 } = require("../testcase/search/SearchByName/search.alter1.1.test");
const { test_1_2 } = require("../testcase/search/SearchByName/search.alter1.2.test");
const { test_1_3 } = require("../testcase/search/SearchByName/search.alter1.3.test");
const { test_1_4 } = require("../testcase/search/SearchByName/search.alter1.4.test");
const { test_1_5 } = require("../testcase/search/SearchByName/search.alter1.5.test");
const { test_1_6 } = require("../testcase/search/SearchByName/search.alter1.6.test");
const { test_1_7 } = require("../testcase/search/SearchByName/search.alter1.7.test");
const { test_1_8 } = require("../testcase/search/SearchByName/search.alter1.8.test");
const { test_1_9 } = require("../testcase/search/SearchByName/search.alter1.9.test");
const { test_1_10 } = require("../testcase/search/SearchByName/search.alter1.10.test");


const { test_2_1 } = require("../testcase/search/FilterCategory/filter-cateory.alter.2.1.test");
const { test_2_2 } = require("../testcase/search/FilterCategory/filter-cateory.alter.2.2.test");
const { test_2_3 } = require("../testcase/search/FilterCategory/filter-cateory.alter.2.3.test");
const { test_2_4 } = require("../testcase/search/FilterCategory/filter-cateory.alter.2.4.test");


const { test_3_1 } = require("../testcase/search/Mix/mix.alter.3.1.test");
const { test_3_2 } = require("../testcase/search/Mix/mix.alter.3.2.test");
const { test_3_3 } = require("../testcase/search/Mix/mix.alter.3.3.test");
const { test_3_4 } = require("../testcase/search/Mix/mix.alter.3.4.test");
const { test_3_5 } = require("../testcase/search/Mix/mix.alter.3.5.test");
const { test_3_6 } = require("../testcase/search/Mix/mix.alter.3.6.test");

const { test_4_1 } = require("../testcase/search/Abnormal/abnomal.alter.4.1.test");
const { test_4_2 } = require("../testcase/search/Abnormal/abnomal.alter.4.2.test");
const { test_4_3 } = require("../testcase/search/Abnormal/abnomal.alter.4.3.test");

async function runSearchTests() {
  console.log("\n▶▶▶ Running SEARCH Tests...\n");

  let results = [];
  const testCases = [test_2_4];

  for (let testCase of testCases) {
    console.log(`▶ Running test: ${testCase.name}`);
    const result = await testCase();
    results.push(result);
  }

  return { name: "SEARCH", testResults: results };
}

module.exports = { runSearchTests };

if (require.main === module) {
  runSearchTests()
    .then(result => {
      console.log("\nTest results:", result);
    })
    .catch(err => {
      console.error("Test run failed:", err);
    });
}
