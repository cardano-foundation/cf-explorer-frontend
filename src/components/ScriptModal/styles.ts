import { Box, styled, Button } from "@mui/material";
import { Link } from "react-router-dom";

export const ModalContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "min(80vw, 350px)",
  backgroundColor: "#fff",
  padding: theme.spacing(4),
  borderRadius: theme.borderRadius,
  textAlign: "left",
}));

export const ButtonClose = styled(Button)(({ theme }) => ({
  position: "absolute",
  top: theme.spacing(2),
  right: theme.spacing(2),
  width: 30,
  height: 30,
  borderRadius: "50%",
  padding: 0,
  minWidth: 0,
}));

export const ViewJson = styled(Box)(({ theme }) => ({
  textAlign: "left",
  backgroundColor: "rgba(152, 162, 179, 0.1)",
  borderRadius: theme.borderRadius,
  padding: theme.spacing(2),

  "& .MuiSvgIcon-root": {
    display: "none !important",
  },
}));

export const ButtonLink = styled(Link)(({ theme }) => ({
  fontWeight: "bold",
  color: `${theme.colorBlue} !important`,
  fontFamily: "Helvetica, monospace !important",
  textAlign: "left",
  wordBreak: "break-all",
  marginTop: theme.spacing(2),
  display: "inline",
}));
