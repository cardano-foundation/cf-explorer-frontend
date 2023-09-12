import React, { forwardRef } from "react";
import { BoxProps } from "@mui/material";
import { useTranslation } from "react-i18next";

import { AdaHolderIconUrl } from "src/commons/resources";

import { DisableAbleLabel, FacingImg, RectBox } from "./styles";
export interface Props extends BoxProps {
  disabled?: boolean;
}
const ADAHolderRect: React.FC<Props> = forwardRef(({ disabled, ...props }, boxRef) => {
  const { t } = useTranslation();
  return (
    <RectBox disabled={+!!disabled} {...props} ref={boxRef}>
      <FacingImg src={AdaHolderIconUrl} />
      <DisableAbleLabel disabled={+!!disabled}>{t("common.adaHolder")}</DisableAbleLabel>
    </RectBox>
  );
});

ADAHolderRect.displayName = "ADAHolderRect";

export default ADAHolderRect;
