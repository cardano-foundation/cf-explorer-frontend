import { Grid } from "@mui/material";
import React from "react";
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
import { MAX_SLOT_EPOCH } from "../../../commons/utils/constants";
import { formatCurrency } from "../../../commons/utils/helper";
import { Content, Item, ItemIcon, ItemSkeleton, Name, Small, StatisticContainer, Title, Value } from "./style";

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
  const { data: currentEpoch, loading: loadingEpoch } = useFetch<EpochCurrentType>(`epoch/current`);

  return (
    <StatisticContainer container spacing={2}>
      <Grid item xl lg={3} md={4} xs={6}>
        {loadingEpoch ? (
          <SkeletonBox />
        ) : (
          <Item>
            <ItemIcon src={AdaPriceIcon} alt="Ada Price" />
            <Content>
              <Name>Ada Price</Name>
              <Title>TBA</Title>
              {/* <Small>
                <b>TBA</b>
              </Small>
              <RateIcon src={adaPrice > 0 ? UpGreenIcon : DownRedIcon} alt="price rate" />
              <Value up={adaPrice > 0}>
                <b>TBA</b>
              </Value> */}
            </Content>
          </Item>
        )}
      </Grid>
      <Grid item xl lg={3} md={4} xs={6}>
        {loadingEpoch ? (
          <SkeletonBox />
        ) : (
          <Item>
            <ItemIcon src={MarketCapIcon} alt="Market cap" />
            <Content>
              <Name>Market cap</Name>
              <Title>TBA</Title>
            </Content>
          </Item>
        )}
      </Grid>
      <Grid item xl lg={3} md={4} xs={6}>
        {loadingEpoch ? (
          <SkeletonBox />
        ) : (
          <Link to={details.epoch(currentEpoch?.no)}>
            <Item>
              <Content>
                <ItemIcon src={CurentEpochIcon} alt="Curent Epoch" />
                <Name>Curent Epoch</Name>
                <Small>Epoch: </Small>
                <Value up={1}>
                  <b>{formatCurrency(currentEpoch?.no || 0)}</b>
                </Value>
                <br />
                <Small>Slot: </Small>
                <Value up={1}>
                  <b>{formatCurrency((currentEpoch?.slot || 0) % MAX_SLOT_EPOCH)}</b>
                </Value>
                <Small> / {formatCurrency(MAX_SLOT_EPOCH)}</Small>
              </Content>
            </Item>
          </Link>
        )}
      </Grid>
      <Grid item xl lg={3} md={4} xs={6}>
        {loadingEpoch ? (
          <SkeletonBox />
        ) : (
          <Item>
            <Content>
              <ItemIcon src={LiveStakeIcon} alt="Total ADA Stake" />
              <Name>Live Stake</Name>
              <Title>TBA</Title>
              {/* <Progress>
                <ProcessActive rate={70}>{70}%</ProcessActive>
                <ProgressPending rate={30}>{30}%</ProgressPending>
              </Progress>
              <Small>Active Stake: </Small>
              <Value up>
                <b>{formatPrice(25.09 * 10 ** 9)} </b>
              </Value>
              <Small>(0.7%)</Small>
              <br />
              <Small>Circulating supply: </Small>
              <Value up>
                <b>{formatPrice(35.12 * 10 ** 9)} </b>
              </Value>
              <Small>(78%)</Small> */}
            </Content>
          </Item>
        )}
      </Grid>
      <Grid item xl lg={3} md={4} xs={6}>
        {loadingEpoch ? (
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
