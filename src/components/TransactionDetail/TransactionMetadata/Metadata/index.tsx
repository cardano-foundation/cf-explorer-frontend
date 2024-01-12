import { Box, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { isEmpty, isNil } from "lodash";

import { decryptCardanoMessage, isJson } from "src/commons/utils/helper";
import CIP60Modal from "src/components/CIPComplianceModal/CIP60Modal";
import DynamicEllipsisText from "src/components/DynamicEllipsisText";
import ParseScriptModal from "src/components/ParseScriptModal";
import { ShowLess, ShowMore, WarningCIPIcon } from "src/commons/resources";
import CIP25Badge from "src/components/commons/CIP25Badge";
import CIP25Modal from "src/components/CIPComplianceModal/CIP25Modal";
import CIP60Badge from "src/components/commons/CIP60Badge";
import CIP20Badge from "src/components/commons/CIP20Badge";
import CIP20Modal from "src/components/CIPComplianceModal/CIP20Modal";
import CIP83Badge from "src/components/commons/CIP83Badge";
import CIP83Modal from "src/components/CIPComplianceModal/CIP83Modal";
import PassphraseDecryptModal from "src/components/CIPComplianceModal/PassphraseDecryptModal";
import InfoSolidIcon from "src/components/commons/InfoSolidIcon";
import CustomTooltip from "src/components/commons/CustomTooltip";

import {
  BadgeContainer,
  CIPChips,
  CIPHeader,
  CIPHeaderTitle,
  CIPLabel,
  DecryptButton,
  Header,
  MetaDataJSONValue,
  MetaDataJSONValueText,
  MetaDataValue,
  MetadataContent,
  MetadataHeader,
  MetadataJSONTitle,
  MetadataTitle,
  MetadataWrapper,
  Wrapper
} from "./styles";

interface MetadataProps {
  data?: Transaction["metadata"];
  hash?: Transaction["metadataHash"] | null;
}

enum CIP {
  CIP20 = 20,
  CIP25 = 25,
  CIP60 = 60,
  CIP83 = 83
}

const CIPLabel721 = 721;
const CIPLabel674 = 674;

const Metadata: React.FC<MetadataProps> = ({ hash, data }) => {
  const LIMIT_MESSAGE_ROW = 4;
  const { t } = useTranslation();
  const theme = useTheme();
  const supportEnc = "basic";
  const [selectedIndedx, setSelectedIndex] = useState<number | null>(null);
  const [limitRow, setLimitRow] = useState<number>(LIMIT_MESSAGE_ROW);
  const [cip, setCip] = useState<CIP>(CIP.CIP25);
  const [openPassphrasseModal, setOpenPassphrasseModal] = useState<boolean>(false);
  const [passphrasse, setPassphrasse] = useState<string>("cardano");
  const [textRaw, setTextRaw] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [selectedText, setSelectedText] = useState<{ label: number; value: string } | null>(null);

  useEffect(() => {
    hanldeDecrypt();
  }, []);

  const hanldeDecrypt = () => {
    try {
      if (data && data.length > 0) {
        const messageValue = (JSON.parse(data[0].value).msg || []).join("");
        setTextRaw(decryptCardanoMessage(messageValue, passphrasse));
        setOpenPassphrasseModal(false);
      }
    } catch (error) {
      setError((error as Error).message);
    }
  };

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
                width={"100%"}
                sx={{ textDecoration: "underline", cursor: "pointer", textAlign: "center" }}
              >
                <Box mr={"2px"}>{t("CIP20.showMore")}</Box>
                <ShowMore fill={theme.palette.primary.main} />
              </Box>
            ) : (
              <Box
                onClick={() => setLimitRow(LIMIT_MESSAGE_ROW)}
                color={theme.palette.primary.main}
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                width={"100%"}
                sx={{ textDecoration: "underline", cursor: "pointer", textAlign: "center" }}
              >
                <Box mr={"2px"}> {t("CIP20.showLess")}</Box>
                <ShowLess fill={theme.palette.primary.main} />
              </Box>
            )
          ) : (
            <> </>
          )}
        </>
      );
    }
  };

  const renderRawMessage = (message: string[]) => {
    return (
      <>
        {message.slice(0, limitRow).map((value: string, idx: number) => (
          <React.Fragment key={idx}>
            <MetaDataJSONValueText>{value}</MetaDataJSONValueText>
          </React.Fragment>
        ))}
        {message.length > LIMIT_MESSAGE_ROW ? (
          message.length > limitRow ? (
            <Box
              onClick={() => setLimitRow(message.length)}
              color={theme.palette.primary.main}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              width={"100%"}
              sx={{ textDecoration: "underline", cursor: "pointer", textAlign: "center" }}
            >
              <Box mr={"2px"}>{t("CIP20.showMore")}</Box>
              <ShowMore fill={theme.palette.primary.main} />
            </Box>
          ) : (
            <Box
              onClick={() => setLimitRow(LIMIT_MESSAGE_ROW)}
              color={theme.palette.primary.main}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              width={"100%"}
              sx={{ textDecoration: "underline", cursor: "pointer", textAlign: "center" }}
            >
              <Box mr={"2px"}> {t("CIP20.showLess")}</Box>
              <ShowLess fill={theme.palette.primary.main} />
            </Box>
          )
        ) : (
          <> </>
        )}
      </>
    );
  };

  const renderButtonDecrypt = (metadata: Transaction["metadata"][0]["metadataCIP83"]["requiredProperties"]) => {
    if (metadata) {
      return (
        <MetadataContent>
          <MetadataJSONTitle> </MetadataJSONTitle>
          <Box display={"flex"} alignItems={"center"} gap={1} flexWrap={"wrap"}>
            <DecryptButton
              disabled={metadata[1].value !== supportEnc}
              onClick={() => {
                setError("");
                setOpenPassphrasseModal(true);
              }}
            >
              {t("CIP83.decryptMessage")}
            </DecryptButton>
            {metadata[1].value !== supportEnc && (
              <BadgeContainer>
                <WarningCIPIcon />
                <CIPLabel>{t("CIP83.notSupportEnc")}</CIPLabel>
              </BadgeContainer>
            )}
          </Box>
        </MetadataContent>
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
      {(data || [])?.map((metadata, idx) => {
        return (
          <MetadataWrapper key={idx}>
            <MetadataHeader mb={2}>
              <Box display={"flex"} alignItems={"center"} flexWrap={"wrap"}>
                <MetadataTitle
                  sx={{
                    [theme.breakpoints.down("sm")]: {
                      width: "125px !important",
                      mr: 2
                    }
                  }}
                >
                  {t("common.metadatumLabel")}
                </MetadataTitle>
                <MetaDataValue>{metadata.label ?? ""}</MetaDataValue>
              </Box>
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
                    {!isNil(metadata.metadataCIP60.valid) && !isEmpty(metadata.metadataCIP60?.tokenMap) && (
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
                    {!isNil(metadata?.metadataCIP20?.valid) &&
                      metadata?.metadataCIP83?.requiredProperties &&
                      !metadata?.metadataCIP83?.requiredProperties[1]?.value && (
                        <CIP20Badge
                          onClick={() => {
                            setSelectedIndex(idx);
                            setCip(CIP.CIP20);
                          }}
                          tooltipTitle={metadata?.metadataCIP20?.valid ? t("common.passed") : t("common.needsReview")}
                          type={metadata?.metadataCIP20?.valid ? "success" : "warning"}
                        />
                      )}
                    {!isNil(metadata?.metadataCIP83?.valid) &&
                      metadata?.metadataCIP83?.requiredProperties &&
                      metadata?.metadataCIP83?.requiredProperties[1]?.value && (
                        <CIP83Badge
                          onClick={() => {
                            setSelectedIndex(idx);
                            setCip(CIP.CIP83);
                          }}
                          tooltipTitle={metadata?.metadataCIP83?.valid ? t("common.passed") : t("common.needsReview")}
                          type={metadata?.metadataCIP83?.valid ? "success" : "warning"}
                        />
                      )}
                  </CIPChips>
                </CIPHeader>
              )}
            </MetadataHeader>
            <Box display={"flex"} mb={2}>
              <MetadataJSONTitle
                sx={{
                  [theme.breakpoints.down("sm")]: {
                    width: "40px !important",
                    mr: 2
                  }
                }}
              >
                {t("common.value")}
              </MetadataJSONTitle>
              <Box
                onClick={() => setSelectedText(metadata)}
                color={theme.palette.primary.main}
                sx={{ textDecoration: "underline", cursor: "pointer" }}
              >
                {t("CIP20.viewMessage")}
              </Box>
            </Box>
            {String(metadata.label) === String(CIPLabel674) &&
              !isNil(metadata?.metadataCIP20?.valid) &&
              metadata.metadataCIP20.valid && (
                <MetadataContent>
                  <MetadataJSONTitle
                    display={"flex"}
                    gap={2}
                    sx={{
                      [theme.breakpoints.down("md")]: {
                        width: "100% !important"
                      }
                    }}
                  >
                    <Box
                      width={"min-content"}
                      sx={{
                        [theme.breakpoints.down("md")]: {
                          width: "fit-content !important",
                          marginBottom: 1
                        }
                      }}
                    >
                      {t("CIP20.transactionMessage")}{" "}
                    </Box>
                    {String(metadata.label) === String(CIPLabel674) &&
                      !isNil(metadata?.metadataCIP83?.valid) &&
                      metadata?.metadataCIP83.valid && (
                        <CustomTooltip title={t("CIP83.noticeAutoDecrypt")}>
                          <Box display={"inline-block"}>
                            <InfoSolidIcon />
                          </Box>
                        </CustomTooltip>
                      )}
                  </MetadataJSONTitle>
                  {!textRaw && (
                    <MetaDataJSONValue>{renderMessage(metadata.metadataCIP20.requiredProperties)}</MetaDataJSONValue>
                  )}
                  {textRaw && <MetaDataJSONValue>{renderRawMessage(JSON.parse(textRaw))}</MetaDataJSONValue>}
                </MetadataContent>
              )}
            {String(metadata.label) === String(CIPLabel674) &&
              !isNil(metadata?.metadataCIP83?.valid) &&
              metadata?.metadataCIP83.valid &&
              !textRaw &&
              renderButtonDecrypt(metadata?.metadataCIP83?.requiredProperties)}
          </MetadataWrapper>
        );
      })}
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
        data={data?.[selectedIndedx || 0].metadataCIP25?.tokenMap}
        open={typeof selectedIndedx === "number" && cip === CIP.CIP25}
        version={data?.[selectedIndedx || 0].metadataCIP25?.version}
        onClose={() => setSelectedIndex(null)}
      />
      <CIP60Modal
        data={data?.[selectedIndedx || 0].metadataCIP60?.tokenMap}
        open={typeof selectedIndedx === "number" && cip === CIP.CIP60}
        version={data?.[selectedIndedx || 0].metadataCIP60?.version}
        onClose={() => setSelectedIndex(null)}
      />
      <CIP20Modal
        data={data?.[selectedIndedx || 0].metadataCIP20?.requiredProperties}
        open={typeof selectedIndedx === "number" && cip === CIP.CIP20}
        onClose={() => setSelectedIndex(null)}
      />
      <CIP83Modal
        data={data?.[selectedIndedx || 0].metadataCIP83?.requiredProperties}
        open={typeof selectedIndedx === "number" && cip === CIP.CIP83}
        onClose={() => setSelectedIndex(null)}
      />
      <PassphraseDecryptModal
        setPassphrasse={setPassphrasse}
        hanldeDecrypt={hanldeDecrypt}
        error={error}
        setError={setError}
        open={openPassphrasseModal}
        onClose={() => setOpenPassphrasseModal(false)}
      />
    </Box>
  );
};

export default Metadata;
