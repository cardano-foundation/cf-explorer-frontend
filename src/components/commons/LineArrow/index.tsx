import { useTheme } from "@emotion/react";
import { Breakpoint, styled } from "@mui/material";
import React, { CSSProperties, MutableRefObject, useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useWindowSize } from "react-use";

const StyledLine = styled("path")(({ theme }) => ({
  strokeWidth: 3,
  strokeLinecap: "round",
  stroke: theme.palette.primary[200],
  fill: "none"
}));

type PositionX = "left" | "center" | "right" | number;

type PositionY = "top" | "middle" | "bottom" | number;

type Position = [PositionX, PositionY] | Partial<{ [key in Breakpoint | number]: [PositionX, PositionY] }>;

type Direction = "top" | "bottom" | "left" | "right";

type Fold = "vertical" | "horizontal" | "none";

type Align = "start-vertical" | "start-horizontal" | "end-vertical" | "end-horizontal" | "none";

type DirectionOptions =
  | Direction
  | Partial<{
      [key in Breakpoint | number]: Direction;
    }>;

type FoldOptions =
  | Fold
  | Partial<{
      [key in Breakpoint | number]: Fold;
    }>;

type AlignOptions =
  | Align
  | Partial<{
      [key in Breakpoint | number]: Align;
    }>;

type PositionOffset = number[];

type PositionOffsetOptions =
  | PositionOffset
  | Partial<{
      [key in Breakpoint | number]: PositionOffset;
    }>;

export interface LineArrowItem {
  start: MutableRefObject<HTMLElement | null>;
  startPosition: Position;
  end: MutableRefObject<HTMLElement | null>;
  endPosition: Position;
  dashed?: boolean;
  startOffset?: PositionOffsetOptions;
  endOffset?: PositionOffsetOptions;
  arrow?: DirectionOptions;
  fold?: FoldOptions;
  autoAlign?: AlignOptions;
}

interface LineArrowProps extends LineArrowItem {
  parent: MutableRefObject<SVGSVGElement | null>;
  style?: CSSProperties;
}

export const LineArrow: React.FC<LineArrowProps> = (props) => {
  const {
    parent,
    start,
    startPosition,
    end,
    endPosition,
    dashed,
    startOffset = [],
    endOffset = [],
    arrow,
    fold,
    autoAlign,
    style
  } = props;
  const [mount, setMount] = useState(0);
  const { width } = useWindowSize(0);
  const ref = useRef<SVGPathElement | null>(null);
  const theme = useTheme();
  const { sidebar } = useSelector(({ user }: RootState) => user);

  useEffect(() => {
    setMount(0);
    const timeout = setTimeout(() => setMount((mount) => mount + 1), 100);
    return () => clearTimeout(timeout);
  }, [width]);

  useEffect(() => {
    setMount(0);
    const timeout = setTimeout(() => setMount((mount) => mount + 1), 300);
    return () => clearTimeout(timeout);
  }, [sidebar]);

  const getKey = (
    obj: Partial<{ [key in Breakpoint | number]: number[] | Position | string }>
  ): Breakpoint | number => {
    const listKeys: (Breakpoint | number)[] = Object.keys(obj) as (Breakpoint | number)[];
    const listPoints = listKeys.map((item) =>
      typeof item === "number" || Number(item) ? Number(item) : theme.breakpoints.values[item] || 0
    );
    const listMatch = listPoints.filter((item) => item <= width);
    const key = Math.max(...listMatch);
    const index = listPoints.indexOf(key);
    return listKeys[index];
  };

  const getOffsetX = (rect: DOMRect, positionX: PositionX): number => {
    if (typeof positionX === "object") {
      const key = getKey(positionX);
      return positionX[key] ? getOffsetX(rect, positionX[key]) : 0;
    }
    switch (positionX) {
      case "left":
        return 0 - 1.5;
      case "center":
        return rect.width / 2;
      case "right":
        return rect.width + 1.5;
      default:
        return positionX * rect.width;
    }
  };

  const getOffsetY = (rect: DOMRect, positionY: PositionY): number => {
    if (typeof positionY === "object") {
      const key = getKey(positionY);
      return positionY[key] ? getOffsetY(rect, positionY[key]) : 0;
    }
    switch (positionY) {
      case "top":
        return 0 - 1.5;
      case "middle":
        return rect.height / 2;
      case "bottom":
        return rect.height + 1.5;
      default:
        return positionY * rect.height;
    }
  };

  const getPosition = (position: Position): [PositionX, PositionY] => {
    if (!Array.isArray(position)) {
      const key = getKey(position);
      return position[key] || [0, 0];
    }
    return position;
  };

  const getPositionOffset = (positionOffset: PositionOffsetOptions): PositionOffset => {
    if (!Array.isArray(positionOffset)) {
      const key = getKey(positionOffset);
      return positionOffset[key] || [0, 0];
    }
    return positionOffset;
  };

  const getDirection = (direction: DirectionOptions): Direction => {
    if (typeof direction === "object") {
      const key = getKey(direction);
      return direction[key] || "left";
    }
    return direction;
  };

  const getAlign = (align: AlignOptions): Align => {
    if (typeof align === "object") {
      const key = getKey(align);
      return align[key] || "none";
    }
    return align;
  };

  const getAlignX = (x: number, startX: number, endX: number): number => {
    const align = autoAlign ? getAlign(autoAlign) : "none";
    switch (align) {
      case "start-vertical":
        return startX;
      case "end-vertical":
        return endX;
      default:
        return x;
    }
  };
  const getAlignY = (y: number, startY: number, endY: number): number => {
    const align = autoAlign ? getAlign(autoAlign) : "none";
    switch (align) {
      case "start-horizontal":
        return startY;
      case "end-horizontal":
        return endY;
      default:
        return y;
    }
  };

  const getFold = (fold: FoldOptions): Fold => {
    if (typeof fold === "object") {
      const key = getKey(fold);
      return fold[key] || "none";
    }
    return fold;
  };

  const d: string = useMemo(() => {
    let str = "";
    const parentRect = parent.current?.getBoundingClientRect();
    if (start.current && end.current && parentRect) {
      const startRect = start.current.getBoundingClientRect();
      const endRect = end.current.getBoundingClientRect();
      const [offsetStartX = 0, offsetStartY = 0] = getPositionOffset(startOffset);
      const [offsetEndX = 0, offsetEndY = 0] = getPositionOffset(endOffset);

      const [startPositionX, startPositionY] = getPosition(startPosition);
      const startX = startRect.x - parentRect.x + getOffsetX(startRect, startPositionX) + offsetStartX;
      const startY = startRect.y - parentRect.y + getOffsetY(startRect, startPositionY) + offsetStartY;

      const [endPositionX, endPositionY] = getPosition(endPosition);
      const endX = endRect.x - parentRect.x + getOffsetX(endRect, endPositionX) + offsetEndX;
      const endY = endRect.y - parentRect.y + getOffsetY(endRect, endPositionY) + offsetEndY;
      const alignStartX = getAlignX(startX, startX, endX);
      const alignStartY = getAlignY(startY, startY, endY);
      const alignEndX = getAlignX(endX, startX, endX);
      const alignEndY = getAlignY(endY, startY, endY);

      str += `M${alignStartX},${alignStartY}`;

      if (fold) {
        const direction = getFold(fold);
        switch (direction) {
          case "vertical":
            str += ` L${alignStartX},${endY}`;
            break;
          case "horizontal":
            str += ` L${alignEndX},${alignStartY}`;
            break;
          default:
        }
      }

      str += ` L${alignEndX},${alignEndY}`;

      if (arrow) {
        const direction = getDirection(arrow);
        switch (direction) {
          case "top":
            str += ` M${alignEndX - 7},${alignEndY - 7}`;
            str += ` L${alignEndX},${alignEndY}`;
            str += ` L${alignEndX + 7},${alignEndY - 7}`;
            break;
          case "bottom":
            str += ` M${alignEndX - 7},${alignEndY + 7}`;
            str += ` L${alignEndX},${alignEndY}`;
            str += ` L${alignEndX + 7},${alignEndY + 7}`;
            break;
          case "left":
            str += ` M${alignEndX - 7},${alignEndY - 7}`;
            str += ` L${alignEndX},${alignEndY}`;
            str += ` L${alignEndX - 7},${alignEndY + 7}`;
            break;
          case "right":
            str += ` M${alignEndX + 7},${alignEndY - 7}`;
            str += ` L${alignEndX},${alignEndY}`;
            str += ` L${alignEndX + 7},${alignEndY + 7}`;
            break;
          default:
        }
      }
    }

    return str;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mount]);

  if (!mount) return null;

  return <StyledLine d={d} ref={ref} strokeDasharray={dashed ? 20 : undefined} style={style} />;
};

export default LineArrow;
