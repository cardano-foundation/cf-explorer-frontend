import { Box } from "@mui/material";
import { t } from "i18next";
import React from "react";

import { details } from "src/commons/routers";
import DynamicEllipsisText from "src/components/DynamicEllipsisText";
import CustomModal from "src/components/commons/CustomModal";
import CustomTooltip from "src/components/commons/CustomTooltip";
import { InfoIcon } from "src/components/commons/DetailHeader/styles";

import ExplanDropdown from "../common/ExplanDropdown";
import { DataCardBox, DataReferenceValue } from "../common/styles";
import { ReferenceCount } from "../styles";
import { ExternalLink, IconWrapper, ModalContent, TitleReference, UTXOReference, ValueReference } from "./styles";

interface ReferenceInputModal {
  data?: IContractItemTx;
  open: boolean;
  onClose: () => void;
}
const ReferenceInputModal: React.FC<ReferenceInputModal> = ({ data, ...props }) => {
  if (!data) {
    return <Box></Box>;
  }
  const { referenceInputs } = data;
  return (
    <CustomModal
      {...props}
      width={550}
      title={
        <Box display={"flex"} alignItems={"center"}>
          <Box>{t("contract.referenceInput")} </Box>
          <ReferenceCount style={{ display: "block" }}>{(referenceInputs || []).length}</ReferenceCount>
        </Box>
      }
      modalContainerProps={{ px: "20px" }}
    >
      <ModalContent>
        <ExplanDropdown title={t("explain.referenceInput")}>
          {t("explain.referenceInput.desc")}
          <ExternalLink href="https://cips.cardano.org/cips/cip31/" target="_blank" rel="noreferrer">
            Cardano Improvement Proposal 31 (CIP 31).
          </ExternalLink>
        </ExplanDropdown>
        <DataReferenceValue>
          {(referenceInputs || []).map((referenceInputs, index) => {
            const showTooltip = referenceInputs.scriptHash === data?.scriptHash;
            return <Box showTooltip={showTooltip} my={1} component={Item} data={referenceInputs} key={index} />;
          })}
        </DataReferenceValue>
      </ModalContent>
    </CustomModal>
  );
};

export default ReferenceInputModal;

const DatumData = ({ data }: { data: string }) => {
  if (!data) return <ValueReference>{t("common.notAvailable")}</ValueReference>;

  return <ValueReference>{data.length > 20 ? <DynamicEllipsisText value={data} isTooltip /> : data}</ValueReference>;
};

const Item = ({ data, showTooltip }: { data: ReferenceInput; showTooltip: boolean }) => {
  return (
    <DataCardBox mb={1} sx={{ ":last-child": { marginBottom: "3px" } }}>
      <Box>
        <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
          <TitleReference>UTXO:</TitleReference>
          {showTooltip ? (
            <Box component={CustomTooltip} title={t("contract.referenceInput.canOnlyBeUsedByThisContract")}>
              <IconWrapper index={data.index} typeof="span">
                <InfoIcon />
              </IconWrapper>
            </Box>
          ) : (
            <Box component={CustomTooltip} title={t("contract.referenceInput.canBeUsedByAllContract")}>
              <IconWrapper index={data.index} typeof="span">
                <InfoIcon />
              </IconWrapper>
            </Box>
          )}
        </Box>
        <UTXOReference to={details.transaction(data.txHash)}>
          <DynamicEllipsisText value={data.txHash || ""} isTooltip />
        </UTXOReference>
      </Box>
      <Box>
        <TitleReference>Datum Hash:</TitleReference>
        <DatumData data={data.datumHash} />
      </Box>
      <Box>
        <TitleReference>Datum:</TitleReference>
        <DatumData data={data.datum} />
      </Box>
    </DataCardBox>
  );
};
