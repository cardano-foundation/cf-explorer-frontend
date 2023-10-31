import { Typography, useTheme } from "@mui/material";
import { useRef } from "react";
import { useTranslation } from "react-i18next";

import { Polygon, PolygonDarkIcon, PoundSign } from "src/commons/resources";
import PopContent from "src/components/Contracts/common/PopContent";

import CustomIcon from "../CustomIcon";
import PopperStyled from "../PopperStyled";
import { CircleBox, PolygonContainer, PolygonContent } from "./styles";

interface PolicyIDProps {
  hash?: string;
  detail?: (href: string) => string;
}

const PolicyID: React.FC<PolicyIDProps> = ({ hash, detail }) => {
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
            <Typography whiteSpace={"nowrap"} fontWeight={500} color={theme.palette.primary.main}>
              {t("filter.scriptHash")}
            </Typography>
            <CircleBox
              onClick={() =>
                typeof anchorEl !== "function" && anchorEl?.current && handleClick(anchorEl.current as HTMLElement)
              }
            >
              <CustomIcon icon={PoundSign} width={21} fill={theme.palette.secondary[100]} />
            </CircleBox>
          </PolygonContent>
        </PolygonContainer>
      )}
      content={<PopContent hash={hash || ""} detail={detail} />}
    />
  );
};

export default PolicyID;
