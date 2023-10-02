import { Typography, useTheme } from "@mui/material";

import { OutlineEye, Polygon } from "src/commons/resources";
import CustomIcon from "src/components/commons/CustomIcon";

import { CircleBox, CustomBadge, PolygonContainer, PolygonContent } from "./styles";

export interface AssetsProps {
  onClick?: () => void;
  total?: number;
}

const Assets: React.FC<AssetsProps> = ({ onClick, total }) => {
  const theme = useTheme();
  return (
    <PolygonContainer>
      <Polygon />
      <PolygonContent>
        <Typography display="flex" alignItems="center" gap={"4px"} fontWeight={500} color={theme.palette.primary.main}>
          Assets <CustomBadge>{total}</CustomBadge>
        </Typography>
        <CircleBox onClick={() => onClick?.()}>
          <CustomIcon icon={OutlineEye} width={21} fill="#FFF" />
        </CircleBox>
      </PolygonContent>
    </PolygonContainer>
  );
};

export default Assets;
