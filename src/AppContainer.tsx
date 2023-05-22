import React from "react";
import { useSelector } from "react-redux";
import CustomLayout from "./components/commons/Layout";
import { RootState } from "./stores/types";
import { ThemeProvider } from "@mui/material/styles";
import themes from "./themes";
import { useLocation } from "react-router-dom";
import { SystemLoader } from "./components/SystemLoader";
import { routers } from "./commons/routers";
interface Props {
  children: React.ReactNode;
}

const AppContainer: React.FC<Props> = (props) => {
  const { theme } = useSelector(({ user }: RootState) => user);
  const { children } = props;
  const location = useLocation();
  const excludedRoutes: any = [
    routers.SIGN_IN,
    routers.SIGN_UP,
    routers.FORGOT_PASSWORD,
    routers.RESET_PASSWORD,
    routers.VERIFY_EMAIL
  ];
  return (
    <ThemeProvider theme={themes[theme]}>
      <SystemLoader />
      <div data-theme={theme}>
        {excludedRoutes.includes(location.pathname) ? <>{children}</> : <CustomLayout>{children}</CustomLayout>}
      </div>
    </ThemeProvider>
  );
};

export default AppContainer;
