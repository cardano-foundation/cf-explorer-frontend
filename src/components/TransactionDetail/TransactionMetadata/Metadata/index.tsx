import { Box, useTheme } from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { isNil } from "lodash";

import { isJson } from "src/commons/utils/helper";
import CIP60Modal from "src/components/CIPComplianceModal/CIP60Modal";
import DynamicEllipsisText from "src/components/DynamicEllipsisText";
import ParseScriptModal from "src/components/ParseScriptModal";
import CIP25Modal from "src/components/TokenDetail/TokenTableData/CIP25Modal";
import { SeeMoreIconHome, ShowLess, ShowMore } from "src/commons/resources";
import CIP25Badge from "src/components/commons/CIP25Badge";
import CIP60Badge from "src/components/commons/CIP60Badge";
import CIP20Badge from "src/components/commons/CIP20Badge";
import CIP20Modal from "src/components/CIPComplianceModal/CIP20Modal";

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
  CIP20 = 20,
  CIP25 = 25,
  CIP60 = 60
}

const CIPLabel721 = 721;
const CIPLabel674 = 674;

const Metadata: React.FC<MetadataProps> = ({ hash, data }) => {
  const LIMIT_MESSAGE_ROW = 4;
  const { t } = useTranslation();
  const theme = useTheme();
  const [selectedIndedx, setSelectedIndex] = useState<number | null>(null);
  const [openRawData, setOpenRawData] = useState<boolean>(false);
  const [limitRow, setLimitRow] = useState<number>(LIMIT_MESSAGE_ROW);
  const [cip, setCip] = useState<CIP>(CIP.CIP25);
  const [selectedText, setSelectedText] = useState<{ label: number; value: string } | null>(null);

  const renderMessage = (requireValue: Transaction["metadata"][0]["metadataCIP20"]["requiredProperties"]) => {
    if (requireValue && requireValue[0]) {
      return (
        <>
          {requireValue[0].value.slice(0, limitRow).map((value: string, idx: number) => (
            <React.Fragment key={idx}>
              <MetaDataJSONValueText>{value}</MetaDataJSONValueText>
            </React.Fragment>
          ))}
          {requireValue[0].value.length > LIMIT_MESSAGE_ROW ? (
            requireValue[0].value.length > limitRow ? (
              <Box
                onClick={() => setLimitRow(requireValue[0].value.length)}
                color={theme.palette.primary.main}
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                sx={{ textDecoration: "underline", cursor: "pointer", textAlign: "center" }}
              >
                <Box mr={"2px"}>{t("CIP20.showMore")}</Box>
                <ShowMore />
              </Box>
            ) : (
              <Box
                onClick={() => setLimitRow(LIMIT_MESSAGE_ROW)}
                color={theme.palette.primary.main}
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                sx={{ textDecoration: "underline", cursor: "pointer", textAlign: "center" }}
              >
                <Box mr={"2px"}> {t("CIP20.showLess")}</Box>
                <ShowLess />
              </Box>
            )
          ) : (
            <> </>
          )}
        </>
      );
    }
  };

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
            {String(metadata.label) === String(CIPLabel721) && (
              <CIPHeader>
                <CIPHeaderTitle>{t("token.metadataCheck")}</CIPHeaderTitle>
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
            {String(metadata.label) === String(CIPLabel674) && (
              <CIPHeader>
                <CIPHeaderTitle>{t("token.metadataCheck")}</CIPHeaderTitle>
                <CIPChips>
                  {!isNil(metadata?.metadataCIP20?.valid) && (
                    <CIP20Badge
                      onClick={() => {
                        setSelectedIndex(idx);
                        setCip(CIP.CIP20);
                      }}
                      tooltipTitle={metadata?.metadataCIP20?.valid ? t("common.passed") : t("common.needsReview")}
                      type={metadata?.metadataCIP20?.valid ? "success" : "warning"}
                    />
                  )}
                </CIPChips>
              </CIPHeader>
            )}
          </MetadataHeader>
          <MetadataContent>
            <MetadataJSONTitle>{t("common.value")}</MetadataJSONTitle>
            {(openRawData || String(metadata.label) !== String(CIPLabel674)) && (
              <MetaDataJSONValue>
                <MetaDataJSONValueText>{metadata.value || ""}</MetaDataJSONValueText>
                <StyledButton onClick={() => setSelectedText(metadata)}>
                  <SeeMoreIconHome fill={theme.palette.primary.main} />
                </StyledButton>
              </MetaDataJSONValue>
            )}

            {!openRawData && String(metadata.label) === String(CIPLabel674) && (
              <Box
                onClick={() => setOpenRawData(true)}
                color={theme.palette.primary.main}
                sx={{ textDecoration: "underline", cursor: "pointer" }}
              >
                {t("CIP20.viewMessage")}
              </Box>
            )}
          </MetadataContent>
          {String(metadata.label) === String(CIPLabel674) && (
            <MetadataContent>
              <MetadataJSONTitle>{t("CIP20.transactionMessage")}</MetadataJSONTitle>
              <MetaDataJSONValue>{renderMessage(metadata.metadataCIP20.requiredProperties)}</MetaDataJSONValue>
            </MetadataContent>
          )}
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
      <CIP20Modal
        data={data?.[selectedIndedx || 0].metadataCIP20?.requiredProperties}
        open={typeof selectedIndedx === "number" && cip === CIP.CIP20}
        onClose={() => setSelectedIndex(null)}
      />
    </Box>
  );
};

export default Metadata;
