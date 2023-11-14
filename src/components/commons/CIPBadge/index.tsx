import { useTranslation } from "react-i18next";

import { CheckedCIPIcon, WarningCIPIcon } from "src/commons/resources";

import { BadgeContainer, CIPLabel } from "./styles";

export type TCIPType = "success" | "warning";

export type TCIPBadgeProps = {
  type: TCIPType;
};

const CIPBadge: React.FC<TCIPBadgeProps> = ({ type }) => {
  const { t } = useTranslation();
  const success = type === "success";
  return (
    <BadgeContainer success={+success}>
      {success ? <CheckedCIPIcon /> : <WarningCIPIcon />}
      <CIPLabel>{t("token.CIP-25")}</CIPLabel>
    </BadgeContainer>
  );
};

export default CIPBadge;
