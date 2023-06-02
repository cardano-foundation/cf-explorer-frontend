import { Box } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

import useFetch from "src/commons/hooks/useFetch";
import { details } from "src/commons/routers";
import { API } from "src/commons/utils/api";
import { exchangeADAToUSD, formatADAFull, getShortWallet } from "src/commons/utils/helper";
import { RootState } from "src/stores/types";
import CardAddress from "src/components/share/CardAddress";
import Card from "src/components/commons/Card";
import TokenAutocomplete from "src/components/TokenAutocomplete";
import ADAicon from "src/components/commons/ADAIcon";
import VerifyScript from "src/components/VerifyScript";

import { GridContainer, GridItem, Pool, StyledAAmount } from "./styles";

interface Props {
  data: WalletAddress | null;
  loading: boolean;
}

const AddressOverview: React.FC<Props> = ({ data, loading }) => {
  const { data: dataStake, loading: loadingStake } = useFetch<WalletStake>(
    data?.stakeAddress ? `${API.STAKE.DETAIL}/${data?.stakeAddress}` : ""
  );
  const { adaRate } = useSelector(({ system }: RootState) => system);

  const itemLeft = [
    { title: "Transaction", value: data?.txCount },
    {
      title: "ADA Balance",
      value: (
        <StyledAAmount>
          <Box>{formatADAFull(data?.balance)}</Box>
          <ADAicon pl={"8px"} />
        </StyledAAmount>
      )
    },
    { title: "ADA Value", value: exchangeADAToUSD(data?.balance || 0, adaRate, true) },
    {
      value: <TokenAutocomplete address={data?.address || ""} />
    }
  ];
  const itemRight = [
    {
      title: "Controlled Total Stake",
      value: (
        <StyledAAmount>
          {formatADAFull(dataStake?.totalStake)}
          <ADAicon pl={"8px"} />
        </StyledAAmount>
      )
    },
    {
      title: "Reward Available",
      value: (
        <StyledAAmount>
          {formatADAFull(dataStake?.rewardAvailable)}
          <ADAicon pl={"8px"} />
        </StyledAAmount>
      )
    },
    {
      title: "Reward Withdrawn",
      value: (
        <StyledAAmount>
          {formatADAFull(dataStake?.rewardWithdrawn)}
          <ADAicon pl={"8px"} />
        </StyledAAmount>
      )
    },
    {
      title: "Delegated To",
      value: (
        <Pool to={details.delegation(dataStake?.pool ? dataStake?.pool?.poolId : "")}>
          {dataStake?.pool?.poolName || `Pool [${getShortWallet(dataStake?.pool?.poolId || "")}]`}
        </Pool>
      )
    }
  ];

  return (
    <Card title={<VerifyScript verified={!!data?.verifiedContract} />}>
      <GridContainer container spacing={2}>
        <GridItem item xs={12} md={6}>
          <Box overflow="hidden" borderRadius={3} height={"100%"}>
            <CardAddress
              title={"Wallet address"}
              type="left"
              address={data?.address || ""}
              item={itemLeft}
              loading={loading}
            />
          </Box>
        </GridItem>
        <GridItem item xs={12} md={6}>
          <Box overflow="hidden" borderRadius={3} height={"100%"}>
            <CardAddress
              title={"Controlled stake key"}
              type="right"
              address={dataStake?.stakeAddress || ""}
              item={itemRight}
              loading={loading || loadingStake}
              addressDestination={details.stake(dataStake?.stakeAddress)}
            />
          </Box>
        </GridItem>
      </GridContainer>
    </Card>
  );
};

export default AddressOverview;
