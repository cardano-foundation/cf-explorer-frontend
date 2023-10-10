import { useTranslation } from "react-i18next";

import { CompiledCodeButton } from "./styles";

const CompiledCode: React.FC<{ onClick?: () => void }> = ({ onClick }) => {
  const { t } = useTranslation();
  return (
    <CompiledCodeButton onClick={() => onClick?.()}>
      {t("contract.compiledCode")} {"{ }"}
    </CompiledCodeButton>
  );
};

export default CompiledCode;
