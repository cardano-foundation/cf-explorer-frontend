import { NetworkType, useCardano } from "@cardano-foundation/cardano-connect-with-wallet";
import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { LinkOff, User2 } from "../../../commons/resources/index";
import { getShortWallet } from "../../../commons/utils/helper";
import { RootState } from "../../../stores/types";
import { Content, Disconnect, Icon, Name, Profile, Span, StyledButton, WrapContent } from "./style";

const ConnectedProfileOption: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const { disconnect } = useCardano();
  const { network } = useSelector(({ user }: RootState) => user);
  const { stakeAddress, isConnected } = useCardano({
    limitNetwork: network === "mainnet" ? NetworkType.MAINNET : NetworkType.TESTNET,
  });

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
          <Disconnect onClick={disconnect}>
            <Icon src={LinkOff} />
            <Name>Disconnect</Name>
          </Disconnect>
        </Content>
      </WrapContent>
    </Box>
  );
};

export default ConnectedProfileOption;
