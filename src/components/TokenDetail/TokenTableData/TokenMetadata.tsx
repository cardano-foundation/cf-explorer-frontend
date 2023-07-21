import React from "react";
import { Box, useTheme } from "@mui/material";
import { JsonViewer } from "@textea/json-viewer";

import { ViewJson } from "./styles";

interface ITokenMetadataProps {
  metadataJson?: string;
}

const TokenMetadata: React.FC<ITokenMetadataProps> = ({ metadataJson }) => {
  const theme = useTheme();
  return (
    <ViewJson>
      {!metadataJson ? (
        <Box textAlign={"left"} color={({ palette }) => palette.secondary.light}>
          No records found
        </Box>
      ) : (
        <JsonViewer
          data-testid="JsonViewer"
          value={metadataJson ? JSON.parse(metadataJson) : {}}
          displayObjectSize={false}
          displayDataTypes={false}
          enableClipboard={false}
          collapseStringsAfterLength={false}
          style={{ padding: 0, background: "none", color: theme.palette.text.primary }}
          rootName={false}
        />
      )}
    </ViewJson>
  );
};

export default TokenMetadata;
