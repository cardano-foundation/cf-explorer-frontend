import * as React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Drawer, Layout, ToggleMenu, Main, BackDrop } from "./styles";
import { useSelector } from "react-redux";
import { setSidebar } from "../../../stores/user";
import { RootState } from "../../../stores/types";

interface Props {
  children: React.ReactNode;
}
const CustomLayout: React.FC<Props> = ({ children }) => {
  const { sidebar } = useSelector(({ user }: RootState) => user);

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
      <Main component="main">
        <Header />
        {children}
        <Footer />
      </Main>
    </Layout>
  );
};

export default CustomLayout;
