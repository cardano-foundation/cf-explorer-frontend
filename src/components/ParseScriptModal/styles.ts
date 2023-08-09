import { Box, styled } from "@mui/material";

export const SubTitle = styled(Box)(({ theme }) => ({
  color: theme.palette.secondary.main,
  marginBottom: 8
}));

export const ViewJson = styled(Box)(({ theme }) => ({
  overflowY: "auto",
  textAlign: "left",
  backgroundColor: theme.palette.common.white,
  borderRadius: 10,
  padding: theme.spacing(2),
  boxSizing: "border-box",
  overflow: "auto",
  width: "min(80vw, 800px)",

  "& .MuiSvgIcon-root": {
    display: "none !important"
  }
}));
