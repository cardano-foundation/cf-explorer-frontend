import { Tooltip, TooltipProps, useTheme } from "@mui/material";
import { cloneElement, useState } from "react";

import { useScreen } from "src/commons/hooks/useScreen";

interface Props extends TooltipProps {
  wOpacity?: boolean;
}

export const CustomTooltip = (props: Props) => {
  const { componentsProps, placement, wOpacity = true, ...otherProps } = props;

  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const { isMobile } = useScreen();
  return (
    <Tooltip
      arrow
      open={open}
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
      {cloneElement(otherProps.children, {
        onMouseEnter: () => setOpen(true),
        onMouseLeave: () => setOpen(false),
        onWheel: () => setOpen(false)
      })}
    </Tooltip>
  );
};

export default CustomTooltip;
