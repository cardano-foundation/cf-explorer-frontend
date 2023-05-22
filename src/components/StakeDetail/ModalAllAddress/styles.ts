import { styled, Box, Button } from "@mui/material";

export const ModalContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "min(80vw, 600px)",
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(4),
  borderRadius: 10,
  textAlign: "left",
  maxHeight: "90vh",
  overflowY: "auto",
  "::-webkit-scrollbar": {
    width: "16px"
  },

  "::-webkit-scrollbar-thumb": {
    background: theme.palette.grey["A400"],
    borderRadius: "8px",
    border: "4px solid transparent",
    backgroundClip: "padding-box",
    ":hover": {
      background: theme.palette.grey[300],
      backgroundClip: "padding-box"
    },
    ":active": {
      background: theme.palette.grey[400],
      backgroundClip: "padding-box"
    }
  },

  [`@media screen and (max-width: ${theme.breakpoints.values.md}px)`]: {
    marginTop: theme.spacing(4)
  }
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
