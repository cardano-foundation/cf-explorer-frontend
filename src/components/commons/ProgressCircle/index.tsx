import { CircularProgressbarWithChildren } from "react-circular-progressbar";

const ProgressCircle = ({
  percent,
  children,
  width = 200,
}: {
  percent: number;
  children?: React.ReactNode;
  width?: number;
}) => {
  const gradientTransform = `rotate(90)`;

  return (
    <div style={{ width: width, display: "flex" }}>
      <svg style={{ height: 0, width: 0 }}>
        <defs>
          <linearGradient id={"progress"} gradientTransform={gradientTransform}>
            <stop offset="0%" stopColor={"#184C78"} />
            <stop offset="100%" stopColor={"#5A9C56"} />
          </linearGradient>
        </defs>
      </svg>

      <CircularProgressbarWithChildren styles={{ path: { stroke: `url(#progress)` } }} value={percent}>
        <>{children}</>
      </CircularProgressbarWithChildren>
    </div>
  );
};

export default ProgressCircle;
