import { Box } from "@mui/material";
import React from "react";
import { t } from "i18next";

import CustomModal from "src/components/commons/CustomModal";
import DynamicEllipsisText from "src/components/DynamicEllipsisText";
import { details } from "src/commons/routers";
import CustomTooltip from "src/components/commons/CustomTooltip";
import InfoSolidIcon from "src/components/commons/InfoSolidIcon";

import { ExternalLink, ModalContent, TitleReference, UTXOReference, ValueReference } from "./styles";
import ExplanDropdown from "../common/ExplanDropdown";
import { ReferenceCount } from "../styles";
import { DataCardBox, DataReferenceValue } from "../common/styles";

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
            return <Box showTooltip={showTooltip} component={Item} data={referenceInputs} key={index} />;
          })}
        </DataReferenceValue>
      </ModalContent>
    </CustomModal>
  );
};

export default ReferenceInputModal;

const DatumData = ({ data }: { data: string }) => {
  if (!data) return <ValueReference>{t("common.na")}</ValueReference>;

  return <ValueReference>{data.length > 20 ? <DynamicEllipsisText value={data} isTooltip /> : data}</ValueReference>;
};

const Item = ({ data, showTooltip }: { data: ReferenceInput; showTooltip: boolean }) => {
  return (
    <DataCardBox my={1}>
      <Box>
        <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
          <TitleReference>UTXO:</TitleReference>
          {showTooltip ? (
            <Box component={CustomTooltip} title={t("contract.referenceInput.canOnlyBeUsedByThisContract")}>
              <Box typeof="span">
                <InfoSolidIcon />
              </Box>
            </Box>
          ) : (
            <Box component={CustomTooltip} title={t("contract.referenceInput.canBeUsedByAllContract")}>
              <Box typeof="span">
                <InfoSolidIcon />
              </Box>
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
