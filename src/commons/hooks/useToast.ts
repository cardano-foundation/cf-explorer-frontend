import { AlertProps } from "@mui/material";

import { addToast, removeToast } from "../../stores/toast";

type ToastFn = (message: React.ReactNode, title?: boolean | string) => void;

interface FetchReturnType {
  error: ToastFn;
  success: ToastFn;
  warning: ToastFn;
  info: ToastFn;
}

const useToast = (): FetchReturnType => {
  const createToast =
    (severity: AlertProps["severity"]): ToastFn =>
    (message: React.ReactNode, title?: string | boolean, duration = 3000) => {
      const id = performance.now();
      addToast({ id, severity, message, duration, title: title ?? true });
      setTimeout(() => removeToast(id), duration);
    };

  return {
    error: createToast("error"),
    success: createToast("success"),
    warning: createToast("warning"),
    info: createToast("info")
  };
};

export default useToast;
