import { Snackbar, Alert, SnackbarProps, AlertProps, useTheme } from "@mui/material";
import {
  MdOutlineErrorOutline,
  MdOutlineCheckCircleOutline,
  MdInfoOutline,
  MdOutlineWarningAmber,
} from "react-icons/md";
import { AlertTitle } from "./styles";
interface ToastProps {
  open: boolean;
  onClose: () => void;
  messsage: string;
  severity?: AlertProps["severity"];
  horizontal?: "center" | "right" | "left";
  vertical?: "top" | "bottom";
  hideDuration?: number;
}

const Toast: React.FC<SnackbarProps & ToastProps> = ({
  onClose,
  messsage,
  severity = "success",
  horizontal = "right",
  vertical = "top",
  hideDuration = 3000,
  ...props
}) => {
  const titleAlert = (severity: AlertProps["severity"]) => {
    switch (severity) {
      case "error": {
        return "Error";
      }
      case "success": {
        return "Successfully";
      }
      case "warning": {
        return "Warning";
      }
      case "info": {
        return "Info";
      }
    }
  };
  const theme = useTheme();

  return (
    <Snackbar {...props} onClose={onClose} anchorOrigin={{ horizontal, vertical }} autoHideDuration={hideDuration}>
      <Alert
        iconMapping={{
          error: <MdOutlineErrorOutline color={theme.palette.error.dark} />,
          success: <MdOutlineCheckCircleOutline color={theme.palette.success.dark} />,
          info: <MdInfoOutline color={theme.palette.info.dark} />,
          warning: <MdOutlineWarningAmber color={theme.palette.info.dark} />,
        }}
        onClose={onClose}
        severity={severity}
        variant="standard"
        sx={{ width: "100%" }}
      >
        <AlertTitle severity={severity}>{titleAlert(severity)}</AlertTitle>
        {messsage || ""}
      </Alert>
    </Snackbar>
  );
};

export default Toast;
