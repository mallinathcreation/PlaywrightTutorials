# 🚀 Playwright Automation Framework

A modern **Playwright Automation Framework** built using **JavaScript** with **GitHub Actions CI/CD**, **GitHub Pages Dashboard**, **Playwright HTML Report**, and **Allure Reporting**.

This project demonstrates how an enterprise-style QA automation framework can automatically execute tests, generate reports, and publish a live dashboard after every code change.

---

## 🌐 Live Demo

### 📊 Automation Dashboard

https://mallinathcreation.github.io/PlaywrightTutorials/

### ⚙️ GitHub Actions

https://github.com/mallinathcreation/PlaywrightTutorials/actions

### 💻 Repository

https://github.com/mallinathcreation/PlaywrightTutorials

---

## 📖 Project Overview

This framework demonstrates a complete UI automation solution using Playwright with Continuous Integration and automated reporting.

### Features

- ✅ Playwright Test Automation
- ✅ JavaScript
- ✅ Page Object Model (POM)
- ✅ Cross-browser ready
- ✅ GitHub Actions CI/CD
- ✅ Scheduled Daily Execution
- ✅ GitHub Pages Dashboard
- ✅ Playwright HTML Report
- ✅ Allure Report
- ✅ JSON Dashboard Generation
- ✅ Screenshot on Failure
- ✅ Trace Collection
- ✅ Retry Support

---

# 📊 Dashboard

The framework automatically publishes a live dashboard after every execution.

Dashboard includes:

- Test Status
- Passed Tests
- Failed Tests
- Skipped Tests
- Execution Duration
- Branch Name
- GitHub Run Number
- Success Rate
- Progress Bar

Dashboard URL

https://mallinathcreation.github.io/PlaywrightTutorials/

---

# ⚙️ CI/CD Workflow

Every Push or Pull Request automatically triggers GitHub Actions.

```text
Developer Push
       │
       ▼
GitHub Actions
       │
       ▼
Install Dependencies
       │
       ▼
Install Playwright Browsers
       │
       ▼
Execute Playwright Tests
       │
       ▼
Generate Playwright Report
       │
       ▼
Generate Allure Report
       │
       ▼
Generate Dashboard JSON
       │
       ▼
Deploy Dashboard to GitHub Pages
```

---

# 📂 Project Structure

```text
PlaywrightTutorials
│
├── .github
│   └── workflows
│       └── playwright.yml
│
├── dashboard
│   ├── index.html
│   ├── style.css
│   ├── app.js
│   └── results.json
│
├── pages
│
├── tests
│
├── utils
│
├── scripts
│   └── generateDashboard.js
│
├── playwright.config.js
├── package.json
└── README.md
```

---

# 📑 Reports

| Report | Description |
|---------|-------------|
| 📊 Dashboard | Live execution dashboard |
| 📄 Playwright HTML Report | Detailed Playwright report |
| 📈 Allure Report | Interactive Allure report |

---

# 🛠 Tech Stack

- Playwright
- JavaScript
- Node.js
- HTML
- CSS
- GitHub Actions
- GitHub Pages
- Allure Report

---

# ▶️ Installation

Clone the repository

```bash
git clone https://github.com/mallinathcreation/PlaywrightTutorials.git
```

Install dependencies

```bash
npm install
```

Install Playwright browsers

```bash
npx playwright install
```

---

# ▶️ Execute Tests

Run complete regression

```bash
npm run regression
```

Run only Web tests

```bash
npm run webTest
```

Run only API tests

```bash
npm run apiTest
```

---

# 📄 View Reports

Playwright HTML Report

```bash
npx playwright show-report
```

Generate Allure Report locally

```bash
npx allure generate allure-results --clean -o allure-report
```

Open Allure Report

```bash
npx allure open allure-report
```

---

# 🚀 GitHub Actions

The workflow automatically executes on:

- Push to main
- Pull Request to main
- Daily scheduled execution

Workflow performs:

- Install dependencies
- Install browsers
- Execute Playwright tests
- Generate Playwright HTML Report
- Generate Allure Report
- Generate Dashboard JSON
- Publish GitHub Pages

---

# 🎯 Framework Highlights

✔ Modern Playwright Framework
✔ GitHub Actions CI/CD
✔ Live Dashboard
✔ HTML Report
✔ Allure Report
✔ Automatic Deployment
✔ Professional Reporting
✔ Enterprise-ready Structure

---

# 🚀 Future Enhancements

- Docker Integration
- Azure DevOps Pipeline
- Browser Matrix Execution
- Email Notifications
- Slack Notifications
- Historical Dashboard
- Trend Charts
- Test Analytics

---

# 👨‍💻 Author

**Mallinath Basu**

GitHub

https://github.com/mallinathcreation

LinkedIn

https://www.linkedin.com/in/mallinathbasu/

---

# ⭐ Support

If you found this project useful, consider giving it a ⭐ on GitHub.
It helps others discover the project and motivates further improvements.

---