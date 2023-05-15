import React, { MutableRefObject, useEffect, useState } from "react";
import { useSpring, animated } from "react-spring";

interface ArrowDiagramProps {
  fromRef: MutableRefObject<null>;
  toRef: MutableRefObject<null>;
  containerPosition: {
    top?: number | undefined;
    left?: number | undefined;
  };
  pointFrom?: "center" | "border";
  pointTo?: "center" | "border";
  orient?: "horizontal" | "vertical";

  connectFromReverse?: boolean;
  connectToReverse?: boolean;

  isCentalHorizontal?: boolean;
  isCentalVertical?: boolean;
  isCentalHorizontalFrom?: boolean;
  dashed?: boolean;
}

const ArrowDiagram: React.FC<ArrowDiagramProps> = ({
  fromRef,
  toRef,
  containerPosition,
  orient,
  pointFrom,
  pointTo,
  isCentalHorizontalFrom = false,
  connectFromReverse = false,
  connectToReverse = false,
  isCentalHorizontal = true,
  isCentalVertical = true,
  dashed = false
}) => {
  const [coords, setCoords] = useState<{ from: { x?: number; y?: number }; to: { x?: number; y?: number } }>({
    from: {},
    to: {}
  });
  const [angle, setAngle] = useState(0);
  const [distance, setDistance] = useState(0);
  const [length, setLength] = useState(0);

  const handleResize = () => {
    const fromRect = fromRef && fromRef.current && (fromRef.current as any).getBoundingClientRect();
    const toRect = toRef && toRef.current && (toRef.current as any).getBoundingClientRect();

    const fromCenter = {
      x: (fromRect as any)?.left + (fromRect as any)?.width / 2 - (containerPosition.left || 0),
      y: (fromRect as any)?.top + (fromRect as any)?.height / 2 - (containerPosition.top || 0)
    };

    const toCenter = {
      x: (toRect as any)?.left + (toRect as any)?.width / 2 - (containerPosition.left || 0),
      y: (toRect as any)?.top + (toRect as any)?.height / 2 - (containerPosition.top || 0)
    };

    // Tính toán góc giữa đường nối và trục hoành
    setAngle(Math.atan2(toCenter.y - fromCenter.y, toCenter.x - fromCenter.x));

    // Tính toán độ dời của đường nối
    setDistance(Math.sqrt(Math.pow(toCenter.y - fromCenter.y, 2) + Math.pow(toCenter.x - fromCenter.x, 2)));

    const distanceFromX = pointFrom === "border" ? (fromRect as any)?.width / 2 : 0;
    const distanceFromY = pointFrom === "border" ? (fromRect as any)?.height / 2 : 0;
    const distanceToX = pointTo === "border" ? (toRect as any)?.width / 2 : 0;
    const distanceToY = pointTo === "border" ? (toRect as any)?.height / 2 : 0;

    const xFrom =
      fromCenter.x + (orient === "vertical" ? (connectFromReverse ? distanceFromX * -1 : distanceFromX) : 0);
    const yFrom =
      fromCenter.y + (orient === "horizontal" ? (connectFromReverse ? distanceFromY * -1 : distanceFromY) : 0);
    const xTo = toCenter.x - (orient === "vertical" ? (connectToReverse ? distanceToX * -1 : distanceToX) : 0);
    const yTo = toCenter.y + (orient === "horizontal" ? (connectToReverse ? distanceToY * -1 : distanceToY) : 0);

    setLength(Math.sqrt((xTo - xFrom) ** 2 + (yTo - xTo) ** 2));

    setCoords({
      from: {
        x: isCentalHorizontalFrom ? xTo : xFrom,
        y: isCentalVertical ? yFrom : yTo,
      },
      to: {
        x: xTo,
        y: isCentalHorizontal ? yTo : yFrom
      }
    });
  };

  useEffect(() => {
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [containerPosition]);

  const props = useSpring({
    from: { x: coords.from?.x, y: coords.from?.y },
    to: { x: coords.to?.x, y: coords.to?.y },
    transform: `translate(-50%, -50%) rotate(${angle}rad)`,
    length: distance
  });

  return (
    <>
      <defs>
        <marker id='arrowhead' markerWidth='10' markerHeight='8' refX='6' refY='4' orient='auto'>
          <svg width='10' height='8' viewBox='0 0 12 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
              opacity='0.15'
              d='M10.8839 10.8839C11.372 10.3957 11.372 9.60427 10.8839 9.11612L2.92893 1.16117C2.44078 0.67301 1.64932 0.67301 1.16117 1.16117C0.67301 1.64932 0.67301 2.44078 1.16117 2.92893L8.23223 10L1.16117 17.0711C0.67301 17.5592 0.67301 18.3507 1.16117 18.8388C1.64932 19.327 2.44078 19.327 2.92893 18.8388L10.8839 10.8839ZM9 11.25H10V8.75H9V11.25Z'
              fill='black'
            />
          </svg>
        </marker>
      </defs>

      <animated.line
        strokeDasharray={dashed ? 20 : undefined}
        strokeDashoffset={dashed ? length : undefined}
        x1={coords.from?.x}
        y1={coords.from?.y}
        x2={props.x}
        y2={props.y}
        stroke='#00000015'
        strokeWidth='3'
        markerEnd='url(#arrowhead)'
      />
    </>
  );
};

export default ArrowDiagram;
