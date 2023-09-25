import React, { useState } from "react";
import { Box, useTheme } from "@mui/material";
import { useLocalStorage } from "react-use";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { LinkOffComponent, User2Component } from "src/commons/resources/index";
import { routers } from "src/commons/routers";
import { removeAuthInfo } from "src/commons/utils/helper";
import { signOut } from "src/commons/utils/userRequest";
import { setOnDetailView } from "src/stores/user";
import useToast from "src/commons/hooks/useToast";

import { Content, Disconnect, Name, Profile, Span, StyledButton, WrapContent } from "./style";
import CustomIcon from "../CustomIcon";

interface IProps {
  userData: any;
}
const ConnectedProfileOptionNormalLogin: React.FC<IProps> = ({ userData }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [, setBookmark] = useLocalStorage<string[]>("bookmark", []);
  const [, setUsername] = useLocalStorage<string>("username", "");
  const [user, setUser] = useLocalStorage("persist:user", {});
  const toast = useToast();

  const history = useHistory();
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setOnDetailView(false);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "profile-popover" : undefined;

  const handleDisconnect = async () => {
    // eslint-disable-next-line no-console
    const themeMode = JSON.parse(localStorage.getItem("persist:user") || "")?.theme || "light";
    try {
      await signOut({
        refreshJwt: localStorage.getItem("refreshToken") || "",
        accountId: localStorage.getItem("username") || ""
      });
      toast.success(t("message.signedOut"));
    } catch (error) {
      // Todo: handle error
    } finally {
      removeAuthInfo();
      setBookmark([]);
      setUsername("");
      setUser({ ...user, userData: {}, theme: themeMode });
      if (window.location.pathname.includes("report-generated")) {
        history.push(routers.STAKING_LIFECYCLE);
      } else if (window.location.pathname.includes(routers.ACCOUNT)) {
        history.replace(routers.HOME);
      } else {
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    }
  };

  return (
    <Box>
      <StyledButton aria-describedby={id} type="button" onClick={handleClick}>
        <Span> {userData?.email?.split("@")[0]}</Span>
      </StyledButton>
      <WrapContent
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
      >
        <Content>
          <Profile
            onClick={() => {
              setAnchorEl(null);
              history.push(routers.ACCOUNT);
            }}
          >
            <CustomIcon height={22} icon={User2Component} fill={theme.palette.secondary.main} />
            <Name>Account</Name>
          </Profile>
          <Disconnect onClick={handleDisconnect}>
            <CustomIcon height={24} icon={LinkOffComponent} fill={theme.palette.error[700]} />
            <Name>Sign Out</Name>
          </Disconnect>
        </Content>
      </WrapContent>
    </Box>
  );
};

export default ConnectedProfileOptionNormalLogin;
