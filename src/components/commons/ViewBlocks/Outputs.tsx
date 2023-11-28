import { Box, Typography, useTheme } from "@mui/material";
import React, { createRef, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

import { OutlineEye, Polygon, PolygonDarkIcon } from "src/commons/resources";

import CustomIcon from "../CustomIcon";
import PopperStyled from "../PopperStyled";
import { CircleBox, OutputsUTXOLink, PolygonContainer, PolygonContent } from "./styles";

interface ContractProps {
  title?: string;
  link?: string;
}

const Outputs: React.FC<ContractProps> = ({ title, link }) => {
  const { t } = useTranslation();
  const popoverRef = createRef<{ trickerClose: () => void }>();
  const history = useHistory();
  const anchorEl = useRef();
  const theme = useTheme();

  const goToDetail = () => {
    if (link) {
      history.replace(link);
      popoverRef.current?.trickerClose();
    }
  };
  return (
    <PopperStyled
      ref={popoverRef}
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
              <CustomIcon icon={OutlineEye} width={21} fill={theme.palette.secondary[100]} />
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
