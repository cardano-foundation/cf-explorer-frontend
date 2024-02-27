# Explorer Frontend

<p align="left">
<img alt="Tests" src="https://github.com/cardano-foundation/cf-explorer-frontend/actions/workflows/tests.yaml/badge.svg" />
<img alt="Release" src="https://github.com/cardano-foundation/cf-explorer-frontend/actions/workflows/release.yaml/badge.svg" />
<img alt="Publish" src="https://github.com/cardano-foundation/cf-explorer-frontend/actions/workflows/publish.yaml/badge.svg" />
<a href="https://conventionalcommits.org"><img alt="conventionalcommits" src="https://img.shields.io/badge/Conventional%20Commits-1.0.0-%23FE5196?logo=conventionalcommits" /></a>
</p>

This repository houses the frontend component of Explorer. Developed with TypeScript, React.js, and mui, it showcases a
user-friendly interface that presents the Cardano blockchain data collected and aggregated by LedgerSync.

👉 Check the [Explorer repository](https://github.com/cardano-foundation/cf-explorer) to understand how the microservices
work together

## Prerequisites

In order to build and run everything you will need:

- Node version: ^v14.19.0  ([^v16.16.0](https://nodejs.org/en/blog/release/v16.16.0/) recommended)
- npm: ^6.14.17

## Install and run

Install the app with npm (it's work well with `yarn` but we using npm in here):

**Step 1**: Install packages
Open terminal and run commad: `npm install`

**Step 2**: Create .env file from .env.example
In the terminal run command: `cp .env.example .env`

**Step 3** Update env variables:

- Update port for application.
  > Example: `PORT=3000`

- Update API URL for explorer service.
  > Example: `REACT_APP_API_URL=http://localhost:8080`

- Update WebSocket URL for real-time expolorer service.
  > Example: `REACT_APP_WS_URL=ws://localhost:8080/ws`

- Update API URL for authentication service.
  > Example: `REACT_APP_AUTH_API_URL=http://localhost:8081`

- Update APP URL for other network. Example:
    ```
    REACT_APP_TESTNET_APP_URL=http://localhost:3000
    REACT_APP_PREVIEW_APP_URL=http://localhost:3001
    REACT_APP_PREPROD_APP_URL=http://localhost:3002
    REACT_APP_MAINNET_APP_URL=http://localhost:3003
    ```

- Update Jira Embedded Key to Add Jira Support Widget to explorer
  > Example: `REACT_APP_JSD_WIDGET_KEY=xxx`

- Update link to the cardano price
  > Example: `REACT_APP_EXT_ADA_PRICE_URL=https://www.coingecko.com/en/coins/cardano`

- Update link to the cardano news
  > Example: `REACT_APP_CARDANO_NEWS_URL=https://cardanofoundation.org/en/news`

- Update application network (`mainnet`, `preprod` or `preview`)
  > Example: `REACT_APP_NETWORK=mainnet`

- Configure supported network names (`mainnet`, `preprod` or `preview`)
  > Example: `REACT_APP_NETWORK_NAMES="{"mainnet":"Mainnet","preprod":"Preprod", ...}"`

**Step 4** Run on localhost

Runs the app in the development mode.
Open terminal and run command: `npm start`

The application will run by default on port 3000. If you want to run the application on another port, please change
the `PORT` in the .env file.

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Testing with Jest

This app uses `Jest` for Unit test.

To run your tests, execute the following command:

- `npm run jest-test` to test all file `*.test.ts`.

- `npm run jest-test-one [file_relative_path]` to test a file with `[file_relative_path]` being relative path of file.
  Ex: `npm run jest-test-one src\commons\utils\helper.test.ts`

## Web automation test with Playwright

### Pre-installed on local:

- [allure commandline](https://docs.qameta.io/allure-report/#_installing_a_commandline)
- npm and node js
- add .env to root folder with APPLICATION_URL property pointing to chosen environment e.g.

```
APPLICATION_URL=https://beta.explorer.cardano.org/en
API_URL=<url>
USERNAME=<login>
PASSWORD=<password>
# in what mode playwright should run the browser, by default true
HEADLESS= true or false 
```

### Test run in local:

1. Install all packages locally

```
npm install
```

2. Install browsers

```
npx playwright install
```

3. Run tests for chosen project e.g.

```
npm run chrome
```

or

```
npm run firefox
```

---

### Test run with allure report

1. Run tests in root folder

```
ALLURE_RESULTS_DIR=.reports/chrome/allure-results npx playwright test --project='chrome'
```

- there is also shorter command from package.json scripts to run all tests

```
npm run chrome
```

- to run specific feature test indicate full path to feature file

```
npm run chrome playwright/tests/features/sing-up.feature
```

- to run specific scenario for a feature add tag **@only** to the scenario and generate test changes:

```
npx bddgen
npm run chrome playwright/tests/features/sing-up.feature
```

- more examples and documentation [here](https://vitalets.github.io/playwright-bdd/#/installation)

2. Generate report

```
allure generate .reports/chrome/allure-results -o .reports/chrome/allure-report --clean
```

3. Open report

```
allure open .reports/chrome/allure-report
```

## Build into production

Execute  `npm run build`

Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!
