import { alpha, Avatar, Box, CircularProgress, IconButton, useTheme } from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { MdChevronRight } from "react-icons/md";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import { getShortWallet } from "src/commons/utils/helper";
import { useScreen } from "src/commons/hooks/useScreen";
import useToast from "src/commons/hooks/useToast";
import editAva from "src/commons/resources/icons/editAva.svg";
import { ReactComponent as ReportDiscord } from "src/commons/resources/icons/reportDiscord.svg";
import { ReactComponent as ReportMail } from "src/commons/resources/icons/reportMail.svg";
import { routers } from "src/commons/routers";
import { uploadAxios } from "src/commons/utils/axios";
import { NETWORK, NETWORK_TYPES } from "src/commons/utils/constants";
import { getInfo } from "src/commons/utils/userRequest";
import { RootState } from "src/stores/types";
import { setUserData } from "src/stores/user";

import {
  ContentBox,
  MissingItemWrapper,
  ModalTitle,
  NavItem,
  NavItemMobile,
  SideBar,
  StyledButton,
  StyledButtonClose,
  StyledButtonReport,
  StyledUsername,
  WrapItemMobile,
  Wrapper
} from "./styled";
import StyledModal from "../../StyledModal";
import CustomTooltip from "../../CustomTooltip";
interface Props {
  children: React.ReactNode;
}

const AccountLayout: React.FC<Props> = ({ children }) => {
  const { pathname } = useLocation();
  const { userData } = useSelector(({ user }: RootState) => user);
  const { isMobile, isTablet } = useScreen();
  const theme = useTheme();
  const [openReportModal, setOpenReportModal] = useState(false);
  const [isUploadAvatar, setIsUploadAvatar] = useState(false);

  const fetchUserInfo = useCallback(async () => {
    try {
      const response = await getInfo({ network: NETWORK_TYPES[NETWORK] });
      setUserData({ ...response.data, loginType: userData?.loginType || "" });
    } catch (error) {
      //To do
    }
  }, []);

  const toast = useToast();

  const uploadImgRef = useRef(null);

  const hanldeUploadImage = async (e: any) => {
    try {
      if (e.target && e.target.files && e.target.files.length > 0) {
        setIsUploadAvatar(true);
        const formData = new FormData();
        formData.append("avatar", e.target.files[0]);
        const { data } = await uploadAxios.put("/user/edit-avatar", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        });

        if (data && data.email && data.avatar) {
          await fetchUserInfo();
        }
        toast.success("Your avatar has been changed.");
      }
    } catch (error) {
      //To do
    } finally {
      setIsUploadAvatar(false);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      fetchUserInfo();
    }
  }, [fetchUserInfo]);

  const MissingData = () => (
    <MissingItemWrapper px={3} pb={4} fontSize="0.75rem">
      Missing any data? click{" "}
      <StyledButton
        sx={{
          color: theme.palette.blue[800]
        }}
        onClick={() => setOpenReportModal(true)}
      >
        here
      </StyledButton>{" "}
      to report
    </MissingItemWrapper>
  );
  const renderListTabs = () => (
    <SideBar>
      <Box>
        <Box>
          <Box pt={4} textAlign="center" display={"flex"} justifyContent="center">
            <Box position={"relative"}>
              {!isUploadAvatar && (
                <Avatar
                  src={userData?.avatar}
                  alt="avatar"
                  sx={{ height: "100px", width: "100px", textAlign: "center" }}
                />
              )}
              {isUploadAvatar && (
                <Box
                  height={"100px"}
                  width={"100px"}
                  bgcolor={alpha(theme.palette.common.black, 0.1)}
                  borderRadius={"50%"}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <CircularProgress />
                </Box>
              )}
              <Box
                component={IconButton}
                position="absolute"
                bottom="0"
                right="0"
                p={0}
                onClick={() => uploadImgRef.current && (uploadImgRef.current as any).click()}
              >
                <Box component={"img"} src={editAva} alt="editava" />
                <input
                  accept="image/*"
                  type="file"
                  ref={uploadImgRef}
                  onChange={hanldeUploadImage}
                  style={{ display: "none" }}
                />
              </Box>
            </Box>
          </Box>
          {userData?.loginType === "connectWallet" ? (
            <CustomTooltip title={userData?.address || ""} placement="bottom">
              <StyledUsername component={"h4"} pt={1} m="auto">
                {getShortWallet(userData?.address)}
              </StyledUsername>
            </CustomTooltip>
          ) : (
            <StyledUsername component={"h4"} pt={1} m="auto">
              {userData?.email}
            </StyledUsername>
          )}
        </Box>
        <Box display={"flex"} justifyContent={"center"} mt={4}>
          <WrapItemMobile>
            {router.map((route, index) => {
              const active = route.to === pathname;
              return (
                <>
                  <NavItemMobile
                    sx={{
                      borderTopRightRadius: index === router.length - 1 ? "5px" : "0px",
                      borderBottomRightRadius: index === router.length - 1 ? "5px" : "0px",
                      borderTopLeftRadius: index === 0 ? "5px" : "0px",
                      borderBottomLeftRadius: index === 0 ? "5px" : "0px",
                      borderRadius: active ? "5px" : ""
                    }}
                    to={route.to}
                    active={active}
                    key={index}
                  >
                    {route.title}
                  </NavItemMobile>
                  <NavItem to={route.to} active={route.to === pathname} key={index}>
                    <Box
                      display="flex"
                      alignItems={"center"}
                      justifyContent="space-between"
                      borderBottom={`1px solid${alpha(theme.palette.common.black, 0.07)}`}
                    >
                      <Box pl={"20px"}>{route.title}</Box>
                      <MdChevronRight
                        size={25}
                        color={route.to === pathname ? theme.palette.primary.main : theme.palette.text.hint}
                      />
                    </Box>
                  </NavItem>
                </>
              );
            })}
          </WrapItemMobile>
        </Box>
      </Box>
      <MissingData />
    </SideBar>
  );
  return (
    <Wrapper>
      <Box component={"h2"} textAlign="left">
        Account Overview
      </Box>
      <ContentBox>
        {renderListTabs()}
        <Box px={3} py={2} flex={1} overflow={"auto"}>
          {children}
        </Box>
      </ContentBox>
      {isMobile || isTablet ? (
        <Box mt={3}>
          <MissingData />
        </Box>
      ) : null}
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

const router = [
  { title: "My Profile", to: routers.MY_PROFILE },
  { title: "Bookmark", to: routers.BOOKMARK },
  { title: "Private Notes", to: routers.PRIVATE_NOTES }
];
