import { useTranslation } from "react-i18next";

import { CheckedCIPIcon, WarningCIPIcon } from "src/commons/resources";

import { BadgeContainer, CIPLabel } from "./styles";
import CustomTooltip from "../CustomTooltip";

export type TCIPType = "success" | "warning";

export type TCIP20BadgeProps = {
  type: TCIPType;
  tooltipTitle?: string;
  onClick?: () => void;
};

const CIP20Badge: React.FC<TCIP20BadgeProps> = ({ type, tooltipTitle, onClick }) => {
  const { t } = useTranslation();
  const success = type === "success";
  return (
    <CustomTooltip title={tooltipTitle}>
      <BadgeContainer data-testid="clickable-cip20-badge" onClick={onClick} success={+success}>
        {success ? <CheckedCIPIcon /> : <WarningCIPIcon />}
        <CIPLabel>{t("token.CIP-20")}</CIPLabel>
      </BadgeContainer>
    </CustomTooltip>
  );
};

export default CIP20Badge;
