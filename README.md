# PropertyOps — Selenium E2E Suite (JavaScript)

This project is a **automation suite**:
> “Write tests and fix existing tests in the automated testing suite” 

It uses:
- `selenium-webdriver`
- `mocha` test runner
- Page Object Model (POM) structure
- Robust waits (no flaky `sleep` calls)

## Prerequisites
- Node 18+
- Google Chrome installed
- Chromedriver available 

## Install & run
```bash
cd property_ops_selenium_suite
npm install
# Make sure your API + UI are running:
# Rails API: http://localhost:3000
# React UI:  http://localhost:5173
npm test
```

## What it tests
- Tenant creation flow
- Unit creation flow
- Maintenance request creation + status update flow
- Payment recording flow

## Notes
- If your UI port differs, set:
  `BASE_URL=http://localhost:5173 npm test`
