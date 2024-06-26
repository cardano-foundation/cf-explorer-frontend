import { BoxProps, Typography, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import { memo } from "react";

import { OutlineEye, Polygon, PolygonDarkRedIcon } from "src/commons/resources";

import CustomIcon from "../CustomIcon";
import { CircleBox, CustomBadge, PolygonContainer, PolygonContent } from "./styles";

interface BurnProps extends BoxProps {
  total?: number;
  onClick: () => void;
}

const Burn: React.FC<BurnProps> = memo(({ total, onClick }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  return (
    <PolygonContainer onClick={onClick}>
      {theme.isDark ? <PolygonDarkRedIcon /> : <Polygon />}
      <PolygonContent>
        <Typography display="flex" gap="4px" alignItems="center" color={theme.palette.error[700]} fontWeight={500}>
          {t("contract.burn")}{" "}
          <CustomBadge bgColor={theme.palette.error[700]} color={theme.isDark ? theme.palette.secondary[100] : ""}>
            {total}
          </CustomBadge>
        </Typography>
        <CircleBox bgColor={theme.palette.error[700]}>
          <CustomIcon icon={OutlineEye} width={21} fill={theme.palette.secondary[100]} />
        </CircleBox>
      </PolygonContent>
    </PolygonContainer>
  );
});
Burn.displayName = "Burn";

export default Burn;
