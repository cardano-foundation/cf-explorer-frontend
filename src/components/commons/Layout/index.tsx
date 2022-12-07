import * as React from "react";
import Box from "@mui/material/Box";
import Header from "./Header";
import Footer from "./Footer";
import NavBar from "./NavBar";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Drawer, ToggleMenu } from "./styles";

interface Props {
  children: React.ReactNode;
}
const CustomLayout: React.FC<Props> = ({ children }) => {
  const [open, setOpen] = React.useState(true);

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer variant="permanent" open={open}>
        <ToggleMenu onClick={handleToggle} type="button">
          {open ? <FaArrowLeft /> : <FaArrowRight />}
        </ToggleMenu>
        <NavBar open={open} />
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, overflow: "hidden" }}>
        <Header />
        {children}
        <Footer />
      </Box>
    </Box>
  );
};

export default CustomLayout;
