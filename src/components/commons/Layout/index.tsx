import { Box, Button, useTheme, useMediaQuery, List } from "@mui/material";
import { t } from "i18next";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { useScreen } from "src/commons/hooks/useScreen";
import { Notice } from "src/commons/resources";
import { NETWORK, NETWORKS } from "src/commons/utils/constants";
import { RootState } from "src/stores/types";
import { setOnDetailView, setSidebar } from "src/stores/user";
import { routers } from "src/commons/routers";

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
  const [currentLanguage, setCurrentLanguage] = useState(window.navigator.language);
  const [currentTimeZone, setCurrentTimeZone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone);
  // reload page when change language and timezone
  useEffect(() => {
    const checkLanguageChange = setInterval(() => {
      if (window.navigator.language !== currentLanguage) {
        setCurrentLanguage(window.navigator.language);
        window.location.reload();
      }
    }, 1000);

    return () => clearInterval(checkLanguageChange);
  }, [currentLanguage]);

  useEffect(() => {
    const checkTimeZoneChange = setInterval(() => {
      const newTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (newTimeZone !== currentTimeZone) {
        setCurrentTimeZone(newTimeZone);
        window.location.reload();
      }
    }, 1000);

    return () => clearInterval(checkTimeZoneChange);
  }, [currentTimeZone]);

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
  // const isLanding =
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
        <Main
          ref={mainRef}
          component="main"
          open={sidebar ? 1 : 0}
          // To dos
          bgcolor={routers.BOLNISI_LANDING === history.location.pathname ? "#fff" : ""}
        >
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
          <Header />
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
        bgcolor={theme.isDark ? theme.palette.secondary[100] : theme.palette.secondary[0]}
        color={theme.palette.secondary.main}
        borderRadius={3}
      >
        <List
          sx={{
            padding: "16px 40px"
          }}
        >
          <li
            style={{
              listStyle: "disc"
            }}
          >
            {t("notice.value.a")}
          </li>
          <li
            style={{
              listStyle: "disc",
              margin: "16px 0"
            }}
          >
            {t("notice.value.b")}
          </li>
          <li
            style={{
              listStyle: "circle",
              margin: "0px 0 0px 20px"
            }}
          >
            {t("notice.value.b1")}
          </li>
          <li
            style={{
              listStyle: "circle",
              margin: "16px 0 16px 20px"
            }}
          >
            {t("notice.value.b2")}
          </li>
        </List>
      </Box>
    </StyledModal>
  );
};
