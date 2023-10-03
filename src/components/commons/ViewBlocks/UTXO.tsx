import React, { useRef } from "react";
import { Typography, useTheme } from "@mui/material";

import { Polygon, PolygonDarkIcon, PoundSign } from "src/commons/resources";
import PopContent from "src/components/Contracts/common/PopContent";

import { CircleBox, PolygonContainer, PolygonContent } from "./styles";
import PopperStyled from "../PopperStyled";
import CustomIcon from "../CustomIcon";

export interface UTXOProps {
  onClick?: (e: any) => void;
  index?: number;
  hash?: string;
  detail?: (href: string) => string;
}
const UTXO: React.FC<UTXOProps> = React.forwardRef((props, ref) => {
  const theme = useTheme();
  const anchorEl = useRef();
  return (
    <PopperStyled
      render={({ handleClick }) => (
        <PolygonContainer ref={anchorEl}>
          {theme.isDark ? <PolygonDarkIcon /> : <Polygon />}
          <PolygonContent>
            <Typography
              display="flex"
              alignItems="center"
              gap={"4px"}
              fontWeight={500}
              color={theme.palette.primary.main}
            >
              UTXO
            </Typography>
            <CircleBox
              ref={ref}
              onClick={() =>
                typeof anchorEl !== "function" && anchorEl?.current && handleClick(anchorEl.current as HTMLElement)
              }
            >
              <CustomIcon
                icon={PoundSign}
                height={23}
                fill={theme.isDark ? theme.palette.common.black : theme.palette.common.white}
              />
            </CircleBox>
          </PolygonContent>
        </PolygonContainer>
      )}
      content={<PopContent hash={props.hash || ""} num={props.index} detail={props.detail} />}
    />
  );
});

UTXO.displayName = "UTXO";
export default UTXO;
