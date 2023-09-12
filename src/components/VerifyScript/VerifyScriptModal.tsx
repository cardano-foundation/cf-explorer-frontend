import { useState } from "react";
import { useTranslation } from "react-i18next";

import { IPropsModal } from "../StakingLifeCycle/DelegatorLifecycle/ReportComposerModal";
import StyledModal from "../commons/StyledModal";
import { Container, ErrorMessage, ModalTitle, VerifyButton } from "./styles";
import CustomTextArea from "../commons/CustomTextArea";

interface IVerifyScriptProps extends IPropsModal {
  onSubmit: (script: string) => void;
  error?: string;
  loading?: boolean;
}

const VerifyScriptModal = ({ open, handleCloseModal, onSubmit, error, loading = false }: IVerifyScriptProps) => {
  const { t } = useTranslation();
  const [value, setValue] = useState<string>("");

  const handleChange = (e: any) => {
    setValue(e.target.value as string);
  };

  return (
    <StyledModal open={open} handleCloseModal={handleCloseModal} paddingY={"30px"}>
      <Container>
        <ModalTitle>{t("common.verifyScript")}</ModalTitle>
        <CustomTextArea
          maxRows={10}
          placeholder={t("common.inputNativeScript")}
          value={value}
          onChange={handleChange}
        />
        <ErrorMessage>{error}</ErrorMessage>
        <VerifyButton disabled={loading} onClick={() => onSubmit(value)}>
          {t("common.verifyScript")}
        </VerifyButton>
      </Container>
    </StyledModal>
  );
};

export default VerifyScriptModal;
