import { Box, Button, useTheme } from "@mui/material";
import BigNumber from "bignumber.js";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";
import HideImageIcon from "@mui/icons-material/HideImage";

import { FileGuard, SlotIcon, USDIconComponent } from "src/commons/resources";
import { getShortHash, formatNumberTotalSupply, tokenRegistry } from "src/commons/utils/helper";
import CopyButton from "src/components/commons/CopyButton";
import DetailHeader from "src/components/commons/DetailHeader";
import CustomTooltip from "src/components/commons/CustomTooltip";
import StyledModal from "src/components/commons/StyledModal";

import ScriptModal from "../../ScriptModal";
import { ButtonLink, PolicyId, PolicyScriptBtn, TokenDescription, TokenHeader, TokenUrl, WrapTitle } from "./styles";

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

          <StyledModal
            open={openLogoModal}
            handleCloseModal={() => {
              setOpenLogoModal(false);
            }}
            width="380px"
            modalStyle={{ maxWidth: { xs: "380px", sm: "none" } }}
          >
            <Box>
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
              <Box sx={{ backgroundColor: theme.palette.secondary[100], borderRadius: "8px", padding: "16px" }}>
                <Box
                  sx={{
                    textAlign: "left",
                    marginBottom: "20px",
                    fontSize: "16px",
                    fontWeight: "600",
                    color: theme.palette.secondary.light,
                    whiteSpace: "pre-line"
                  }}
                >
                  {t("token.confirmView")}
                </Box>
                <Box sx={{ display: "flex", justifyContent: "center", gap: "35px" }}>
                  <Button
                    variant="outlined"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowLogo(false);
                      setOpenLogoModal(false);
                    }}
                    sx={{
                      padding: "10px 12px ",
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
                    sx={{ padding: "10px 12px", textTransform: "none", borderRadius: "8px", fontWeight: "700" }}
                  >
                    {t("common.continue")}
                  </Button>
                </Box>
              </Box>
            </Box>
          </StyledModal>
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
          <Box maxWidth={"300px"} position={"relative"}>
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
              setOpenModal(true);
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
        createdOn={data?.createdOn}
        tokenLastActivity={data?.tokenLastActivity}
      />
      <ScriptModal open={openModal} onClose={() => setOpenModal(false)} policy={policyId} />
    </Box>
  );
};

export default TokenOverview;
