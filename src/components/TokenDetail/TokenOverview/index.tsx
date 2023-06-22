import { Box } from "@mui/material";
import BigNumber from "bignumber.js";
import React, { useContext, useState } from "react";

import { RewardIcon, USDIcon, exchageIconUrl, fileGuardUrl, slotIconUrl, timeIconUrl } from "src/commons/resources";
import { formatDateTimeLocal, formatNumberDivByDecimals, numberWithCommas } from "src/commons/utils/helper";
import CopyButton from "src/components/commons/CopyButton";
import DetailHeader from "src/components/commons/DetailHeader";
import { OverviewMetadataTokenContext } from "src/pages/TokenDetail";
import CustomTooltip from "src/components/commons/CustomTooltip";

import ScriptModal from "../../ScriptModal";
import { PolicyId, PolicyScriptBtn, TokenDescription, TokenHeader, WrapTitle } from "./styles";

BigNumber.config({ DECIMAL_PLACES: 40 });

interface ITokenOverview {
  data: IToken | null;
  loading: boolean;
}

const TokenOverview: React.FC<ITokenOverview> = ({ data, loading }) => {
  const [openModal, setOpenModal] = useState(false);
  const [policyId, setPolicyId] = useState("");
  const decimalToken = data?.decimals || data?.metadata?.decimals || 0;
  const { txCountRealtime } = useContext(OverviewMetadataTokenContext);
  const listItem = [
    {
      title: (
        <TokenHeader>
          {data?.displayName || ""}
          {data?.metadata && data?.metadata?.logo ? (
            <Box
              component={"img"}
              width={"auto"}
              height={36}
              src={`data:image/png;base64,${data.metadata.logo}`}
              alt="logo icon"
              ml={1}
            />
          ) : (
            ""
          )}
        </TokenHeader>
      ),
      value: <TokenDescription>{data?.metadata?.description || ""}</TokenDescription>
    },
    {
      title: <WrapTitle>Total Supply</WrapTitle>,
      value: <Box component={"span"}>{formatNumberDivByDecimals(data?.supply, decimalToken)}</Box>,
      icon: slotIconUrl
    },
    {
      title: <WrapTitle>Policy Id</WrapTitle>,
      icon: fileGuardUrl,
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
            Policy Script
          </PolicyScriptBtn>
        </>
      )
    },
    {
      title: (
        <Box display={"flex"} alignItems="center">
          <Box component={"span"} mr={1} width={"max-content"}>
            <WrapTitle>Total Transactions</WrapTitle>
          </Box>
        </Box>
      ),
      icon: exchageIconUrl,
      value: numberWithCommas(txCountRealtime || data?.txCount)
    },
    {
      title: (
        <Box display={"flex"} alignItems="center">
          <Box component={"span"} mr={1}>
            <WrapTitle>Number of Holders</WrapTitle>
          </Box>
        </Box>
      ),
      icon: RewardIcon,
      value: numberWithCommas(data?.numberOfHolders || "")
    },
    {
      title: (
        <Box display={"flex"} alignItems="center">
          <Box component={"span"} mr={1}>
            <WrapTitle>Total Volume</WrapTitle>
          </Box>
        </Box>
      ),
      icon: exchageIconUrl,
      value: numberWithCommas(data?.totalVolume || "")
    },
    {
      title: (
        <Box display={"flex"} alignItems="center">
          <Box component={"span"} mr={1}>
            <WrapTitle>Volume 24H</WrapTitle>
          </Box>
        </Box>
      ),
      icon: USDIcon,
      value: numberWithCommas(data?.volumeIn24h || "")
    },
    {
      title: (
        <Box display={"flex"} alignItems="center">
          <Box component={"span"} mr={1}>
            <WrapTitle>Created</WrapTitle>
          </Box>
        </Box>
      ),
      icon: timeIconUrl,
      value: formatDateTimeLocal(data?.createdOn || "")
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
      />
      <ScriptModal open={openModal} onClose={() => setOpenModal(false)} policy={policyId} />
    </Box>
  );
};

export default TokenOverview;
