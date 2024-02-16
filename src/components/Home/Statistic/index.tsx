import { Box } from "@mui/material";
import BigNumber from "bignumber.js";
import moment from "moment";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link as LinkDom } from "react-router-dom";

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
import { API_GECKO, EXT_ADA_PRICE_URL, MAX_SLOT_EPOCH } from "src/commons/utils/constants";
import {
  formatADA,
  formatADAFull,
  formatDateTimeLocal,
  getDurationUnits,
  numberWithCommas
} from "src/commons/utils/helper";
import ADAicon from "src/components/commons/ADAIcon";
import CustomTooltip from "src/components/commons/CustomTooltip";
import FormNowMessage from "src/components/commons/FormNowMessage";
import RateWithIcon from "src/components/commons/RateWithIcon";
import { RootState } from "src/stores/types";
import useFetchInterval from "src/commons/hooks/useFetchInterval";

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
  VerticalContent,
  WrapCardContent,
  WrapGrid
} from "./style";

const SkeletonBox = () => (
  <Item>
    <Box>
      <ItemSkeleton width="50%" />
      <ItemSkeleton width="30%" />
      <ItemSkeleton />
      <ItemSkeleton width="50%" />
      <ItemSkeleton width="80%" />
    </Box>
  </Item>
);

const MILION = 10 ** 6;

const MAX_PERCENT_SHOW_LAST_BAR = 89;
const MIN_PERCENT_SHOW_FIRST_BAR = 9;

const HomeStatistic = () => {
  const { t } = useTranslation();
  const { currentEpoch, blockNo } = useSelector(({ system }: RootState) => system);

  const { data } = useFetch<StakeAnalytics>(API.STAKE.ANALYTICS, undefined, false, blockNo);
  const { theme: themeMode } = useSelector(({ theme }: RootState) => theme);
  const { liveStake = 0, activeStake = 1 } = data || {};
  const supply = BigNumber(currentEpoch?.circulatingSupply || 0).div(10 ** 6);
  const liveRate = new BigNumber(liveStake).div(MILION).div(supply).multipliedBy(100);
  const circulatingSupply = new BigNumber(supply).multipliedBy(MILION);
  const progress = moment(currentEpoch?.endTime).isAfter(moment())
    ? (((currentEpoch?.slot || 0) / MAX_SLOT_EPOCH) * 100).toFixed(0)
    : 100;
  const isShowProgressPendingText = +progress < MAX_PERCENT_SHOW_LAST_BAR;
  const isShowProgressActiveText = +progress > MIN_PERCENT_SHOW_FIRST_BAR;
  const isShowLiveStakePercentText = liveRate.toNumber() >= MIN_PERCENT_SHOW_FIRST_BAR;
  const isShowOtherStakePercentText = liveRate.toNumber() <= MAX_PERCENT_SHOW_LAST_BAR;

  const { data: btcData, lastUpdated: lastUpdatedBtcData } = useFetchInterval<dataFromCoinGecko>(
    `${API_GECKO}?ids=cardano&vs_currency=btc`,
    `${API.MARKETS}?currency=btc`
  );
  const { data: usdData, lastUpdated: lastUpdatedUsd } = useFetchInterval<dataFromCoinGecko>(
    `${API_GECKO}?ids=cardano&vs_currency=usd`,
    `${API.MARKETS}?currency=usd`
  );

  const btcMarket = useMemo(() => {
    if (btcData?.length === 0) return null;
    return btcData?.[0] || null;
  }, [btcData]);

  const usdMarket = useMemo(() => {
    if (usdData?.length === 0) return null;
    return usdData?.[0] || null;
  }, [usdData]);

  const { total_supply: total = 1 } = usdMarket || {};

  const circulatingRate = circulatingSupply.div(total).div(MILION).multipliedBy(100);

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
        {usdMarket && btcMarket ? (
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
                  <img
                    src={sign > 0 ? (themeMode === "light" ? HomeUpIcon : UpGreenDarkmodeIcon) : HomeDownIcon}
                    alt="Home up icon"
                    width={30}
                    height={30}
                  />
                  <Box ml={1}>
                    <Title data-testid="ada-current-price">${usdMarket.current_price}</Title>
                  </Box>
                </Box>
                <Content gap="5px 15px">
                  <RateWithIcon
                    data-testid="ada-twenty-four-hr-price-change"
                    value={usdMarket.price_change_percentage_24h}
                    showIcon={false}
                  />
                  <AdaPrice data-testid="ada-price-in-btc">{btcMarket.current_price} BTC</AdaPrice>
                </Content>
                <Content>
                  <TimeDuration data-testid="last-update-ada-price">
                    <FormNowMessage time={lastUpdatedUsd} />
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
                    <FormNowMessage time={lastUpdatedBtcData} />
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
              <VerticalContent>
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
                  <Content>
                    <Title data-testid="current-epoch-number">{numberWithCommas(currentEpoch?.no)}</Title>
                    <Box color={({ palette }) => palette.secondary.light}>
                      {t("common.slot")}:{" "}
                      {moment(currentEpoch?.endTime).isAfter(moment())
                        ? numberWithCommas(currentEpoch?.slot)
                        : numberWithCommas(MAX_SLOT_EPOCH)}
                      / {numberWithCommas(MAX_SLOT_EPOCH)}
                    </Box>
                  </Content>
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
              </VerticalContent>
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
              <VerticalContent>
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
                  <CustomTooltip title={liveStake ? formatADAFull(liveStake) : t("common.N/A")}>
                    <Title data-testid="live-stake-value">{liveStake ? formatADA(liveStake) : t("common.N/A")}</Title>
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
                          {liveStake ? liveRate.div(-1).plus(100).toFixed(0) : 0}%
                        </Box>
                      )}
                    </ProgressPending>
                  </Progress>
                </Box>
                <Box>
                  <Box color={({ palette }) => palette.secondary.light}>
                    {t("glossary.activeStake")} (<ADAicon width={10} />){": "}
                    <CustomTooltip title={activeStake ? formatADAFull(activeStake) : t("common.N/A")}>
                      <span data-testid="active-stake-value">
                        {activeStake ? formatADA(activeStake) : t("common.N/A")}
                      </span>
                    </CustomTooltip>
                  </Box>
                  <Box fontSize={"12px"} color={({ palette }) => palette.secondary.light}>
                    <CustomTooltip title={t("glossary.offTheMaxSupply")}>
                      <span>
                        {t("glossary.circulatingSupply")} (<ADAicon width={8} />){": "}
                      </span>
                    </CustomTooltip>
                    <CustomTooltip title={formatADAFull(currentEpoch?.circulatingSupply || 0)}>
                      <span data-testid="circulating-supply-value">{formatADA(circulatingSupply.toString())} </span>
                    </CustomTooltip>
                    <CustomTooltip title={`${circulatingRate.toFixed(5)}%`}>
                      <span data-testid="circulating-supply-percentage">
                        ({circulatingRate.toFixed(0, BigNumber.ROUND_DOWN)}%)
                      </span>
                    </CustomTooltip>
                  </Box>
                </Box>
              </VerticalContent>
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
