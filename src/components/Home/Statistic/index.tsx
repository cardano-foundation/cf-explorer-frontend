import { Link as LinkDom } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import moment from "moment";
import BigNumber from "bignumber.js";
import { Box, useTheme } from "@mui/material";

import useFetch from "src/commons/hooks/useFetch";
import { useScreen } from "src/commons/hooks/useScreen";
import {
  AdaPriceDarkIcon,
  AdaPriceIcon,
  CurrentEpochHome,
  CurrentEpochHomeDark,
  LiveStakeDarkIcon,
  LiveStakeIcon,
  PotsIcon,
  PotsIconDark
} from "src/commons/resources";
import { details, routers } from "src/commons/routers";
import { API } from "src/commons/utils/api";
import { MAX_SLOT_EPOCH } from "src/commons/utils/constants";
import {
  formatADA,
  formatADAFull,
  formatDateTimeLocal,
  getDurationUnits,
  numberWithCommas
} from "src/commons/utils/helper";
import ADAicon from "src/components/commons/ADAIcon";
import CustomTooltip from "src/components/commons/CustomTooltip";
import { RootState } from "src/stores/types";
import DatetimeTypeTooltip from "src/components/commons/DatetimeTypeTooltip";

import {
  CircularLegend,
  Content,
  Item,
  ItemIcon,
  ItemSkeleton,
  Name,
  ProcessActive,
  Progress,
  ProgressPending,
  ProgressRewards,
  ProgressTreasury,
  StatisticContainer,
  TextPending,
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

const MAX_PERCENT_SHOW_LAST_BAR = 89;
const MIN_PERCENT_SHOW_FIRST_BAR = 9;
const HomeStatistic = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const { currentEpoch, blockNo } = useSelector(({ system }: RootState) => system);
  const { data } = useFetch<StakeAnalytics>(API.STAKE.ANALYTICS, undefined, false, blockNo);
  const { data: dataPostOverview, loading: loadingPots } = useFetch<PostOverview>(API.POTS_OVERVIEW);
  const { data: dataCiculatingSupply, loading: loadingciculating } = useFetch<number>(API.CIRCULATING_SUPPLY);

  const { theme: themeMode } = useSelector(({ theme }: RootState) => theme);
  const { liveStake = 0, activeStake = 1 } = data || {};

  const progress = moment.utc(currentEpoch?.endTime, "YYYY-MM-DDTHH:mm:ssZ").isAfter(moment().utc())
    ? (((currentEpoch?.slot || 0) / MAX_SLOT_EPOCH) * 100).toFixed(0)
    : 100;

  const isShowPercentText = (percent: number) => percent >= MIN_PERCENT_SHOW_FIRST_BAR;
  const isShowProgressPendingText = +progress < MAX_PERCENT_SHOW_LAST_BAR;

  const slot = (currentEpoch?.slot || 0) % MAX_SLOT_EPOCH;
  const countdown = MAX_SLOT_EPOCH - slot;

  const { humanized, s, m, d, h } = getDurationUnits(countdown ? countdown : 0, "second");
  const { humanized: humanizedActive } = getDurationUnits(slot, "second");

  const epochActiveText = `Started ${humanizedActive} ago`;
  const epochFinishText = `Finishes in ${humanized}`;

  const { isGalaxyFoldSmall } = useScreen();

  const formattedDateTime = moment.utc(new Date());
  const numberActiveStake = new BigNumber(activeStake);
  const numberLiveStake = new BigNumber(liveStake);

  const totalStake = numberActiveStake.plus(numberLiveStake);
  const percentageActiveStake = numberActiveStake.dividedBy(totalStake).multipliedBy(100).toFixed(0);

  const percentageLiveStake = new BigNumber(100).minus(percentageActiveStake).toFixed(0);

  const dataResponPost = {
    depositsAndFees: new BigNumber(dataPostOverview?.depositsAndFees || 0),
    rewards: new BigNumber(dataPostOverview?.rewards || 0),
    treasury: new BigNumber(dataPostOverview?.treasury || 0),
    reserves: new BigNumber(dataPostOverview?.reserves || 0)
  };

  const totalDataPots = dataResponPost.depositsAndFees
    .plus(dataResponPost.rewards)
    .plus(dataResponPost.treasury)
    .plus(dataResponPost.reserves);

  const depositsPercentage = dataResponPost.depositsAndFees.dividedBy(totalDataPots).multipliedBy(100).toFixed(0);
  const rewardsPercentage = dataResponPost.rewards.dividedBy(totalDataPots).multipliedBy(100).toFixed(0);
  const treasuryPercentage = dataResponPost.treasury.dividedBy(totalDataPots).multipliedBy(100).toFixed(0);
  const reservesPercentage = new BigNumber(100)
    .minus(depositsPercentage)
    .minus(rewardsPercentage)
    .minus(treasuryPercentage)
    .toFixed(0);

  const FIX_MAX_SUPPLY = new BigNumber(45_000_000_000_000_000);
  const ADA_FIX_MAX_SUPPLY = FIX_MAX_SUPPLY.div(10 ** 6);
  const circulatingSupplyNumber = new BigNumber(dataCiculatingSupply ?? 0);

  const circulatingSupplyPercentage = circulatingSupplyNumber
    .dividedBy(ADA_FIX_MAX_SUPPLY)
    .multipliedBy(100)
    .toFixed(0);

  return (
    <StatisticContainer
      container
      spacing={2}
      justifyContent="space-between"
      alignItems="stretch"
      data-testid="home-statistic"
    >
      <WrapGrid item xl lg={3} sm={6} xs={12}>
        {currentEpoch ? (
          <Box component={LinkDom} display={"contents"} to={details.epoch(currentEpoch?.no)}>
            <Item data-testid="current-epoch-box" thememode={themeMode}>
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
                      {moment.utc(currentEpoch?.endTime, "YYYY-MM-DDTHH:mm:ssZ").isAfter(moment().utc())
                        ? numberWithCommas(currentEpoch?.slot)
                        : numberWithCommas(MAX_SLOT_EPOCH)}
                      / {numberWithCommas(MAX_SLOT_EPOCH)}
                    </Box>
                  </Content>
                  <Progress>
                    <CustomTooltip title={epochActiveText}>
                      <ProcessActive data-testid="current-epoch-progress-active" rate={+progress || 0}>
                        {isShowPercentText(+progress) && `${+progress || 0}%`}
                      </ProcessActive>
                    </CustomTooltip>
                    <CustomTooltip title={epochFinishText}>
                      <ProgressPending data-testid="current-epoch-progress-pending" rate={100 - (+progress || 0)}>
                        {isShowProgressPendingText && (
                          <TextPending>
                            {d}d {h}h
                          </TextPending>
                        )}
                      </ProgressPending>
                    </CustomTooltip>
                  </Progress>
                </Box>
                <Box>
                  <Box sx={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    <Box display="flex" alignItems="center">
                      <CircularLegend color={theme.palette.primary.main} />
                      <DatetimeTypeTooltip>
                        <Box color={({ palette }) => palette.secondary.light} fontSize={"12px"}>
                          {t("glossary.currentTime")}: {formatDateTimeLocal(formattedDateTime.format())}
                        </Box>
                      </DatetimeTypeTooltip>
                    </Box>

                    <Box display="flex" alignItems="center">
                      <CircularLegend color={theme.palette.primary[200]} />
                      <Box color={({ palette }) => palette.secondary.light} fontSize={"12px"}>
                        {t("glossary.timeRemaining")}: {`${humanized} ${m}m ${s}s`}
                      </Box>
                    </Box>
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
        {data ? (
          <Box component={LinkDom} display={"contents"} to={routers.DELEGATION_POOLS}>
            <Item thememode={themeMode}>
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
                    <ProcessActive data-testid="live-stake-progress-active" rate={+percentageActiveStake || 0}>
                      {isShowPercentText(+percentageActiveStake) && (
                        <Box color={theme.mode === "light" ? "inherit" : theme.palette.secondary[100]}>
                          {percentageActiveStake}%
                        </Box>
                      )}
                    </ProcessActive>

                    <ProgressPending data-testid="live-stake-progress-pending" rate={+percentageLiveStake || 0}>
                      {isShowPercentText(+percentageLiveStake) && (
                        <Box color={({ palette }) => palette.secondary.main}>{percentageLiveStake}%</Box>
                      )}
                    </ProgressPending>
                  </Progress>
                </Box>
                <Box>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                    <Box display="flex" alignItems="center" justifyContent="center">
                      <CircularLegend color={theme.palette.primary.main} />
                      <Box fontSize={"12px"} color={({ palette }) => palette.secondary.light}>
                        {t("glossary.activeStake")} {": "}
                        <CustomTooltip title={activeStake ? formatADAFull(activeStake) : t("common.N/A")}>
                          <span data-testid="active-stake-value">
                            {activeStake ? `${formatADA(activeStake)} ADA` : t("common.N/A")}
                          </span>
                        </CustomTooltip>
                      </Box>
                    </Box>
                    <Box display="flex" alignItems="center" justifyContent="center">
                      <CircularLegend color={theme.palette.primary[200]} />
                      <Box fontSize={"12px"} color={({ palette }) => palette.secondary.light}>
                        <span>
                          {t("glossary.liveStake")} {": "}
                        </span>
                        <CustomTooltip title={!liveStake ? t("common.N/A") : formatADAFull(liveStake)}>
                          <span data-testid="circulating-supply-value">
                            {liveStake ? `${formatADA(liveStake)} ADA` : t("common.N/A")}{" "}
                          </span>
                        </CustomTooltip>
                      </Box>
                    </Box>
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
        {!loadingciculating ? (
          <Item data-testid="ada-price-box" smallitem="true" thememode={themeMode}>
            <WrapCardContent>
              <Box display={"flex"} alignItems={"center"} height={"40px"}>
                <ItemIcon
                  style={{ top: isGalaxyFoldSmall ? 10 : 15, right: isGalaxyFoldSmall ? 10 : 20 }}
                  data-testid="ada-price-icon"
                  src={themeMode === "light" ? AdaPriceIcon : AdaPriceDarkIcon}
                />
                <Name>{t("glossary.circulatingSupply")}</Name>
              </Box>
              <Box>
                <CustomTooltip
                  title={dataCiculatingSupply ? formatADAFull((dataCiculatingSupply ?? 0) * 10 ** 6) : t("common.N/A")}
                >
                  <Title data-testid="live-stake-value">
                    {dataCiculatingSupply ? formatADA((dataCiculatingSupply ?? 0) * 10 ** 6) : t("common.N/A")}
                  </Title>
                </CustomTooltip>

                <Progress>
                  <ProcessActive data-testid="live-stake-progress-active" rate={+circulatingSupplyPercentage || 0}>
                    {`${circulatingSupplyPercentage}%`}
                  </ProcessActive>

                  <ProgressPending
                    data-testid="live-stake-progress-pending"
                    rate={+(100 - +circulatingSupplyPercentage || 0).toFixed(0)}
                  ></ProgressPending>
                </Progress>
              </Box>
              <Box>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                  <Box display="flex" alignItems="center" justifyContent="center">
                    <CircularLegend color={theme.palette.primary.main} />
                    <Box fontSize={"12px"} color={({ palette }) => palette.secondary.light}>
                      Circulating Supply {": "}
                      <CustomTooltip
                        title={dataCiculatingSupply ? formatADAFull(dataCiculatingSupply * 10 ** 6) : t("common.N/A")}
                      >
                        <span data-testid="active-stake-value">
                          {dataCiculatingSupply
                            ? `${formatADA((dataCiculatingSupply ?? 0) * 10 ** 6)} ADA`
                            : t("common.N/A")}
                        </span>
                      </CustomTooltip>
                    </Box>
                  </Box>
                  <Box display="flex" alignItems="center" justifyContent="center">
                    <CircularLegend color={theme.palette.primary[200]} />
                    <Box fontSize={"12px"} color={({ palette }) => palette.secondary.light}>
                      <CustomTooltip title={t("glossary.offTheMaxSupply")}>
                        <span>Fix Max Supply {": "}</span>
                      </CustomTooltip>
                      <CustomTooltip title={formatADAFull(+FIX_MAX_SUPPLY)}>
                        <span data-testid="circulating-supply-value">45B ADA</span>
                      </CustomTooltip>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </WrapCardContent>
          </Item>
        ) : (
          <SkeletonBox />
        )}
      </WrapGrid>
      <WrapGrid item xl lg={3} sm={6} xs={12}>
        {!loadingPots ? (
          <Item data-testid="market-cap-box" smallitem="true" thememode={themeMode}>
            <WrapCardContent>
              <Box display={"flex"} alignItems={"center"} height={"40px"}>
                <ItemIcon data-testid="market-cap-icon" src={themeMode === "light" ? PotsIcon : PotsIconDark} />
                <Name data-testid="market-cap-box-title">Pots</Name>
              </Box>
              <Box>
                <CustomTooltip title={formatADAFull(+totalDataPots)}>
                  <Title data-testid="market-cap-value">{formatADA(+totalDataPots)}</Title>
                </CustomTooltip>
                <Progress>
                  <ProcessActive rate={+depositsPercentage || 0}>
                    {isShowPercentText(+depositsPercentage) && (
                      <Box
                        color={theme.mode === "light" ? "inherit" : theme.palette.secondary[100]}
                      >{`${depositsPercentage}%`}</Box>
                    )}
                  </ProcessActive>

                  <ProgressRewards rate={+rewardsPercentage || 0}>
                    {isShowPercentText(+rewardsPercentage) && (
                      <Box color={({ palette }) => palette.secondary.main}>{rewardsPercentage}%</Box>
                    )}
                  </ProgressRewards>

                  <ProgressTreasury rate={+treasuryPercentage || 0}>
                    {isShowPercentText(+treasuryPercentage) && (
                      <Box color={({ palette }) => palette.secondary.main}>{treasuryPercentage}%</Box>
                    )}
                  </ProgressTreasury>

                  <ProgressPending rate={+reservesPercentage || 0}>
                    {isShowPercentText(+reservesPercentage) && (
                      <Box color={({ palette }) => palette.secondary.main}>{reservesPercentage}%</Box>
                    )}
                  </ProgressPending>
                </Progress>
              </Box>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                <Box display="flex" alignItems="center">
                  <CircularLegend color={theme.palette.primary.main} />
                  <Box fontSize={"12px"} color={({ palette }) => palette.secondary.light}>
                    Deposits:{" "}
                    <CustomTooltip
                      title={activeStake ? formatADAFull(dataPostOverview?.depositsAndFees) : t("common.N/A")}
                    >
                      <span data-testid="active-stake-value">
                        {activeStake ? formatADA(dataPostOverview?.depositsAndFees) : t("common.N/A")}
                      </span>
                    </CustomTooltip>
                  </Box>
                </Box>

                <Box display="flex" alignItems="center" justifyContent={"center"}>
                  <CircularLegend color={"#1B998B"} />
                  <Box fontSize={"12px"} color={({ palette }) => palette.secondary.light}>
                    Treasury:{" "}
                    <CustomTooltip title={activeStake ? formatADAFull(dataPostOverview?.treasury) : t("common.N/A")}>
                      <span data-testid="active-stake-value">
                        {dataPostOverview?.treasury ? formatADA(dataPostOverview?.treasury) : t("common.N/A")}
                      </span>
                    </CustomTooltip>
                  </Box>
                </Box>

                <Box display="flex" alignItems="center">
                  <CircularLegend color={theme.isDark ? "#E8564B" : "#FE938C"} />
                  <Box fontSize={"12px"} color={({ palette }) => palette.secondary.light}>
                    Rewards:{" "}
                    <CustomTooltip
                      title={dataPostOverview?.rewards ? formatADAFull(dataPostOverview?.rewards) : t("common.N/A")}
                    >
                      <span data-testid="active-stake-value">
                        {dataPostOverview?.rewards ? formatADA(dataPostOverview?.rewards) : t("common.N/A")}
                      </span>
                    </CustomTooltip>
                  </Box>
                </Box>

                <Box display="flex" alignItems="center">
                  <CircularLegend color={theme.palette.primary[200]} />
                  <Box fontSize={"12px"} color={({ palette }) => palette.secondary.light}>
                    Reserves:{" "}
                    <CustomTooltip
                      title={
                        dataPostOverview?.reserves === null
                          ? t("common.N/A")
                          : formatADAFull(dataPostOverview?.reserves)
                      }
                    >
                      <span data-testid="circulating-supply-value">
                        {dataPostOverview?.reserves ? formatADA(dataPostOverview?.reserves) : t("common.N/A")}{" "}
                      </span>
                    </CustomTooltip>
                  </Box>
                </Box>
              </Box>
            </WrapCardContent>
          </Item>
        ) : (
          <SkeletonBox />
        )}
      </WrapGrid>
    </StatisticContainer>
  );
};

export default HomeStatistic;
