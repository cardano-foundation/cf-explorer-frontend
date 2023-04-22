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
}

const Line: React.FC<LineProps> = ({ fromRef, toRef, containerPosition, orient, pointFrom, pointTo }) => {
  const [coords, setCoords] = useState<{ from: { x?: number; y?: number }; to: { x?: number; y?: number } }>({
    from: {},
    to: {},
  });
  const [angle, setAngle] = useState(0);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      const fromRect = fromRef && fromRef.current && (fromRef.current as any).getBoundingClientRect();
      const toRect = toRef && toRef.current && (toRef.current as any).getBoundingClientRect();

      const fromCenter = {
        x: (fromRect as any)?.left + (fromRect as any)?.width / 2 - (containerPosition.left || 0),
        y: (fromRect as any)?.top + (fromRect as any)?.height / 2 - (containerPosition.top || 0),
      };

      const toCenter = {
        x: (toRect as any)?.left + (toRect as any)?.width / 2 - (containerPosition.left || 0),
        y: (toRect as any)?.top + (toRect as any)?.height / 2 - (containerPosition.top || 0),
      };

      // Tính toán góc giữa đường nối và trục hoành
      setAngle(Math.atan2(toCenter.y - fromCenter.y, toCenter.x - fromCenter.x));

      // Tính toán độ dời của đường nối
      setDistance(Math.sqrt(Math.pow(toCenter.y - fromCenter.y, 2) + Math.pow(toCenter.x - fromCenter.x, 2)));

      const distanceFromX = pointFrom === "border" ? (fromRect as any)?.width / 2 : 0;
      const distanceFromY = pointFrom === "border" ? (fromRect as any)?.height / 2 : 0;
      const distanceToX = pointTo === "border" ? (toRect as any)?.width / 2 : 0;
      const distanceToY = pointTo === "border" ? (toRect as any)?.height / 2 : 0;

      setCoords({
        from: {
          x: fromCenter.x + (orient === "vertical" ? distanceFromX : 0),
          y: fromCenter.y + (orient === "horizontal" ? distanceFromY : 0),
        },
        to: {
          x: toCenter.x - (orient === "vertical" ? distanceToX : 0),
          y: toCenter.y - (orient === "horizontal" ? distanceToY : 0),
        },
      });
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [containerPosition]);

  const props = useSpring({
    from: { x: coords.from?.x, y: coords.from?.y },
    to: { x: coords.to?.x, y: coords.to?.y },
    transform: `translate(-50%, -50%) rotate(${angle}rad)`,
    length: distance,
  });

  return (
    <animated.line
      x1={coords.from?.x}
      y1={coords.from?.y}
      x2={props.x}
      y2={props.y}
      stroke="#00000015"
      strokeWidth="3"
    />
  );
};

export default Line;
