import { Tooltip, TooltipProps, useTheme } from "@mui/material";

import { useScreen } from "src/commons/hooks/useScreen";

interface Props extends TooltipProps {
  wOpacity?: boolean;
}

export const CustomTooltip = (props: Props) => {
  const { componentsProps, placement, wOpacity = true, ...otherProps } = props;
  const theme = useTheme();
  const { isMobile } = useScreen();
  return (
    <Tooltip
      arrow
      placement={placement || "top-start"}
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
    />
  );
};

export default CustomTooltip;
