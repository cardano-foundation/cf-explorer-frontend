import { alpha, Avatar, Box, CircularProgress, IconButton, useTheme } from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { routers } from "../../../../commons/routers";
import { RootState } from "../../../../stores/types";
import {
  ContentBox,
  ModalTitle,
  NavItem,
  SideBar,
  StyledButton,
  StyledButtonClose,
  StyledButtonReport,
  StyledUsername,
  Wrapper,
} from "./styled";
import editAva from "../../../../commons/resources/icons/editAva.svg";
import { Redirect, useLocation } from "react-router-dom";
import { MdChevronRight } from "react-icons/md";
import { setUserData } from "../../../../stores/user";
import { getInfo } from "../../../../commons/utils/userRequest";
import { NETWORK_TYPES, NETWORK } from "../../../../commons/utils/constants";
import { uploadAxios } from "../../../../commons/utils/axios";
import { ReactComponent as ReportDiscord } from "../../../../commons/resources/icons/reportDiscord.svg";
import { ReactComponent as ReportMail } from "../../../../commons/resources/icons/reportMail.svg";
import CustomTooltip from "../../CustomTooltip";
import useToast from "../../../../commons/hooks/useToast";
import StyledModal from "../../StyledModal";
interface Props {
  children: React.ReactNode;
}

const AccountLayout: React.FC<Props> = ({ children }) => {
  const { pathname } = useLocation();
  const { userData } = useSelector(({ user }: RootState) => user);
  const [openReportModal, setOpenReportModal] = useState(false);
  const [isUploadAvatar, setIsUploadAvatar] = useState(false);
  const [firstLoad, setFirstLoad] = useState(true);
  const fetchUserInfo = useCallback(async () => {
    try {
      setFirstLoad(true);
      const response = await getInfo({ network: NETWORK_TYPES[NETWORK] });
      setUserData(response.data);
    } catch (error) {
    } finally {
      setFirstLoad(false);
    }
  }, []);

  const theme = useTheme();
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
            "Content-Type": "multipart/form-data",
          },
        });

        if (data && data.id && data.avatar) {
          await fetchUserInfo();
        }
        toast.success("Your avatar has been changed.");
      }
    } catch (error) {
    } finally {
      setIsUploadAvatar(false);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      fetchUserInfo();
    }
  }, [fetchUserInfo]);
  if (!userData) {
    return <Redirect to={routers.HOME} />;
  }
  if (firstLoad) return null;
  return (
    <Wrapper>
      <Box component={"h2"} textAlign="left">
        Account Overview
      </Box>
      <ContentBox>
        <SideBar width={"20%"}>
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
              <CustomTooltip title={userData?.username || ""} placement="bottom">
                <StyledUsername component={"h4"} pt={1} m="auto">
                  {userData?.username}
                </StyledUsername>
              </CustomTooltip>
            </Box>
            <Box mt={4}>
              {router.map((route, index) => (
                <NavItem to={route.to} active={route.to === pathname} key={index}>
                  <Box
                    display="flex"
                    alignItems={"center"}
                    justifyContent="space-between"
                    py={2}
                    mx={4}
                    borderBottom={`1px solid${alpha(theme.palette.common.black, 0.07)}`}
                  >
                    <Box>{route.title}</Box>
                    <MdChevronRight
                      size={25}
                      color={route.to === pathname ? theme.palette.primary.main : theme.palette.text.hint}
                    />
                  </Box>
                </NavItem>
              ))}
            </Box>
          </Box>
          <Box px={3} pb={4} fontSize="0.75rem">
            Missing any data? click <StyledButton onClick={() => setOpenReportModal(true)}>here</StyledButton> to report
          </Box>
        </SideBar>
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

const router = [
  { title: "My Profile", to: routers.MY_PROFILE },
  { title: "Bookmark", to: routers.BOOKMARK },
  { title: "Private Notes", to: routers.PRIVATE_NOTES },
];
