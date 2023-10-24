import { Typography, useTheme } from "@mui/material";
import React, { useRef } from "react";
import { useTranslation } from "react-i18next";

import { Polygon, PolygonDarkIcon, PoundSign } from "src/commons/resources";
import PopContent from "src/components/Contracts/common/PopContent";

import { CircleBox, PolygonContainer, PolygonContent } from "./styles";
import PopperStyled from "../PopperStyled";
import CustomIcon from "../CustomIcon";

interface ContractProps {
  hash?: string;
  detail?: (href: string) => string;
}

const Contract: React.FC<ContractProps> = ({ hash, detail }) => {
  const { t } = useTranslation();
  const anchorEl = useRef();
  const theme = useTheme();
  return (
    <PopperStyled
      placement="top"
      render={({ handleClick }) => (
        <PolygonContainer ref={anchorEl}>
          {theme.isDark ? <PolygonDarkIcon /> : <Polygon />}
          <PolygonContent>
            <Typography fontWeight={500} color={theme.palette.primary.main}>
              {t("contract.title")}
            </Typography>
            <CircleBox
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
      content={<PopContent detail={detail} hash={hash || ""} />}
    />
  );
};

export default Contract;
