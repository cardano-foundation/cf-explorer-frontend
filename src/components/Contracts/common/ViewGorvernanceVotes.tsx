import React from "react";
import { useTheme } from "@mui/material";

import { GovernanceIcon } from "src/commons/resources";
import CustomIcon from "src/components/commons/CustomIcon";
import { ViewGovernanceButton } from "src/components/commons/ViewBlocks/styles";

export interface DataCardProps {
  value?: string | number;
  title: string;
}

const ViewGorvernanceVotes: React.FC<DataCardProps> = ({ title }) => {
  const theme = useTheme();
  return (
    <ViewGovernanceButton>
      <CustomIcon
        style={{ cursor: "pointer", marginRight: "5px" }}
        icon={GovernanceIcon}
        width={22}
        fill={theme.palette.secondary[100]}
      />{" "}
      {title}
    </ViewGovernanceButton>
  );
};

export default ViewGorvernanceVotes;
