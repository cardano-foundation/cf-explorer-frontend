import { alpha, Box, Button } from "@mui/material";
import BigNumber from "bignumber.js";
import React, { useContext, useState } from "react";

import { OverviewMetadataTokenContext } from "src/pages/TokenDetail";
import CopyButton from "src/components/commons/CopyButton";

import slotIcon from "../../../commons/resources/icons/slot.svg";
import timeIcon from "../../../commons/resources/icons/time.svg";
import exchageIcon from "../../../commons/resources/icons/Union.svg";
import fileGuardIIcon from "../../../commons/resources/icons/file-guard.svg";
import { formatDateTimeLocal, formatNumberDivByDecimals, numberWithCommas } from "../../../commons/utils/helper";
import DetailHeader from "../../commons/DetailHeader";
import ScriptModal from "../../ScriptModal";
import { PolicyId, WrapTitle } from "./styles";
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
        <Box
          display={"flex"}
          alignItems="center"
          fontWeight={"bold"}
          mb={1}
          color={({ palette }) => palette.common.black}
          sx={{
            overflowWrap: "anywhere"
          }}
        >
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
        </Box>
      ),
      value: (
        <Box
          display={"flex"}
          alignItems="center"
          fontSize={"0.75rem"}
          color={(theme) => alpha(theme.palette.common.black, 0.5)}
        >
          {data?.metadata?.description || ""}
        </Box>
      ),
    },
    {
      title: <WrapTitle>Total Supply</WrapTitle>,
      value: <Box component={"span"}>{formatNumberDivByDecimals(data?.supply, decimalToken)}</Box>,
      icon: slotIcon
    },
    {
      title: <WrapTitle>Policy Id</WrapTitle>, icon: fileGuardIIcon, value: (
        <>
          <Box position={"relative"}>
            <PolicyId>
              {data?.policy || ""}
            </PolicyId>
            <Box position={"absolute"} top={"-5px"} right={0}>
              <CopyButton text={data?.policy}></CopyButton>
            </Box>
          </Box>
          <Box
            color={(theme) => theme.palette.primary.main}
            fontFamily={'"Roboto", sans-serif'}
            fontSize={"14px"}
            component={Button}
            border={"none"}
            bgcolor="transparent"
            textTransform={"capitalize"}
            padding={0}
            mt={1}
            justifyContent={"flex-start"}
            textAlign="left"
            onClick={() => {
              setOpenModal(true);
              setPolicyId(data?.policy || "");
            }}
            style={{ cursor: "pointer" }}
          >
            Policy Script
          </Box>
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
      icon: exchageIcon,
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
      icon: exchageIcon,
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
      icon: exchageIcon,
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
      icon: exchageIcon,
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
      icon: timeIcon,
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
