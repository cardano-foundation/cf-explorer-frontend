import { Alert, AlertTitle, Stack, styled } from "@mui/material";

export const StyledStack = styled(Stack)(() => ({
  position: "fixed",
  top: 15,
  right: 30,
  zIndex: 9999,
  alignItems: "flex-end",
  pointerEvents: "none"
}));

export const StyledAlert = styled(Alert)<{ background: string; borderColor: string }>(
  ({ theme, background, borderColor }) => ({
    width: "max-content",
    pointerEvents: "all",
    textAlign: "left",
    cursor: "pointer",
    color: theme.palette.text.secondary,
    backgroundColor: theme.palette.background.paper,
    backgroundImage: `linear-gradient(0deg, ${background} 0%, ${background} 100%)`,
    border: "1px solid " + borderColor,
    [theme.breakpoints.down("md")]: {
      width: "80%"
    }
  })
);

export const StyledTitle = styled(AlertTitle)(({ theme }) => ({
  textAlign: "left",
  fontWeight: "bold",
  color: theme.palette.text.primary
}));
