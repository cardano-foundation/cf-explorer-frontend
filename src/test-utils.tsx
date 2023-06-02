import React, { ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { ThemeProvider } from "@mui/material";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { Provider } from "react-redux";

import themes from "./themes";
import store from "./stores";

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  const history = createMemoryHistory();
  return (
    <Provider store={store}>
      <Router history={history}>
        <ThemeProvider theme={themes.light}>{children}</ThemeProvider>
      </Router>
    </Provider>
  );
};

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, "wrapper">) =>
  render(ui, { wrapper: AllTheProviders, ...options });

// eslint-disable-next-line import/export
export * from "@testing-library/react";
// eslint-disable-next-line import/export
export { customRender as render };
