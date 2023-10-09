import { Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

import CustomModal from "src/components/commons/CustomModal";
import { Capitalize } from "src/components/commons/CustomText/styles";

import { ModalContent, TitleModal } from "./styles";
import { CLButton } from "../common/styles";

type Data = { title: string; value: string };
export interface SmartContractsInfoModalProps {
  open?: boolean;
  onClose?: () => void;
  data?: Data[];
}

const ContractInfoLink = "https://docs.cardano.org/new-to-cardano/what-is-a-smart-contract/";

const SmartContractsInfoModal: React.FC<SmartContractsInfoModalProps> = ({ open = false, onClose }) => {
  const { t } = useTranslation();
  const continuteReading = () => {
    onClose?.();
    window.open(ContractInfoLink, "_blank");
  };
  const handleCloseModal = () => onClose?.();
  return (
    <CustomModal
      modalProps={{ style: { zIndex: 1302 } }}
      open={open}
      onClose={handleCloseModal}
      title={<Capitalize>{t("explain.smartContract")}</Capitalize>}
      width={550}
      modalContainerProps={{ px: "20px" }}
    >
      <ModalContent>
        <TitleModal>
          <Typography component="p" mb={2}>
            {t("explain.smartContract.desc")}
          </Typography>
          <Typography mb={1}>{t("explain.smartContract.desc2")}</Typography>
        </TitleModal>
        <CLButton onClick={continuteReading}>{t("contract.continueReading")}</CLButton>
      </ModalContent>
    </CustomModal>
  );
};

export default SmartContractsInfoModal;
