import { I18nextProvider } from "react-i18next";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

import AppContainer from "./AppContainer";
import Routers from "./Routers";
import i18n from "./i18n";
import store from "./stores";
import { SUPPORTED_LANGUAGES } from "./commons/utils/constants";

const App: React.FC = () => {
  let basename = "/";
  const pattern = /^\/([a-z]{2})\//;
  const currentLanguage = window.location.pathname.match(pattern)?.[1];
  if (currentLanguage && SUPPORTED_LANGUAGES.includes(currentLanguage)) {
    basename = `/${currentLanguage}`;
  }
  return (
    <I18nextProvider i18n={i18n} defaultNS={"translation"}>
      <Provider store={store}>
        <Router basename={basename}>
          <AppContainer>
            <Routers />
          </AppContainer>
        </Router>
      </Provider>
    </I18nextProvider>
  );
};

export default App;
