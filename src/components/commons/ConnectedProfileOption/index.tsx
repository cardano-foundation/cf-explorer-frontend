import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { LinkOff, User2 } from "../../../commons/resources/index";
import { getShortWallet, removeAuthInfo } from "../../../commons/utils/helper";
import { Content, Disconnect, Icon, Name, Profile, Span, StyledButton, WrapContent } from "./style";

interface IProps {
  isConnected: boolean;
  stakeAddress: string;
  disconnect: () => void;
}
const ConnectedProfileOption: React.FC<IProps> = ({ isConnected, disconnect, stakeAddress }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "profile-popover" : undefined;

  useEffect(() => {
    setAnchorEl(null);
  }, [isConnected]);

  const handleDisconnect = () => {
    disconnect();
    removeAuthInfo();
  };

  return (
    <Box>
      <StyledButton aria-describedby={id} type="button" onClick={handleClick}>
        <Span>{getShortWallet(stakeAddress || "")}</Span>
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
          <Profile>
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

export default ConnectedProfileOption;
