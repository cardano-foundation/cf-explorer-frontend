import { Box, Button, Modal, useTheme } from "@mui/material";
import BigNumber from "bignumber.js";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";
import HideImageIcon from "@mui/icons-material/HideImage";
import { CgClose } from "react-icons/cg";

import { FileGuard, SlotIcon, TimeIconComponent, USDIconComponent } from "src/commons/resources";
import { formatDateTimeLocal, getShortHash, formatNumberTotalSupply, tokenRegistry } from "src/commons/utils/helper";
import CopyButton from "src/components/commons/CopyButton";
import DetailHeader from "src/components/commons/DetailHeader";
import CustomTooltip from "src/components/commons/CustomTooltip";
import DatetimeTypeTooltip from "src/components/commons/DatetimeTypeTooltip";

import ScriptModal from "../../ScriptModal";
import {
  ButtonLink,
  CloseButton,
  PolicyId,
  PolicyScriptBtn,
  TokenDescription,
  TokenHeader,
  TokenUrl,
  WrapTitle
} from "./styles";

BigNumber.config({ DECIMAL_PLACES: 40 });

interface ITokenOverview {
  data: IToken | null;
  loading: boolean;
  lastUpdated?: number;
}

const TokenOverview: React.FC<ITokenOverview> = ({ data, loading, lastUpdated }) => {
  const { t } = useTranslation();
  const [openLogoModal, setOpenLogoModal] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [policyId, setPolicyId] = useState("");
  const [showLogo, setShowLogo] = useState(false);
  const decimalToken = data?.decimals || data?.metadata?.decimals || 0;

  const theme = useTheme();

  const listItem = [
    {
      title: (
        <TokenHeader>
          <CustomTooltip title={data?.displayName || data?.fingerprint || ""}>
            <span>{data?.displayName || getShortHash(data?.fingerprint) || ""}</span>
          </CustomTooltip>
          {!showLogo && (
            <ImageSearchIcon
              sx={{ marginLeft: "8px", width: "auto", height: "36px", cursor: "pointer" }}
              onClick={() => setOpenLogoModal(true)}
              color="primary"
            />
          )}
          {showLogo && data?.metadata?.logo ? (
            <Box
              component="img"
              width="auto"
              height={36}
              src={data.metadata.logo}
              alt="logo icon"
              ml={1}
              onClick={(e) => e.stopPropagation()}
            />
          ) : showLogo ? (
            <HideImageIcon sx={{ marginLeft: "8px", width: "auto", height: "36px" }} />
          ) : null}

          <Modal
            open={openLogoModal}
            onClose={(e: React.MouseEvent) => {
              e.stopPropagation();
              setOpenLogoModal(false);
            }}
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
            sx={{ zIndex: 9999 }}
          >
            <Box
              onClick={(e) => e.stopPropagation()}
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                bgcolor: theme.palette.primary[100],
                boxShadow: 24,
                p: 4,
                borderRadius: 2,
                minWidth: {
                  xs: "150px",
                  sm: "350px"
                },
                textAlign: "center",
                zIndex: 9999,
                padding: "30px",
                border: "none",
                outline: "none"
              }}
            >
              <Box
                sx={{
                  marginBottom: "20px",
                  color: theme.palette.secondary.main,
                  textAlign: "left",
                  fontSize: "24px",
                  fontWeight: "700"
                }}
              >
                NSFW Content
              </Box>
              <CloseButton onClick={() => setOpenLogoModal(false)}>
                <CgClose />
              </CloseButton>
              <Box sx={{ backgroundColor: theme.isDark ? "#000" : "#fff", borderRadius: "8px", padding: "16px" }}>
                <Box
                  sx={{
                    maxWidth: "270px",
                    textAlign: "left",
                    marginBottom: "60px",
                    fontSize: "16px",
                    fontWeight: "600",
                    color: theme.palette.secondary.light
                  }}
                >
                  {t("token.confirmView")}
                </Box>
                <Box sx={{ display: "flex", justifyContent: "center", gap: "92px" }}>
                  <Button
                    variant="outlined"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowLogo(false);
                      setOpenLogoModal(false);
                    }}
                    sx={{
                      padding: "12px 16px ",
                      textTransform: "none",
                      borderRadius: "8px",
                      fontWeight: "700",
                      backgroundColor: theme.palette.secondary.light,
                      color: !theme.isDark ? "#fff" : "#000"
                    }}
                  >
                    {t("common.cancel")}
                  </Button>
                  <Button
                    variant="contained"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowLogo(true);
                      setOpenLogoModal(false);
                    }}
                    sx={{ padding: "12px 16px", textTransform: "none", borderRadius: "8px", fontWeight: "700" }}
                  >
                    {t("common.continue")}
                  </Button>
                </Box>
              </Box>
            </Box>
          </Modal>
        </TokenHeader>
      ),
      value: (
        <TokenDescription>
          <Box mb={1} data-assetName={`${data?.policy}${data?.name}`} data-testid="token.asset.name">
            {t("common.hexFormat")}: #{data?.name || data?.fingerprint}
          </Box>
          {data?.metadata?.description || ""}
          {data?.metadata?.url ? (
            <TokenUrl onClick={() => window.open(data?.metadata?.url, "_blank")}>{data?.metadata?.url}</TokenUrl>
          ) : null}
        </TokenDescription>
      )
    },
    {
      title: <WrapTitle>{t("common.totalSupply")}</WrapTitle>,
      value: <Box component={"span"}>{formatNumberTotalSupply(data?.supply, decimalToken)}</Box>,
      icon: SlotIcon
    },
    {
      title: <WrapTitle>{t("glossary.scriptHash")}</WrapTitle>,
      icon: FileGuard,
      strokeColor: "#000",
      value: (
        <>
          <Box position={"relative"}>
            <CustomTooltip title={data?.policy}>
              <PolicyId data-testid="token.asset.script">{data?.policy || ""}</PolicyId>
            </CustomTooltip>
            <Box position={"absolute"} top={"-5px"} right={0}>
              <CopyButton text={data?.policy}></CopyButton>
            </Box>
          </Box>
          <PolicyScriptBtn
            data-testid="token.policyScript"
            onClick={() => {
              setOpenLogoModal(true);
              setPolicyId(data?.policy || "");
            }}
          >
            {t("common.policyScript")}
          </PolicyScriptBtn>
        </>
      )
    },
    {
      title: <WrapTitle>{t("glossary.tokenType")}</WrapTitle>,
      icon: USDIconComponent,
      value: (
        <>
          <Box>{data?.tokenType}</Box>
          {!data?.metadata ? (
            ""
          ) : (
            <ButtonLink target="_blank" href={tokenRegistry(data?.policy, data?.name)}>
              {t("glossary.registry")}
            </ButtonLink>
          )}
        </>
      )
    },
    {
      title: (
        <Box display={"flex"} alignItems="center">
          <Box component={"span"} mr={1}>
            <WrapTitle>{t("createdAt")}</WrapTitle>
          </Box>
        </Box>
      ),
      icon: TimeIconComponent,
      value: <DatetimeTypeTooltip>{formatDateTimeLocal(data?.createdOn || "")}</DatetimeTypeTooltip>
    },
    {
      title: (
        <Box display={"flex"} alignItems="center">
          <Box component={"span"} mr={1}>
            <WrapTitle>{t("glossary.tokenLastActivity")}</WrapTitle>
          </Box>
        </Box>
      ),
      icon: TimeIconComponent,
      value: <DatetimeTypeTooltip>{formatDateTimeLocal(data?.tokenLastActivity || "")}</DatetimeTypeTooltip>
    },
    {
      title: <></>,
      value: <></>
    }
  ];

  return (
    <Box textAlign={"left"}>
      <DetailHeader
        type="TOKEN"
        title={data?.displayName || ""}
        hash={data?.fingerprint}
        listItem={listItem}
        loading={loading}
        lastUpdated={lastUpdated}
      />
      <ScriptModal open={openModal} onClose={() => setOpenModal(false)} policy={policyId} />
    </Box>
  );
};

export default TokenOverview;
