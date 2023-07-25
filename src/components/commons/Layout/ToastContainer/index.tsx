import { AlertProps, useTheme } from "@mui/material";
import {
  MdOutlineErrorOutline,
  MdOutlineCheckCircleOutline,
  MdInfoOutline,
  MdOutlineWarningAmber
} from "react-icons/md";
import { useSelector } from "react-redux";
import { isString } from "lodash";

import { removeToast } from "src/stores/toast";

import { StyledAlert, StyledStack, StyledTitle } from "./styles";

const ToastContainer: React.FC = () => {
  const theme = useTheme();
  const { toasts } = useSelector((state: RootState) => state.toast);

  const getTitle = (value: string | boolean, defaultValue: string): string | false => {
    if (isString(value)) return value;
    if (value === false) return false;
    return defaultValue;
  };

  const getProps = (
    severity: AlertProps["severity"],
    title: string | boolean
  ): { title: string | boolean; color: string; background: string } => {
    switch (severity) {
      case "error": {
        return {
          title: getTitle(title, "Error"),
          color: theme.palette.error.dark,
          background: theme.palette.error.light
        };
      }
      case "success": {
        return {
          title: getTitle(title, "Success"),
          color: theme.palette.success.dark,
          background: theme.palette.success.light
        };
      }
      case "warning": {
        return {
          title: getTitle(title, "Warning"),
          color: theme.palette.warning.dark,
          background: theme.palette.warning.light
        };
      }
      default: {
        return {
          title: getTitle(title, "Information"),
          color: theme.palette.info.dark,
          background: theme.palette.info.light
        };
      }
    }
  };
  return (
    <>
      <StyledStack spacing={2}>
        {toasts.map((item, idx) => {
          const { id, severity, message } = item;
          const { title, color, background } = getProps(severity, item.title);
          return (
            <StyledAlert
              key={idx}
              iconMapping={{
                error: <MdOutlineErrorOutline color={theme.palette.error.dark} />,
                success: <MdOutlineCheckCircleOutline color={theme.palette.success.dark} />,
                info: <MdInfoOutline color={theme.palette.info.dark} />,
                warning: <MdOutlineWarningAmber color={theme.palette.info.dark} />
              }}
              severity={severity}
              variant="standard"
              borderColor={color}
              background={background}
              onClose={() => removeToast(id)}
              onClick={() => removeToast(id)}
              icon={!title || undefined}
            >
              {title && <StyledTitle>{title}</StyledTitle>}
              {message}
            </StyledAlert>
          );
        })}
      </StyledStack>
    </>
  );
};

export default ToastContainer;
