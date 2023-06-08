# Cardano Blockchain Explorer

<p align="left">
<img alt="Tests" src="https://github.com/cardano-foundation/cf-explorer-frontend/actions/workflows/tests.yaml/badge.svg" />
<img alt="Release" src="https://github.com/cardano-foundation/cf-explorer-frontend/actions/workflows/release.yaml/badge.svg" />
<img alt="Publish" src="https://github.com/cardano-foundation/cf-explorer-frontend/actions/workflows/publish.yaml/badge.svg" />
<a href="https://conventionalcommits.org"><img alt="conventionalcommits" src="https://img.shields.io/badge/Conventional%20Commits-1.0.0-%23FE5196?logo=conventionalcommits" /></a>
</p>

Cardano Blockchain Explorer showcases the utility of Cardano by providing descriptive and visual representation of the ledger. It presents the information both in a web application as well as through API services

### Prerequisites

In order to compile and run everything you will need:

- Node installed (^[v16.16.0](https://nodejs.org/en/blog/release/v16.16.0/) recommended)

## Install and Setup

Install the app with npm:

### `npm install`

Then copy file env.example and rename it to .env:

### Update Environment

Update `REACT_APP_MAINNET_API_URL`, `REACT_APP_PREPROD_API_URL`, `REACT_APP_TESTNET_API_URL`, `REACT_APP_PREVIEW_API_URL` with your api url for each network.

Update `REACT_APP_AUTH_API_URL` with your auth api url to support sign in and sign up feature.

Update `REACT_APP_JSD_WIDGET_KEY` with Jira Embedded Key to Add Jira Support Widget to Explorer.

## Start with localhost

Runs the app in the development mode.

### `npm start`

The application will run by default on port 3000. If you want to run the application on another port, please change the `PORT` in the .env file.

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Testing with Jest

This app uses `Jest` for Unit test.

To run your tests, execute the following command:

 - `npm run jest-test` to test all file `*.test.ts`.

 - `npm run jest-test-one [file_relative_path]` to test a file with `[file_relative_path]` being relative path of file. Ex: `npm run jest-test-one src\commons\utils\helper.test.ts`

## Build into production

### `npm run build`

Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!
