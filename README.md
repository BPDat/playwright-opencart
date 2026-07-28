# OpenCart Playwright Automation

This repository contains end-to-end UI automation for the OpenCart shopping cart application using Playwright Test and the Page Object Model (POM).

The suite covers the core customer flows in OpenCart:

- User registration
- User login and logout
- Product search
- Add to cart and shopping cart verification
- Data-driven login scenarios
- A full end-to-end flow from registration to cart validation

## Tech Stack

- Playwright Test
- TypeScript
- Page Object Model
- Faker for dynamic test data
- JSON/CSV data providers
- HTML report and Allure report support

## Project Structure

- `tests/` - test specs and tagged suites
- `pages/` - page objects for OpenCart screens
- `utils/` - data helpers and random data generators
- `data/` - test data files
- `playwright.config.ts` - Playwright runner configuration
- `test.config.ts` - application URL and shared test constants
- `playwright-report/` - Playwright HTML report output
- `allure-results/` - raw Allure result files
- `allure-report/` - generated Allure report

## Requirements

- Node.js 18 or later
- npm
- A local OpenCart installation available at the configured URL

The current test configuration points to:

```text
http://localhost/opencart/upload/
```

If your OpenCart installation uses a different URL, update `appUrl` in `test.config.ts`.

## Installation

Install dependencies:

```bash
npm install
```

Install Playwright browsers if needed:

```bash
npx playwright install
```

## Running Tests

Run the full suite:

```bash
npm test
```

Run tests in headed mode:

```bash
npm run test:headed
```

Run only master scenarios:

```bash
npm run test:master
```

Run only sanity scenarios:

```bash
npm run test:sanity
```

Run only regression scenarios:

```bash
npm run test:regression
```

Run only data-driven login scenarios:

```bash
npm run test:datadriven
```

Run data-driven login in headed mode:

```bash
npm run test:datadriven:headed
```

Run master scenarios in headed mode:

```bash
npm run test:master:headed
```

Debug sanity tests:

```bash
npm run test:sanity:debug
```

## Test Tags

The suite uses tags to group execution:

- `@master`
- `@sanity`
- `@regression`
- `@datadriven`
- `@end-to-end`

Examples:

```bash
npx playwright test --grep @master
npx playwright test --grep @datadriven
```

## Reports

Playwright is configured to generate an HTML report and Allure results.

- HTML report: open `playwright-report/index.html`
- Allure raw output: `allure-results/`
- Allure report: `allure-report/`

If you already have Allure CLI installed, generate the report with:

```bash
allure generate allure-results --clean -o allure-report
allure open allure-report
```

## Test Data

Shared test constants live in `test.config.ts`.

- `appUrl` - OpenCart base URL
- `email` and `password` - sample credentials for login/logout flows
- `productName`, `productQuantity`, and `totalPrice` - values used in cart validation

Data-driven login scenarios are stored in `data/logindata.json`.

## Notes

- The automation follows the Page Object Model to keep locators and flows reusable.
- Some flows create random user data with Faker, so registration tests can be re-run without hardcoded identities.
- If the OpenCart site or test data changes, update `test.config.ts`, `data/`, and the relevant page objects together.
