import React, { forwardRef } from "react";
import { BoxProps, styled, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";

import { AdaHolderIconDarlUrl, AdaHolderIconUrl } from "src/commons/resources";
import { formatADAFull } from "src/commons/utils/helper";

import { AdaHolderImage, AdaHolderValue, StyledAdaLogoIcon } from "./styles";
import PolygonShape from "../PolygonShape";

const StyledPolygonShape = styled(PolygonShape)(() => ({
  margin: "0px -13px"
}));

export interface IAdaHolderProps extends BoxProps {
  value?: number;
}

export const AdaHolder: React.FC<IAdaHolderProps> = forwardRef(({ value, ...props }, boxRef) => {
  const { t } = useTranslation();
  const theme = useTheme();
  return (
    <StyledPolygonShape {...props} ref={boxRef}>
      <AdaHolderImage src={theme.isDark ? AdaHolderIconDarlUrl : AdaHolderIconUrl} alt="AdaHolderIconUrl" />
      {t("common.adaHolder")}
      {value !== undefined && (
        <AdaHolderValue>
          {formatADAFull(value)}
          <StyledAdaLogoIcon />
        </AdaHolderValue>
      )}
    </StyledPolygonShape>
  );
});

AdaHolder.displayName = "AdaHolder";

export default AdaHolder;
