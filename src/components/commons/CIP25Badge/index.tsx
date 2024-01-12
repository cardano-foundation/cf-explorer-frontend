import { useTranslation } from "react-i18next";

import { CheckNotRequiredCIPIcon, CheckedCIPIcon, WarningCIPIcon } from "src/commons/resources";

import { BadgeContainer, CIPLabel } from "./styles";
import CustomTooltip from "../CustomTooltip";

export type TCIPType = "success" | "warning" | "check not required";

export type TCIP25BadgeProps = {
  type: TCIPType;
  tooltipTitle?: string;
  onClick?: () => void;
};

const CIP25Badge: React.FC<TCIP25BadgeProps> = ({ type, tooltipTitle, onClick }) => {
  const { t } = useTranslation();
  return (
    <CustomTooltip title={tooltipTitle}>
      <BadgeContainer data-testid="clickable-cip25-badge" onClick={onClick} type={type}>
        {type === "success" ? (
          <CheckedCIPIcon data-testid="check-CIP" />
        ) : type === "warning" ? (
          <WarningCIPIcon data-testid="warning-CIP" />
        ) : (
          <CheckNotRequiredCIPIcon />
        )}
        <CIPLabel>{t("token.CIP-25")}</CIPLabel>
      </BadgeContainer>
    </CustomTooltip>
  );
};

export default CIP25Badge;
