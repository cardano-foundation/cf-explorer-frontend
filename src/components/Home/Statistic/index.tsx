import { Grid } from "@mui/material";
import BigNumber from "bignumber.js";
import moment from "moment";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import useFetch from "src/commons/hooks/useFetch";
import { useScreen } from "src/commons/hooks/useScreen";
import { AdaPriceIcon, CurentEpochIcon, LiveStakeIcon, MarketCapIcon } from "src/commons/resources";
import { details } from "src/commons/routers";
import { API } from "src/commons/utils/api";
import { MAX_SLOT_EPOCH, REFRESH_TIMES } from "src/commons/utils/constants";
import { formatADA, formatADAFull, formatDateTimeLocal, numberWithCommas } from "src/commons/utils/helper";
import CustomTooltip from "src/components/commons/CustomTooltip";
import RateWithIcon from "src/components/commons/RateWithIcon";
import { RootState } from "src/stores/types";

import {
  AdaPrice,
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
  XValue
} from "./style";

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

const HomeStatistic = () => {
  const { currentEpoch, usdMarket } = useSelector(({ system }: RootState) => system);
  const { data } = useFetch<StakeAnalytics>(API.STAKE.ANALYTICS);
  const { data: btcMarket } = useFetch<CardanoMarket[]>(
    `${API.MARKETS}?currency=btc`,
    undefined,
    false,
    REFRESH_TIMES.CURRENT_PRICE_BTC
  );

  const { circulating_supply, total_supply: total = 1 } = usdMarket || {};
  const { liveStake = 0, activeStake = 1 } = data || {};
  const supply = Number(circulating_supply);
  const liveRate = new BigNumber(liveStake).div(MILION).div(supply).multipliedBy(100);
  const activeRate = activeStake && new BigNumber(liveStake).div(activeStake).minus(1).multipliedBy(100);
  const circulatingSupply = new BigNumber(supply).multipliedBy(MILION);
  const circulatingRate = circulatingSupply.div(total).div(MILION).multipliedBy(100);
  const progress = moment(formatDateTimeLocal(currentEpoch?.endTime || "")).diff(moment()) >= 0
    ? (((currentEpoch?.slot || 0) / MAX_SLOT_EPOCH) * 100).toFixed(0)
    : 100;
  const { isMobile, isGalaxyFoldSmall } = useScreen();

  return (
    <StatisticContainer container spacing={2} justifyContent="space-between" alignItems="stretch">
      <Grid sx={{ display: "flex", flexDirection: "column" }} item xl lg={3} sm={6} xs={6}>
        {usdMarket && btcMarket?.[0] ? (
          <Item data-testid="ada-price-box">
            <ItemIcon
              style={{ top: isGalaxyFoldSmall ? 10 : 15, right: isGalaxyFoldSmall ? 10 : 20 }}
              data-testid="ada-price-icon"
              src={AdaPriceIcon}
              alt="Ada Price"
            />
            <Content>
              <Name data-testid="ada-price-box-title">Ada Price</Name>
              <Title data-testid="ada-current-price">${usdMarket.current_price}</Title>
              <br />
              <RateWithIcon data-testid="ada-24Hr-price-change" value={usdMarket.price_change_percentage_24h} />
              <AdaPrice data-testid="ada-price-in-BTC">{btcMarket[0]?.current_price} BTC</AdaPrice>
              <TimeDuration marginTop="8px" data-testid="last-update-BTC">
                Last updated {moment(btcMarket[0]?.last_updated).fromNow()}
              </TimeDuration>
            </Content>
          </Item>
        ) : (
          <SkeletonBox />
        )}
      </Grid>
      <Grid sx={{ display: "flex", flexDirection: "column" }} item xl lg={3} sm={6} xs={6}>
        {usdMarket ? (
          <Item data-testid="market-cap-box">
            <ItemIcon
              style={{ top: isGalaxyFoldSmall ? 10 : 15, right: isGalaxyFoldSmall ? 10 : 20 }}
              data-testid="market-cap-icon"
              src={MarketCapIcon}
              alt="Market cap"
            />
            <Content>
              <Name data-testid="market-cap-box-title">Market cap</Name>
              <Title data-testid="market-cap-value">${numberWithCommas(usdMarket.market_cap)}</Title>
              <TimeDuration data-testid="last-update-market-cap">
                Last updated {moment(usdMarket.last_updated).fromNow()}
              </TimeDuration>
            </Content>
          </Item>
        ) : (
          <SkeletonBox />
        )}
      </Grid>
      <Grid sx={{ display: "flex", flexDirection: "column" }} item xl lg={3} sm={6} xs={6}>
        {currentEpoch ? (
          <Item data-testid="current-epoch-box">
            <Link to={details.epoch(currentEpoch?.no)}>
              <Content>
                <ItemIcon
                  style={{ top: isGalaxyFoldSmall ? 10 : 15, right: isGalaxyFoldSmall ? 10 : 20 }}
                  data-testid="current-epoch-icon"
                  src={CurentEpochIcon}
                  alt="Curent Epoch"
                />
                <Name data-testid="current-epoch-box-title">Current Epoch</Name>
                <XSmall data-testid="epoch-label">Epoch: </XSmall>
                {isMobile ? <br /> : null}
                <XValue data-testid="current-epoch-number">
                  <b>{numberWithCommas(currentEpoch?.no)}</b>
                </XValue>
                <br />
                <XSmall data-testid="slot-label">Slot: </XSmall>
                {isMobile ? <br /> : null}
                <XValue data-testid="current-slot-number">
                  <b>{numberWithCommas(currentEpoch?.slot % MAX_SLOT_EPOCH)}</b>
                </XValue>
                <XSmall> / {numberWithCommas(MAX_SLOT_EPOCH)}</XSmall>
                <br />
                <XSmall>Unique accounts: </XSmall>
                {isMobile ? <br /> : null}
                <XValue>
                  <b data-testid="curent-epoch-account">{numberWithCommas(currentEpoch?.account)}</b>
                </XValue>
                <br />
                <Progress sx={{ marginTop: "10px" }}>
                  <ProcessActive rate={Number(progress)}>{progress}%</ProcessActive>
                  <ProgressPending hide rate={100 - Number(progress)}>
                  </ProgressPending>
                </Progress>
                <XSmall>End time: </XSmall>
                {isMobile ? <br /> : null}
                <XValue>
                  <b style={{
                    whiteSpace: isGalaxyFoldSmall ? "normal" : "nowrap",
                  }}>{formatDateTimeLocal(currentEpoch?.endTime)}</b>
                </XValue>
              </Content>
            </Link>
          </Item>
        ) : (
          <SkeletonBox />
        )}
      </Grid>
      <Grid sx={{ display: "flex", flexDirection: "column" }} item xl lg={3} sm={6} xs={6}>
        {data && usdMarket ? (
          <Item data-testid="live-stake-box">
            <Content>
              <ItemIcon
                style={{ top: isGalaxyFoldSmall ? 10 : 15, right: isGalaxyFoldSmall ? 10 : 20 }}
                data-testid="live-stake-icon"
                src={LiveStakeIcon}
                alt="Total ADA Stake"
              />
              <Name data-testid="live-stake-box-title">Live Stake</Name>
              <CustomTooltip title={formatADAFull(liveStake)}>
                <Title data-testid="live-stake-value">{formatADA(liveStake)}</Title>
              </CustomTooltip>
              <Progress>
                <CustomTooltip title={liveRate.toFixed(5)}>
                  <ProcessActive data-testid="live-stake-progress-active" rate={liveRate.toNumber()}>
                    {liveRate.toFixed(0, BigNumber.ROUND_DOWN)}%
                  </ProcessActive>
                </CustomTooltip>
                <CustomTooltip title={liveRate.div(-1).plus(100).toFixed(5)}>
                  <ProgressPending
                    data-testid="live-stake-progress-pending"
                    rate={liveRate.div(-1).plus(100).toNumber()}
                  >
                    {liveRate.div(-1).plus(100).toFixed(0)}%
                  </ProgressPending>
                </CustomTooltip>
              </Progress>
              <Small data-testid="active-stake-label">Active Stake: </Small>
              {isMobile ? <br /> : null}
              <CustomTooltip title={formatADAFull(activeStake)}>
                <Value data-testid="active-stake-value">
                  <b>{formatADA(activeStake)} </b>
                </Value>
              </CustomTooltip>
              <CustomTooltip title={`${activeRate.toFixed(5)}%`}>
                <Small data-testid="active-stake-percentage">({activeRate.toFixed(1)}%)</Small>
              </CustomTooltip>
              <br />
              <Small data-testid="circulating-supply-label">Circulating supply: </Small>
              {isMobile ? <br /> : null}
              <Value data-testid="circulating-supply-value">
                <CustomTooltip title={numberWithCommas(supply)}>
                  <b>{formatADA(circulatingSupply.toString())} </b>
                </CustomTooltip>
              </Value>
              <CustomTooltip title={`${circulatingRate.toFixed(5)}%`}>
                <Small data-testid="circulating-supply-percentage">
                  ({circulatingRate.toFixed(0, BigNumber.ROUND_DOWN)}%)
                </Small>
              </CustomTooltip>
            </Content>
          </Item>
        ) : (
          <SkeletonBox />
        )}
      </Grid>
    </StatisticContainer>
  );
};

export default HomeStatistic;
