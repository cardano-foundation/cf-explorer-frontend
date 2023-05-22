import { Box, styled, Button } from "@mui/material";
import { SearchSPOIcon } from "../../commons/resources";
import { Link, useHistory } from "react-router-dom";
import { routers } from "../../commons/routers";
import { useScreen } from "../../commons/hooks/useScreen";
import useAuth from "~/commons/hooks/useAuth";

const SPOSearch = () => {
  const { isLoggedIn } = useAuth();
  const history = useHistory();
  const { isMobile } = useScreen();

  return (
    <StyledContainer>
      <h2>Welcome to Staking Lifecycle (SPO)</h2>
      <Box>
        <SearchSPOIcon />
      </Box>
      <Box mb={3}>No active Pool found</Box>
      {!isLoggedIn && !isMobile && <LoginBtn to={routers.SIGN_IN}>Login to view personal staking lifecylcle</LoginBtn>}
      {!isLoggedIn && isMobile && (
        <WrapButton
          onClick={() => {
            history.push(routers.SIGN_IN);
          }}
        >
          <>Login</>
        </WrapButton>
      )}
    </StyledContainer>
  );
};

export default SPOSearch;
const LoginBtn = styled(Link)(() => ({
  fontSize: "1.875rem",
  textDecoration: "underline !important",
  cursor: "pointer"
}));

export const WrapButton = styled(Button)`
  background: ${({ theme }) => theme.palette.grey[700]};
  padding: 12px 97px;
  border-radius: 8px;
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  text-align: center;
  color: #fff;
  margin-top: 16px;
`;

export const StyledContainer = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    paddingBottom: "50px"
  },
  [theme.breakpoints.down("sm")]: {
    padding: "37px 58px",
    marginBottom: "111px"
  }
}));
