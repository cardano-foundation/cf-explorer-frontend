import { styled } from "@mui/material";
import React from "react";

import SolidInfoIcon from "src/commons/resources/images/solid-info.png";

const InfoSolidIcon: React.FC<{ onClick: () => void; width?: string; height?: string }> = ({
  width = "24px",
  height = "24px",
  ...rest
}) => {
  return <Image src={SolidInfoIcon} alt="solld info" {...rest} width={width} height={height} />;
};

const Image = styled("img")`
  cursor: pointer;
`;
export default InfoSolidIcon;
