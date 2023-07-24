import { Box, IconButton, styled } from "@mui/material";

export const ModalContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -51%)",
  width: "max-content",
  height: "max-content",
  backgroundColor: theme.palette.background.paper,
  borderRadius: 20,
  textAlign: "left",
  outline: "none",
  padding: "30px 40px 40px",
  maxWidth: "95vw",
  maxHeight: "95vh",
  boxSizing: "border-box",
  [theme.breakpoints.down("md")]: {
    padding: "30px 30px 40px"
  },
  [theme.breakpoints.down("sm")]: {
    padding: "20px 15px 25px",
    maxWidth: "98vw"
  }
}));

export const CloseButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  top: 10,
  right: 10,
  width: 30,
  height: 30,
  padding: 0,
  border: `1px solid ${theme.palette.grey["A100"]}`,
  cursor: "pointer",
  [theme.breakpoints.down("sm")]: {
    right: 15,
    zIndex: 10
  }
}));

export const WrapTitle = styled(Box)(({ theme }) => ({
  color: theme.palette.secondary.main,
  fontSize: 24,
  lineHeight: "28px",
  fontWeight: 700,
  marginBottom: 20,
  position: "relative",
  zIndex: 2,
  [theme.breakpoints.down("sm")]: {
    maxWidth: " 100% - 40px)",
    fontSize: 20,
    lineHeight: "23px"
  }
}));

export const ContentContainer = styled(Box)(() => ({
  maxWidth: "min(90vw, 1200px)",
  maxHeight: "min(90vh, 800px)",
  overflowY: "auto"
}));
