declare interface ToastItem {
  id: number;
  severity: AlertProps["severity"];
  message: React.ReactNode;
  duration?: number;
  title?: string | boolean;
}

declare interface ToastStoreType {
  toasts: Required<ToastItem>[];
}
