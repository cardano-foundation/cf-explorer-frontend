import { Box } from "@mui/material";
import BigNumber from "bignumber.js";
import moment from "moment";
import { useSelector } from "react-redux";
import { Link as LinkDom } from "react-router-dom";
import { useTranslation } from "react-i18next";

import useFetch from "src/commons/hooks/useFetch";
import { useScreen } from "src/commons/hooks/useScreen";
import {
  AdaPriceDarkIcon,
  AdaPriceIcon,
  CurrentEpochHome,
  CurrentEpochHomeDark,
  HomeDownIcon,
  HomeUpIcon,
  LiveStakeDarkIcon,
  LiveStakeIcon,
  MarketCapDarkIcon,
  MarketCapIcon,
  UpGreenDarkmodeIcon
} from "src/commons/resources";
import { details, routers } from "src/commons/routers";
import { API } from "src/commons/utils/api";
import { EXT_ADA_PRICE_URL, MAX_SLOT_EPOCH, REFRESH_TIMES } from "src/commons/utils/constants";
import {
  formatADA,
  formatADAFull,
  formatDateTimeLocal,
  getDurationUnits,
  numberWithCommas
} from "src/commons/utils/helper";
import CustomTooltip from "src/components/commons/CustomTooltip";
import RateWithIcon from "src/components/commons/RateWithIcon";
import { RootState } from "src/stores/types";
import ADAicon from "src/components/commons/ADAIcon";

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
  TextPending,
  TimeDuration,
  Title,
  WrapCardContent,
  WrapGrid
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

const MAX_PERCENT_SHOW_LAST_BAR = 89;
const MIN_PERCENT_SHOW_FIRST_BAR = 9;

const HomeStatistic = () => {
  const { t } = useTranslation();

  const { currentEpoch, usdMarket } = useSelector(({ system }: RootState) => system);
  const { theme: themeMode } = useSelector(({ user }: RootState) => user);
  const { data } = useFetch<StakeAnalytics>(API.STAKE.ANALYTICS);
  const { data: btcMarket } = useFetch<CardanoMarket[]>(
    `${API.MARKETS}?currency=btc`,
    undefined,
    false,
    REFRESH_TIMES.CURRENT_PRICE_BTC
  );
  const { total_supply: total = 1 } = usdMarket || {};
  const { liveStake = 0, activeStake = 1 } = data || {};
  const supply = BigNumber(currentEpoch?.circulatingSupply || 0).div(10 ** 6);
  const liveRate = new BigNumber(liveStake).div(MILION).div(supply).multipliedBy(100);
  const circulatingSupply = new BigNumber(supply).multipliedBy(MILION);
  const circulatingRate = circulatingSupply.div(total).div(MILION).multipliedBy(100);
  const progress = moment(currentEpoch?.endTime).isAfter(moment())
    ? (((currentEpoch?.slot || 0) / MAX_SLOT_EPOCH) * 100).toFixed(0)
    : 100;
  const isShowProgressPendingText = +progress < MAX_PERCENT_SHOW_LAST_BAR;
  const isShowProgressActiveText = +progress > MIN_PERCENT_SHOW_FIRST_BAR;
  const isShowLiveStakePercentText = liveRate.toNumber() >= MIN_PERCENT_SHOW_FIRST_BAR;
  const isShowOtherStakePercentText = liveRate.toNumber() <= MAX_PERCENT_SHOW_LAST_BAR;

  const slot = (currentEpoch?.slot || 0) % MAX_SLOT_EPOCH;
  const countdown = MAX_SLOT_EPOCH - slot;

  const { d: days, h: hours, humanized } = getDurationUnits(countdown ? countdown : 0, "second");
  const { humanized: humanizedActive } = getDurationUnits(slot, "second");

  const epochActiveText = `Started ${humanizedActive} ago`;
  const epochFinishText = `Finishes in ${humanized}`;

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
      <WrapGrid item xl lg={3} sm={6} xs={12}>
        {usdMarket && btcMarket?.[0] ? (
          <Link href={EXT_ADA_PRICE_URL} target="_blank">
            <Item data-testid="ada-price-box" smallItem themeMode={themeMode}>
              <WrapCardContent>
                <Box display={"flex"} alignItems={"center"} height={"40px"}>
                  <ItemIcon
                    style={{ top: isGalaxyFoldSmall ? 10 : 15, right: isGalaxyFoldSmall ? 10 : 20 }}
                    data-testid="ada-price-icon"
                    src={themeMode === "light" ? AdaPriceIcon : AdaPriceDarkIcon}
                    alt={t("stats.adaPrice")}
                  />
                  <Name data-testid="ada-price-box-title">{t("stats.adaPrice")}</Name>
                </Box>
                <Box display={"flex"} alignItems={"center"}>
                  <ItemIcon
                    src={sign > 0 ? (themeMode === "light" ? HomeUpIcon : UpGreenDarkmodeIcon) : HomeDownIcon}
                    alt="Home up icon"
                  />
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
                <Content display={"flex"} justifyContent={"space-between"} alignItems={"center"} flexWrap={"wrap"}>
                  <TimeDuration data-testid="last-update-ada-price">
                    {t("info.lastUpdatedTime", { time: moment(usdMarket.last_updated).fromNow() })}
                  </TimeDuration>
                </Content>
              </WrapCardContent>
            </Item>
          </Link>
        ) : (
          <SkeletonBox />
        )}
      </WrapGrid>
      <WrapGrid item xl lg={3} sm={6} xs={12}>
        {usdMarket ? (
          <Link href={EXT_ADA_PRICE_URL} target="_blank">
            <Item data-testid="market-cap-box" smallItem themeMode={themeMode}>
              <WrapCardContent>
                <Box display={"flex"} alignItems={"center"} height={"40px"}>
                  <ItemIcon
                    data-testid="market-cap-icon"
                    src={themeMode === "light" ? MarketCapIcon : MarketCapDarkIcon}
                    alt="Market cap"
                  />
                  <Name data-testid="market-cap-box-title">{t("glossary.marketCap")}</Name>
                </Box>
                <Title data-testid="market-cap-value">${numberWithCommas(usdMarket.market_cap)}</Title>
                <Content>
                  <TimeDuration data-testid="last-update-market-cap">
                    {t("common.lastUpdated")} {moment(usdMarket.last_updated).fromNow()}
                  </TimeDuration>
                </Content>
              </WrapCardContent>
            </Item>
          </Link>
        ) : (
          <SkeletonBox />
        )}
      </WrapGrid>
      <WrapGrid item xl lg={3} sm={6} xs={12}>
        {currentEpoch ? (
          <Box component={LinkDom} display={"contents"} to={details.epoch(currentEpoch?.no)}>
            <Item data-testid="current-epoch-box" themeMode={themeMode}>
              <Content display={"flex"} flexDirection={"column"} justifyContent={"space-between"} height={"100%"}>
                <Box display={"flex"} alignItems={"center"} height={"40px"}>
                  <ItemIcon
                    style={{ top: isGalaxyFoldSmall ? 10 : 15, right: isGalaxyFoldSmall ? 10 : 20 }}
                    data-testid="market-cap-icon"
                    src={themeMode === "light" ? CurrentEpochHome : CurrentEpochHomeDark}
                    alt="Market cap"
                  />
                  <Name data-testid="current-epoch-box-title" style={isGalaxyFoldSmall ? { maxWidth: "30px" } : {}}>
                    {t("glossary.currentEpoch")}
                  </Name>
                </Box>
                <Box>
                  <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} flexWrap={"wrap"}>
                    <Title data-testid="current-epoch-number">{numberWithCommas(currentEpoch?.no)}</Title>
                    <Box color={({ palette }) => palette.secondary.light}>
                      {t("common.slot")}:{" "}
                      {moment(currentEpoch?.endTime).isAfter(moment())
                        ? numberWithCommas(currentEpoch?.slot)
                        : numberWithCommas(MAX_SLOT_EPOCH)}
                      / {numberWithCommas(MAX_SLOT_EPOCH)}
                    </Box>
                  </Box>
                  <Progress>
                    <CustomTooltip title={epochActiveText}>
                      <ProcessActive data-testid="current-epoch-progress-active" rate={+progress || 0}>
                        {isShowProgressActiveText && `${+progress || 0}%`}
                      </ProcessActive>
                    </CustomTooltip>
                    <CustomTooltip title={epochFinishText}>
                      <ProgressPending data-testid="current-epoch-progress-pending" rate={100 - (+progress || 0)}>
                        {isShowProgressPendingText && (
                          <TextPending>
                            {days}d {hours}h
                          </TextPending>
                        )}
                      </ProgressPending>
                    </CustomTooltip>
                  </Progress>
                </Box>
                <Box>
                  <Box color={({ palette }) => palette.secondary.light}>
                    {t("glossary.uniqueAccounts")}: {numberWithCommas(currentEpoch?.account)}
                  </Box>
                  <Box color={({ palette }) => palette.secondary.light} fontSize={"12px"}>
                    {t("glossary.endTimestamp")}: {formatDateTimeLocal(currentEpoch?.endTime)}
                  </Box>
                </Box>
              </Content>
            </Item>
          </Box>
        ) : (
          <SkeletonBox />
        )}
      </WrapGrid>
      <WrapGrid item xl lg={3} sm={6} xs={12}>
        {data && usdMarket ? (
          <Box component={LinkDom} display={"contents"} to={routers.DELEGATION_POOLS}>
            <Item data-testid="live-stake-box" themeMode={themeMode}>
              <Content display={"flex"} flexDirection={"column"} justifyContent={"space-between"} height={"100%"}>
                <Box>
                  <Box display={"flex"} alignItems={"center"} height={"40px"}>
                    <ItemIcon
                      style={{ top: isGalaxyFoldSmall ? 10 : 15, right: isGalaxyFoldSmall ? 10 : 20 }}
                      data-testid="live-stake-icon"
                      src={themeMode === "light" ? LiveStakeIcon : LiveStakeDarkIcon}
                      alt="Total ADA Stake"
                    />
                    <Name data-testid="live-stake-box-title">
                      {t("glossary.liveStake")} (<ADAicon />)
                    </Name>
                  </Box>
                </Box>
                <Box>
                  <CustomTooltip title={formatADAFull(liveStake)}>
                    <Title data-testid="live-stake-value">{formatADA(liveStake)}</Title>
                  </CustomTooltip>
                  <Progress>
                    <CustomTooltip title={"Total staked to Circulating supply ratio"}>
                      <ProcessActive data-testid="live-stake-progress-active" rate={liveRate.toNumber()}>
                        {isShowLiveStakePercentText && `${liveRate.toFixed(0, BigNumber.ROUND_DOWN)}%`}
                      </ProcessActive>
                    </CustomTooltip>
                    <ProgressPending
                      data-testid="live-stake-progress-pending"
                      rate={liveRate.div(-1).plus(100).toNumber()}
                    >
                      {isShowOtherStakePercentText && (
                        <Box color={({ palette }) => palette.secondary.main}>
                          {liveRate.div(-1).plus(100).toFixed(0)}%
                        </Box>
                      )}
                    </ProgressPending>
                  </Progress>
                </Box>
                <Box>
                  <Box color={({ palette }) => palette.secondary.light}>
                    {t("glossary.activeStake")} (
                    <ADAicon width={10} />) :&nbsp;
                    <CustomTooltip title={formatADAFull(activeStake)}>
                      <span data-testid="active-stake-v-= alue">{formatADA(activeStake)}</span>
                    </CustomTooltip>
                  </Box>
                  <Box fontSize={"12px"} color={({ palette }) => palette.secondary.light}>
                    <CustomTooltip title={t("glossary.offTheMaxSupply")}>
                      <span>
                        {t("glossary.circulatingSupply")} (<ADAicon width={8} />) :&nbsp;
                      </span>
                    </CustomTooltip>
                    <CustomTooltip title={formatADAFull(currentEpoch?.circulatingSupply || 0)}>
                      <span data-testid="circulating-supply-value">{formatADA(circulatingSupply.toString())}</span>
                    </CustomTooltip>
                    <CustomTooltip title={`${circulatingRate.toFixed(5)}%`}>
                      <span data-testid="circulating-supply-percentage">
                        ({circulatingRate.toFixed(0, BigNumber.ROUND_DOWN)}%)
                      </span>
                    </CustomTooltip>
                  </Box>
                </Box>
              </Content>
            </Item>
          </Box>
        ) : (
          <SkeletonBox />
        )}
      </WrapGrid>
    </StatisticContainer>
  );
};

export default HomeStatistic;
