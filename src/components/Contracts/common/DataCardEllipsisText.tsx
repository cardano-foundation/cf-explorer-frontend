import React, { useMemo } from "react";

import DynamicEllipsisText from "src/components/DynamicEllipsisText";
import { StyledLink } from "src/components/share/styled";
import { details } from "src/commons/routers";
import { useScreen } from "src/commons/hooks/useScreen";

import { DataCardBox, DataTitle } from "./styles";

export interface DataCardProps {
  value: string;
  title: string;
  purpose: string;
}

const DataCardEllipsisText: React.FC<DataCardProps> = ({ title, value, purpose }) => {
  const { isMobile } = useScreen();
  const address = useMemo(() => {
    switch (purpose) {
      case "VOTING":
        return {
          detail: details.drep
        };
      case "PROPOSING":
        return {
          detail: details.smartContract
        };
    }
  }, [purpose]);
  return (
    <DataCardBox style={{ maxHeight: "80px" }}>
      <DataTitle>{title}:</DataTitle>
      <StyledLink
        style={{
          fontWeight: "500",
          textDecoration: "underline",
          maxWidth: "100%",
          display: "contents",
          flexGrow: 1
        }}
        to={address?.detail(value as string) || "/"}
      >
        <DynamicEllipsisText
          value={value as string}
          isTooltip
          isCopy
          postfix={isMobile ? 6 : 8}
          sx={{ width: "240px" }}
        />
      </StyledLink>
    </DataCardBox>
  );
};

export default DataCardEllipsisText;
