import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import StyledModal from "../commons/StyledModal";
import { ContentContainer, NormalDescription, WrapContent } from "./styles";

interface Props {
  open: boolean;
  handleCloseModal: () => void;
}
export function RegistrationSPOProcessDescription({ open, handleCloseModal }: Props) {
  const { t } = useTranslation();
  return (
    <StyledModal title={t("slc.registrationCertificate")} handleCloseModal={handleCloseModal} open={open}>
      <WrapContent>
        <ContentContainer>
          <NormalDescription>
            <Typography>{t("desc.RegistrationSPOProcessDescription.1st")}</Typography>
            <Typography mt={1}>{t("desc.RegistrationSPOProcessDescription.2st")}</Typography>
          </NormalDescription>
        </ContentContainer>
      </WrapContent>
    </StyledModal>
  );
}
