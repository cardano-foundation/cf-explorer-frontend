import React from "react";
import { Box, useTheme } from "@mui/material";
import { JsonViewer } from "@textea/json-viewer";
import { useTranslation } from "react-i18next";

import { isJson } from "src/commons/utils/helper";

import { ViewJson } from "./styles";

interface ITokenMetadataProps {
  metadataJson?: string;
}

const TokenMetadata: React.FC<ITokenMetadataProps> = ({ metadataJson }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  return (
    <ViewJson>
      {!metadataJson ? (
        <Box textAlign={"left"} color={({ palette }) => palette.secondary.light}>
          {t("glossary.noRecordsFound")}
        </Box>
      ) : (
        <JsonViewer
          data-testid="JsonViewer"
          value={isJson(metadataJson) ? JSON.parse(metadataJson) : metadataJson}
          displayObjectSize={false}
          displayDataTypes={false}
          enableClipboard={false}
          collapseStringsAfterLength={false}
          style={{ padding: 0, background: "none", color: theme.palette.text.primary }}
          rootName={false}
          theme={theme.isDark ? "dark" : "light"}
        />
      )}
    </ViewJson>
  );
};

export default TokenMetadata;
