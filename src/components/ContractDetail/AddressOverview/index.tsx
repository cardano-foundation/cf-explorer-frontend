import { Box, Grid } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import useFetch from "../../../commons/hooks/useFetch";
import { AIcon } from "../../../commons/resources";
import { details } from "../../../commons/routers";
import { API } from "../../../commons/utils/api";
import { exchangeADAToUSD, formatADAFull, getShortWallet } from "../../../commons/utils/helper";
import { RootState } from "../../../stores/types";
import Card from "../../commons/Card";
import CardAddress from "../../share/CardAddress";
import TokenAutocomplete from "../../TokenAutocomplete";
import { Pool, StyledAAmount } from "./styles";
import ADAicon from "../../commons/ADAIcon";

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
      ),
    },
    { title: "ADA Value", value: exchangeADAToUSD(data?.balance || 0, adaRate, true) },
    {
      value: <TokenAutocomplete address={data?.address || ""} />,
    },
  ];
  const itemRight = [
    {
      title: "Controlled Total Stake",
      value: (
        <StyledAAmount>
          {formatADAFull(dataStake?.totalStake)}
          <ADAicon pl={"8px"} />
        </StyledAAmount>
      ),
    },
    {
      title: "Reward Available",
      value: (
        <StyledAAmount>
          {formatADAFull(dataStake?.rewardAvailable)}
          <ADAicon pl={"8px"} />
        </StyledAAmount>
      ),
    },
    {
      title: "Reward Withdrawn",
      value: (
        <StyledAAmount>
          {formatADAFull(dataStake?.rewardWithdrawn)}
          <ADAicon pl={"8px"} />
        </StyledAAmount>
      ),
    },
    {
      title: "Delegated To",
      value: (
        <Pool to={details.delegation(dataStake?.pool ? dataStake?.pool?.poolId : "")}>
          {dataStake?.pool?.poolName || `Pool [${getShortWallet(dataStake?.pool?.poolId || "")}]`}
        </Pool>
      ),
    },
  ];
  return (
    <Card title="Contract Detail">
      <Grid container columnSpacing={2}>
        <Grid item xs={12} md={6}>
          <Box overflow="hidden" borderRadius={10} height={"100%"}>
            <CardAddress
              title={"Wallet address"}
              type="left"
              address={data?.address || ""}
              item={itemLeft}
              loading={loading}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box overflow="hidden" borderRadius={10} height={"100%"}>
            <CardAddress
              title={"Controlled stake key"}
              type="right"
              address={dataStake?.stakeAddress || ""}
              item={itemRight}
              loading={loading || loadingStake}
              addressDestination={details.stake(dataStake?.stakeAddress)}
            />
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
};

export default AddressOverview;
