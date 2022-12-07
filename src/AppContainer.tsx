import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import CustomLayout from "./components/commons/Layout";
import { RootState } from "./stores/types";
import { useHistory } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import themes from "./themes";
interface Props {
  children: React.ReactNode;
}

const AppContainer: React.FC<Props> = props => {
  const { children } = props;
  const { theme } = useSelector(({ user }: RootState) => user);

  const history = useHistory();
  useEffect(() => {
    const unlisten = history.listen(() => {
      window.scrollTo(0, 0);
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
