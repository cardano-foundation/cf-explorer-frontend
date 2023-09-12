import { BoxProps } from "@mui/material";
import React, { forwardRef } from "react";
import { useTranslation } from "react-i18next";

import { SPOHolderIconUrl } from "src/commons/resources";

import { DisableAbleLabel, FacingImg, RectBox } from "./styles";

export interface Props extends BoxProps {
  disabled?: boolean;
}
const ADAOperatorRewardRect: React.FC<Props> = forwardRef(({ disabled, ...props }, boxRef) => {
  const { t } = useTranslation();
  return (
    <RectBox disabled={+!!disabled} {...props} ref={boxRef}>
      <FacingImg src={SPOHolderIconUrl} />
      <DisableAbleLabel disabled={+!!disabled}>{t("slc.operatorReward")}</DisableAbleLabel>
    </RectBox>
  );
});

ADAOperatorRewardRect.displayName = "ADAOperatorRewardRect";

export default ADAOperatorRewardRect;
