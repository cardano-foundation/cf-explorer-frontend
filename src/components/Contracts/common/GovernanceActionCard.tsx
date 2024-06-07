import React from "react";
import { Box } from "@mui/material";

import { getShortHash } from "src/commons/utils/helper";
import CustomTooltip from "src/components/commons/CustomTooltip";
import { useScreen } from "src/commons/hooks/useScreen";

import { DataCardBox, DataTitle, DataValue, LinkToText } from "./styles";

export interface Data {
  title: string;
  value: string | number;
  proposalLink: string;
}
export interface DataCardProps {
  data: Data;
  setOpenModal?: () => void;
  onClose?: () => void;
}

const GovernanceActionCard: React.FC<DataCardProps> = ({ data, setOpenModal, onClose }) => {
  const { isGalaxyFoldSmall } = useScreen();
  const handleClick = () => {
    onClose?.();
    setOpenModal?.();
  };
  return (
    <Box>
      <DataCardBox>
        <DataTitle>{data.title}</DataTitle>
        <DataValue>{data.value}</DataValue>
        <CustomTooltip title={data?.proposalLink}>
          <LinkToText onClick={handleClick}>
            {isGalaxyFoldSmall ? getShortHash(data?.proposalLink) : data?.proposalLink}
          </LinkToText>
        </CustomTooltip>
      </DataCardBox>
    </Box>
  );
};

export default GovernanceActionCard;
