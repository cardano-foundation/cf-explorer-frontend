import { Box } from "@mui/material";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import ButtonBack from "src/components/commons/ButtonBack";
import DynamicEllipsisText from "src/components/DynamicEllipsisText";
import Card from "src/components/commons/Card";

import { DetailHeader, EllipsisContainer, SubHeaderLabel, SubHeaderValue } from "./styles";

const ContractHeader = ({ version }: { version: string | undefined }) => {
  const { address } = useParams<{ address: string }>();
  const { t } = useTranslation();

  return (
    <DetailHeader>
      <ButtonBack sx={{ marginTop: "30px" }} />
      <Card title={t("SmartContractDetails")} titleSx={{ marginTop: "18px" }} />
      <Box sx={{ width: "100%" }}>
        <Box display={"flex"}>
          <SubHeaderLabel minWidth={95}>{t("ScriptHash")}: &nbsp;</SubHeaderLabel>
          <EllipsisContainer>
            <DynamicEllipsisText value={address} isCopy isTooltip />
          </EllipsisContainer>
        </Box>
        <Box display={"flex"}>
          <SubHeaderLabel> {t("Version")}: &nbsp;</SubHeaderLabel> <SubHeaderValue>{version}</SubHeaderValue>
        </Box>
      </Box>
    </DetailHeader>
  );
};

export default ContractHeader;
