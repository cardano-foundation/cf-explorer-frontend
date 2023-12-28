import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";

import signMessage from "src/commons/resources/images/sign-message.svg";
import { StyledDarkLoadingButton } from "src/components/share/styled";
import StyledModal from "src/components/commons/StyledModal";

import { Description, ModalTitle } from "./styles";

type TProps = {
  open: boolean;
  loadingSubmit: boolean;
  handleCloseModal: () => void;
  onSignMessage: () => void;
  isSignP2P?: boolean;
};
const SignMessageModal: React.FC<TProps> = ({ open, isSignP2P, loadingSubmit, handleCloseModal, onSignMessage }) => {
  const { t } = useTranslation();
  const [p2pAlert, setP2pAlert] = useState(false);

  useEffect(() => {
    if (!isSignP2P) {
      setP2pAlert(false);
    }
  }, [isSignP2P]);

  return (
    <StyledModal open={open} handleCloseModal={handleCloseModal}>
      <Box textAlign="center">
        <img src={signMessage} alt="sign-message" />
        <ModalTitle>{p2pAlert ? t("account.attentionRequired") : t("account.signatureRequired")}</ModalTitle>
        <Description>{p2pAlert ? t("account.enterPasswordAlert") : t("account.allowAccessPublicKey")} </Description>
        {!p2pAlert && (
          <StyledDarkLoadingButton
            onClick={() => {
              onSignMessage();
              isSignP2P && setP2pAlert(true);
            }}
            loading={loadingSubmit}
            loadingPosition="end"
          >
            {t("account.sign")}
          </StyledDarkLoadingButton>
        )}
      </Box>
    </StyledModal>
  );
};

export default SignMessageModal;
