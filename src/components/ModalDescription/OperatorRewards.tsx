import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import StyledModal from "../commons/StyledModal";
import { ContentContainer, NormalDescription, WrapContent } from "./styles";

interface Props {
  open: boolean;
  handleCloseModal: () => void;
}
export function OperatorRewards({ open, handleCloseModal }: Props) {
  const { t } = useTranslation();
  return (
    <StyledModal
      contentStyle={{ paddingRight: "5px" }}
      title={t("common.operatorRewards")}
      handleCloseModal={handleCloseModal}
      open={open}
    >
      <WrapContent>
        <ContentContainer>
          <NormalDescription>
            <Typography>{t("desc.OperatorRewards.1st")}</Typography>
            <Typography mt={1}>{t("desc.OperatorRewards.2st")}</Typography>
          </NormalDescription>
        </ContentContainer>
      </WrapContent>
    </StyledModal>
  );
}
