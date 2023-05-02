import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useLocalStorage } from "react-use";
import { LinkOff, User2 } from "../../../commons/resources/index";
import { routers } from "../../../commons/routers";
import { getShortWallet, removeAuthInfo } from "../../../commons/utils/helper";
import { signOut } from "../../../commons/utils/userRequest";
import { Content, Disconnect, Icon, Name, Profile, Span, StyledButton, WrapContent } from "./style";

interface IProps {
  userData: any;
}
const ConnectedProfileOptionNormalLogin: React.FC<IProps> = ({userData}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [, setBookmark] = useLocalStorage<string[]>("bookmark", []);
  const [, setUsername] = useLocalStorage<string>("username", "");
  const [user, setUser] = useLocalStorage("persist:user", {});

  const history = useHistory();
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "profile-popover" : undefined;


  const handleDisconnect = async () => {
    try {
      await signOut({
        refreshJwt: localStorage.getItem("refreshToken") || "",
        username: localStorage.getItem("username") || "",
      });
    } catch (error) {
    } finally {
      removeAuthInfo();
      setBookmark([]);
      setUsername("");
      setUser({ ...user, userData: {} });
      // window.location.reload();
    }
  };

  return (
    <Box>
      <StyledButton aria-describedby={id} type="button" onClick={handleClick}>
        <Span>{(userData.username)}</Span>
      </StyledButton>
      <WrapContent
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
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
            <Name>User Profile</Name>
          </Profile>
          <Disconnect onClick={handleDisconnect}>
            <Icon src={LinkOff} />
            <Name>Disconnect</Name>
          </Disconnect>
        </Content>
      </WrapContent>
    </Box>
  );
};

export default ConnectedProfileOptionNormalLogin;
