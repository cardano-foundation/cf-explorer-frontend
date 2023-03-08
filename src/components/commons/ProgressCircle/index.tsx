import { useTheme } from "@mui/material";
import React from "react";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

interface Props {
  percent: number;
  children?: React.ReactNode;
  size?: number;
  width?: number;
  pathWidth?: number;
  pathLineCap?: "butt" | "round" | "square" | "inherit";
  trailWidth?: number;
  trailOpacity?: number;
}

const ProgressCircle: React.FC<Props> = props => {
  const theme = useTheme();
  const {
    percent,
    children,
    pathLineCap,
    size = 200,
    width,
    pathWidth = 8,
    trailWidth = 8,
    trailOpacity = 0.8,
  } = props;
  const gradientTransform = `rotate(90)`;

  return (
    <div style={{ width: width || size, display: "flex" }}>
      <svg style={{ height: 0, width: 0 }}>
        <defs>
          <linearGradient id={"progress"} gradientTransform={gradientTransform}>
            <stop offset="0%" stopColor={theme.green_9} />
            <stop offset="100%" stopColor={theme.green_8} />
          </linearGradient>
        </defs>
      </svg>

      <CircularProgressbarWithChildren
        styles={{
          path: { stroke: `url(#progress)`, strokeWidth: pathWidth, strokeLinecap: pathLineCap },
          trail: {
            strokeWidth: trailWidth,
            fill: theme.boxBackgroundColor,
            stroke: theme.gradient_8,
            opacity: trailOpacity,
          },
        }}
        value={percent}
      >
        <>{children}</>
      </CircularProgressbarWithChildren>
    </div>
  );
};

export default ProgressCircle;
