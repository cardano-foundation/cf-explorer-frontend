import { BoxProps, Typography, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import { forwardRef } from "react";

import { OutlineEye, Polygon, PolygonDarkIcon } from "src/commons/resources";
import CustomIcon from "src/components/commons/CustomIcon";

import { CircleBox, CustomBadge, PolygonContainer, PolygonContent } from "./styles";

export interface AssetsProps extends BoxProps {
  onClick?: () => void;
  total?: number;
  isBurned?: boolean;
}

const Assets: React.FC<AssetsProps> = forwardRef(({ onClick, total, isBurned }, ref) => {
  const { t } = useTranslation();
  const theme = useTheme();
  return (
    <PolygonContainer ref={ref}>
      {theme.isDark ? <PolygonDarkIcon /> : <Polygon />}
      <PolygonContent>
        <Typography display="flex" alignItems="center" gap={"4px"} fontWeight={500} color={theme.palette.primary.main}>
          {t("contract.assets")}{" "}
          <CustomBadge
            bgColor={theme.isDark && isBurned ? theme.palette.primary.main : ""}
            color={theme.isDark && isBurned ? theme.palette.secondary[100] : ""}
          >
            {total}
          </CustomBadge>
        </Typography>
        <CircleBox onClick={() => onClick?.()}>
          <CustomIcon icon={OutlineEye} width={21} fill={theme.palette.secondary[100]} />
        </CircleBox>
      </PolygonContent>
    </PolygonContainer>
  );
});

Assets.displayName = "Assets";

export default Assets;
