import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { WalletIcon } from "../../../../../commons/resources";
import { routers } from "../../../../../commons/routers";
import { NETWORK, NETWORKS } from "../../../../../commons/utils/constants";
import { removeAuthInfo } from "../../../../../commons/utils/helper";
import { RootState } from "../../../../../stores/types";
import ConnectedProfileOptionNormalLogin from "../../../ConnectedProfileOptionNormalLogin";
import ConnectWallet from "../ConnectWallet";
import { Image, Span, StyledButton } from "./styles";
interface Props {}

const LoginButton: React.FC<Props> = () => {
  const { userData } = useSelector(({ user }: RootState) => user);
  const history = useHistory();

  const handleClick = () => {
    history.push(routers.SIGN_IN);
  };

  if (userData?.loginType === "connectWallet") {
    return (
      <>
        <ConnectWallet />
      </>
    );
  }

  if (userData?.loginType === "normal") {
    return (
      <>
        <ConnectedProfileOptionNormalLogin userData={userData} />
      </>
    );
  }

  return (
    <Box position="relative">
      <StyledButton type="button" onClick={handleClick}>
        <Image src={WalletIcon} alt="wallet" />
        <Span>Sign In</Span>
      </StyledButton>
    </Box>
  );
};

export default LoginButton;
