import { useTranslation } from "react-i18next";
import { Box } from "@mui/material";

import Card from "src/components/commons/Card";
import FormNowMessage from "src/components/commons/FormNowMessage";

import { DetailHeader, SubHeaderLabel } from "./styles";

const ContractHeader = () => {
  const { t } = useTranslation();
  return (
    <DetailHeader>
      <Card
        title={<Box data-testid="NSSM.title">{t("glossary.nativeScriptAndSC")}</Box>}
        titleSx={{ marginTop: "18px", width: "100%" }}
      />
      <SubHeaderLabel>
        <FormNowMessage time={Date.now()} />
      </SubHeaderLabel>
    </DetailHeader>
  );
};

export default ContractHeader;
