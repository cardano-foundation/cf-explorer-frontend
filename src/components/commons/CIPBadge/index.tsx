import { useTranslation } from "react-i18next";

import { CheckedCIPIcon, WarningCIPIcon } from "src/commons/resources";

import { BadgeContainer, CIPLabel } from "./styles";
import CustomTooltip from "../CustomTooltip";

export type TCIPType = "success" | "warning";

export type TCIPBadgeProps = {
  type: TCIPType;
  tooltipTitle?: string;
};

const CIPBadge: React.FC<TCIPBadgeProps> = ({ type, tooltipTitle }) => {
  const { t } = useTranslation();
  const success = type === "success";
  return (
    <CustomTooltip title={tooltipTitle}>
      <BadgeContainer data-testid="token-metadata-badge" success={+success}>
        {success ? <CheckedCIPIcon /> : <WarningCIPIcon />}
        <CIPLabel>{t("token.CIP-25")}</CIPLabel>
      </BadgeContainer>
    </CustomTooltip>
  );
};

export default CIPBadge;
