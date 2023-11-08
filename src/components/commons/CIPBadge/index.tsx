import { useTranslation } from "react-i18next";

import { CheckedCIPIcon, WarningCIPIcon } from "src/commons/resources";

import { BadgeContainer, CIPLabel } from "./styles";

export type TCIPType = "success" | "warning";

export type TCIPBadgeProps = {
  type: TCIPType;
};

const CIPBadge: React.FC<TCIPBadgeProps> = ({ type }) => {
  const { t } = useTranslation();
  return (
    <BadgeContainer>
      {type === "warning" ? <WarningCIPIcon /> : <CheckedCIPIcon />}
      <CIPLabel>{t("token.CIP-25")}</CIPLabel>
    </BadgeContainer>
  );
};

export default CIPBadge;
