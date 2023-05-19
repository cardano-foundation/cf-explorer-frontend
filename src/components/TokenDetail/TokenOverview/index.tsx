import { alpha, Box } from "@mui/material";
import React, { useState } from "react";
import decimalIcon from "../../../commons/resources/icons/decimal.svg";
import policyIcon from "../../../commons/resources/icons/policyIcon.svg";
import slotIcon from "../../../commons/resources/icons/slot.svg";
import timeIcon from "../../../commons/resources/icons/time.svg";
import exchageIcon from "../../../commons/resources/icons/Union.svg";
import { formatDateTimeLocal, numberWithCommas } from "../../../commons/utils/helper";
import DetailHeader from "../../commons/DetailHeader";
import ScriptModal from "../../ScriptModal";
import { CardItem, WrapTitle } from "./styles";

interface ITokenOverview {
  data: IToken | null;
  loading: boolean;
}

const TokenOverview: React.FC<ITokenOverview> = ({ data, loading }) => {
  const [openModal, setOpenModal] = useState(false);
  const [policyId, setPolicyId] = useState("");
  const listItem = [
    {
      title: "",
      value: (
        <CardItem display={"flex"} gap={2} flex={3} mt={"-30px"}>
          <Box>
            <img src={policyIcon} alt='' />
          </Box>
          <Box display={"flex"} flexDirection='column' height={"80%"} justifyContent='space-between'>
            <Box
              color={(theme) => theme.palette.primary.main}
              fontWeight='bold'
              fontFamily={'"Roboto", sans-serif'}
              fontSize={"1.125rem"}
              component='button'
              border={"none"}
              bgcolor='transparent'
              padding={0}
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
      value: <Box component={"span"}>{numberWithCommas(data?.supply)}</Box>,
      icon: slotIcon
    },
    { title: <WrapTitle>Decimal</WrapTitle>, icon: decimalIcon, value: data?.metadata?.decimals || 0 },
    {
      title: (
        <Box display={"flex"} alignItems='center'>
          <Box component={"span"} mr={1} width={"max-content"}>
            <WrapTitle>Total Transactions</WrapTitle>
          </Box>
        </Box>
      ),
      icon: exchageIcon,
      value: numberWithCommas(data?.txCount)
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
