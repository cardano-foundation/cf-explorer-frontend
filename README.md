# Cardano Blockchain Explorer

<p align="left">
<img alt="Tests" src="https://github.com/cardano-foundation/cf-explorer-frontend/actions/workflows/tests.yaml/badge.svg" />
<img alt="Release" src="https://github.com/cardano-foundation/cf-explorer-frontend/actions/workflows/release.yaml/badge.svg" />
<img alt="Publish" src="https://github.com/cardano-foundation/cf-explorer-frontend/actions/workflows/publish.yaml/badge.svg" />
<a href="https://conventionalcommits.org"><img alt="conventionalcommits" src="https://img.shields.io/badge/Conventional%20Commits-1.0.0-%23FE5196?logo=conventionalcommits" /></a>
</p>

Cardano Blockchain Explorer showcases the utility of Cardano by providing descriptive and visual representation of the ledger. It presents the information both in a web application as well as through API services

## Prerequisites

In order to compile and run everything you will need:

- Node version: ^v14.19.0  ([^v16.16.0](https://nodejs.org/en/blog/release/v16.16.0/) recommended)
- npm: ^6.14.17

## Install and run

Install the app with npm (it's work well with `yarn` but we using npm in here):

**Step 1**: install packages
Open terminal and run commad: `npm install`

Then copy file env.example and rename it to .env:

### Update Environment

Update `REACT_APP_API_URL` with your api url.

Update `REACT_APP_AUTH_API_URL` with your auth api url to support sign in and sign up feature.

Update `REACT_APP_JSD_WIDGET_KEY` with Jira Embedded Key to Add Jira Support Widget to Explorer.

**Step 2**: create .env file
In the terminal run command: `cp .env.example .env`

**Step 3** update env variables
> Update value to **your** API

For example: 
`REACT_APP_API_URL=http://localhost:3001`

> Update Application URL reference

> Update Application network reference

`REACT_APP_NETWORK = mainnet`

> Update API URL for authentication service

`REACT_APP_AUTH_API_URL=http://localhost:3005`


**Step 4** run on localhost

Runs the app in the development mode.
Open terminal and run command: `npm start`

The application will run by default on port 3000. If you want to run the application on another port, please change the `PORT` in the .env file.

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Testing with Jest

This app uses `Jest` for Unit test.

To run your tests, execute the following command:

 - `npm run jest-test` to test all file `*.test.ts`.

 - `npm run jest-test-one [file_relative_path]` to test a file with `[file_relative_path]` being relative path of file. Ex: `npm run jest-test-one src\commons\utils\helper.test.ts`

## E2e test with Cypress
This app we use `Cypress` for e2e testing.

You can run it with following commands:

Open Launchpad:
Run `npm run cypress:open` to open Cypress launchpad.

On opening Cypress, your testing journey begins with the Launchpad. Its job is to guide you through the decisions and configuration tasks you need to complete before you start writing your first test.


To run e2e test with all specs, try this command:
`npm run cypress:run`



## Build into production

Execute  `npm run build`

Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!
