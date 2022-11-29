import React from "react";
import "antd/dist/antd.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Web3Provider } from "@ethersproject/providers";
import { Web3ReactProvider } from "@web3-react/core";
import { ethers } from "ethers";
import { BrowserRouter as Router } from "react-router-dom";
import AppContainer from "./AppContainer";
import { Provider } from "react-redux";
import store from "./stores";
import Routers from "./Routers";

export const getLibrary = (provider: any): Web3Provider => {
  const library = new ethers.providers.Web3Provider(provider, "any");
  library.pollingInterval = 10000;
  return library;
};

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Web3ReactProvider getLibrary={getLibrary}>
        <Router>
          <AppContainer>
            <Routers />
          </AppContainer>
        </Router>
      </Web3ReactProvider>
    </Provider>
  );
};

export default App;
