import { styled, Container } from "@mui/material";

export const StyledContainer = styled(Container)(({ theme }) => ({
  paddingTop: "30px",
  [theme.breakpoints.down("sm")]: {
    "& > div:first-of-type": {
      padding: "0 16px"
    }
  }
}));
