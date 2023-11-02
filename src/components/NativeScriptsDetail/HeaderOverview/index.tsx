import React from "react";
import { useTranslation } from "react-i18next";
import { Box } from "@mui/material";

import DynamicEllipsisText from "src/components/DynamicEllipsisText";
import { TruncateSubTitleContainer } from "src/components/share/styled";

import { Header, Key, ScriptHashLabel, Title } from "./styles";
import { VerifyScriptButton } from "../Tabs/styles";
import { useNativeScriptDetail } from "../Tabs";

export type HeaderOverviewProps = {
  data?: {
    scriptHash: string;
  };
  onVerifyScriptOpen?: () => void;
};

const HeaderOverview: React.FC<HeaderOverviewProps> = ({ data, onVerifyScriptOpen }) => {
  const { t } = useTranslation();
  const { script } = useNativeScriptDetail();
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
      {!script && (
        <VerifyScriptButton onClick={() => onVerifyScriptOpen?.()}>{t("common.verifyScript")}</VerifyScriptButton>
      )}
    </Header>
  );
};

export default HeaderOverview;
