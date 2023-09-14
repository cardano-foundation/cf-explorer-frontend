import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import StyledModal from "../commons/StyledModal";
import { ContentContainer, NormalDescription, WrapContent } from "./styles";

interface Props {
  open: boolean;
  handleCloseModal: () => void;
}
export function DeregistrationSPOProcessDescription({ open, handleCloseModal }: Props) {
  const { t } = useTranslation();
  return (
    <StyledModal title={t("slc.deregistration")} handleCloseModal={handleCloseModal} open={open}>
      <WrapContent>
        <ContentContainer>
          <NormalDescription>
            <Typography>{t("desc.DeregistrationSPOProcessDescription.1st")}</Typography>
            <Typography mt={1}>{t("desc.DeregistrationSPOProcessDescription.2st")}</Typography>
            <Typography mt={1}>{t("desc.DeregistrationSPOProcessDescription.3st")}</Typography>
          </NormalDescription>
        </ContentContainer>
      </WrapContent>
    </StyledModal>
  );
}
