import { Box, styled } from "@mui/material";
import { SearchDelegatorIcon } from "../../commons/resources";

const DelegatorSearch = () => {
  return (
    <Box>
      <h2>Welcome to Staking Lifecycle (SPO)</h2>
      <Box>
        <SearchDelegatorIcon />
      </Box>
      <Box mb={3}>No active Stake key found</Box>
      <LoginBtn>Login to view personal staking lifecylcle</LoginBtn>
    </Box>
  );
};

export default DelegatorSearch;

const LoginBtn = styled(Box)(() => ({
  fontSize: "1.875rem",
  textDecoration: "underline",
  cursor:'pointer'
}));
