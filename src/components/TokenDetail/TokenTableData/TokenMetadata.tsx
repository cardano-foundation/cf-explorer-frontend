import { Box, useTheme } from "@mui/material";
import { JsonViewer } from "@textea/json-viewer";
import { isNil } from "lodash";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import useDisableJsonKey from "src/commons/hooks/useDisableJsonKey";
import { isJson } from "src/commons/utils/helper";
import CIP60Modal from "src/components/CIPComplianceModal/CIP60Modal";
import CIP60Badge from "src/components/commons/CIP60Badge";
import InfoSolidIcon from "src/components/commons/InfoSolidIcon";
import CIP25Badge from "src/components/commons/CIP25Badge";

import CIP25Modal from "./CIP25Modal";
import { CIPHeader, CIPHeaderTitle, MetaDataWraper, ViewJson } from "./styles";

interface ITokenMetadataProps {
  metadataJson?: string;
  metadataCIP25?: Transaction["metadata"][0]["metadataCIP25"];
  metadataCIP60?: Transaction["metadata"][0]["metadataCIP25"];
}

const TokenMetadata: React.FC<ITokenMetadataProps> = ({ metadataJson, metadataCIP25, metadataCIP60 }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [openCIP60, setOpenCIP60] = useState(false);
  const { keyRenderer } = useDisableJsonKey(metadataJson);
  const isShowCIP25 = metadataCIP25?.tokenMap && Object.keys(metadataCIP25?.tokenMap).length > 0;
  return (
    <MetaDataWraper>
      {isShowCIP25 && (
        <CIPHeader>
          <CIPHeaderTitle data-testid="token-metadata-des">
            {t("cip25.compliance")} <InfoSolidIcon width="16px" height="16px" />{" "}
          </CIPHeaderTitle>
          {!isNil(metadataCIP25?.valid) && (
            <CIP25Badge
              onClick={() => setOpen(true)}
              tooltipTitle={metadataCIP25?.valid ? t("common.passed") : t("common.needsReview")}
              type={metadataCIP25?.valid ? "success" : "warning"}
            />
          )}
          {!isNil(metadataCIP60?.valid) && (
            <CIP60Badge
              onClick={() => setOpenCIP60(true)}
              type={metadataCIP60?.valid ? "success" : "warning"}
              tooltipTitle={metadataCIP60?.valid ? t("common.passed") : t("cip60.notCompliance")}
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
      <CIP25Modal
        data={metadataCIP25?.tokenMap}
        version={metadataCIP25?.version}
        open={open}
        onClose={() => setOpen(false)}
      />
      <CIP60Modal open={openCIP60} data={metadataCIP60?.tokenMap} onClose={() => setOpenCIP60(false)} />
    </MetaDataWraper>
  );
};

export default TokenMetadata;
