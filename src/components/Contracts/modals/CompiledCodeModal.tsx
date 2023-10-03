import { Grid } from "@mui/material";
import React from "react";

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
  const handleCloseModal = () => onClose?.();
  return (
    <CustomModal
      modalProps={{ style: { zIndex: 1302 } }}
      open={open}
      onClose={handleCloseModal}
      title="Compiled Code"
      width={550}
      modalContainerProps={{ px: "20px" }}
    >
      <ModalContent>
        <ExplanDropdown title="What is compiled code?">
          On the Cardano blockchain, the compiled code of smart contracts is stored on, and distributed across the
          decentralised network. It is not possible to modify the rules of existing smart contract and it is also not
          possible to de-compile the stored smart contract code back from it's compiled state back in to the original
          source code.
        </ExplanDropdown>
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
