import { Snackbar, Alert, SnackbarProps, AlertProps } from "@mui/material";

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
  return (
    <Snackbar {...props} onClose={onClose} anchorOrigin={{ horizontal, vertical }} autoHideDuration={hideDuration}>
      <Alert onClose={onClose} severity={severity} sx={{ width: "100%" }}>
        {messsage || ""}
      </Alert>
    </Snackbar>
  );
};

export default Toast;
