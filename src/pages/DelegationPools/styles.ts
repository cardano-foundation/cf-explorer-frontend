import { Container, styled } from "@mui/material";

export const StyledContainer = styled(Container)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    padding: "0px 16px 20px"
  }
}));

export const Horizon = styled("div")`
  margin: 30px 0;
  width: 100%;
  border: 1px solid ${(props) => props.theme.palette.secondary.main};
  opacity: 0.07;
`;
