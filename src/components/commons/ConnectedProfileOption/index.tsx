import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useLocalStorage } from "react-use";
import { useTranslation } from "react-i18next";

import { LinkOff, User2 } from "src/commons/resources/index";
import { routers } from "src/commons/routers";
import { getShortHash, removeAuthInfo } from "src/commons/utils/helper";
import { signOut } from "src/commons/utils/userRequest";
import { setOnDetailView } from "src/stores/user";

import { Content, Disconnect, Icon, Name, Profile, Span, StyledButton, WrapContent } from "./style";

interface IProps {
  isConnected: boolean;
  stakeAddress: string;
  disconnect: () => void;
}
const ConnectedProfileOption: React.FC<IProps> = ({ isConnected, disconnect, stakeAddress }) => {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [, setBookmark] = useLocalStorage<string[]>("bookmark", []);
  const [, setUsername] = useLocalStorage<string>("username", "");

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

  useEffect(() => {
    setAnchorEl(null);
  }, [isConnected]);

  const handleDisconnect = async () => {
    try {
      await signOut({
        refreshJwt: localStorage.getItem("refreshToken") || "",
        accountId: localStorage.getItem("walletId") || ""
      });
    } catch (error) {
      // Todo: handle error
    } finally {
      disconnect();
      removeAuthInfo();
      setBookmark([]);
      setUsername("");
      // setUser({ ...user, userData: {} });
      if (window.location.pathname.includes("report-generated")) {
        history.push(routers.STAKING_LIFECYCLE);
      } else if (window.location.pathname.includes(routers.ACCOUNT)) {
        history.replace(routers.HOME);
      } else {
        window.location.reload();
      }
    }
  };

  return (
    <Box>
      <StyledButton aria-describedby={id} type="button" onClick={handleClick}>
        <Span>{getShortHash(stakeAddress || "")}</Span>
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
            <Icon src={User2} />
            <Name>{t("common.account")}</Name>
          </Profile>
          <Disconnect onClick={handleDisconnect}>
            <Icon src={LinkOff} />
            <Name>{t("common.signOut")}</Name>
          </Disconnect>
        </Content>
      </WrapContent>
    </Box>
  );
};

export default ConnectedProfileOption;
