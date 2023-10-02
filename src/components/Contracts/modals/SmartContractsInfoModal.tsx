import { Typography } from "@mui/material";
import React from "react";

import CustomModal from "src/components/commons/CustomModal";

import { ModalContent, WhatIsMartContract } from "./styles";
import { CLButton } from "../common/styles";

type Data = { title: string; value: string };
export interface SmartContractsInfoModalProps {
  open?: boolean;
  onClose?: () => void;
  data?: Data[];
}

const ContractInfoLink = "https://docs.cardano.org/new-to-cardano/what-is-a-smart-contract/";

const SmartContractsInfoModal: React.FC<SmartContractsInfoModalProps> = ({ open = false, onClose }) => {
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
      title="What Are Smart Contracts?"
      width={550}
      modalContainerProps={{ px: "20px" }}
    >
      <ModalContent>
        <WhatIsMartContract>
          <Typography component="p" mb={2}>
            A smart contract is an automated digital agreement, written in code, that tracks, verifies, and executes the
            binding transactions of a contract between various parties. The transactions of the contract are
            automatically executed by the smart contract code when predetermined conditions are met. Essentially, a
            smart contract is a short program whose inputs and outputs are transactions on a blockchain.
          </Typography>
          <Typography mb={1}>
            Smart contracts are self executing and reliable and do not require the actions or presence of third parties.
            The smart contract code is stored on, and distributed across, a decentralised blockchain network, making it
            transparent and irreversible.
          </Typography>
        </WhatIsMartContract>
        <CLButton onClick={continuteReading}>Continue Reading</CLButton>
      </ModalContent>
    </CustomModal>
  );
};

export default SmartContractsInfoModal;
