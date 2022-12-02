import React, { useEffect } from "react";
import { Layout } from "antd";
import { useSelector } from "react-redux";
import CustomLayout from "./components/commons/Layout";
import { RootState } from "./stores/types";

interface Props {
  children: React.ReactNode;
}

const AppContainer: React.FC<Props> = props => {
  const { children } = props;
  const { theme } = useSelector(({ user }: RootState) => user);

  return (
    <Layout data-theme={theme}>
      <CustomLayout>{children}</CustomLayout>
    </Layout>
  );
};

export default AppContainer;
