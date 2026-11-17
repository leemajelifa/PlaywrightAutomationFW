# Playwright + TypeScript Automation Framework

End-to-end test automation framework for an e-commerce site (OpenCart).

## Tech Stack
- Playwright, TypeScript, Node.js
- Allure and Playwright HTML reports
- Jenkins, GitHub Actions, Docker

## Features
- Page Object Model with custom fixtures
- Data-driven tests using CSV, JSON and Excel
- Multi-environment config (dev, QA, stage, UAT)
- API tests (CRUD) using an APIHelper class
- Login reuse with storageState (session saved by `auth.setup.ts`)
- Tagged tests (@sanity, @regression)

## Project Structure
- `src/api` - APIHelper class for API calls
- `src/fixtures` - custom fixtures that create the page objects
- `src/pages` - one class per page, plus a base class
- `src/testData` - CSV, JSON and Excel test data
- `src/utils` - utilities that read the data files
- `tests` - test files for each page, plus `auth.setup.ts`
- `config` - environment files for dev, QA, stage and UAT
- `playwright.config.ts` - workers, retries, trace, screenshots and projects
- `tsconfig.json` - TypeScript settings


## How to Run
- Run all tests: `set ENV=qa && npx playwright test`
- Run only tagged tests: `set ENV=qa && npx playwright test --grep @sanity`
- Open the report: `npx playwright show-report reports\html-report`

## CI and Docker
- **Jenkins:** the Jenkinsfile checks out the code, runs the tests and publishes the Allure and HTML reports.
- **GitHub Actions:** a workflow in `.github/workflows` runs the tests on push.
- **Docker:** tests can run in the Playwright image:
  `docker run --rm -v %cd%:/app -w /app -e CI=true mcr.microsoft.com/playwright:v1.64.0 npx playwright test --project=chromium`

