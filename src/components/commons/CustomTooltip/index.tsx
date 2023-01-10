import { Tooltip, TooltipProps } from "@mui/material";

export const CustomTooltip = (props: TooltipProps & { width?: string }) => {
  const { width, componentsProps, placement, ...otherProps } = props;
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
            color: "rgba(0, 0, 0)",
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
            backgroundColor: "rgba(0, 0, 0 )",
            opacity: 0.78,
            borderRadius: 2,
            ...(componentsProps?.transition?.style || {}),
          },
        },
      }}
      style={{ width: width ? width : "" }}
      {...otherProps}
    />
  );
};

export default CustomTooltip;
