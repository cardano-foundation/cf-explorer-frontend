import { BoxProps, useTheme } from "@mui/material";
import { forwardRef } from "react";
import { FiEye } from "react-icons/fi";
import { useTranslation } from "react-i18next";

import { CircleBoxOutline, PrimaryText, SquareBox } from "./styles";

export interface RedeemerProps extends BoxProps {
  onClick?: () => void;
}
const Redeemer: React.FC<RedeemerProps> = forwardRef(({ onClick, ...rest }, ref) => {
  const { t } = useTranslation();
  const theme = useTheme();
  return (
    <SquareBox {...rest} ref={ref} onClick={onClick}>
      <PrimaryText>{t("contract.redeemer")}</PrimaryText>
      <CircleBoxOutline>
        <FiEye color={theme.palette.primary.main} />
      </CircleBoxOutline>
    </SquareBox>
  );
});

Redeemer.displayName = "Redeemer";

export default Redeemer;
