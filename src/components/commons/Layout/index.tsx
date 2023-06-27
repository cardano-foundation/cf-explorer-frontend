import * as React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { RootState } from "src/stores/types";
import { setOnDetailView, setSidebar } from "src/stores/user";

import Footer from "./Footer";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Drawer, Layout, Main, BackDrop, MainContainer } from "./styles";
import ToggleSidebar from "./ToggleSidebar";

interface Props {
  children: React.ReactNode;
}
const CustomLayout: React.FC<Props> = ({ children }) => {
  const { sidebar } = useSelector(({ user }: RootState) => user);
  const history = useHistory();
  const lastPath = React.useRef<string>(history.location.pathname);

  React.useEffect(() => {
    const unlisten = history.listen(() => {
      lastPath.current = history.location.pathname;
      setOnDetailView(false);
    });
    return () => {
      unlisten();
    };
  }, [history]);

  const handleToggle = () => setSidebar(!sidebar);

  return (
    <Layout sidebar={+sidebar}>
      <BackDrop isShow={+sidebar} onClick={handleToggle} />
      <Drawer variant="permanent" open={sidebar} ModalProps={{ keepMounted: true }}>
        <ToggleSidebar handleToggle={handleToggle} />
        <Sidebar />
      </Drawer>
      <MainContainer>
        <Main id="main" component="main" open={sidebar ? 1 : 0}>
          <Header />
          {children}
        </Main>
        <Footer />
      </MainContainer>
    </Layout>
  );
};

export default CustomLayout;
