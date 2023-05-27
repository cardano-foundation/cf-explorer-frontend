import * as React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Drawer, Layout, ToggleMenu, Main, BackDrop, MainContainer, ArrowCollapse } from "./styles";
import { useSelector } from "react-redux";
import { setOnDetailView, setSidebar } from "../../../stores/user";
import { RootState } from "../../../stores/types";
import CustomTooltip from "../CustomTooltip";
import ToastContainer from "./ToastContainer";
import { useHistory } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}
const CustomLayout: React.FC<Props> = ({ children }) => {
  const { sidebar, onDetailView } = useSelector(({ user }: RootState) => user);
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
      <Drawer variant='permanent' open={sidebar} ModalProps={{ keepMounted: true }}>
        <CustomTooltip placement='right' title={sidebar ? `Collapse` : `Expand`}>
          <ToggleMenu onClick={handleToggle} type='button'>
            <ArrowCollapse> {sidebar ? <FaArrowLeft /> : <FaArrowRight />}</ArrowCollapse>
          </ToggleMenu>
        </CustomTooltip>
        <Sidebar />
      </Drawer>
      <MainContainer>
        <Main id='main' component='main' open={onDetailView ? 1 : 0} sidebar={sidebar ? 1 : 0}>
          <Header />
          {children}
        </Main>
        <Footer />
      </MainContainer>
      <ToastContainer />
    </Layout>
  );
};

export default CustomLayout;
