import { Box, styled, IconButton } from "@mui/material";
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

export const ButtonClose = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  top: 10,
  right: 10,
  width: 30,
  height: 30,
  padding: 0,
  border: `1px solid ${theme.mode === "light" ? theme.palette.primary[200] : theme.palette.secondary[600]}`,
  cursor: "pointer",
  [theme.breakpoints.down("sm")]: {
    right: 15,
    zIndex: 10
  }
}));
export const ViewJson = styled(Box)(({ theme }) => ({
  overflowY: "auto",
  textAlign: "left",
  backgroundColor: `${theme.palette.secondary[0]}`,
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
        background: theme.palette.primary[100]
      }
    }
  }
}));

export const ButtonLink = styled(Link)(({ theme }) => ({
  fontWeight: "bold",
  color: `${theme.palette.primary.main} !important`,
  fontFamily: "Roboto, sans-serif !important",
  textAlign: "left",
  wordBreak: "break-all",
  marginTop: theme.spacing(2),
  display: "inline"
}));
