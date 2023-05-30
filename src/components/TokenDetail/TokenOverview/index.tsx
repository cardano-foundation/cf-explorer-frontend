import { alpha, Box, Button } from "@mui/material";
import BigNumber from "bignumber.js";
import React, { useContext, useState } from "react";
import { OverviewMetadataTokenContext } from "src/pages/TokenDetail";
import decimalIcon from "../../../commons/resources/icons/decimal.svg";
import policyIcon from "../../../commons/resources/icons/policyIcon.svg";
import slotIcon from "../../../commons/resources/icons/slot.svg";
import timeIcon from "../../../commons/resources/icons/time.svg";
import exchageIcon from "../../../commons/resources/icons/Union.svg";
import { formatDateTimeLocal, formatNumberDivByDecimals, numberWithCommas } from "../../../commons/utils/helper";
import DetailHeader from "../../commons/DetailHeader";
import ScriptModal from "../../ScriptModal";
import { CardItem, WrapTitle } from "./styles";
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
      title: "",
      value: (
        <CardItem display={"flex"} gap={2} flex={3} mt={"-30px"} paddingLeft={0} paddingRight={0}>
          <Box>
            <img src={policyIcon} alt='' />
          </Box>
          <Box display={"flex"} flexDirection='column' height={"80%"} justifyContent='space-between'>
            <Box
              color={(theme) => theme.palette.primary.main}
              fontWeight='bold'
              fontFamily={'"Roboto", sans-serif'}
              fontSize={"1.125rem"}
              component={Button}
              border={"none"}
              bgcolor='transparent'
              textTransform={"capitalize"}
              padding={0}
              justifyContent={"flex-start"}
              textAlign='left'
              onClick={() => {
                setOpenModal(true);
                setPolicyId(data?.policy || "");
              }}
              style={{ cursor: "pointer" }}
            >
              Policy Script
            </Box>
            <Box>
              <Box
                display={"flex"}
                alignItems='center'
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
                    alt='logo icon'
                    ml={1}
                  />
                ) : (
                  ""
                )}
              </Box>
              <Box
                display={"flex"}
                alignItems='center'
                fontSize={"0.75rem"}
                color={(theme) => alpha(theme.palette.common.black, 0.5)}
              >
                {data?.metadata?.description || ""}
              </Box>
            </Box>
          </Box>
        </CardItem>
      ),
      icon: ""
    },
    {
      title: <WrapTitle>Total Supply</WrapTitle>,
      value: <Box component={"span"}>{formatNumberDivByDecimals(data?.supply, decimalToken)}</Box>,
      icon: slotIcon
    },
    { title: <WrapTitle>Decimal</WrapTitle>, icon: decimalIcon, value: decimalToken },
    {
      title: (
        <Box display={"flex"} alignItems='center'>
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
        <Box display={"flex"} alignItems='center'>
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
        <Box display={"flex"} alignItems='center'>
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
        <Box display={"flex"} alignItems='center'>
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
        <Box display={"flex"} alignItems='center'>
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
        type='TOKEN'
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
