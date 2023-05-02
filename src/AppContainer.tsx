import React from "react";
import { useSelector } from "react-redux";
import CustomLayout from "./components/commons/Layout";
import { RootState } from "./stores/types";
import { ThemeProvider } from "@mui/material/styles";
import themes from "./themes";
import { SystemLoader } from "./components/SystemLoader";
interface Props {
  children: React.ReactNode;
}

const AppContainer: React.FC<Props> = props => {
  const { theme } = useSelector(({ user }: RootState) => user);
  const { children } = props;
  return (
    <ThemeProvider theme={themes[theme]}>
      <SystemLoader />
      <div data-theme={theme}>
        <CustomLayout>{children}</CustomLayout>
      </div>
    </ThemeProvider>
  );
};

export default AppContainer;
