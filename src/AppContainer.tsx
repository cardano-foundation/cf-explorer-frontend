import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import CustomLayout from "./components/commons/Layout";
import { RootState } from "./stores/types";
import { useHistory } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import themes from "./themes";
import { setOnDetailView } from "./stores/user";
interface Props {
  children: React.ReactNode;
}

const AppContainer: React.FC<Props> = props => {
  const history = useHistory();
  const lastPath = useRef(history.location.pathname);
  const { children } = props;
  const { theme } = useSelector(({ user }: RootState) => user);

  useEffect(() => {
    setOnDetailView(false);
  }, []);

  useEffect(() => {
    const unlisten = history.listen(() => {
      window.scrollTo(0, 0);
      if (lastPath.current !== history.location.pathname) {
        setOnDetailView(false);
        lastPath.current = history.location.pathname;
      }
    });
    return () => {
      unlisten();
    };
  }, [history]);

  return (
    <ThemeProvider theme={themes[theme]}>
      <div data-theme={theme}>
        <CustomLayout>{children}</CustomLayout>
      </div>
    </ThemeProvider>
  );
};

export default AppContainer;
