import React, { useState } from "react";
import { Box, useTheme } from "@mui/material";
import { JsonViewer } from "@textea/json-viewer";
import { useTranslation } from "react-i18next";

import { isJson } from "src/commons/utils/helper";
import useDisableJsonKey from "src/commons/hooks/useDisableJsonKey";
import CIPBadge from "src/components/commons/CIPBadge";
import InfoSolidIcon from "src/components/commons/InfoSolidIcon";

import { CIPHeader, CIPHeaderTitle, MetaDataWraper, ViewJson } from "./styles";
import CIP25ComplianceModal from "./CIP25ComplianceModal";

interface ITokenMetadataProps {
  metadataJson?: string;
  metadataCIP25?: Transaction["metadata"][0]["metadataCIP25"];
}

const TokenMetadata: React.FC<ITokenMetadataProps> = ({ metadataJson, metadataCIP25 }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const { keyRenderer } = useDisableJsonKey(metadataJson);

  return (
    <MetaDataWraper>
      <CIPHeader>
        <CIPHeaderTitle>
          CIP Compliance <InfoSolidIcon onClick={() => setOpen(true)} width="16px" height="16px" />{" "}
        </CIPHeaderTitle>
        <CIPBadge type={metadataCIP25?.valid ? "success" : "warning"} />
      </CIPHeader>
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
            rootName={false}
            theme={theme.isDark ? "dark" : "light"}
            keyRenderer={keyRenderer}
          />
        )}
      </ViewJson>
      <CIP25ComplianceModal
        data={metadataCIP25?.tokenMap}
        version={metadataCIP25?.version}
        open={open}
        onClose={() => setOpen(false)}
      />
    </MetaDataWraper>
  );
};

export default TokenMetadata;
