import React, { useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { hotjar } from "react-hotjar";

import store from "./stores";
import Routers from "./Routers";
import AppContainer from "./AppContainer";
import { LANGUAGE, HOTJAR_HJID, HOTJAR_HJSV } from "./commons/utils/constants";

const App: React.FC = () => {
  //Hotjar integration
  useEffect(() => {
    hotjar.initialize(Number(HOTJAR_HJID), Number(HOTJAR_HJSV));
  }, []);

  return (
    <Provider store={store}>
      <Router basename={LANGUAGE}>
        <AppContainer>
          <Routers />
        </AppContainer>
      </Router>
    </Provider>
  );
};

export default App;
