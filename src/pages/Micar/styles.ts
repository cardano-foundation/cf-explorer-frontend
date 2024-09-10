import { Box, styled } from "@mui/material";

export const WrapHeading = styled(Box)`
  margin-bottom: 132px;
`;

export const HeadingPage = styled("h1")(({ theme }) => ({
  color: theme.palette.secondary.main,
  textAlign: "left",
  fontSize: "64px",
  paddingBottom: 0,
  marginBottom: 0,

  [theme.breakpoints.down(1024)]: {
    fontSize: "48px"
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "32px"
  }
}));

export const DescriptionText = styled("p")(({ theme }) => ({
  color: theme.palette.secondary.light,
  textAlign: "left",
  fontSize: "18px",
  fontWeight: 500,
  maxWidth: "700px",
  marginTop: 0,

  [theme.breakpoints.down(1024)]: {
    fontSize: "16px",
    maxWidth: "500px"
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "16px",
    maxWidth: "100%"
  }
}));
