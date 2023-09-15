import { Container } from "@mui/material";
import { useTranslation } from "react-i18next";

import { NoRecordsIcon } from "src/commons/resources";

import { Image, Message, NoRecordContainer } from "./styles";

const NoStakeAddress = () => {
  const { t } = useTranslation();
  return (
    <NoRecordContainer component={Container}>
      <Image src={NoRecordsIcon} alt="empty icon" />
      <Message>{t("common.noStakeMessage")}.</Message>
    </NoRecordContainer>
  );
};

NoStakeAddress.displayName = "NoStakeAddress";

export default NoStakeAddress;
