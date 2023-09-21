import { styled } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useWindowSize } from "react-use";
import { useSelector } from "react-redux";

import LineArrow, { LineArrowItem } from "../LineArrow";

const DrawPathContainer = styled("svg")(() => ({
  top: 0,
  right: 0,
  position: "absolute",
  display: "block",
  pointerEvents: "none"
}));

interface Props {
  paths: LineArrowItem[];
}

export const DrawPath: React.FC<Props> = ({ paths }) => {
  const [size, setSize] = useState<[number, number]>([0, 0]);
  const { width } = useWindowSize(0);
  const ref = useRef<SVGSVGElement | null>(null);
  const { sidebar } = useSelector(({ user }: RootState) => user);

  useEffect(() => {
    const parent = ref.current?.parentElement;
    if (parent) {
      setSize([parent.getBoundingClientRect().width, parent.getBoundingClientRect().height]);
    }
  }, [width, sidebar]);

  return (
    <DrawPathContainer ref={ref} xmlns="http://www.w3.org/2000/svg" style={{ width: size[0], height: size[1] }}>
      {paths.map((path, index) => (
        <LineArrow key={index} {...path} parent={ref} />
      ))}
    </DrawPathContainer>
  );
};

export default DrawPath;
