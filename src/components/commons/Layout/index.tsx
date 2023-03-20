import * as React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Drawer, Layout, ToggleMenu, Main, BackDrop, MainContainer } from "./styles";
import { useSelector } from "react-redux";
import { setSidebar } from "../../../stores/user";
import { RootState } from "../../../stores/types";
import CustomTooltip from "../CustomTooltip";
import ToastContainer from "./ToastContainer";

interface Props {
  children: React.ReactNode;
}
const CustomLayout: React.FC<Props> = ({ children }) => {
  const { sidebar, onDetailView } = useSelector(({ user }: RootState) => user);

  const handleToggle = () => setSidebar(!sidebar);

  return (
    <Layout>
      <BackDrop isShow={sidebar ? 1 : 0} onClick={handleToggle} />
      <Drawer variant="permanent" open={sidebar}>
        <CustomTooltip placement="right" title={sidebar ? `Collapse` : `Expand`}>
          <ToggleMenu onClick={handleToggle} type="button">
            {sidebar ? <FaArrowLeft /> : <FaArrowRight />}
          </ToggleMenu>
        </CustomTooltip>
        <Sidebar />
      </Drawer>
      <MainContainer>
        <Main component="main" open={onDetailView ? 1 : 0} sidebar={sidebar ? 1 : 0}>
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
