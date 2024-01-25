import React, { useState } from "react";
import { Box, useTheme } from "@mui/material";
import { JsonViewer } from "@textea/json-viewer";
import { useTranslation } from "react-i18next";
import { isNil } from "lodash";

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
  const isShowCIP25 = metadataCIP25?.tokenMap && Object.keys(metadataCIP25?.tokenMap).length > 0;
  return (
    <MetaDataWraper>
      {isShowCIP25 && (
        <CIPHeader>
          <CIPHeaderTitle data-testid="token-metadata-des">
            CIP Compliance{" "}
            <InfoSolidIcon data-testid="token-metadata-info" onClick={() => setOpen(true)} width="16px" height="16px" />{" "}
          </CIPHeaderTitle>
          {!isNil(metadataCIP25?.valid) && (
            <CIPBadge
              tooltipTitle={metadataCIP25?.valid ? t("common.passed") : t("common.needsReview")}
              type={metadataCIP25?.valid ? "success" : "warning"}
            />
          )}
        </CIPHeader>
      )}

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
            style={{ background: theme.isDark ? theme.palette.common.dark : theme.palette.primary[100] }}
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
