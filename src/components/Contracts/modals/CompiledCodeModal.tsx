import { Grid } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

import CustomModal from "src/components/commons/CustomModal";

import ExplanDropdown from "../common/ExplanDropdown";
import DataCard from "../common/DataCard";
import { ModalContent } from "./styles";

type Data = { title: string; value?: string };
export interface CompiledCodeModalProps {
  open?: boolean;
  onClose?: () => void;
  data?: Data[];
}
const CompiledCodeModal: React.FC<CompiledCodeModalProps> = ({ open = false, onClose, data }) => {
  const { t } = useTranslation();
  const handleCloseModal = () => onClose?.();
  return (
    <CustomModal
      modalProps={{ style: { zIndex: 1302 } }}
      open={open}
      onClose={handleCloseModal}
      title={t("contract.compiledCode")}
      width={550}
      modalContainerProps={{ px: "20px" }}
    >
      <ModalContent>
        <ExplanDropdown title={t("explain.compiledCode")}>{t("explain.compiledCode.desc")}</ExplanDropdown>
        <Grid container spacing={2}>
          {data &&
            data.length > 0 &&
            data.map((item) => (
              <Grid item xs={12} key={item.title}>
                <DataCard title={item.title} value={item.value} />
              </Grid>
            ))}
        </Grid>
      </ModalContent>
    </CustomModal>
  );
};

export default CompiledCodeModal;
