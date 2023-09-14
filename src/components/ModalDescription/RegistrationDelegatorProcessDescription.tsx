import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import StyledModal from "../commons/StyledModal";
import { ContentContainer, NormalDescription, WrapContent } from "./styles";

interface Props {
  open: boolean;
  handleCloseModal: () => void;
}
export function RegistrationDelegatorProcessDescription({ open, handleCloseModal }: Props) {
  const { t } = useTranslation();
  return (
    <StyledModal title="Registration" handleCloseModal={handleCloseModal} open={open}>
      <WrapContent>
        <ContentContainer>
          <NormalDescription>
            <Typography>
              {t("desc.RegistrationDelegatorProcessDescription.1st")} <span>{t("common.stakeAddress")}</span>.{" "}
              {t("desc.RegistrationDelegatorProcessDescription.2st")}
            </Typography>
            <Typography mt={1}>
              {t("desc.RegistrationDelegatorProcessDescription.3st")} <span>{t("common.transactionOfADA")}</span>{" "}
              {t("and")}
              <span> {t("desc.RegistrationDelegatorProcessDescription.4st")}</span>{" "}
              {t("desc.RegistrationDelegatorProcessDescription.5st")} <span> {t("common.optionally")} </span>
              {t("desc.RegistrationDelegatorProcessDescription.6st")}
            </Typography>
            <Typography mt={1}>{t("desc.RegistrationDelegatorProcessDescription.7st")}</Typography>
          </NormalDescription>
        </ContentContainer>
      </WrapContent>
    </StyledModal>
  );
}
