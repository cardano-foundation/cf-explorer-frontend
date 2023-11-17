import { Box, useTheme } from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { isNil } from "lodash";

import { SeeMoreIconHome } from "src/commons/resources";
import { isJson } from "src/commons/utils/helper";
import DynamicEllipsisText from "src/components/DynamicEllipsisText";
import ParseScriptModal from "src/components/ParseScriptModal";
import CIP25ComplianceModal from "src/components/TokenDetail/TokenTableData/CIP25ComplianceModal";
import CIPBadge from "src/components/commons/CIPBadge";
import InfoSolidIcon from "src/components/commons/InfoSolidIcon";

import {
  CIPHeader,
  CIPHeaderTitle,
  Header,
  JSONTitle,
  JSONValue,
  MetaDataValue,
  RowMetadata,
  StyledButton,
  Title,
  TitleValue,
  Wrapper
} from "./styles";
interface MetadataProps {
  data?: Transaction["metadata"];
  hash?: Transaction["metadataHash"] | null;
}

const Metadata: React.FC<MetadataProps> = ({ hash, data }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const [selectedIndedx, setSelectedIndex] = useState<number | null>(null);
  const [selectedText, setSelectedText] = useState<{ label: number; value: string } | null>(null);
  return (
    <Box>
      <Wrapper>
        <Header>
          <Box>{t("common.metadataHash")}</Box>
        </Header>
        <Box
          textAlign={"left"}
          fontWeight={"bold"}
          display={"block"}
          pt={2}
          color={({ palette }) => `${palette.secondary.main}  !important`}
        >
          <DynamicEllipsisText value={hash || ""} isCopy />
        </Box>
      </Wrapper>
      {(data || [])?.map((metadata, idx) => (
        <Wrapper mt={2} key={idx}>
          <RowMetadata>
            <Title>{t("common.metadatumLabel")}</Title>
            <TitleValue>{metadata.label || ""}</TitleValue>
            <CIPHeader>
              <CIPHeaderTitle>
                {t("cip25.compliance")}{" "}
                <InfoSolidIcon onClick={() => setSelectedIndex(idx)} width="16px" height="16px" />{" "}
              </CIPHeaderTitle>
              {isNil(metadata.metadataCIP25.valid) && (
                <CIPBadge
                  tooltipTitle={metadata.metadataCIP25.valid ? "passed" : "needs review"}
                  type={metadata.metadataCIP25.valid ? "success" : "warning"}
                />
              )}
            </CIPHeader>
          </RowMetadata>
          <RowMetadata>
            <JSONTitle>{t("common.value")}</JSONTitle>
            <JSONValue>
              <MetaDataValue>{metadata.value || ""}</MetaDataValue>
              <StyledButton onClick={() => setSelectedText(metadata)}>
                <SeeMoreIconHome fill={theme.palette.primary.main} />
              </StyledButton>
            </JSONValue>
          </RowMetadata>
        </Wrapper>
      ))}
      <ParseScriptModal
        open={!!selectedText}
        onClose={() => setSelectedText(null)}
        script={
          selectedText?.value && isJson(selectedText?.value) ? JSON.parse(selectedText?.value) : selectedText?.value
        }
        title={`${t("common.key")}: ${selectedText?.label || 0}`}
        subTitle={t("common.value")}
      />
      <CIP25ComplianceModal
        data={data?.[selectedIndedx || 0].metadataCIP25.tokenMap}
        open={typeof selectedIndedx === "number"}
        version={data?.[selectedIndedx || 0].metadataCIP25.version}
        onClose={() => setSelectedIndex(null)}
      />
    </Box>
  );
};

export default Metadata;
