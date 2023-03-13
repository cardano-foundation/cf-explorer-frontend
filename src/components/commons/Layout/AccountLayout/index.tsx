import { Avatar, Box, CircularProgress, Dialog, IconButton } from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { routers } from "../../../../commons/routers";
import { RootState } from "../../../../stores/types";
import {
  ContentBox,
  NavItem,
  SideBar,
  StyledButton,
  StyledButtonClose,
  StyledButtonReport,
  StyledUsername,
  Wrapper,
} from "./styled";
import editAva from "../../../../commons/resources/icons/editAva.svg";
import { useLocation } from "react-router-dom";
import { MdChevronRight } from "react-icons/md";
import { setUserData } from "../../../../stores/user";
import { getInfo } from "../../../../commons/utils/userRequest";
import { NETWORK_TYPES, NETWORK } from "../../../../commons/utils/constants";
import { uploadAxios } from "../../../../commons/utils/axios";
import { ReactComponent as ReportDiscord } from "../../../../commons/resources/icons/reportDiscord.svg";
import { ReactComponent as ReportMail } from "../../../../commons/resources/icons/reportMail.svg";
import { DialogTitle } from "@mui/material";
import CustomTooltip from "../../CustomTooltip";
import Toast from "../../Toast";
import { AlertProps } from "@mui/material";
interface Props {
  children: React.ReactNode;
}

const AccountLayout: React.FC<Props> = ({ children }) => {
  const { pathname } = useLocation();
  const { userData } = useSelector(({ user }: RootState) => user);
  const [openReportModal, setOpenReportModal] = useState(false);
  const [isUploadAvatar, setIsUploadAvatar] = useState(false);
  const [message, setMessage] = useState<{ message: string; severity: AlertProps["severity"] }>({
    message: "",
    severity: "error",
  });
  const fetchUserInfo = useCallback(async () => {
    try {
      const response = await getInfo({ network: NETWORK_TYPES[NETWORK] });
      setUserData(response.data);
    } catch (error) {}
  }, []);

  const uploadImgRef = useRef(null);

  useEffect(() => {
    fetchUserInfo();
  }, [fetchUserInfo]);

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
        setMessage({ message: "Your avatar has been changed.", severity: "success" });
      }
    } catch (error) {
    } finally {
      setIsUploadAvatar(false);
    }
  };
  const handleCloseToast = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setMessage({ message: "", severity: "error" });
  };
  // if (!userData) return <NotFound />;
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
                      bgcolor="#0000001a"
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
                    borderBottom="1px solid rgba(0,0,0,0.07)"
                  >
                    <Box>{route.title}</Box>
                    <MdChevronRight size={25} color={route.to === pathname ? "#438F68" : "#98A2B3"} />
                  </Box>
                </NavItem>
              ))}
            </Box>
          </Box>
          <Box px={3} pb={1} fontSize="0.75rem">
            Missing any data? click <StyledButton onClick={() => setOpenReportModal(true)}>here</StyledButton> to report
          </Box>
        </SideBar>
        <Box px={3} py={2} flex={1} overflow={"auto"}>
          {children}
        </Box>
      </ContentBox>
      <Dialog open={openReportModal} onClose={() => setOpenReportModal(false)}>
        <Box py={2}>
          <DialogTitle fontSize={"1.5rem"} fontWeight={"bold"}>
            Having a problem? Contact us via these channel
          </DialogTitle>
          <Box display={"flex"} gap={2} justifyContent="center">
            <StyledButtonReport>
              <ReportDiscord />
            </StyledButtonReport>
            <StyledButtonReport>
              <ReportMail />
            </StyledButtonReport>
          </Box>
          <Box py={3}>
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
      </Dialog>
      <Toast
        open={!!message.message}
        onClose={handleCloseToast}
        messsage={message.message}
        severity={message.severity}
      />
    </Wrapper>
  );
};

export default AccountLayout;

const router = [
  { title: "My Profile", to: routers.MY_PROFILE },
  { title: "Bookmark", to: routers.BOOKMARK },
  { title: "Private Notes", to: routers.PRIVATE_NOTES },
];
