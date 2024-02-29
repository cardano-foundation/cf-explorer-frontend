import { Box } from "@mui/material";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import ButtonBack from "src/components/commons/ButtonBack";
import DynamicEllipsisText from "src/components/DynamicEllipsisText";
import Card from "src/components/commons/Card";
import { SCRIPT_TYPE, ScriptTypeLabel } from "src/commons/utils/constants";

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
          <SubHeaderLabel minWidth={90} data-testid="sc.scriptHash">
            {t("ScriptHash")}: &nbsp;
          </SubHeaderLabel>
          <EllipsisContainer>
            <DynamicEllipsisText value={address} isCopy isTooltip sx={{ minWidth: 190 }} />
          </EllipsisContainer>
        </Box>
        <Box display={"flex"}>
          <SubHeaderLabel data-testid="sc.versionTitle"> {t("Version")}: &nbsp;</SubHeaderLabel>{" "}
          <SubHeaderValue data-testid="sc.versionValue">{ScriptTypeLabel[version as SCRIPT_TYPE]}</SubHeaderValue>
        </Box>
      </Box>
    </DetailHeader>
  );
};

export default ContractHeader;
