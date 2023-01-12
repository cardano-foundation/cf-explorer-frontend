import { Avatar, Box, IconButton } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { routers } from "../../../../commons/routers";
import { RootState } from "../../../../stores/types";
import { ContentBox, NavItem, SideBar, Wrapper } from "./styled";

import editAva from "../../../../commons/resources/icons/editAva.svg";
import { useLocation } from "react-router-dom";
import { MdChevronRight } from "react-icons/md";

interface Props {
  children: React.ReactNode;
}

const AccountLayout: React.FC<Props> = ({ children }) => {
  const { pathname } = useLocation();
  const { userData } = useSelector(({ user }: RootState) => user);

  // if (!userData) return <NotFound />;
  return (
    <Wrapper>
      <Box component={"h2"} textAlign="left">
        Account Overview
      </Box>
      <ContentBox>
        <SideBar width={"20%"}>
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
            <Box component={"h4"} pt={1} m={0}>
              Son.pham
            </Box>
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
        </SideBar>
        <Box px={3} py={2} flex={1}>{children}</Box>
      </ContentBox>
    </Wrapper>
  );
};

export default AccountLayout;

const router = [
  { title: "My Profile", to: routers.MY_PROFILE },
  { title: "Bookmark", to: routers.BOOKMARK },
  { title: "Private Notes", to: routers.PRIVATE_NOTES },
];
