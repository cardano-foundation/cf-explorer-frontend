import { Box, useTheme } from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { isNil } from "lodash";

import { isJson } from "src/commons/utils/helper";
import CIP60Modal from "src/components/CIPComplianceModal/CIP60Modal";
import DynamicEllipsisText from "src/components/DynamicEllipsisText";
import ParseScriptModal from "src/components/ParseScriptModal";
import CIP25Modal from "src/components/TokenDetail/TokenTableData/CIP25Modal";
import { SeeMoreIconHome } from "src/commons/resources";
import CIP25Badge from "src/components/commons/CIP25Badge";
import CIP60Badge from "src/components/commons/CIP60Badge";
import InfoSolidIcon from "src/components/commons/InfoSolidIcon";

import {
  CIPChips,
  CIPHeader,
  CIPHeaderTitle,
  Header,
  MetaDataJSONValue,
  MetaDataJSONValueText,
  MetaDataValue,
  MetadataContent,
  MetadataHeader,
  MetadataJSONTitle,
  MetadataTitle,
  MetadataWrapper,
  StyledButton,
  Wrapper
} from "./styles";

interface MetadataProps {
  data?: Transaction["metadata"];
  hash?: Transaction["metadataHash"] | null;
}

enum CIP {
  CIP25 = 25,
  CIP60 = 60
}

const CIPLabel = 721;

const Metadata: React.FC<MetadataProps> = ({ hash, data }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const [selectedIndedx, setSelectedIndex] = useState<number | null>(null);
  const [cip, setCip] = useState<CIP>(CIP.CIP25);
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
        <MetadataWrapper key={idx}>
          <MetadataHeader mb={2}>
            <MetadataTitle>{t("common.metadatumLabel")}</MetadataTitle>
            <MetaDataValue>{metadata.label ?? ""}</MetaDataValue>
            {String(metadata.label) === String(CIPLabel) && (
              <CIPHeader>
                <CIPHeaderTitle>
                  {t("cip25.compliance")} <InfoSolidIcon width="16px" height="16px" />{" "}
                </CIPHeaderTitle>
                <CIPChips>
                  {!isNil(metadata.metadataCIP25.valid) && (
                    <CIP25Badge
                      onClick={() => {
                        setSelectedIndex(idx);
                        setCip(CIP.CIP25);
                      }}
                      tooltipTitle={metadata.metadataCIP25.valid ? t("common.passed") : t("common.needsReview")}
                      type={metadata.metadataCIP25.valid ? "success" : "warning"}
                    />
                  )}
                  {!isNil(metadata.metadataCIP60.valid) && (
                    <CIP60Badge
                      tooltipTitle={metadata.metadataCIP60.valid ? t("common.passed") : t("cip60.notCompliance")}
                      onClick={() => {
                        setSelectedIndex(idx);
                        setCip(CIP.CIP60);
                      }}
                      type={metadata.metadataCIP60.valid ? "success" : "warning"}
                    />
                  )}
                </CIPChips>
              </CIPHeader>
            )}
          </MetadataHeader>
          <MetadataContent>
            <MetadataJSONTitle>{t("common.value")}</MetadataJSONTitle>
            <MetaDataJSONValue>
              <MetaDataJSONValueText>{metadata.value || ""}</MetaDataJSONValueText>
              <StyledButton onClick={() => setSelectedText(metadata)}>
                <SeeMoreIconHome fill={theme.palette.primary.main} />
              </StyledButton>
            </MetaDataJSONValue>
          </MetadataContent>
        </MetadataWrapper>
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
      <CIP25Modal
        data={data?.[selectedIndedx || 0].metadataCIP25.tokenMap}
        open={typeof selectedIndedx === "number" && cip === CIP.CIP25}
        version={data?.[selectedIndedx || 0].metadataCIP25.version}
        onClose={() => setSelectedIndex(null)}
      />
      <CIP60Modal
        data={data?.[selectedIndedx || 0].metadataCIP60.tokenMap}
        open={typeof selectedIndedx === "number" && cip === CIP.CIP60}
        version={data?.[selectedIndedx || 0].metadataCIP60.version}
        onClose={() => setSelectedIndex(null)}
      />
    </Box>
  );
};

export default Metadata;
