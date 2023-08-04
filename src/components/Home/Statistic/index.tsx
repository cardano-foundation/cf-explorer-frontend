import { Box, Grid } from "@mui/material";
import BigNumber from "bignumber.js";
import moment from "moment";
import { useSelector } from "react-redux";

import useFetch from "src/commons/hooks/useFetch";
import { useScreen } from "src/commons/hooks/useScreen";
import {
  AdaPriceIcon,
  CurrentEpochHome,
  HomeDownIcon,
  HomeUpIcon,
  LiveStakeIcon,
  MarketCapIcon
} from "src/commons/resources";
import { details, routers } from "src/commons/routers";
import { API } from "src/commons/utils/api";
import { EXT_ADA_PRICE_URL, MAX_SLOT_EPOCH, REFRESH_TIMES } from "src/commons/utils/constants";
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
  Link,
  Name,
  ProcessActive,
  Progress,
  ProgressPending,
  StatisticContainer,
  StyledAdaLogoIcon,
  TimeDuration,
  Title
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
  const circulatingSupply = new BigNumber(supply).multipliedBy(MILION);
  const circulatingRate = circulatingSupply.div(total).div(MILION).multipliedBy(100);
  const progress = moment(currentEpoch?.endTime).isAfter(moment())
    ? (((currentEpoch?.slot || 0) / MAX_SLOT_EPOCH) * 100).toFixed(0)
    : 100;
  const slot = (currentEpoch?.slot || 0) % MAX_SLOT_EPOCH;
  const countdown = MAX_SLOT_EPOCH - slot;
  const duration = moment.duration(countdown ? countdown : 0, "second");
  const days = duration.days();
  const hours = duration.hours();

  const { isGalaxyFoldSmall } = useScreen();
  const sign = Math.sign(BigNumber(usdMarket?.price_change_percentage_24h || 0).toNumber());
  return (
    <StatisticContainer
      container
      spacing={2}
      justifyContent="space-between"
      alignItems="stretch"
      data-testid="home-statistic"
    >
      <Grid sx={{ display: "flex", flexDirection: "column" }} item xl lg={3} sm={6} xs={12}>
        {usdMarket && btcMarket?.[0] ? (
          <Link href={EXT_ADA_PRICE_URL} target="_blank">
            <Item data-testid="ada-price-box">
              <Box display={"flex"} flexDirection={"column"} justifyContent={"space-between"} height={"100%"}>
                <Box display={"flex"} alignItems={"center"} height={"40px"}>
                  <ItemIcon
                    style={{ top: isGalaxyFoldSmall ? 10 : 15, right: isGalaxyFoldSmall ? 10 : 20 }}
                    data-testid="ada-price-icon"
                    src={AdaPriceIcon}
                    alt="Ada Price"
                  />
                  <Name data-testid="ada-price-box-title">Ada Price</Name>
                </Box>
                <Box display={"flex"} alignItems={"center"}>
                  <ItemIcon src={sign > 0 ? HomeUpIcon : HomeDownIcon} alt="Home up icon" />
                  <Box ml={2}>
                    <Title data-testid="ada-current-price">${usdMarket.current_price}</Title>
                  </Box>
                </Box>
                <Content display={"flex"} justifyContent={"space-between"} alignItems={"center"} flexWrap={"wrap"}>
                  <RateWithIcon
                    data-testid="ada-twenty-four-hr-price-change"
                    value={usdMarket.price_change_percentage_24h}
                    showIcon={false}
                  />
                  <AdaPrice data-testid="ada-price-in-btc">{btcMarket[0]?.current_price} BTC</AdaPrice>
                </Content>
              </Box>
            </Item>
          </Link>
        ) : (
          <SkeletonBox />
        )}
      </Grid>
      <Grid sx={{ display: "flex", flexDirection: "column" }} item xl lg={3} sm={6} xs={12}>
        {usdMarket ? (
          <Link href={EXT_ADA_PRICE_URL} target="_blank">
            <Item data-testid="market-cap-box">
              <Box display={"flex"} flexDirection={"column"} justifyContent={"space-between"} height={"100%"}>
                <Box display={"flex"} alignItems={"center"} height={"40px"}>
                  <ItemIcon data-testid="market-cap-icon" src={MarketCapIcon} alt="Market cap" />
                  <Name data-testid="market-cap-box-title">Market cap</Name>
                </Box>
                <Title data-testid="market-cap-value">${numberWithCommas(usdMarket.market_cap)}</Title>
                <Content>
                  <TimeDuration data-testid="last-update-market-cap">
                    Last updated {moment(usdMarket.last_updated).fromNow()}
                  </TimeDuration>
                </Content>
              </Box>
            </Item>
          </Link>
        ) : (
          <SkeletonBox />
        )}
      </Grid>
      <Grid sx={{ display: "flex", flexDirection: "column" }} item xl lg={3} sm={6} xs={12}>
        {currentEpoch ? (
          <Link href={details.epoch(currentEpoch?.no)} target="_blank">
            <Item data-testid="current-epoch-box">
              <Content display={"flex"} flexDirection={"column"} justifyContent={"space-between"} height={"100%"}>
                <Box display={"flex"} alignItems={"center"} height={"40px"}>
                  <ItemIcon
                    style={{ top: isGalaxyFoldSmall ? 10 : 15, right: isGalaxyFoldSmall ? 10 : 20 }}
                    data-testid="market-cap-icon"
                    src={CurrentEpochHome}
                    alt="Market cap"
                  />
                  <Name data-testid="current-epoch-box-title" style={isGalaxyFoldSmall ? { maxWidth: "30px" } : {}}>
                    Current Epoch
                  </Name>
                </Box>
                <Box>
                  <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} flexWrap={"wrap"}>
                    <Title data-testid="current-epoch-number">{numberWithCommas(currentEpoch?.no)}</Title>
                    <Box color={({ palette }) => palette.secondary.light}>
                      Slot: {numberWithCommas(currentEpoch?.slot % MAX_SLOT_EPOCH)}/ {numberWithCommas(MAX_SLOT_EPOCH)}
                    </Box>
                  </Box>
                  <Progress>
                    <CustomTooltip title={+progress || 0}>
                      <ProcessActive data-testid="current-epoch-progress-active" rate={+progress || 0}>
                        {+progress || 0}%
                      </ProcessActive>
                    </CustomTooltip>
                    <ProgressPending data-testid="current-epoch-progress-pending" rate={100 - (+progress || 0)}>
                      <Box color={({ palette }) => palette.secondary.light}>
                        {days}d {hours}h
                      </Box>
                    </ProgressPending>
                  </Progress>
                </Box>
                <Box>
                  <Box color={({ palette }) => palette.secondary.light}>
                    Unique accounts: {numberWithCommas(currentEpoch?.account)}
                  </Box>
                  <Box color={({ palette }) => palette.secondary.light} fontSize={"12px"}>
                    End timestamp: {formatDateTimeLocal(currentEpoch?.endTime)}
                  </Box>
                </Box>
              </Content>
            </Item>
          </Link>
        ) : (
          <SkeletonBox />
        )}
      </Grid>
      <Grid sx={{ display: "flex", flexDirection: "column" }} item xl lg={3} sm={6} xs={12}>
        {data && usdMarket ? (
          <Link href={routers.DELEGATION_POOLS} target="_blank">
            <Item data-testid="live-stake-box">
              <Content display={"flex"} flexDirection={"column"} justifyContent={"space-between"} height={"100%"}>
                <Box>
                  <Box display={"flex"} alignItems={"center"} height={"40px"}>
                    <ItemIcon
                      style={{ top: isGalaxyFoldSmall ? 10 : 15, right: isGalaxyFoldSmall ? 10 : 20 }}
                      data-testid="live-stake-icon"
                      src={LiveStakeIcon}
                      alt="Total ADA Stake"
                    />
                    <Name data-testid="live-stake-box-title">
                      Live Stake <StyledAdaLogoIcon />
                    </Name>
                  </Box>
                </Box>
                <Box>
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
                        <Box color={({ palette }) => palette.secondary.main}>
                          {liveRate.div(-1).plus(100).toFixed(0)}%
                        </Box>
                      </ProgressPending>
                    </CustomTooltip>
                  </Progress>
                </Box>
                <Box>
                  <Box color={({ palette }) => palette.secondary.light}>
                    Active Stake <StyledAdaLogoIcon />:{" "}
                    <CustomTooltip title={formatADAFull(activeStake)}>
                      <Box data-testid="active-stake-value" sx={{ display: "inline-block" }}>
                        {formatADA(activeStake)}
                      </Box>
                    </CustomTooltip>
                  </Box>
                  <Box fontSize={"12px"} color={({ palette }) => palette.secondary.light}>
                    Circulating supply <StyledAdaLogoIcon /> :{" "}
                    <CustomTooltip title={numberWithCommas(supply)}>
                      <Box data-testid="circulating-supply-percentage" sx={{ display: "inline-block" }}>
                        {formatADA(circulatingSupply.toString())}
                      </Box>
                    </CustomTooltip>
                    <CustomTooltip title={`${circulatingRate.toFixed(5)}%`}>
                      <Box sx={{ display: "inline-block" }}>({circulatingRate.toFixed(0, BigNumber.ROUND_DOWN)}%)</Box>
                    </CustomTooltip>
                  </Box>
                </Box>
              </Content>
            </Item>
          </Link>
        ) : (
          <SkeletonBox />
        )}
      </Grid>
    </StatisticContainer>
  );
};

export default HomeStatistic;
