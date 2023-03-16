# Discover Cardano

Discover Cardano is a front face application for Ledger Sync which has been build for showcasing various Cardano Blockchain functions like DID, Supply Chain, Explorer etc. It is a regulatory reporting system which non-blockchain users can simply generate reports using Cardano functions.

### Prerequisites

In order to compile and run everything you will need:

- Node installed (^[v16.16.0](https://nodejs.org/en/blog/release/v16.16.0/) recommended)


## Install and Setup

Install the app with npm:

### `npm install`

Then copy file env.production.example and rename it to .env:

### Update `API_URL` and `AUTH_API_URL`

Update API_URL with your Api url and AUTH_API_URL with your auth Api url.

## Start with localhost

Runs the app in the development mode.

### `npm start`

The application will run by default on port 3000. If you want to run the application on another port, please change the PORT in the .env file.

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Build into production

### `npm run build`

Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!