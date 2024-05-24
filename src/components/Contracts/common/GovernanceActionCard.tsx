import React from "react";
import { Box } from "@mui/material";

import { DataCardBox, DataTitle, DataValue, LinkToText } from "./styles";

export interface Data {
  title: string;
  value: string | number;
}
export interface DataCardProps {
  data: Data;
  setOpenModal?: () => void;
  onClose?: () => void;
}

const GovernanceActionCard: React.FC<DataCardProps> = ({ data, setOpenModal, onClose }) => {
  const handleClick = () => {
    onClose?.();
    setOpenModal?.();
  };
  return (
    <Box>
      <DataCardBox>
        <DataTitle>{data.title}</DataTitle>
        <DataValue>{data.value}</DataValue>
        <LinkToText onClick={handleClick}>{"https://hornan7.github.io/proposal.txt"}</LinkToText>
      </DataCardBox>
    </Box>
  );
};

export default GovernanceActionCard;
