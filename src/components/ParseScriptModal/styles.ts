import { Box, styled } from "@mui/material";

import CustomModal from "../commons/CustomModal";

export const StyledCustomModal = styled(CustomModal)(() => ({
  boxSizing: "border-box",
  maxHeight: "70vh",
  overflow: "hidden"
}));

export const SubTitle = styled(Box)(({ theme }) => ({
  color: theme.palette.secondary.main,
  marginBottom: 8
}));

export const ViewJson = styled(Box)(({ theme }) => ({
  overflowY: "auto",
  textAlign: "left",
  backgroundColor: theme.isDark ? theme.palette.secondary[100] : theme.palette.common.white,
  borderRadius: 10,
  padding: theme.spacing(2),
  boxSizing: "border-box",
  overflow: "auto",
  width: "min(90vw, 800px)",
  "& .MuiSvgIcon-root": {
    display: "none !important"
  },
  "&::-webkit-scrollbar": {
    width: "5px"
  },
  "&::-webkit-scrollbar-track": {
    background: "transparent"
  },
  "&::-webkit-scrollbar-thumb": {
    background: "transparent"
  },
  "&:hover": {
    borderRadius: "8px 0px 0px 8px",
    "&::-webkit-scrollbar-thumb": {
      background: theme.palette.secondary.light
    },
    "&::-webkit-scrollbar-track": {
      background: theme.palette.primary[100]
    }
  }
}));
