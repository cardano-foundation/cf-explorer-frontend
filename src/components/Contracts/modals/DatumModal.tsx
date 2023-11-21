import { Grid } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

import CustomModal from "src/components/commons/CustomModal";

import { ModalContent, SlotContainer } from "./styles";
import ExplanDropdown from "../common/ExplanDropdown";
import DataCard from "../common/DataCard";

type Data = { title: string; value?: string | number };
export interface DatumModalProps {
  open?: boolean;
  onClose?: () => void;
  data?: Data[];
}
const DatumModal: React.FC<DatumModalProps> = ({ open = false, onClose, data }) => {
  const { t } = useTranslation();
  const handleCloseModal = () => onClose?.();
  return (
    <CustomModal
      modalProps={{ style: { zIndex: 1302 } }}
      open={open}
      onClose={handleCloseModal}
      title={t("contract.datum")}
      width={550}
      modalContainerProps={{ px: "20px" }}
    >
      <ModalContent>
        <ExplanDropdown title={t("explain.datum")}>{t("explain.datum.desc")}</ExplanDropdown>
        <SlotContainer>
          <Grid container spacing={2}>
            {data &&
              data.length > 0 &&
              data.map((item) => (
                <Grid item xs={12} key={item.title}>
                  <DataCard title={item.title} value={item.value} />
                </Grid>
              ))}
          </Grid>
        </SlotContainer>
      </ModalContent>
    </CustomModal>
  );
};

export default DatumModal;
