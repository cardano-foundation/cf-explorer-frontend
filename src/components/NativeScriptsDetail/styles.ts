import { Container, styled } from "@mui/material";

export const StyledContainer = styled(Container)(({ theme }) => ({
  padding: "30px 0 40px",
  [theme.breakpoints.down("sm")]: {
    "& > div:first-of-type": {
      padding: "0 16px"
    },
    "& > div:nth-of-type(2)": {
      marginTop: "20px",
      paddingLeft: "16px"
    }
  }
}));
