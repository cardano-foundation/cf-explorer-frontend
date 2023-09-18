import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";

import signMessage from "src/commons/resources/images/sign-message.svg";
import { StyledDarkLoadingButton } from "src/components/share/styled";
import StyledModal from "src/components/commons/StyledModal";

import { Description, ModalTitle } from "./styles";

type TProps = {
  open: boolean;
  loadingSubmit: boolean;
  handleCloseModal: () => void;
  onSignMessage: () => void;
};
const SignMessageModal: React.FC<TProps> = ({ open, loadingSubmit, handleCloseModal, onSignMessage }) => {
  const { t } = useTranslation();
  return (
    <StyledModal open={open} handleCloseModal={handleCloseModal}>
      <Box textAlign="center">
        <img src={signMessage} alt="sign-message" />
        <ModalTitle>{t("account.signatureRequired")}</ModalTitle>
        <Description>{t("account.allowAccessPublicKey")} </Description>
        <StyledDarkLoadingButton onClick={onSignMessage} loading={loadingSubmit} loadingPosition="end">
          {t("account.sign")}
        </StyledDarkLoadingButton>
      </Box>
    </StyledModal>
  );
};

export default SignMessageModal;
