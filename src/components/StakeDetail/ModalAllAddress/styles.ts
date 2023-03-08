import { styled, Box, Button } from "@mui/material";

export const ModalContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "min(80vw, 600px)",
  backgroundColor: theme.boxBackgroundColor,
  padding: theme.spacing(4),
  borderRadius: 10,
  textAlign: "left",
  maxHeight: "90vh",
  overflowY: "auto",
  "::-webkit-scrollbar": {
    width: "16px",
  },

  "::-webkit-scrollbar-thumb": {
    background: theme.gray_13,
    borderRadius: "8px",
    border: "4px solid transparent",
    backgroundClip: "padding-box",
    ":hover": {
      background: theme.gray_9,
      backgroundClip: "padding-box",
    },
    ":active": {
      background: theme.gray_4,
      backgroundClip: "padding-box",
    },
  },
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
