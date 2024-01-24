import { Tooltip, TooltipProps, useTheme } from "@mui/material";

import { useScreen } from "src/commons/hooks/useScreen";

interface Props extends TooltipProps {
  wOpacity?: boolean;
}

export const CustomTooltip = (props: Props) => {
  const { componentsProps, placement, wOpacity = true, children, ...otherProps } = props;

  const theme = useTheme();
  const { isMobile } = useScreen();

  return (
    <Tooltip
      leaveDelay={0}
      leaveTouchDelay={0}
      enterNextDelay={0}
      enterTouchDelay={0}
      enterDelay={0}
      arrow
      placement={placement || "top"}
      componentsProps={{
        ...(componentsProps || {}),
        arrow: {
          ...(componentsProps?.arrow || {}),
          style: {
            fontSize: "var(--font-size-text-small)",
            color: theme.palette.common.black,
            ...(componentsProps?.arrow?.style || {})
          }
        },
        transition: {
          ...(componentsProps?.transition || {}),
          style: {
            maxWidth: isMobile ? "calc(100vw - 20px)" : 400,
            fontSize: "var(--font-size-text-small)",
            padding: "6px 8px",
            lineHeight: 1.5,
            backgroundColor: theme.palette.common.black,
            opacity: wOpacity ? 0.78 : 1,
            borderRadius: 2,
            ...(componentsProps?.transition?.style || {})
          }
        }
      }}
      {...otherProps}
    >
      {children}
    </Tooltip>
  );
};

export default CustomTooltip;
