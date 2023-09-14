import React from "react";
import { I18nextProvider } from "react-i18next";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

import AppContainer from "./AppContainer";
import Routers from "./Routers";
import i18n from "./i18n";
import store from "./stores";

const App: React.FC = () => {
  const lang = localStorage.getItem("lang") || "en";
  return (
    <I18nextProvider i18n={i18n} defaultNS={"translation"}>
      <Provider store={store}>
        <Router basename={lang}>
          <AppContainer>
            <Routers />
          </AppContainer>
        </Router>
      </Provider>
    </I18nextProvider>
  );
};

export default App;
