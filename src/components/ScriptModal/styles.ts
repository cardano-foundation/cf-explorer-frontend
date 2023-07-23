import { Box, styled, Button, alpha } from "@mui/material";
import { Link } from "react-router-dom";

export const ModalContainer = styled(Box)(({ theme }) => ({
  maxheight: "80vh",
  overflow: "hidden",
  position: "relative",
  top: "50%",
  left: "50%",
  display: "flex",
  flexDirection: "column",
  transform: "translate(-50%, -50%)",
  width: "min(80vw, 550px)",
  maxHeight: "90vh",
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(4),
  borderRadius: 10,
  textAlign: "left"
}));

export const ButtonClose = styled(Button)(({ theme }) => ({
  position: "absolute",
  top: theme.spacing(2),
  right: theme.spacing(2),
  width: 30,
  height: 30,
  borderRadius: "50%",
  padding: 0,
  minWidth: 0
}));

export const ViewJson = styled(Box)(({ theme }) => ({
  overflowY: "auto",
  textAlign: "left",
  backgroundColor: `${alpha(theme.palette.secondary.light, 0.1)}`,
  borderRadius: 10,
  padding: theme.spacing(2),
  maxHeight: "50vh",
  [theme.breakpoints.up("md")]: {
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
      "&::-webkit-scrollbar-thumb": {
        background: theme.palette.secondary.light
      },
      "&::-webkit-scrollbar-track": {
        background: theme.palette.grey[100]
      }
    }
  }
}));

export const ButtonLink = styled(Link)(({ theme }) => ({
  fontWeight: "bold",
  color: `${theme.palette.secondary.main} !important`,
  fontFamily: "Roboto, sans-serif !important",
  textAlign: "left",
  wordBreak: "break-all",
  marginTop: theme.spacing(2),
  display: "inline"
}));
