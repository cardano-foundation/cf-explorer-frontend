import { styled, AlertTitle as AlertTitleMui, AlertProps } from "@mui/material";

export const AlertTitle = styled(AlertTitleMui)<{ severity: AlertProps["severity"] }>(({ theme, severity }) => {
  const color = (severity: AlertProps["severity"]) => {
    switch (severity) {
      case "error": {
        return theme.colorRed;
      }
      case "success": {
        return theme.colorGreen;
      }
      case "warning": {
        return theme.colorYellow;
      }
      case "info": {
        return theme.colorBlue;
      }
      default: {
        return theme.colorGreen;
      }
    }
  };

  return {
    textAlign: "left",
    fontWeight: "bold",
    color: color(severity),
  };
});
