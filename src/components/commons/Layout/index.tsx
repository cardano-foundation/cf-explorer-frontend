import * as React from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { RootState } from "src/stores/types";
import { setOnDetailView, setSidebar } from "src/stores/user";
import { useScreen } from "src/commons/hooks/useScreen";

import CustomTooltip from "../CustomTooltip";
import Footer from "./Footer";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { ArrowCollapse, BackDrop, Drawer, Layout, Main, MainContainer, ToggleMenu, WrapIcon } from "./styles";

interface Props {
  children: React.ReactNode;
}
const CustomLayout: React.FC<Props> = ({ children }) => {
  const { sidebar } = useSelector(({ user }: RootState) => user);
  const history = useHistory();
  const lastPath = React.useRef<string>(history.location.pathname);
  const { isTablet } = useScreen();

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
      <Drawer variant="permanent" open={sidebar} ModalProps={{ keepMounted: true }} anchor={isTablet ? "right" : "left"}>
        <CustomTooltip placement="right" title={sidebar ? `Collapse` : `Expand`}>
          <ToggleMenu type="button">
            <WrapIcon onClick={handleToggle}>
              <ArrowCollapse>{sidebar ? <FaArrowLeft /> : <FaArrowRight />}</ArrowCollapse>
            </WrapIcon>
          </ToggleMenu>
        </CustomTooltip>
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
