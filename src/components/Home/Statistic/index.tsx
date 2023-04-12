import { Grid } from "@mui/material";
import BigNumber from "bignumber.js";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useFetch from "../../../commons/hooks/useFetch";
import { AdaPriceIcon, CurentEpochIcon, LiveStakeIcon, MarketCapIcon } from "../../../commons/resources";
import { details } from "../../../commons/routers";
import { API } from "../../../commons/utils/api";
import { MAX_SLOT_EPOCH } from "../../../commons/utils/constants";
import { formatADA, formatADAFull, numberWithCommas } from "../../../commons/utils/helper";
import { RootState } from "../../../stores/types";
import CustomTooltip from "../../commons/CustomTooltip";
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
  TimeDuration,
  Title,
  Value,
  XSmall,
  XValue,
} from "./style";
import moment from "moment";

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

const MILION = 10 ** 6;

const HomeStatistic: React.FC<Props> = () => {
  const { currentEpoch, usdMarket } = useSelector(({ system }: RootState) => system);
  const { data } = useFetch<StakeAnalytics>(API.STAKE.ANALYTICS);
  const { data: btcMarket, refesh } = useFetch<CardanoMarket[]>(`${API.MARKETS}?currency=btc`);

  useEffect(() => {
    const interval = setInterval(() => refesh(), 5000);
    return () => clearInterval(interval);
  }, [refesh]);

  const { circulating_supply, total_supply: total = 1 } = usdMarket || {};
  const { liveStake = 0, activeStake = 1 } = data || {};
  const supply = Number(circulating_supply);
  const liveRate = new BigNumber(liveStake).div(MILION).div(supply).multipliedBy(100);
  const activeRate = activeStake && new BigNumber(liveStake).div(activeStake).minus(1).multipliedBy(100);
  const circulatingSupply = new BigNumber(supply).multipliedBy(MILION);
  const circulatingRate = circulatingSupply.div(total).div(MILION).multipliedBy(100);

  return (
    <StatisticContainer container spacing={2}>
      <Grid item xl lg={3} sm={6} xs={12}>
        {!usdMarket || !btcMarket?.[0] ? (
          <SkeletonBox />
        ) : (
          <Item data-testid='AdaPriceBox'> 
            <ItemIcon data-testid='AdaPriceIcon' src={AdaPriceIcon} alt="Ada Price" />
            <Content>
              <Name data-testid='AdaPriceBoxTitle'>Ada Price</Name>
              <Title data-testid='AdaCurrentPrice'>${usdMarket.current_price}</Title>
              <br />
              <RateWithIcon data-testid='Ada24HrPriceChange' value={usdMarket.price_change_percentage_24h} />
              <Small data-testid='AdaPriceInBTC' style={{ marginLeft: 15 }}>{btcMarket[0]?.current_price} BTC</Small>
              <TimeDuration marginTop={"8px"}>
                Last updated {moment(btcMarket[0]?.last_updated).fromNow()}{" "}
              </TimeDuration>
            </Content>
          </Item>
        )}
      </Grid>
      <Grid item xl lg={3} sm={6} xs={12}>
        {!usdMarket ? (
          <SkeletonBox />
        ) : (
          <Item data-testid='MarketCapBox'>
            <ItemIcon data-testid='MarketCapIcon' src={MarketCapIcon} alt="Market cap" />
            <Content>
              <Name data-testid='MarketCapBoxTitle'>Market cap</Name>
              <Title data-testid='MarketCapValue'>${numberWithCommas(usdMarket.market_cap)}</Title>
              <TimeDuration>Last updated {moment(usdMarket.last_updated).fromNow()} </TimeDuration>
            </Content>
          </Item>
        )}
      </Grid>
      <Grid item xl lg={3} sm={6} xs={12}>
        {!currentEpoch ? (
          <SkeletonBox />
        ) : (
          <Link to={details.epoch(currentEpoch?.no)}>
            <Item data-testid='CurrentEpochBox'>
              <Content>
                <ItemIcon data-testid='CurrentEpochIcon' src={CurentEpochIcon} alt="Curent Epoch" />
                <Name data-testid='CurrentEpochBoxTitle'>Current Epoch</Name>
                <XSmall data-testid='EpochLabel'>Epoch: </XSmall>
                <XValue data-testid='CurrentEpochNumber'>
                  <b>{numberWithCommas(currentEpoch?.no)}</b>
                </XValue>
                <br />
                <XSmall data-testid='SlotLabel'>Slot: </XSmall>
                <XValue data-testid='CurrentSlotNumber'>
                  <b>{numberWithCommas(currentEpoch?.slot % MAX_SLOT_EPOCH)}</b>
                </XValue>
                <XSmall data-testid='TotalSlots'> / {numberWithCommas(MAX_SLOT_EPOCH)}</XSmall>
              </Content>
            </Item>
          </Link>
        )}
      </Grid>
      <Grid item xl lg={3} sm={6} xs={12}>
        {!data || !usdMarket ? (
          <SkeletonBox />
        ) : (
          <Item data-testid='LiveStakeBox'>
            <Content>
              <ItemIcon data-testid='LiveStakeIcon' src={LiveStakeIcon} alt="Total ADA Stake" />
              <Name data-testid='LiveStakeBoxTitle'>Live Stake</Name>
              <CustomTooltip title={formatADAFull(liveStake)}>
                <Title>{formatADA(liveStake)}</Title>
              </CustomTooltip>
              <Progress data-testid='LiveStakeProgressBar'>
                <CustomTooltip title={liveRate.toFixed(5)}>
                  <ProcessActive rate={liveRate.toNumber()}>{liveRate.toFixed(0, BigNumber.ROUND_DOWN)}%</ProcessActive>
                </CustomTooltip>
                <CustomTooltip title={liveRate.div(-1).plus(100).toFixed(5)}>
                  <ProgressPending rate={liveRate.div(-1).plus(100).toNumber()}>
                    {liveRate.div(-1).plus(100).toFixed(0)}%
                  </ProgressPending>
                </CustomTooltip>
              </Progress>
              <Small data-testid='ActiveStakeLabel'>Active Stake: </Small>
              <CustomTooltip title={formatADAFull(activeStake)}>
                <Value data-testid='ActiveStakeValue'>
                  <b>{formatADA(activeStake)} </b>
                </Value>
              </CustomTooltip>
              <CustomTooltip title={`${activeRate.toFixed(5)}%`}>
                <Small data-testid='ActiveStakePercentage'>({activeRate.toFixed(1)}%)</Small>
              </CustomTooltip>
              <br />
              <Small data-testid='CirculatingSupplyLabel'>Circulating supply: </Small>
              <Value data-testid='CirculatingSupplyValue'>
                <CustomTooltip title={numberWithCommas(supply)}>
                  <b>{formatADA(circulatingSupply.toString())} </b>
                </CustomTooltip>
              </Value>
              <CustomTooltip title={`${circulatingRate.toFixed(5)}%`}>
                <Small data-testid='CirculatingSupplyPercentage'>({circulatingRate.toFixed(0, BigNumber.ROUND_DOWN)}%)</Small>
              </CustomTooltip>
            </Content>
          </Item>
        )}
      </Grid>
    </StatisticContainer>
  );
};

export default HomeStatistic;
