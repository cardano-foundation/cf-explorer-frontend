import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { WalletIcon } from "src/commons/resources";
import { routers } from "src/commons/routers";
import { RootState } from "src/stores/types";
import ConnectedProfileOptionNormalLogin from "src/components/commons/ConnectedProfileOptionNormalLogin";

import ConnectWallet from "../ConnectWallet";
import { Image, Span, StyledButton } from "./styles";

const LoginButton = () => {
  const { t } = useTranslation();
  const { userData } = useSelector(({ user }: RootState) => user);
  const history = useHistory();

  const handleClick = () => {
    if (localStorage.getItem("token")) {
      window.location.reload();
    } else {
      history.push(routers.SIGN_IN);
    }
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
    <Box position="relative" data-testid="header-signin">
      <StyledButton type="button" onClick={handleClick}>
        <Image src={WalletIcon} alt="wallet" />
        <Span>{t("common.signIn")}</Span>
      </StyledButton>
    </Box>
  );
};

export default LoginButton;
