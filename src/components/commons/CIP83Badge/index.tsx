import { useTranslation } from "react-i18next";

import { CIP60WarningIcon, CheckedCIPIcon } from "src/commons/resources";

import { BadgeContainer, CIPLabel } from "./styles";
import CustomTooltip from "../CustomTooltip";

export type TCIPType = "success" | "warning";

export type TCIP83BadgeProps = {
  type: TCIPType;
  tooltipTitle?: string;
  onClick?: () => void;
};

const CIP83Badge: React.FC<TCIP83BadgeProps> = ({ type, tooltipTitle, onClick }) => {
  const { t } = useTranslation();
  const success = type === "success";
  return (
    <CustomTooltip title={tooltipTitle}>
      <BadgeContainer data-testid="clickable-cip20-badge" onClick={onClick} success={+success}>
        {success ? <CheckedCIPIcon /> : <CIP60WarningIcon height={20} width={20} />}
        <CIPLabel>{t("token.CIP-83")}</CIPLabel>
      </BadgeContainer>
    </CustomTooltip>
  );
};

export default CIP83Badge;
