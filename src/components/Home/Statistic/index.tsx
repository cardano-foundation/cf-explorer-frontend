import { Grid } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useFetch from "../../../commons/hooks/useFetch";
import {
  AdaPriceIcon,
  CurentEpochIcon,
  LiveStakeIcon,
  MarketCapIcon,
  TotalADAStakeIcon,
} from "../../../commons/resources";
import { details } from "../../../commons/routers";
import { COINGECKO_URL } from "../../../commons/utils/axios";
import { MAX_SLOT_EPOCH } from "../../../commons/utils/constants";
import { formatCurrency, formatPrice } from "../../../commons/utils/helper";
import { RootState } from "../../../stores/types";
import RateWithIcon from "../../commons/RateWithIcon";
import {
  Content,
  Item,
  ItemIcon,
  ItemSkeleton,
  Name,
  ProcessActive,
  Progress,
  ProgressPending,
  Small,
  StatisticContainer,
  Title,
  Value,
  XSmall,
  XValue,
} from "./style";

interface Props {}

const SkeletonBox = () => (
  <Item>
    <Content>
      <ItemSkeleton width="50%" />
      <ItemSkeleton width="30%" />
      <ItemSkeleton />
      <ItemSkeleton width="50%" />
      <ItemSkeleton width="80%" />
    </Content>
  </Item>
);

const HomeStatistic: React.FC<Props> = () => {
  const { currentEpoch, usdMarket } = useSelector(({ system }: RootState) => system);
  const btcMarket = useFetch<CardanoMarket[]>(`${COINGECKO_URL}coins/markets?vs_currency=btc&ids=cardano`);

  return (
    <StatisticContainer container spacing={2}>
      <Grid item xl lg={3} md={4} xs={6}>
        {!usdMarket || !btcMarket.data?.[0] ? (
          <SkeletonBox />
        ) : (
          <Item>
            <ItemIcon src={AdaPriceIcon} alt="Ada Price" />
            <Content>
              <Name>Ada Price</Name>
              <Title>${usdMarket.current_price || 0}</Title>
              <RateWithIcon value={usdMarket.price_change_percentage_24h || 0} />
              <Small style={{ marginLeft: 15 }}>{btcMarket.data[0]?.current_price || 0} BTC</Small>
            </Content>
          </Item>
        )}
      </Grid>
      <Grid item xl lg={3} md={4} xs={6}>
        {!usdMarket ? (
          <SkeletonBox />
        ) : (
          <Item>
            <ItemIcon src={MarketCapIcon} alt="Market cap" />
            <Content>
              <Name>Market cap</Name>
              <Title>${formatCurrency(usdMarket.market_cap)}</Title>
            </Content>
          </Item>
        )}
      </Grid>
      <Grid item xl lg={3} md={4} xs={6}>
        {!currentEpoch ? (
          <SkeletonBox />
        ) : (
          <Link to={details.epoch(currentEpoch?.no)}>
            <Item>
              <Content>
                <ItemIcon src={CurentEpochIcon} alt="Curent Epoch" />
                <Name>Curent Epoch</Name>
                <XSmall>Epoch: </XSmall>
                <XValue>
                  <b>{formatCurrency(currentEpoch?.no || 0)}</b>
                </XValue>
                <br />
                <XSmall>Slot: </XSmall>
                <XValue>
                  <b>{formatCurrency((currentEpoch?.slot || 0) % MAX_SLOT_EPOCH)}</b>
                </XValue>
                <XSmall> / {formatCurrency(MAX_SLOT_EPOCH)}</XSmall>
              </Content>
            </Item>
          </Link>
        )}
      </Grid>
      <Grid item xl lg={3} md={4} xs={6}>
        {!currentEpoch ? (
          <SkeletonBox />
        ) : (
          <Item>
            <Content>
              <ItemIcon src={LiveStakeIcon} alt="Total ADA Stake" />
              <Name>Live Stake</Name>
              <Title>TBA</Title>
              <Progress>
                <ProcessActive rate={70}>{70}%</ProcessActive>
                <ProgressPending rate={30}>{30}%</ProgressPending>
              </Progress>
              <Small>Active Stake: </Small>
              <Value>
                <b>{formatPrice(25.09 * 10 ** 9)} </b>
              </Value>
              <Small>(0.7%)</Small>
              <br />
              <Small>Circulating supply: </Small>
              <Value>
                <b>{formatPrice(35.12 * 10 ** 9)} </b>
              </Value>
              <Small>(78%)</Small>
            </Content>
          </Item>
        )}
      </Grid>
      <Grid item xl lg={3} md={4} xs={6}>
        {!currentEpoch ? (
          <SkeletonBox />
        ) : (
          <Item>
            <Content>
              <ItemIcon src={TotalADAStakeIcon} alt="Total ADA Stake" />
              <Name>Total ADA Stake</Name>
              <Title>TBA</Title>
            </Content>
          </Item>
        )}
      </Grid>
    </StatisticContainer>
  );
};

export default HomeStatistic;
