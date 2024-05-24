import { Grid } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

import CustomModal from "src/components/commons/CustomModal";

import { ModalContent, SlotContainer } from "./styles";
import DataCard from "../common/DataCard";
import ViewGorvernanceVotes from "../common/ViewGorvernanceVotes";
import DataCardEllipsisText from "../common/DataCardEllipsisText";

type Data = { voterType: string; dRepId?: string | number; vote?: string | number };

export interface VotingOutputModalProps {
  open?: boolean;
  onClose?: () => void;
  data?: Data;
}

const VotingOutputModal: React.FC<VotingOutputModalProps> = ({ open = false, onClose, data }) => {
  const { t } = useTranslation();
  const handleCloseModal = () => onClose?.();
  return (
    <CustomModal
      modalProps={{ style: { zIndex: 1302 } }}
      open={open}
      onClose={handleCloseModal}
      title={t("outputs.label")}
      width={550}
      modalContainerProps={{ px: "20px" }}
    >
      <ModalContent>
        {t("explain.output")}
        <SlotContainer>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <DataCard title={t("contract.voterType")} value={data?.voterType} />
            </Grid>
            <Grid item xs={12} md={6}>
              <DataCardEllipsisText title={t("dreps.id")} value={data?.dRepId} />
            </Grid>
            <Grid item xs={12} md={6}>
              <DataCard title={t("pool.vote")} value={data?.vote} />
            </Grid>
            <Grid item xs={12} md={6}>
              <ViewGorvernanceVotes title={t("contract.viewGovernanceVotes")} />
            </Grid>
          </Grid>
        </SlotContainer>
      </ModalContent>
    </CustomModal>
  );
};

export default VotingOutputModal;
