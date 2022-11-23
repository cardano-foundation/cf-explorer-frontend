import React, { useEffect } from "react";
import { Layout } from "antd";
import { useSelector } from "react-redux";
import CustomLayout from "./components/commons/Layout";
import { RootState } from "./stores/types";
import { useHistory } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}

const AppContainer: React.FC<Props> = props => {
  const { children } = props;
  const theme = useSelector(state => (state as RootState).user.theme);
  const history = useHistory();
  useEffect(() => {
    const unlisten = history.listen(() => {
      window.scrollTo(0, 0);
    });
    return () => {
      unlisten();
    };
  }, []);

  return (
    <Layout data-theme={theme}>
      <CustomLayout>{children}</CustomLayout>
    </Layout>
  );
};

export default AppContainer;
