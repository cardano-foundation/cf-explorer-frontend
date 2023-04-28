import { Box, styled } from "@mui/material";
import { SearchSPOIcon } from "../../commons/resources";
import { Link } from "react-router-dom";
import { routers } from "../../commons/routers";

const SPOSearch = () => {
  return (
    <Box>
      <h2>Welcome to Staking Lifecycle (SPO)</h2>
      <Box>
        <SearchSPOIcon />
      </Box>
      <Box mb={3}>No active Pool found</Box>
      <LoginBtn to={routers.SIGN_IN}>Login to view personal staking lifecylcle</LoginBtn>
    </Box>
  );
};

export default SPOSearch;
const LoginBtn = styled(Link)(() => ({
  fontSize: "1.875rem",
  textDecoration: "underline !important",
  cursor: "pointer",
}));
