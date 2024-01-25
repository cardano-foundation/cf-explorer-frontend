import { Box, Button, useTheme, useMediaQuery } from "@mui/material";
import { t } from "i18next";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { useScreen } from "src/commons/hooks/useScreen";
import { Notice } from "src/commons/resources";
import { NETWORK, NETWORKS } from "src/commons/utils/constants";
import { RootState } from "src/stores/types";
import { setOnDetailView, setSidebar } from "src/stores/user";

import StyledModal from "../StyledModal";
import Footer from "./Footer";
import Header from "./Header";
import Sidebar from "./Sidebar";
import ToggleSidebar from "./ToggleSidebar";
import { BackDrop, Drawer, Layout, Main, MainContainer } from "./styles";

interface Props {
  children: React.ReactNode;
}
const CustomLayout: React.FC<Props> = ({ children }) => {
  const { sidebar } = useSelector(({ user }: RootState) => user);
  const [openNoticeModal, setOpenNoticeModal] = useState<boolean>(false);
  const history = useHistory();
  const lastPath = useRef<string>(history.location.pathname);
  const { isTablet } = useScreen();
  const theme = useTheme();
  const mainRef = useRef<HTMLDivElement | null>(null);
  const matchesBreakpoint = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    const unlisten = history.listen(() => {
      lastPath.current = history.location.pathname;
      setOnDetailView(false);
      mainRef.current?.scrollTo(0, 0);
    });
    return () => {
      unlisten();
    };
  }, [history]);

  useEffect(() => {
    if (sidebar) {
      setOnDetailView(false);
    }
  }, [sidebar]);

  const handleToggle = () => {
    setSidebar(!sidebar);
  };
  return (
    <Layout sidebar={+sidebar}>
      <BackDrop isShow={+sidebar} onClick={handleToggle} />
      <Drawer
        variant="permanent"
        data-testid="sidebar"
        open={sidebar}
        ModalProps={{ keepMounted: true }}
        anchor={isTablet ? "right" : "left"}
      >
        <ToggleSidebar handleToggle={handleToggle} />
        <Sidebar />
      </Drawer>
      <MainContainer id="main">
        <Main ref={mainRef} component="main" open={sidebar ? 1 : 0}>
          <Header />
          {NETWORK === NETWORKS.sanchonet && (
            <Box
              alignItems={"center"}
              justifyContent={"center"}
              width={"100%"}
              bgcolor={theme.palette.warning[100]}
              py={2}
              display={"flex"}
              component={Button}
              onClick={() => setOpenNoticeModal(true)}
              sx={{
                ":hover": {
                  bgcolor: theme.palette.warning[100]
                }
              }}
              textTransform={"capitalize"}
              fontSize={16}
            >
              <Notice fill={theme.palette.warning[700]} />
              <Box ml={1} fontWeight={"bold"} color={theme.palette.warning[800]}>
                {t("notice")}
              </Box>
            </Box>
          )}
          {children}
          {matchesBreakpoint && <Footer />}
        </Main>
        {!matchesBreakpoint && <Footer />}
        <NoticeModal open={openNoticeModal} handleCloseModal={() => setOpenNoticeModal(false)} />
      </MainContainer>
    </Layout>
  );
};

export default CustomLayout;

const NoticeModal = ({ ...props }: { open: boolean; handleCloseModal: () => void }) => {
  const theme = useTheme();
  return (
    <StyledModal {...props} title={t("notice.title")}>
      <Box
        p={2}
        bgcolor={theme.isDark ? theme.palette.secondary[100] : theme.palette.secondary[0]}
        color={theme.palette.secondary.main}
        borderRadius={3}
      >
        <Box my={1}>{t("notice.value.a")}</Box>
        <Box my={1}>{t("notice.value.b")}</Box>
        <Box my={1} ml={2}>
          {t("notice.value.b1")}
        </Box>
        <Box my={1} ml={2}>
          {t("notice.value.b2")}
        </Box>
        <Box my={1}>{t("notice.value.c")}</Box>
      </Box>
    </StyledModal>
  );
};
