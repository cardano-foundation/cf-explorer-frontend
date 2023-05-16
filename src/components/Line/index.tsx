import { MutableRefObject, useEffect, useState } from "react";
import { useSpring, animated } from "react-spring";

interface LineProps {
  fromRef: MutableRefObject<null>;
  toRef: MutableRefObject<null>;
  containerPosition: {
    top?: number | undefined;
    left?: number | undefined;
  };
  pointFrom?: "center" | "border";
  pointTo?: "center" | "border";
  orient?: "horizontal" | "vertical";
  isCentalHorizontal?: boolean;
  connectFromReverse?: boolean;
  connectToReverse?: boolean;
  isCentalVertical?: boolean;
  isCentalHorizontalFrom?: boolean;
  dashed?: boolean;
}
const Line: React.FC<LineProps> = ({
  fromRef,
  toRef,
  containerPosition,
  orient,
  pointFrom,
  pointTo,
  isCentalHorizontalFrom = false,
  isCentalHorizontal = true,
  isCentalVertical = true,
  connectFromReverse = false,
  connectToReverse = false,
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
    const yTo = toCenter.y - (orient === "horizontal" ? (connectToReverse ? distanceToY * -1 : distanceToY) : 0);
    setLength(Math.sqrt((xTo - xFrom) ** 2 + (yTo - xTo) ** 2));

    setCoords({
      from: {
        x: isCentalHorizontalFrom ? xTo : xFrom,
        y: isCentalVertical ? yFrom : yTo
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
    <animated.line
      strokeDasharray={dashed ? 20 : undefined}
      strokeDashoffset={dashed ? length : undefined}
      x1={coords.from?.x}
      y1={coords.from?.y}
      x2={props.x}
      y2={props.y}
      stroke='#00000015'
      strokeWidth='3'
    />
  );
};

export default Line;
