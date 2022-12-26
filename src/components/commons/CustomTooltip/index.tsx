import { Tooltip, TooltipProps } from "@mui/material";

export const CustomTooltip = (props: TooltipProps) => {
  const { componentsProps, ...otherProps } = props;
  return (
    <Tooltip
      arrow
      componentsProps={{
        ...(componentsProps || {}),
        arrow: {
          ...(componentsProps?.arrow || {}),
          style: {
            fontSize: "var(--font-size-text-large)",
            color: "#222222",
            ...(componentsProps?.arrow?.style || {}),
          },
        },
        transition: {
          ...(componentsProps?.transition || {}),
          style: {
            maxWidth: 400,
            fontSize: "var(--font-size-text-small)",
            padding: "10px 15px",
            lineHeight: 1.5,
            backgroundColor: "#222222",
            opacity: 0.94,
            ...(componentsProps?.transition?.style || {}),
          },
        },
      }}
      {...otherProps}
    />
  );
};

export default CustomTooltip;
