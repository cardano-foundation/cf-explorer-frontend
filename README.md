# Cardano Explorer

Current Caradno Ledger is working under performance the main goal of the project is to build the solution & architecture for ledger synchronization with fast speed following the technology to enhance communication between nodes. In addition, the system should be capable of extension to further development in the future, as well as to adding third parties service to the existing system.

### Prerequisites

In order to compile and run everything you will need:

- Node installed (^[v16.16.0](https://nodejs.org/en/blog/release/v16.16.0/) recommended)


## Install and Setup

Install the app with yarn (recommended) or npm:

### `yarn install`
or
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

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
