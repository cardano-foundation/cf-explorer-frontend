import { styled, Box } from "@mui/material";

const Description = styled(Box)(({ theme }) => ({
  fontSize: 16,
  color: theme.palette.secondary.light,
  fontWeight: 400,
  marginTop: theme.spacing(2),
  textAlign: "left",
  width: "90%",
  [theme.breakpoints.down("md")]: {
    width: "100%"
  }
}));

export default Description;
