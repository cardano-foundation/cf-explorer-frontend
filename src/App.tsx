import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { I18nextProvider } from "react-i18next";

import store from "./stores";
import Routers from "./Routers";
import AppContainer from "./AppContainer";
import { LANGUAGE } from "./commons/utils/constants";
import i18n from "./i18n";

const App: React.FC = () => {
  return (
    <I18nextProvider i18n={i18n} defaultNS={"translation"}>
      <Provider store={store}>
        <Router basename={LANGUAGE}>
          <AppContainer>
            <Routers />
          </AppContainer>
        </Router>
      </Provider>
    </I18nextProvider>
  );
};

export default App;
