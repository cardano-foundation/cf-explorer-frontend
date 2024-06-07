import React from "react";
import { useTheme } from "@mui/material";

import { GovernanceIcon } from "src/commons/resources";
import CustomIcon from "src/components/commons/CustomIcon";
import { ViewGovernanceProposingButton } from "src/components/commons/ViewBlocks/styles";

export interface DataCardProps {
  value?: string | number;
  title: string;
}

const ViewGovenanceProposing: React.FC<DataCardProps> = ({ title }) => {
  const theme = useTheme();
  return (
    <ViewGovernanceProposingButton>
      <CustomIcon
        style={{ cursor: "pointer", marginRight: "5px" }}
        icon={GovernanceIcon}
        width={22}
        fill={theme.palette.secondary[100]}
      />{" "}
      {title}
    </ViewGovernanceProposingButton>
  );
};

export default ViewGovenanceProposing;
