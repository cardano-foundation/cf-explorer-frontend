import { BoxProps, styled, useTheme } from "@mui/material";
import React, { forwardRef } from "react";
import { useTranslation } from "react-i18next";

import { CardanoSystemDarkIcon, CardanoSystemIcon } from "src/commons/resources";

import PolygonShape from "../PolygonShape";
import CustomIcon from "../CustomIcon";

const StyledPolygonShape = styled(PolygonShape)(() => ({
  padding: "40px 38px 50px",
  margin: "0px -13px"
}));

export const CardanoBlockchain: React.FC<BoxProps> = forwardRef(({ ...props }, boxRef) => {
  const { t } = useTranslation();
  const theme = useTheme();
  return (
    <StyledPolygonShape {...props} ref={boxRef}>
      <CustomIcon
        data-testid="cardano-system"
        icon={theme.isDark ? CardanoSystemDarkIcon : CardanoSystemIcon}
        height={100}
        width={100}
      />
      {t("common.cardanoBlc")}
    </StyledPolygonShape>
  );
});

CardanoBlockchain.displayName = "CardanoBlockchain";

export default CardanoBlockchain;
