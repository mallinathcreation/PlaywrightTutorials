const fs = require("fs");

// Read Playwright JSON report
const report = JSON.parse(
  fs.readFileSync("playwright-report/results.json", "utf8")
);

const stats = report.stats;

const dashboard = {
  status: stats.unexpected > 0 ? "FAILED" : "SUCCESS",
  passed: stats.expected,
  failed: stats.unexpected,
  skipped: stats.skipped,
  duration: (stats.duration / 1000).toFixed(2) + " sec",
  branch: process.env.GITHUB_REF_NAME || "local",
  run: process.env.GITHUB_RUN_NUMBER || "Local"
};

// Write dashboard JSON
fs.writeFileSync(
  "dashboard/results.json",
  JSON.stringify(dashboard, null, 2)
);

console.log("✅ Dashboard JSON generated successfully!");
console.log(dashboard);