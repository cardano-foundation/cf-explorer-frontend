import React, { ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { ThemeProvider } from "@mui/material";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { Provider } from "react-redux";
import { I18nextProvider } from "react-i18next";
import "@testing-library/jest-dom/extend-expect";

import themes from "./themes";
import store from "./stores";
import i18n from "./i18n";

//Fix for "matchMedia not present, legacy browsers require a polyfill jest" error
/* eslint-disable @typescript-eslint/no-empty-function */
window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {}
    };
  };

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  const history = createMemoryHistory();
  return (
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <Router history={history}>
          <ThemeProvider theme={themes.light}>{children}</ThemeProvider>
        </Router>
      </Provider>
    </I18nextProvider>
  );
};

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, "wrapper">) =>
  render(ui, { wrapper: AllTheProviders, ...options });

// eslint-disable-next-line import/export
export * from "@testing-library/react";
// eslint-disable-next-line import/export
export { customRender as render };
