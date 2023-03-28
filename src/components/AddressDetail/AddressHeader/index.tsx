import { Link } from "react-router-dom";
import { Grid, Box, useTheme } from "@mui/material";
import { exchangeADAToUSD, formatADAFull, getShortWallet } from "../../../commons/utils/helper";
import Card from "../../commons/Card";
import useFetch from "../../../commons/hooks/useFetch";
import { AIcon } from "../../../commons/resources";
import CardAddress from "../../share/CardAddress";
import { details } from "../../../commons/routers";
import { useSelector } from "react-redux";
import { RootState } from "../../../stores/types";
import { useEffect, useState } from "react";
import { API } from "../../../commons/utils/api";
import BookmarkButton from "../../commons/BookmarkIcon";
import TokenAutocomplete from "../../TokenAutocomplete";

interface Props {
  data: WalletAddress | null;
  loading: boolean;
}
const AddressHeader: React.FC<Props> = ({ data, loading }) => {
  const [stakeKey, setStakeKey] = useState("");
  const { data: dataStake, loading: loadingStake } = useFetch<WalletStake>(
    stakeKey ? `${API.STAKE.DETAIL}/${stakeKey}` : ""
  );
  const { adaRate } = useSelector(({ system }: RootState) => system);
  const theme = useTheme();

  useEffect(() => {
    setStakeKey(data?.stakeAddress || "");
  }, [data]);

  const itemLeft = [
    { title: "Transaction", value: data?.txCount || 0 },
    {
      title: "ADA Balance",
      value: (
        <Box display="flex" alignItems="center">
          {formatADAFull(data?.balance)}
          <img style={{ paddingLeft: 8 }} src={AIcon} alt="icon" />
        </Box>
      ),
    },
    {
      title: "ADA Value",
      value: <Box>$ {exchangeADAToUSD(data?.balance || 0, adaRate, true)}</Box>,
    },
    {
      value: <TokenAutocomplete address={data?.address || ""} />,
    },
  ];
  const itemRight = [
    {
      title: "Total Stake",
      value: (
        <Box>
          {formatADAFull(dataStake?.totalStake)}
          <img style={{ paddingLeft: 8 }} src={AIcon} alt="icon" />
        </Box>
      ),
    },
    {
      title: "POOL NAME",
      value: (
        <Link
          to={dataStake?.pool?.poolName ? details.delegation(dataStake.pool.poolId) : "#"}
          style={{ fontFamily: "var(--font-family-text)", color: theme.palette.secondary.main }}
        >
          {dataStake?.pool?.poolName ||
            (dataStake?.pool?.poolId && `Pool [${getShortWallet(dataStake.pool.poolId)}]`) ||
            ""}
        </Link>
      ),
    },
    {
      title: "Reward",
      value: (
        <Box>
          {formatADAFull(dataStake?.rewardAvailable)}
          <img style={{ paddingLeft: 8 }} src={AIcon} alt="icon" />
        </Box>
      ),
    },
  ];

  return (
    <Card
      title={
        <Box display={"flex"}>
          <Box>Address Detail</Box>
          <BookmarkButton keyword={data?.address || ""} type="ADDRESS" />
        </Box>
      }
    >
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
              title={"Stake address"}
              type="right"
              address={data?.stakeAddress || ""}
              item={itemRight}
              loading={loading || loadingStake}
              addressDestination={details.stake(data?.stakeAddress)}
            />
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
};

export default AddressHeader;
