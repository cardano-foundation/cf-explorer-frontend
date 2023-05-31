import { AlertProps, useTheme } from "@mui/material";
import {
  MdOutlineErrorOutline,
  MdOutlineCheckCircleOutline,
  MdInfoOutline,
  MdOutlineWarningAmber
} from "react-icons/md";
import { useSelector } from "react-redux";
import { removeToast } from "../../../../stores/toast";
import { StyledAlert, StyledStack, StyledTitle } from "./styles";

const ToastContainer: React.FC = () => {
  const theme = useTheme();
  const { toasts } = useSelector((state: RootState) => state.toast);

  const getProps = (severity: AlertProps["severity"]): { title: string; color: string; background: string } => {
    switch (severity) {
      case "error": {
        return { title: "Error", color: theme.palette.error.dark, background: theme.palette.error.light };
      }
      case "success": {
        return { title: "Successfully", color: theme.palette.success.dark, background: theme.palette.success.light };
      }
      case "warning": {
        return { title: "Warning", color: theme.palette.warning.dark, background: theme.palette.warning.light };
      }
      default: {
        return { title: "Info", color: theme.palette.info.dark, background: theme.palette.info.light };
      }
    }
  };
  return (
    <>
      <StyledStack spacing={2}>
        {toasts.map((item, idx) => {
          const { id, severity, message, duration } = item;
          const { title, color, background } = getProps(severity);
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
            >
              <StyledTitle>{title}</StyledTitle>
              {message}
            </StyledAlert>
          );
        })}
      </StyledStack>
    </>
  );
};

export default ToastContainer;
