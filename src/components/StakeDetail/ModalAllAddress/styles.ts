import { styled, Box, Button } from "@mui/material";

export const ModalContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -51%)",
  width: "min(80vw, 600px)",
  backfaceVisibility: "hidden",
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(4),
  borderRadius: 10,
  textAlign: "left",
  maxHeight: "70vh",
  overflowY: "auto",
  "::-webkit-scrollbar": {
    width: "8px"
  },
  willChange: "transform",
  "-webkit-font-smoothing": "subpixel-antialiased",

  "::-webkit-scrollbar-thumb": {
    background: theme.palette.grey["A400"],
    borderRadius: "8px",
    border: "4px solid transparent",
    backgroundClip: "padding-box",
    ":hover": {
      background: theme.palette.secondary.light,
      backgroundClip: "padding-box"
    },
    ":active": {
      background: theme.palette.secondary.light,
      backgroundClip: "padding-box"
    }
  },

  [`@media screen and (max-width: ${theme.breakpoints.values.md}px)`]: {
    marginTop: theme.spacing(4)
  }
}));

export const WrapContent = styled(Box)`
  max-height: calc(100% - 220px);
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: transparent;
  }
  &:hover {
    &::-webkit-scrollbar-thumb {
      background: ${(props) => props.theme.palette.secondary.light};
    }
    &::-webkit-scrollbar-track {
      background: ${(props) => props.theme.palette.primary[100]};
    }
  }
`;

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
