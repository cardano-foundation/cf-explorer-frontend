import { AlertProps } from "@mui/material";
import { addToast, removeToast } from "../../stores/toast";

type ToastFn = (message: React.ReactNode) => void;

interface FetchReturnType {
  error: ToastFn;
  success: ToastFn;
  warning: ToastFn;
  info: ToastFn;
}

const useToast = (): FetchReturnType => {
  const createToast =
    (severity: AlertProps["severity"]): ToastFn =>
    (message: React.ReactNode, duration: number = 3000) => {
      const id = performance.now();
      addToast({ id, severity, message, duration });
      setTimeout(() => removeToast(id), duration);
    };

  return {
    error: createToast("error"),
    success: createToast("success"),
    warning: createToast("warning"),
    info: createToast("info"),
  };
};

export default useToast;
