import { Box } from "@mui/material";
import BigNumber from "bignumber.js";
import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";

import {
  ExchageIcon,
  FileGuard,
  RewardIconComponent,
  SlotIcon,
  TimeIconComponent,
  USDIconComponent
} from "src/commons/resources";
import {
  formatDateTimeLocal,
  formatNumberDivByDecimals,
  getShortHash,
  numberWithCommas,
  tokenRegistry
} from "src/commons/utils/helper";
import CopyButton from "src/components/commons/CopyButton";
import DetailHeader from "src/components/commons/DetailHeader";
import { OverviewMetadataTokenContext } from "src/pages/TokenDetail";
import CustomTooltip from "src/components/commons/CustomTooltip";

import ScriptModal from "../../ScriptModal";
import { ButtonLink, PolicyId, PolicyScriptBtn, TokenDescription, TokenHeader, TokenUrl, WrapTitle } from "./styles";

BigNumber.config({ DECIMAL_PLACES: 40 });

interface ITokenOverview {
  data: IToken | null;
  loading: boolean;
  currentHolders: number;
  lastUpdated?: number;
}

const TokenOverview: React.FC<ITokenOverview> = ({ data, loading, currentHolders, lastUpdated }) => {
  const { t } = useTranslation();
  const [openModal, setOpenModal] = useState(false);
  const [policyId, setPolicyId] = useState("");
  const decimalToken = data?.decimals || data?.metadata?.decimals || 0;
  const { txCountRealtime } = useContext(OverviewMetadataTokenContext);
  const listItem = [
    {
      title: (
        <TokenHeader>
          <CustomTooltip title={data?.displayName || data?.fingerprint || ""}>
            <span>{data?.displayName || getShortHash(data?.fingerprint) || ""}</span>
          </CustomTooltip>
          {data?.metadata && data?.metadata?.logo ? (
            <Box component={"img"} width={"auto"} height={36} src={`${data.metadata.logo}`} alt="logo icon" ml={1} />
          ) : (
            ""
          )}
        </TokenHeader>
      ),
      value: (
        <TokenDescription>
          <Box mb={1}>
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
      value: <Box component={"span"}>{formatNumberDivByDecimals(data?.supply, decimalToken)}</Box>,
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
              <PolicyId>{data?.policy || ""}</PolicyId>
            </CustomTooltip>
            <Box position={"absolute"} top={"-5px"} right={0}>
              <CopyButton text={data?.policy}></CopyButton>
            </Box>
          </Box>
          <PolicyScriptBtn
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
      title: (
        <Box display={"flex"} alignItems="center">
          <Box component={"span"} mr={1} width={"max-content"}>
            <WrapTitle>{t("common.totalTxs")}</WrapTitle>
          </Box>
        </Box>
      ),
      icon: ExchageIcon,
      value: numberWithCommas(txCountRealtime || data?.txCount)
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
            <WrapTitle>{t("glossary.numberOfHolders")}</WrapTitle>
          </Box>
        </Box>
      ),
      icon: RewardIconComponent,
      value: numberWithCommas(currentHolders || data?.numberOfHolders || "")
    },
    {
      title: (
        <Box display={"flex"} alignItems="center">
          <Box component={"span"} mr={1}>
            <CustomTooltip title={t("desc.InUnits4Native")}>
              <WrapTitle>{t("glossary.totalVolumn")}</WrapTitle>
            </CustomTooltip>
          </Box>
        </Box>
      ),
      icon: ExchageIcon,
      value: formatNumberDivByDecimals(data?.totalVolume || "", decimalToken || 0)
    },
    {
      title: (
        <Box display={"flex"} alignItems="center">
          <Box component={"span"} mr={1}>
            <CustomTooltip title={t("desc.InUnits4Native")}>
              <WrapTitle>{t("glossary.volume24h")}</WrapTitle>
            </CustomTooltip>
          </Box>
        </Box>
      ),
      icon: USDIconComponent,
      value: formatNumberDivByDecimals(data?.volumeIn24h || "", data?.metadata?.decimals || 0)
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
      value: formatDateTimeLocal(data?.createdOn || "")
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
      value: formatDateTimeLocal(data?.tokenLastActivity || "")
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
