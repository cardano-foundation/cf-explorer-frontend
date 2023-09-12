import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import StyledModal from "../commons/StyledModal";
import { ContentContainer, NormalDescription, WrapContent } from "./styles";

interface Props {
  open: boolean;
  handleCloseModal: () => void;
}

export function SPOInvolvementInDelegationDescription({ open, handleCloseModal }: Props) {
  const { t } = useTranslation();
  return (
    <StyledModal
      contentStyle={{ paddingRight: "5px" }}
      title={t("slc.poolUpdates")}
      handleCloseModal={handleCloseModal}
      open={open}
    >
      <WrapContent>
        <ContentContainer>
          <NormalDescription>
            <Typography>{t("desc.SPOInvolvementInDelegationDescription.1st")}</Typography>
            <Typography mt={1}>{t("desc.SPOInvolvementInDelegationDescription.2st")}</Typography>
          </NormalDescription>
        </ContentContainer>
      </WrapContent>
    </StyledModal>
  );
}
