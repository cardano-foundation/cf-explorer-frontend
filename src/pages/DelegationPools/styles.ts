import { Container, styled } from "@mui/material";

export const StyledContainer = styled(Container)(({ theme }) => ({
  padding: "20px 0 40px",
  [theme.breakpoints.down("sm")]: {
    padding: "20px 16px 20px"
  }
}));

export const Horizon = styled("div")`
  margin: 30px 0;
  width: 100%;
  border: 1px solid ${(props) => props.theme.palette.common.black};
  opacity: 0.07;
`;
