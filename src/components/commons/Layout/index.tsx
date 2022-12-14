import * as React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Drawer, Layout, ToggleMenu, Main, BackDrop, MainContainer } from "./styles";
import { useSelector } from "react-redux";
import { setSidebar } from "../../../stores/user";
import { RootState } from "../../../stores/types";

interface Props {
  children: React.ReactNode;
}
const CustomLayout: React.FC<Props> = ({ children }) => {
  const { sidebar, onDetailView } = useSelector(({ user }: RootState) => user);

  const handleToggle = () => setSidebar(!sidebar);

  return (
    <Layout>
      <BackDrop isShow={sidebar} onClick={handleToggle} />
      <Drawer variant="permanent" open={sidebar}>
        <ToggleMenu onClick={handleToggle} type="button">
          {sidebar ? <FaArrowLeft /> : <FaArrowRight />}
        </ToggleMenu>
        <Sidebar />
      </Drawer>
      <MainContainer>
        <Main component="main" onDetailView={onDetailView} sidebar={sidebar}>
          <Header />
          {children}
        </Main>
        <Footer />
      </MainContainer>
    </Layout>
  );
};

export default CustomLayout;
