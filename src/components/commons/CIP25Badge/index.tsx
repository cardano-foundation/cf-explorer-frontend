import { useTranslation } from "react-i18next";

import { CheckedCIPIcon, WarningCIPIcon } from "src/commons/resources";

import { BadgeContainer, CIPLabel } from "./styles";
import CustomTooltip from "../CustomTooltip";

export type TCIPType = "success" | "warning";

export type TCIP25BadgeProps = {
  type: TCIPType;
  tooltipTitle?: string;
  onClick?: () => void;
};

const CIP25Badge: React.FC<TCIP25BadgeProps> = ({ type, tooltipTitle, onClick }) => {
  const { t } = useTranslation();
  const success = type === "success";
  return (
    <CustomTooltip title={tooltipTitle}>
      <BadgeContainer data-testid="clickable-cip25-badge" onClick={onClick} success={+success}>
        {success ? <CheckedCIPIcon data-testid="check-CIP" /> : <WarningCIPIcon data-testid="warning-CIP" />}
        <CIPLabel>{t("token.CIP-25")}</CIPLabel>
      </BadgeContainer>
    </CustomTooltip>
  );
};

export default CIP25Badge;
