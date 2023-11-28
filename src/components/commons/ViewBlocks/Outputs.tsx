import { Box, Typography, useTheme } from "@mui/material";
import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

import { EyeIcon, Polygon, PolygonDarkIcon } from "src/commons/resources";

import CustomIcon from "../CustomIcon";
import PopperStyled from "../PopperStyled";
import { CircleBox, OutputsUTXOLink, PolygonContainer, PolygonContent } from "./styles";

interface ContractProps {
  title?: string;
  link?: string;
}

const Outputs: React.FC<ContractProps> = ({ title, link }) => {
  const { t } = useTranslation();
  const history = useHistory();
  const anchorEl = useRef();
  const theme = useTheme();

  const goToDetail = () => {
    if (link) history.replace(link);
  };
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
            <Typography fontWeight={500} color={theme.palette.primary.main}>
              {t("outputs.label")}
            </Typography>
            <CircleBox>
              <CustomIcon
                icon={EyeIcon}
                height={23}
                fill={theme.isDark ? theme.palette.common.black : theme.palette.common.white}
              />
            </CircleBox>
          </PolygonContent>
        </PolygonContainer>
      )}
      content={
        <Box px="10px" py="6px">
          <OutputsUTXOLink onClick={goToDetail}>{title}</OutputsUTXOLink>
        </Box>
      }
    />
  );
};

export default Outputs;
