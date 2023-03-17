import { Tooltip, TooltipProps, useTheme } from "@mui/material";

export const CustomTooltip = (props: TooltipProps) => {
  const { componentsProps, placement, ...otherProps } = props;
  const theme = useTheme();
  return (
    <Tooltip
      arrow
      placement={placement || "top"}
      componentsProps={{
        ...(componentsProps || {}),
        arrow: {
          ...(componentsProps?.arrow || {}),
          style: {
            fontSize: "var(--font-size-text-small)",
            color: theme.palette.common.black,
            ...(componentsProps?.arrow?.style || {}),
          },
        },
        transition: {
          ...(componentsProps?.transition || {}),
          style: {
            maxWidth: 400,
            fontSize: "var(--font-size-text-small)",
            padding: "6px 8px",
            lineHeight: 1.5,
            backgroundColor: theme.palette.common.black,
            opacity: 0.78,
            borderRadius: 2,
            ...(componentsProps?.transition?.style || {}),
          },
        },
      }}
      {...otherProps}
    />
  );
};

export default CustomTooltip;
