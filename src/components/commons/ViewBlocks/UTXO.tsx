import React, { useRef } from "react";
import { Typography, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";

import { Polygon, PolygonDarkIcon, PoundSign } from "src/commons/resources";
import PopContent from "src/components/Contracts/common/PopContent";

import { CircleBox, PolygonContainer, PolygonContent } from "./styles";
import PopperStyled from "../PopperStyled";
import CustomIcon from "../CustomIcon";

export interface UTXOProps {
  onClick?: () => void;
  index?: number;
  hash?: string;
  detail?: (href: string) => string;
}
const UTXO: React.FC<UTXOProps> = React.forwardRef((props, ref) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const anchorEl = useRef();
  return (
    <PopperStyled
      placement="top"
      render={({ handleClick }) => (
        <PolygonContainer
          ref={anchorEl}
          onClick={() =>
            typeof anchorEl !== "function" && anchorEl?.current && handleClick(anchorEl.current as HTMLElement)
          }
        >
          {theme.isDark ? <PolygonDarkIcon /> : <Polygon />}
          <PolygonContent>
            <Typography
              display="flex"
              alignItems="center"
              gap={"4px"}
              fontWeight={500}
              color={theme.palette.primary.main}
            >
              {t("tab.utxo")}
            </Typography>
            <CircleBox ref={ref}>
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
