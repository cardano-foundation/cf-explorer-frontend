import React from "react";
import { useTranslation } from "react-i18next";
import { Box } from "@mui/material";

import DynamicEllipsisText from "src/components/DynamicEllipsisText";
import { TruncateSubTitleContainer } from "src/components/share/styled";

import { Header, Key, ScriptHashLabel, Title } from "./styles";

export type HeaderOverviewProps = {
  data?: {
    scriptHash: string;
  };
};

const HeaderOverview: React.FC<HeaderOverviewProps> = ({ data }) => {
  const { t } = useTranslation();
  return (
    <Header>
      <Box flex={1}>
        <Title>{t("common.nativeScriptDetails")}</Title>
        <Box display="flex" gap={1}>
          <Key>{t("common.scriptHash")}:</Key>
          <ScriptHashLabel>
            <TruncateSubTitleContainer>
              <DynamicEllipsisText isTooltip isCopy value={data?.scriptHash || ""} />
            </TruncateSubTitleContainer>
          </ScriptHashLabel>
        </Box>
      </Box>
    </Header>
  );
};

export default HeaderOverview;
