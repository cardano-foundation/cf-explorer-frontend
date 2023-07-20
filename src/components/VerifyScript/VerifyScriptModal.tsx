import { useState } from "react";

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
  const [value, setValue] = useState<string>("");

  const handleChange = (e: any) => {
    setValue(e.target.value as string);
  };

  return (
    <StyledModal open={open} handleCloseModal={handleCloseModal} paddingY={"30px"}>
      <Container>
        <ModalTitle>Verify Script</ModalTitle>
        <CustomTextArea maxRows={10} placeholder="Input Native script" value={value} onChange={handleChange} />
        <ErrorMessage>{error}</ErrorMessage>
        <VerifyButton disabled={loading} onClick={() => onSubmit(value)}>
          Verify Script
        </VerifyButton>
      </Container>
    </StyledModal>
  );
};

export default VerifyScriptModal;
