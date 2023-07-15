import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Grid, Box, useTheme, Button } from "@mui/material";
import { useSelector } from "react-redux";
import { HiArrowLongLeft } from "react-icons/hi2";

import { exchangeADAToUSD, formatADAFull, getShortWallet } from "src/commons/utils/helper";
import Card from "src/components/commons/Card";
import useFetch from "src/commons/hooks/useFetch";
import CardAddress from "src/components/share/CardAddress";
import { details } from "src/commons/routers";
import { RootState } from "src/stores/types";
import { API } from "src/commons/utils/api";
import BookmarkButton from "src/components/commons/BookmarkIcon";
import TokenAutocomplete from "src/components/TokenAutocomplete";
import ADAicon from "src/components/commons/ADAIcon";
import { useScreen } from "src/commons/hooks/useScreen";
import FormNowMessage from "src/components/commons/FormNowMessage";

import { BackButton, BackText, RedirectButton, StyledBoxCard, TimeDuration, TitleText, WrapHeader } from "./styles";

interface Props {
  data: WalletAddress | null;
  loading: boolean;
}
const AddressHeader: React.FC<Props> = ({ data, loading }) => {
  const [stakeKey, setStakeKey] = useState("");
  const {
    data: dataStake,
    loading: loadingStake,
    lastUpdated
  } = useFetch<WalletStake>(stakeKey ? `${API.STAKE.DETAIL}/${stakeKey}` : "");
  const { adaRate } = useSelector(({ system }: RootState) => system);
  const theme = useTheme();
  const { isMobile } = useScreen();
  const history = useHistory();
  useEffect(() => {
    setStakeKey(data?.stakeAddress || "");
  }, [data]);

  const itemLeft = [
    { title: "Transactions", value: data?.txCount || 0 },
    {
      title: "ADA Balance",
      value: (
        <Box display="flex" alignItems="center">
          {formatADAFull(data?.balance)}
          <ADAicon pl={"8px"} />
        </Box>
      )
    },
    {
      title: "ADA Value",
      value: <Box>$ {exchangeADAToUSD(data?.balance || 0, adaRate, true)}</Box>
    },
    {
      value: <TokenAutocomplete address={data?.address || ""} />
    }
  ];
  const itemRight = [
    {
      title: "Total Stake",
      value: (
        <Box>
          {formatADAFull(dataStake?.totalStake)}
          <ADAicon pl={"8px"} />
        </Box>
      )
    },
    {
      title: "Pool Name",
      value: (
        <Link
          to={dataStake?.pool?.poolId ? details.delegation(dataStake.pool.poolId) : "#"}
          style={{ fontFamily: "var(--font-family-text)", color: theme.palette.secondary.main }}
        >
          {dataStake?.pool?.poolName ||
            (dataStake?.pool?.poolId && `Pool [${getShortWallet(dataStake.pool.poolId)}]`) ||
            ""}
        </Link>
      )
    },
    {
      title: "Reward Balance",
      value: (
        <Box>
          {formatADAFull(dataStake?.rewardAvailable)}
          <ADAicon pl={"8px"} />
        </Box>
      )
    }
  ];

  return (
    <Card>
      <WrapHeader>
        <BackButton onClick={history.goBack}>
          <HiArrowLongLeft fontSize="16px" />
          <BackText>Back</BackText>
        </BackButton>
        <Box
          width={"100%"}
          display={"flex"}
          flexWrap={"wrap"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Box component={"h2"} lineHeight={1} mt={2} display={"flex"} alignItems={"center"}>
            <TitleText>Address Details</TitleText>
            <BookmarkButton keyword={data?.address || ""} type="ADDRESS" />
          </Box>
          {data?.isContract && (
            <RedirectButton
              width={isMobile ? "100%" : "auto"}
              component={Button}
              onClick={() => history.push(details.contract(data?.address))}
            >
              View Contract Detail
            </RedirectButton>
          )}
        </Box>
        <TimeDuration>
          <FormNowMessage time={lastUpdated} />
        </TimeDuration>
      </WrapHeader>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <StyledBoxCard>
            <CardAddress
              title={"Address"}
              type="left"
              address={data?.address || ""}
              item={itemLeft}
              loading={loading}
            />
          </StyledBoxCard>
        </Grid>
        <Grid item xs={12} md={6}>
          <StyledBoxCard>
            <CardAddress
              title={"Stake Key"}
              type="right"
              address={data?.stakeAddress || ""}
              item={itemRight}
              loading={loading || loadingStake}
              addressDestination={details.stake(data?.stakeAddress)}
            />
          </StyledBoxCard>
        </Grid>
      </Grid>
    </Card>
  );
};

export default AddressHeader;
