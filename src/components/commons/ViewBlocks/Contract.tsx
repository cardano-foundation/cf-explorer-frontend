import { Typography, useTheme } from "@mui/material";
import React, { useRef } from "react";

import { Polygon, PoundSign } from "src/commons/resources";
import PopContent from "src/components/Contracts/common/PopContent";

import { CircleBox, PolygonContainer, PolygonContent } from "./styles";
import PopperStyled from "../PopperStyled";

interface ContractProps {
  hash?: string;
  detail?: (href: string) => string;
}

const Contract: React.FC<ContractProps> = ({ hash, detail }) => {
  const anchorEl = useRef();
  const theme = useTheme();
  return (
    <PopperStyled
      placement="top"
      render={({ handleClick }) => (
        <PolygonContainer ref={anchorEl}>
          <Polygon />
          <PolygonContent>
            <Typography fontWeight={500} color={theme.palette.primary.main}>
              Contract
            </Typography>
            <CircleBox
              onClick={() =>
                typeof anchorEl !== "function" && anchorEl?.current && handleClick(anchorEl.current as HTMLElement)
              }
            >
              <PoundSign />
            </CircleBox>
          </PolygonContent>
        </PolygonContainer>
      )}
      content={<PopContent detail={detail} hash={hash || ""} />}
    />
  );
};

export default Contract;
