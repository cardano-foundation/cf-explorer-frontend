import { Typography, useTheme } from "@mui/material";

import { OutlineEye, Polygon, PolygonDarkRedIcon } from "src/commons/resources";

import CustomIcon from "../CustomIcon";
import { CircleBox, CustomBadge, PolygonContainer, PolygonContent } from "./styles";

interface BurnProps {
  total?: number;
  onClick: () => void;
}

const Burn: React.FC<BurnProps> = ({ total, onClick }) => {
  const theme = useTheme();
  return (
    <PolygonContainer>
      {theme.isDark ? <PolygonDarkRedIcon /> : <CustomIcon icon={Polygon} width={120} />}
      <PolygonContent>
        <Typography display="flex" gap="4px" alignItems="center" color={theme.palette.error[700]} fontWeight={500}>
          Burn{" "}
          <CustomBadge bgColor={theme.palette.error[700]} color={theme.isDark ? theme.palette.secondary[100] : ""}>
            {total}
          </CustomBadge>
        </Typography>
        <CircleBox onClick={onClick} bgColor={theme.palette.error[700]}>
          <CustomIcon icon={OutlineEye} width={21} fill={theme.palette.secondary[100]} />
        </CircleBox>
      </PolygonContent>
    </PolygonContainer>
  );
};

export default Burn;
