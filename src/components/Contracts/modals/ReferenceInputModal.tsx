import { Box } from "@mui/material";
import React from "react";
import { t } from "i18next";

import CustomModal from "src/components/commons/CustomModal";
import DynamicEllipsisText from "src/components/DynamicEllipsisText";
import { details } from "src/commons/routers";

import { ModalContent, TitleReference, UTXOReference, ValueReference } from "./styles";
import ExplanDropdown from "../common/ExplanDropdown";
import { ReferenceCount } from "../styles";
import { DataCardBox, DataReferenceValue } from "../common/styles";

interface ReferenceInputModal {
  data: ReferenceInput[];
  open: boolean;
  onClose: () => void;
}
const ReferenceInputModal: React.FC<ReferenceInputModal> = ({ data, ...props }) => {
  return (
    <CustomModal
      {...props}
      width={550}
      title={
        <Box display={"flex"} alignItems={"center"}>
          <Box>{t("contract.referenceInput")} </Box>
          <ReferenceCount style={{ display: "block" }}>{(data || []).length}</ReferenceCount>
        </Box>
      }
      modalContainerProps={{ px: "20px" }}
    >
      <ModalContent>
        <ExplanDropdown title={t("explain.referenceInput")}>{t("explain.referenceInput.desc")}</ExplanDropdown>
        <DataReferenceValue>
          {data.map((i, ii) => (
            <Box component={Item} data={i} key={ii} />
          ))}
        </DataReferenceValue>
      </ModalContent>
    </CustomModal>
  );
};

export default ReferenceInputModal;

const Item = ({ data }: { data: ReferenceInput }) => {
  return (
    <DataCardBox my={1}>
      <Box>
        <TitleReference>UTXO:</TitleReference>
        <UTXOReference to={details.transaction(data.txHash)}>
          <DynamicEllipsisText value={data.txHash || ""} isTooltip />
        </UTXOReference>
      </Box>
      <Box>
        <TitleReference>Datum Hash:</TitleReference>
        {data.datumHash && (
          <ValueReference>
            {data.datumHash.length > 20 ? <DynamicEllipsisText value={data.datumHash} isTooltip /> : data.datumHash}
          </ValueReference>
        )}
      </Box>
      <Box>
        <TitleReference>Datum:</TitleReference>
        {data.datum && (
          <ValueReference>
            {data.datum.length > 20 ? <DynamicEllipsisText value={data.datum} isTooltip /> : data.datum}
          </ValueReference>
        )}
      </Box>
    </DataCardBox>
  );
};
