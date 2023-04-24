import { Box, styled } from "@mui/material";
import { SearchSPOIcon } from "../../commons/resources";

const SPOSearch = () => {
  return (
    <Box>
      <h2>Welcome to Staking Lifecycle (SPO)</h2>
      <Box>
        <SearchSPOIcon />
      </Box>
      <Box mb={3}>No active Pool found</Box>
      <LoginBtn>Login to view personal staking lifecylcle</LoginBtn>
    </Box>
  );
};

export default SPOSearch;
const LoginBtn = styled(Box)(() => ({
  fontSize: "1.875rem",
  textDecoration: "underline",
  cursor: "pointer",
}));
