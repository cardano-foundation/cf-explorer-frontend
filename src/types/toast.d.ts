declare interface ToastItem {
  id: number;
  severity: AlertProps["severity"];
  message: React.ReactNode;
  duration?: number;
}

declare interface ToastStoreType {
  toasts: Required<ToastItem>[];
}
