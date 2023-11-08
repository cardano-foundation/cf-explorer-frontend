import React, { forwardRef } from "react";
import { BoxProps, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";

import { AdaHolderIconDarlUrl, AdaHolderIconUrl } from "src/commons/resources";

import { DisableAbleLabel, FacingImg, RectBox } from "./styles";
export interface Props extends BoxProps {
  disabled?: boolean;
}
const ADAHolderRect: React.FC<Props> = forwardRef(({ disabled, ...props }, boxRef) => {
  const { t } = useTranslation();
  const theme = useTheme();
  return (
    <RectBox disabled={+!!disabled} {...props} ref={boxRef}>
      <FacingImg src={theme.isDark ? AdaHolderIconDarlUrl : AdaHolderIconUrl} />
      <DisableAbleLabel disabled={+!!disabled}>
        {t("common.adaHolder")} <br /> Reward
      </DisableAbleLabel>
    </RectBox>
  );
});

ADAHolderRect.displayName = "ADAHolderRect";

export default ADAHolderRect;
