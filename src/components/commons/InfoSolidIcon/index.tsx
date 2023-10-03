import { styled } from "@mui/material";
import React from "react";

import SolidInfoIcon from "src/commons/resources/images/solid-info.png";

const InfoSolidIcon: React.FC<{ onClick: () => void }> = (props) => {
  return <Image src={SolidInfoIcon} alt="solld info" {...props} />;
};

const Image = styled("img")`
  width: 24px;
  height: 24px;
  cursor: pointer;
`;
export default InfoSolidIcon;
