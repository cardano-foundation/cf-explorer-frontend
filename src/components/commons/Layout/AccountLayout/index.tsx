import { Box, useTheme } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { MdChevronRight } from "react-icons/md";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import { ReactComponent as ReportDiscord } from "src/commons/resources/icons/reportDiscord.svg";
import { ReactComponent as ReportMail } from "src/commons/resources/icons/reportMail.svg";
import { routers } from "src/commons/routers";
import { NETWORK, NETWORK_TYPES } from "src/commons/utils/constants";
import { getShortHash } from "src/commons/utils/helper";
import { getInfo } from "src/commons/utils/userRequest";
import { RootState } from "src/stores/types";
import { setUserData } from "src/stores/user";

import CustomTooltip from "../../CustomTooltip";
import StyledModal from "../../StyledModal";
import {
  ContentBox,
  Divider,
  ModalTitle,
  NavItem,
  NavItemMobile,
  SideBar,
  StyledButtonClose,
  StyledButtonReport,
  StyledUsername,
  WrapItemMobile,
  Wrapper
} from "./styled";
interface Props {
  children: React.ReactNode;
}

const AccountLayout: React.FC<Props> = ({ children }) => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const { userData } = useSelector(({ user }: RootState) => user);
  const theme = useTheme();
  const [openReportModal, setOpenReportModal] = useState(false);
  const fetchUserInfo = useCallback(async () => {
    try {
      const response = await getInfo({ network: NETWORK_TYPES[NETWORK] });
      setUserData({ ...response.data, loginType: userData?.loginType || "" });
    } catch (error) {
      //To do
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      fetchUserInfo();
    }
  }, [fetchUserInfo]);
  const translatedRouter = router.map((route) => ({
    ...route,
    title: t(`account.${route.title.replaceAll(" ", "").toLowerCase()}`)
  }));
  const renderListTabs = () => (
    <SideBar>
      <Box>
        <Box pt={4}>
          {userData?.loginType === "connectWallet" ? (
            <CustomTooltip title={userData?.username || ""} placement="bottom">
              <StyledUsername component={"h4"} pt={1} m="auto">
                {getShortHash(userData?.username)}
              </StyledUsername>
            </CustomTooltip>
          ) : (
            <StyledUsername component={"h4"} pt={1} m="auto">
              {userData?.username}
            </StyledUsername>
          )}
        </Box>
        <Box display={"flex"} justifyContent={"center"} mt={4}>
          <WrapItemMobile>
            {translatedRouter.map((route, index) => {
              const active = route.to === pathname;
              return (
                <React.Fragment key={index}>
                  <NavItemMobile
                    sx={{
                      borderTopRightRadius: index === router.length - 1 ? "5px" : "0px",
                      borderBottomRightRadius: index === router.length - 1 ? "5px" : "0px",
                      borderTopLeftRadius: index === 0 ? "5px" : "0px",
                      borderBottomLeftRadius: index === 0 ? "5px" : "0px",
                      borderRadius: active ? "5px" : ""
                    }}
                    to={route.to}
                    active={+active}
                  >
                    {route.title}
                  </NavItemMobile>
                  <NavItem to={route.to} active={+active}>
                    <Box display="flex" alignItems={"center"} justifyContent="space-between">
                      <Box pl={"20px"}>{route.title}</Box>
                      <MdChevronRight
                        size={25}
                        color={route.to === pathname ? theme.palette.primary.main : theme.palette.secondary.light}
                        display={active ? "none" : "block"}
                      />
                    </Box>
                    <Divider first={index === 0} />
                  </NavItem>
                </React.Fragment>
              );
            })}
          </WrapItemMobile>
        </Box>
      </Box>
    </SideBar>
  );
  return (
    <Wrapper>
      <Box component={"h2"} textAlign="left" color={({ palette }) => palette.secondary.main}>
        {t("account.overview")}
      </Box>
      <ContentBox>
        {renderListTabs()}
        <Box px={3} py={2} flex={1} overflow={"auto"}>
          {children}
        </Box>
      </ContentBox>
      <StyledModal open={openReportModal} handleCloseModal={() => setOpenReportModal(false)}>
        <Box textAlign="center">
          <ModalTitle>
            Having a problem?
            <br />
            Contact us via these channels
          </ModalTitle>
          <Box display={"flex"} gap={2} justifyContent="center">
            <StyledButtonReport>
              <ReportDiscord />
            </StyledButtonReport>
            <StyledButtonReport>
              <ReportMail />
            </StyledButtonReport>
          </Box>
          <Box pt={3}>
            <StyledButtonClose
              onClick={() => {
                setOpenReportModal(false);
              }}
              variant="outlined"
            >
              Close
            </StyledButtonClose>
          </Box>
        </Box>
      </StyledModal>
    </Wrapper>
  );
};

export default AccountLayout;

export const router = [
  { title: "My Profile", to: routers.MY_PROFILE },
  { title: "Bookmark", to: routers.BOOKMARK }
];
