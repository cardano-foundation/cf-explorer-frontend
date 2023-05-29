import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { WalletIcon } from "../../../../../commons/resources";
import { routers } from "../../../../../commons/routers";
import { RootState } from "../../../../../stores/types";
import ConnectedProfileOptionNormalLogin from "../../../ConnectedProfileOptionNormalLogin";
import ConnectWallet from "../ConnectWallet";
import { Image, Span, StyledButton } from "./styles";

const LoginButton = () => {
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
    <Box position='relative'>
      <StyledButton type='button' onClick={handleClick}>
        <Image src={WalletIcon} alt='wallet' />
        <Span>Sign In</Span>
      </StyledButton>
    </Box>
  );
};

export default LoginButton;
