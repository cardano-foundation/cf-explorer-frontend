import { Avatar, Box, Button, Dialog, IconButton } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
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
import { ReactComponent as ReportDiscord } from "../../../../commons/resources/icons/reportDiscord.svg";
import { ReactComponent as ReportMail } from "../../../../commons/resources/icons/reportMail.svg";
import { DialogTitle } from "@mui/material";
interface Props {
  children: React.ReactNode;
}

const AccountLayout: React.FC<Props> = ({ children }) => {
  const { pathname } = useLocation();
  const { userData } = useSelector(({ user }: RootState) => user);
  const [openReportModal, setOpenReportModal] = useState(false);
  const fetchUserInfo = useCallback(async () => {
    try {
      const response = await getInfo({ network: NETWORK_TYPES[NETWORK] });
      setUserData(response.data);
    } catch (error) {}
  }, []);

  useEffect(() => {
    fetchUserInfo();
  }, [fetchUserInfo]);

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
                  <Avatar
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                    alt="avatar"
                    sx={{ height: "100px", width: "100px", textAlign: "center" }}
                  />
                  <Box component={IconButton} position="absolute" bottom="0" right="0" p={0}>
                    <Box component={"img"} src={editAva} alt="editava" />
                  </Box>
                </Box>
              </Box>
              <StyledUsername component={"h4"} pt={1} m="auto">
                {userData?.username}
              </StyledUsername>
            </Box>
            <Box mt={4}>
              {router.map((i, ii) => (
                <NavItem to={i.to} active={i.to === pathname} key={ii}>
                  <Box
                    display="flex"
                    alignItems={"center"}
                    justifyContent="space-between"
                    py={2}
                    mx={4}
                    borderBottom="1px solid rgba(0,0,0,0.07)"
                  >
                    <Box>{i.title}</Box>
                    <MdChevronRight size={25} color={i.to === pathname ? "#438F68" : "#98A2B3"} />
                  </Box>
                </NavItem>
              ))}
            </Box>
          </Box>
          <Box px={3} pb={1} fontSize="0.75rem">
            Missing any data? click <StyledButton onClick={() => setOpenReportModal(true)}>here</StyledButton> to report
          </Box>
        </SideBar>
        <Box px={3} py={2} flex={1}>
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
    </Wrapper>
  );
};

export default AccountLayout;

const router = [
  { title: "My Profile", to: routers.MY_PROFILE },
  { title: "Bookmark", to: routers.BOOKMARK },
  { title: "Private Notes", to: routers.PRIVATE_NOTES },
];
