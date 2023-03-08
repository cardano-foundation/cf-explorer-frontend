import { Snackbar, Alert, SnackbarProps, AlertProps } from "@mui/material";
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

  return (
    <Snackbar {...props} onClose={onClose} anchorOrigin={{ horizontal, vertical }} autoHideDuration={hideDuration}>
      <Alert
        iconMapping={{
          error: <MdOutlineErrorOutline color="#dd4343" />,
          success: <MdOutlineCheckCircleOutline color="#29744d" />,
          info: <MdInfoOutline color={"#108aef"} />,
          warning: <MdOutlineWarningAmber color="#ffa800" />,
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
