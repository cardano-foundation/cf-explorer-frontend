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
          color: theme.palette.error[700],
          background: theme.palette.error[100]
        };
      }
      case "success": {
        return {
          title: getTitle(title, "Success"),
          color: theme.palette.success[800],
          background: theme.palette.success[100]
        };
      }
      case "warning": {
        return {
          title: getTitle(title, "Warning"),
          color: theme.palette.warning[800],
          background: theme.palette.warning[100]
        };
      }
      default: {
        return {
          title: getTitle(title, "Information"),
          color: theme.palette.info.main,
          background: theme.palette.info.dark
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
                error: <MdOutlineErrorOutline color={theme.palette.error[700]} />,
                success: <MdOutlineCheckCircleOutline color={theme.palette.success[800]} />,
                info: <MdInfoOutline color={theme.palette.info.main} />,
                warning: <MdOutlineWarningAmber color={theme.palette.warning[800]} />
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
