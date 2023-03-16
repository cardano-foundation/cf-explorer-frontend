import { styled, AlertTitle as AlertTitleMui, AlertProps } from "@mui/material";

export const AlertTitle = styled(AlertTitleMui)<{ severity: AlertProps["severity"] }>(({ theme, severity }) => {
  const color = (severity: AlertProps["severity"]) => {
    switch (severity) {
      case "error": {
        return theme.palette.error.dark;
      }
      case "success": {
        return theme.palette.success.dark;
      }
      case "warning": {
        return theme.palette.warning.dark;
      }
      case "info": {
        return theme.palette.info.dark;
      }
      default: {
        return theme.palette.success.dark;
      }
    }
  };

  return {
    textAlign: "left",
    fontWeight: "bold",
    color: color(severity),
  };
});
