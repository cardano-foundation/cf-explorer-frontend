import { styled, Container } from "@mui/material";

export const StyledContainer = styled(Container)(({ theme }) => ({
  padding: "30px 0 40px",
  [theme.breakpoints.down("sm")]: {
    "& > div:first-child": {
      padding: "0 16px",
    },
  },
}));
