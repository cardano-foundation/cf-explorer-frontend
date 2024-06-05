import { Typography, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";

import { OutlineEye, Polygon, PolygonDarkIcon } from "src/commons/resources";

import CustomIcon from "../CustomIcon";
import { CircleBox, PolygonContainer, PolygonContent } from "./styles";

const OutputComponent = () => {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <PolygonContainer>
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
  );
};

export default OutputComponent;
