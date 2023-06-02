import { useEffect } from "react";
import { Box, styled } from "@mui/material";
import { Link } from "react-router-dom";

import { SearchDelegatorIcon } from "src/commons/resources";
import { routers } from "src/commons/routers";
import useAuth from "src/commons/hooks/useAuth";

const DelegatorSearch = () => {
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    document.title = "Welcome to Staking Lifecycle (Delegator) | Cardano Explorer";
  }, []);

  return (
    <Box>
      <h2>Welcome to Staking Lifecycle (Delegator)</h2>
      <Box>
        <SearchDelegatorIcon />
      </Box>
      <Box mb={3}>No active Stake key found</Box>
      {!isLoggedIn && <LoginBtn to={routers.SIGN_IN}>Login to view personal staking lifecylcle</LoginBtn>}
    </Box>
  );
};

export default DelegatorSearch;

const LoginBtn = styled(Link)(() => ({
  fontSize: "1.875rem",
  textDecoration: "underline !important",
  cursor: "pointer"
}));
