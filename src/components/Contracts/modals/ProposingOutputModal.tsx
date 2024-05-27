import { Grid, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

import CustomModal from "src/components/commons/CustomModal";

import { ModalContent, SlotContainer, TitleModal } from "./styles";
import DataCard from "../common/DataCard";
import GovernanceActionCard from "../common/GovernanceActionCard";
import ViewGovenanceProposing from "../common/ViewGovenanceProposing";
import DataCardEllipsisText from "../common/DataCardEllipsisText";
import ExplainationDropdown from "../common/ExplainationDropdown";

type Data = { title: string; value?: string | number };

export interface ProposingOutputModalProps {
  open?: boolean;
  onClose?: () => void;
  setOpenModal?: () => void;
  data?: Data[];
  proposalPolicy?: string;
  governanceActionMetadata?: string;
  purpose?: string;
}

const ProposingOutputModal: React.FC<ProposingOutputModalProps> = ({
  open = false,
  onClose,
  data,
  setOpenModal,
  proposalPolicy,
  governanceActionMetadata,
  purpose
}) => {
  const { t } = useTranslation();
  const handleCloseModal = () => onClose?.();
  return (
    <CustomModal
      modalProps={{ style: { zIndex: 1302 } }}
      open={open}
      onClose={handleCloseModal}
      title={t("output.label")}
      width={550}
      modalContainerProps={{ px: "20px" }}
    >
      <ModalContent>
        <ExplainationDropdown title={t("explain.output")}>
          <TitleModal component="p" mb={2}>
            {t("explain.datum.desc")}
          </TitleModal>
          <Typography>{t("explain.datum.desc2")}</Typography>
        </ExplainationDropdown>
        <SlotContainer>
          <Grid container spacing={2}>
            {data &&
              data.length > 0 &&
              data.map((item) => (
                <Grid item xs={12} md={6} key={item.title}>
                  <DataCard title={item.title} value={item.value} />
                </Grid>
              ))}
            <Grid item xs={12} md={6}>
              <DataCardEllipsisText
                title={t("contract.proposalPolicy")}
                value={proposalPolicy as string}
                purpose={purpose as string}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <GovernanceActionCard
                data={{ title: t("contract.governanceActionMetadata"), value: governanceActionMetadata as string }}
                setOpenModal={setOpenModal}
                onClose={handleCloseModal}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <ViewGovenanceProposing title={t("contract.viewGovernanceVotes")} />
            </Grid>
          </Grid>
        </SlotContainer>
      </ModalContent>
    </CustomModal>
  );
};

export default ProposingOutputModal;
