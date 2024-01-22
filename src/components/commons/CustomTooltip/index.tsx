import { Tooltip, TooltipProps, useTheme } from "@mui/material";
import { useEffect, useRef } from "react";

import { useScreen } from "src/commons/hooks/useScreen";

interface Props extends TooltipProps {
  wOpacity?: boolean;
}

export const CustomTooltip = (props: Props) => {
  const { componentsProps, placement, wOpacity = true, open, onClose, children, ...otherProps } = props;

  const theme = useTheme();
  const { isMobile } = useScreen();
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && isMobile) {
      const handleTouchOutside = (event: globalThis.TouchEvent) => {
        if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
          onClose?.(event);
        }
      };

      document.addEventListener("touchstart", handleTouchOutside);
      return () => {
        document.removeEventListener("touchstart", handleTouchOutside);
      };
    }
  }, [open, isMobile, onClose]);

  return (
    <Tooltip
      open={open}
      onClose={onClose}
      ref={tooltipRef}
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
