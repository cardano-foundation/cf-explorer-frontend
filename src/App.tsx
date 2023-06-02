import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";

import store from "./stores";
import Routers from "./Routers";
import AppContainer from "./AppContainer";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <AppContainer>
          <Routers />
        </AppContainer>
      </Router>
    </Provider>
  );
};

export default App;
