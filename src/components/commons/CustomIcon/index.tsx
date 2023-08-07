import React, { useEffect, useRef, useState } from "react";
import { Box, BoxProps, styled } from "@mui/material";

const IconBox = styled(Box)(() => ({
  display: "inline-flex",
  justifyContent: "center",
  alignItems: "center"
}));

interface DefaultProps extends BoxProps {
  /**
   * Import default from svg, eg: import { ReactComponent as ProfileIcon } from "./profile.svg";
   */
  icon: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  /**
   * @requires width if not set height;
   */
  width?: number;
  /**
   * @requires height if not set width;
   */
  height?: number;
  /**
   * If not set originHeight, icon will invisible when first load;
   */
  originWidth?: number;
  /**
   * If not set originHeight, icon will invisible when first load;
   */
  originHeight?: number;
  /**
   * Apply color for fill of path. If fill = undefiend, fill color is svg origin color
   */
  fill?: "currentColor" | string;
  /**
   * Apply color for stroke of path. If stroke = undefiend, stroke color is svg origin color
   */
  stroke?: "currentColor" | string;
}
export type Props = DefaultProps & Required<{ width: number } | { height: number }>;

const CustomIcon: React.FC<Props> = React.forwardRef((props: Props, boxRef) => {
  const { icon, width, height, originWidth, originHeight, fill, stroke, ...otherProps } = props;
  const ref = useRef<SVGSVGElement | null>(null);
  const [svgWidth, setSvgWidth] = useState<number | undefined>(originWidth);
  const [svgHeight, setSvgWheight] = useState<number | undefined>(originHeight);
  const [mounted, setMounted] = useState<boolean>(!!originWidth && !!originHeight);

  useEffect(() => {
    if (ref.current) {
      setSvgWidth(ref.current?.width?.baseVal?.value);
      setSvgWheight(ref.current?.height?.baseVal?.value);
      setMounted(true);
    }
  }, []);
  const scaleX = svgWidth && (width || 0) / svgWidth;
  const scaleY = svgHeight && (height || 0) / svgHeight;

  const StyledIcon = styled(icon, { shouldForwardProp: (props) => props !== "ref" })<{ ref?: React.Ref<unknown> }>(
    () => ({
      transform: scaleX || scaleY ? `scale(${scaleX || scaleY},${scaleY || scaleX})` : "none",
      path: { fill, stroke }
    })
  );
  return (
    <IconBox
      width={width || height}
      height={height || width}
      ref={boxRef}
      {...otherProps}
      visibility={mounted ? "visible" : "hidden"}
    >
      <StyledIcon ref={ref} />
    </IconBox>
  );
});
CustomIcon.displayName = "CustomIcon";
export default CustomIcon;
