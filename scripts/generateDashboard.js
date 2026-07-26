const fs = require("fs");
const path = require("path");

const dashboardDir = path.join(process.cwd(), "dashboard");
const playwrightReportPath = path.join(process.cwd(), "playwright-report", "results.json");
const cucumberReportPath = path.join(process.cwd(), "cucumber-report.html");

fs.mkdirSync(dashboardDir, { recursive: true });

let stats = {
  expected: 0,
  unexpected: 0,
  skipped: 0,
  duration: 0
};

if (fs.existsSync(playwrightReportPath)) {
  const report = JSON.parse(fs.readFileSync(playwrightReportPath, "utf8"));
  stats = report.stats || stats;
}

const cucumberReportAvailable = fs.existsSync(cucumberReportPath);

const dashboard = {
  status: stats.unexpected > 0 ? "FAILED" : "SUCCESS",
  passed: stats.expected,
  failed: stats.unexpected,
  skipped: stats.skipped,
  duration: (stats.duration / 1000).toFixed(2) + " sec",
  branch: process.env.GITHUB_REF_NAME || "local",
  run: process.env.GITHUB_RUN_NUMBER || "Local",
  cucumberReport: cucumberReportAvailable,
  cucumberReportPath: cucumberReportAvailable ? "./cucumber-report.html" : null
};

fs.writeFileSync(
  path.join(dashboardDir, "results.json"),
  JSON.stringify(dashboard, null, 2)
);

console.log("✅ Dashboard JSON generated successfully!");
console.log(dashboard);