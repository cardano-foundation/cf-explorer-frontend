import React from "react";

import DynamicEllipsisText from "src/components/DynamicEllipsisText";
import { StyledLink } from "src/components/share/styled";

import { DataCardBox, DataTitle } from "./styles";

export interface DataCardProps {
  value?: string | number;
  title: string;
}

const DataCardEllipsisText: React.FC<DataCardProps> = ({ title, value }) => {
  return (
    <DataCardBox style={{ maxHeight: "80px" }}>
      <DataTitle>{title}</DataTitle>
      <StyledLink
        style={{
          fontWeight: "500",
          textDecoration: "underline",
          maxWidth: "100%",
          display: "contents",
          flexGrow: 1
        }}
        to={"/"}
      >
        <DynamicEllipsisText value={value as string} isTooltip isCopy />
      </StyledLink>
    </DataCardBox>
  );
};

export default DataCardEllipsisText;
