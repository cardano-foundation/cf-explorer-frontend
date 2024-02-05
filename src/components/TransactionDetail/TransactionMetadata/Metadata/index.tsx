import { Box, Grid, Skeleton, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { isEmpty, isNil } from "lodash";
import { t } from "i18next";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import { decryptCardanoMessage, isJson } from "src/commons/utils/helper";
import CIP60Modal from "src/components/CIPComplianceModal/CIP60Modal";
import DynamicEllipsisText from "src/components/DynamicEllipsisText";
import ParseScriptModal from "src/components/ParseScriptModal";
import { BolsiniAddress, InvalidIcon, ShowLess, ShowMore, VerifiedIcon, WarningCIPIcon } from "src/commons/resources";
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
import { CustomNumberBadge } from "src/components/commons/CustomNumberBadge";
import { details } from "src/commons/routers";

import {
  BadgeContainer,
  BadgeContainerVerify,
  CIPChips,
  CIPHeader,
  CIPHeaderTitle,
  CIPLabel,
  ContentIdentifiers,
  DecryptButton,
  Header,
  ItemBolnisi,
  MetaDataJSONValue,
  MetaDataJSONValueText,
  MetaDataValue,
  MetadataContent,
  MetadataHeader,
  MetadataJSONTitle,
  MetadataTitle,
  MetadataWrapper,
  ViewWineButton,
  Wrapper
} from "./styles";
import BolnisiWineDrawer from "./BolnisiWineDrawer";
import DefaultImageWine from "./DefaultImageWine";

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
const CIPLabel1904 = 1904;

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

  // Bolnisi Metadata
  const renderBolnisi = (data?: Transaction["metadata"][number]["metadataBolnisi"]) => {
    if (!data) return <Box>data not found</Box>;
    return (
      <Box>
        <MetadataContent
          alignItems={"center"}
          flexWrap={"wrap"}
          sx={{
            [theme.breakpoints.down("md")]: {
              alignItems: "baseline"
            }
          }}
        >
          <MetadataJSONTitle
            display={"flex"}
            minWidth={180}
            gap={2}
            sx={{
              [theme.breakpoints.down("md")]: {
                width: "100% !important"
              }
            }}
          >
            {t("bolsini.contentIdentifiers")}
          </MetadataJSONTitle>
          <MetaDataValue
            display={"flex"}
            alignItems={"center"}
            gap={1}
            flexWrap={"wrap"}
            sx={{
              [theme.breakpoints.down("md")]: {
                mt: 1,
                width: "100%"
              }
            }}
          >
            {data.cid && (
              <ContentIdentifiers>
                <DynamicEllipsisText
                  value={data.cid || ""}
                  isTooltip
                  sxFirstPart={{
                    [theme.breakpoints.up("sm")]: { maxWidth: "calc(100% - 60px)" },
                    [theme.breakpoints.down("sm")]: { maxWidth: "calc(100% - 75px)" }
                  }}
                />
              </ContentIdentifiers>
            )}
            {data.externalApiAvailable && (
              <Box>
                <VerifyBadge status={data.cidVerified} />
              </Box>
            )}
            {!data.externalApiAvailable && (
              <CustomTooltip
                title={
                  <Box width={"max-content"} maxWidth={"75vw"}>
                    {t("bolnisi.verifyErrorTooltip")}
                    <br />
                    {t("bolnisi.verifyErrorTooltipTryAgain")}
                  </Box>
                }
              >
                <BadgeContainerVerify type="Warning" fontWeight={500}>
                  <Box
                    width={23}
                    height={23}
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    bgcolor={theme.palette.warning[700]}
                    borderRadius={"50%"}
                  >
                    <InvalidIcon fill={theme.palette.secondary.main} />
                  </Box>
                  <Box width={"max-content"}>{t("bolnisi.verifyError")}</Box>
                </BadgeContainerVerify>
              </CustomTooltip>
            )}
          </MetaDataValue>
        </MetadataContent>

        {data.cidVerified && <Wineries wineryData={data.wineryData} />}
      </Box>
    );
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
              {metadata.label === CIPLabel1904 || metadata.label === CIPLabel674 ? (
                <Box
                  onClick={() => setSelectedText(metadata)}
                  color={theme.palette.primary.main}
                  sx={{ textDecoration: "underline", cursor: "pointer" }}
                >
                  {t("CIP20.viewMessage")}
                </Box>
              ) : (
                <MetaDataJSONValue>{metadata.value || ""}</MetaDataJSONValue>
              )}
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
            {String(metadata.label) === String(CIPLabel1904) && renderBolnisi(metadata?.metadataBolnisi)}
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

export const VerifyBadge = ({ status }: { status: boolean }) => {
  const theme = useTheme();
  if (!status) {
    return (
      <BadgeContainerVerify type="Invalid">
        <Box
          width={23}
          height={23}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          bgcolor={theme.palette.error[800]}
          borderRadius={"50%"}
        >
          <InvalidIcon fill={theme.palette.error[100]} />
        </Box>
        {t("bolsini.invalid")}
      </BadgeContainerVerify>
    );
  }
  return (
    <BadgeContainerVerify type="Verified">
      <Box
        width={23}
        height={23}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        bgcolor={theme.palette.success[700]}
        borderRadius={"50%"}
      >
        <VerifiedIcon />
      </Box>
      {t("bolsini.verified")}
    </BadgeContainerVerify>
  );
};

const Wineries: React.FC<{ wineryData?: Transaction["metadata"][number]["metadataBolnisi"]["wineryData"] }> = ({
  wineryData
}) => {
  const theme = useTheme();
  const history = useHistory();
  const { trxHash } = useParams<{ trxHash: string }>();

  const { wineryName, wineryNameLoading } = useSelector(({ system }: RootState) => system);

  if (!wineryData) return null;

  return (
    <Box>
      <Box alignItems={"center"} display={"flex"} mb={2}>
        <MetadataJSONTitle
          display={"flex"}
          gap={2}
          sx={{
            [theme.breakpoints.down("sm")]: {
              width: "unset",
              mr: 2
            }
          }}
        >
          {t("bolsini.wineries")}
        </MetadataJSONTitle>
        <MetaDataValue display={"flex"} alignItems={"center"}>
          <CustomNumberBadge ml="0px" value={wineryData?.length} />
        </MetaDataValue>
      </Box>
      {wineryNameLoading && (
        <Box component={Grid} container spacing={2}>
          {new Array(3).fill(0).map((_, idx) => {
            return (
              <Grid item width={"100%"} lg={4} md={6} sm={6} xs={12} key={idx}>
                <Box component={Skeleton} variant="rectangular" borderRadius={"10px"} height={150} />
              </Grid>
            );
          })}
        </Box>
      )}

      {!wineryNameLoading && (
        <Box component={Grid} container spacing={2}>
          {wineryData?.map((winery, idx) => {
            const getWineName = (wineryId: string) => {
              if (wineryName && wineryName[`${wineryId}`]) {
                return wineryName[`${wineryId}`].name;
              }
              return "";
            };

            return (
              <Grid item width={"100%"} lg={4} md={6} sm={6} xs={12} key={idx}>
                <Box height={"100%"}>
                  <ItemBolnisi>
                    <Box display={"flex"} width={"100%"} justifyContent={"flex-end"} mb={1}>
                      {winery.externalApiAvailable && <VerifyBadge status={winery.pkeyVerified} />}
                      {!winery.externalApiAvailable && (
                        <CustomTooltip
                          title={
                            <Box width={"max-content"} maxWidth={"75vw"}>
                              {t("bolnisi.verifyErrorTooltip")}
                              <br />
                              {t("bolnisi.verifyErrorTooltipTryAgain")}
                            </Box>
                          }
                        >
                          <BadgeContainerVerify type="Warning" fontWeight={500}>
                            <Box
                              width={23}
                              height={23}
                              display={"flex"}
                              alignItems={"center"}
                              justifyContent={"center"}
                              bgcolor={theme.palette.warning[700]}
                              borderRadius={"50%"}
                            >
                              <InvalidIcon fill={theme.palette.secondary.main} />
                            </Box>
                            <Box width={"max-content"}>{t("bolnisi.verifyError")}</Box>
                          </BadgeContainerVerify>
                        </CustomTooltip>
                      )}
                    </Box>
                    <Box display={"flex"} alignItems={"center"} flexWrap={"wrap"} gap={2}>
                      <Box component={DefaultImageWine} name={getWineName(winery.wineryId) || ""} />
                      <Box mt={1}>
                        <Box fontWeight={"bold"} mb={1} color={theme.palette.secondary.main}>
                          {getWineName(winery.wineryId)}
                        </Box>
                        <Box display={"flex"} alignItems={"center"}>
                          <BolsiniAddress fill={theme.palette.secondary.light} />
                          <Box
                            component={"span"}
                            pl={0.5}
                            fontSize={14}
                            color={theme.palette.secondary.light}
                            lineHeight={1}
                          >
                            Sulkhan-Saba Orbeliani 79, Bolnisi
                          </Box>
                        </Box>
                      </Box>
                    </Box>

                    <Box
                      component={ViewWineButton}
                      width={"100%"}
                      mt={2}
                      onClick={() => {
                        history.push(details.transaction(trxHash, "metadata", winery.wineryId));
                      }}
                      disabled={!winery.pkeyVerified && winery.externalApiAvailable}
                    >
                      {t("bolsini.viewWineLots")}
                    </Box>
                  </ItemBolnisi>
                </Box>
              </Grid>
            );
          })}
        </Box>
      )}
      <BolnisiWineDrawer />
    </Box>
  );
};
