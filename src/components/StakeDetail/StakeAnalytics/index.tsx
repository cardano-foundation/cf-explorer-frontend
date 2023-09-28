import { BigNumber } from "bignumber.js";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import React, { useMemo, useState } from "react";
import { Box, Grid, alpha, useTheme } from "@mui/material";
import {
  Area,
  ComposedChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  XAxis,
  XAxisProps,
  YAxis,
  Label,
  Line
} from "recharts";
import { getNiceTickValues } from "recharts-scale";
import { useSelector } from "react-redux";

import useFetch from "src/commons/hooks/useFetch";
import { HighestIconComponent, LowestIconComponent } from "src/commons/resources";
import { useScreen } from "src/commons/hooks/useScreen";
import { API } from "src/commons/utils/api";
import { OPTIONS_CHART_ANALYTICS } from "src/commons/utils/constants";
import { formatADAFull, formatPrice, getIntervalAnalyticChart } from "src/commons/utils/helper";
import { TextCardHighlight } from "src/components/AddressDetail/AddressAnalytics/styles";
import CustomIcon from "src/components/commons/CustomIcon";
import Card from "src/components/commons/Card";
import { TooltipBody } from "src/components/commons/Layout/styles";

import {
  BoxInfo,
  BoxInfoItem,
  BoxInfoItemRight,
  ButtonTitle,
  ChartBox,
  CustomButton,
  SkeletonUI,
  Tab,
  Tabs,
  Title,
  TooltipLabel,
  TooltipValue,
  ValueInfo,
  Wrapper
} from "./styles";

const StakeAnalytics: React.FC = () => {
  const { t } = useTranslation();
  const [rangeTime, setRangeTime] = useState<OPTIONS_CHART_ANALYTICS>(OPTIONS_CHART_ANALYTICS.ONE_DAY);
  const [tab, setTab] = useState<"BALANCE" | "REWARD">("BALANCE");
  const { stakeId } = useParams<{ stakeId: string }>();
  const blockKey = useSelector(({ system }: RootState) => system.blockKey);
  const theme = useTheme();
  const { isMobile } = useScreen();
  const { data, loading } = useFetch<StakeAnalyticsBalance>(
    `${API.STAKE.ANALYTICS_BALANCE}/${stakeId}/${rangeTime}`,
    undefined,
    false,
    blockKey
  );
  const { data: dataReward, loading: loadingReward } = useFetch<AnalyticsReward[]>(
    `${API.STAKE.ANALYTICS_REWARD}/${stakeId}`,
    undefined,
    false,
    blockKey
  );
  const options = [
    { value: OPTIONS_CHART_ANALYTICS.ONE_DAY, label: t("time.1d") },
    { value: OPTIONS_CHART_ANALYTICS.ONE_WEEK, label: t("time.1w") },
    { value: OPTIONS_CHART_ANALYTICS.ONE_MONTH, label: t("time.1m") },
    { value: OPTIONS_CHART_ANALYTICS.THREE_MONTH, label: t("time.3m") }
  ];
  const values = data?.data?.map?.((item) => item.value || 0) || [];
  const maxBalance = BigNumber.max(0, ...values).toString();
  const minBalance = BigNumber.min(maxBalance, ...values).toString();

  const rewards = dataReward?.map?.((item) => item.value || 0) || [];
  const maxReward = BigNumber.max(0, ...rewards).toString();
  const minReward = BigNumber.min(maxReward, ...rewards).toString();

  const highest = Number(tab === "BALANCE" ? data?.highestBalance : maxReward) || 0;
  const lowest = Number(tab === "BALANCE" ? data?.lowestBalance : minReward) || 0;
  const isEqualLine = highest === lowest;

  const maxValue = Math.max(Number(tab === "BALANCE" ? maxBalance : maxReward), highest);

  const convertDataChart: AnalyticsBalanceExpanded[] = (data?.data || []).map?.((item) => ({
    value: item.value || 0,
    date: item.date,
    highest,
    lowest
  }));

  const convertRewardChart = dataReward?.map?.((item) => ({
    value: item.value || 0,
    epoch: item.epoch,
    highest,
    lowest
  }));

  const customTicks = useMemo(() => {
    // Default ticks by recharts
    const ticks = getNiceTickValues([0, maxValue], 5);

    // With 14 is font-size (tick label height), 400 is chart height
    const labelHeight = 14 / 400;

    const tickMax = ticks[ticks.length - 1] || 1;

    // If tick near lowest and highest ( tick / tickMax < labelHeight), hidden it.
    const needShowTicks = ticks.filter(
      (tick) =>
        BigNumber(tick).minus(lowest).div(tickMax).abs().gt(labelHeight) &&
        BigNumber(tick).minus(highest).div(tickMax).abs().gt(labelHeight)
    );
    // Ticks add highest
    needShowTicks.push(highest);

    // If lowest equal highest, add it.
    if (BigNumber(highest).minus(lowest).div(tickMax).abs().gt(0)) needShowTicks.push(lowest);

    return needShowTicks.sort((a, b) => a - b);
  }, [maxValue, highest, lowest]);

  const lowestIndex = customTicks.indexOf(lowest) + 1;
  const highestIndex = customTicks.indexOf(highest) + 1;

  const formatPriceValue = (value: string) => {
    const bigValue = BigNumber(value).div(10 ** 6);
    return formatPrice(bigValue.toString());
  };

  const getLabelTimeTooltip = (label: string) => {
    switch (rangeTime) {
      case OPTIONS_CHART_ANALYTICS.ONE_DAY:
        return `${moment(label).format("DD MMM YYYY HH:mm:ss")}`;
      case OPTIONS_CHART_ANALYTICS.ONE_WEEK:
      case OPTIONS_CHART_ANALYTICS.ONE_MONTH:
      case OPTIONS_CHART_ANALYTICS.THREE_MONTH:
        return moment(label).format("DD MMM YYYY");
      default:
        return "";
    }
  };

  const renderTooltip: TooltipProps<number, number>["content"] = (content) => {
    return (
      <TooltipBody fontSize={12}>
        <TooltipLabel>
          {tab === "BALANCE" ? getLabelTimeTooltip(content.label) : `${t("epoch")} ${content.label}`}
        </TooltipLabel>
        <TooltipValue>{formatADAFull(content.payload?.[0]?.value) || 0}</TooltipValue>
      </TooltipBody>
    );
  };

  const xAxisProps: XAxisProps = tab === "BALANCE" ? { tickMargin: 5, dx: -15 } : { tickMargin: 5 };

  return (
    <Card title={<TextCardHighlight>{t("common.analytics")}</TextCardHighlight>}>
      <Wrapper container columns={24} spacing="35px">
        <Grid item xs={24} lg={18}>
          <Grid spacing={2} container alignItems="center" justifyContent={"space-between"}>
            {isMobile ? (
              <Grid item sm={6}>
                <Box>
                  <CustomButton
                    active={tab === "BALANCE" ? 1 : 0}
                    style={{ marginRight: "2px" }}
                    onClick={() => setTab("BALANCE")}
                  >
                    {t("common.balance")}
                  </CustomButton>
                  <CustomButton active={tab === "REWARD" ? 1 : 0} onClick={() => setTab("REWARD")}>
                    {t("common.reward")}
                  </CustomButton>
                </Box>
              </Grid>
            ) : (
              <Grid item sm={6}>
                <ButtonTitle active={tab === "BALANCE"} onClick={() => setTab("BALANCE")}>
                  {t("common.balance")}
                </ButtonTitle>
                <ButtonTitle active={tab === "REWARD"} onClick={() => setTab("REWARD")}>
                  {t("common.reward")}
                </ButtonTitle>
              </Grid>
            )}
            <Grid item sm={6}>
              {tab === "BALANCE" && (
                <Tabs>
                  {options.map(({ value, label }) => (
                    <Tab key={value} active={rangeTime === value ? 1 : 0} onClick={() => setRangeTime(value)}>
                      {label}
                    </Tab>
                  ))}
                </Tabs>
              )}
            </Grid>
          </Grid>
          <ChartBox highest={highestIndex} lowest={lowestIndex}>
            {loading || loadingReward || !data || !dataReward ? (
              <SkeletonUI variant="rectangular" style={{ height: "400px" }} />
            ) : (
              <ResponsiveContainer width="100%" height={400}>
                <ComposedChart
                  width={900}
                  height={400}
                  data={tab === "BALANCE" ? convertDataChart : convertRewardChart}
                  margin={{ top: 5, right: 10, bottom: 14 }}
                >
                  {/* Defs for ticks filter background color */}
                  {["lowest", "highest"].map((item) => {
                    let floodColor = theme.palette[item === "highest" ? "success" : "error"][100];
                    if (isEqualLine) {
                      floodColor = theme.palette.primary[200];
                    }
                    return (
                      <defs key={item}>
                        <filter x="-.15" y="-.15" width="1.25" height="1.2" id={item}>
                          <feFlood floodColor={floodColor} result="bg" />
                          <feMerge>
                            <feMergeNode in="bg" />
                            <feMergeNode in="SourceGraphic" />
                          </feMerge>
                        </filter>
                      </defs>
                    );
                  })}
                  <XAxis
                    color={theme.palette.secondary.light}
                    stroke={theme.palette.secondary.light}
                    dataKey={tab === "BALANCE" ? "date" : "epoch"}
                    tickFormatter={(value) =>
                      tab === "BALANCE" ? moment(value).format(rangeTime === "ONE_DAY" ? "HH:mm" : "DD MMM") : value
                    }
                    tickLine={false}
                    interval={tab === "BALANCE" ? getIntervalAnalyticChart(rangeTime) : undefined}
                    {...xAxisProps}
                  >
                    <Label value="(UTC)" offset={-12} position="insideBottom" />
                  </XAxis>
                  <YAxis
                    color={theme.palette.secondary.light}
                    stroke={theme.palette.secondary.light}
                    tickFormatter={formatPriceValue}
                    tickLine={false}
                    interval={0}
                    ticks={customTicks}
                  />
                  <Tooltip content={renderTooltip} cursor={false} />
                  <CartesianGrid vertical={false} strokeWidth={0.33} />
                  <Area
                    stackId="1"
                    type="monotone"
                    dataKey="value"
                    stroke={theme.palette.primary.main}
                    strokeWidth={4}
                    fill={alpha(theme.palette.primary.main, 0.2)}
                    activeDot={{ r: 6 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="lowest"
                    stroke={isEqualLine ? theme.palette.primary.main : theme.palette.error[700]}
                    strokeWidth={1}
                    dot={false}
                    activeDot={false}
                    strokeDasharray="3 3"
                  />
                  <Line
                    type="monotone"
                    dataKey="highest"
                    stroke={isEqualLine ? theme.palette.primary.main : theme.palette.success.main}
                    strokeWidth={1}
                    dot={false}
                    activeDot={false}
                    strokeDasharray="3 3"
                  />
                </ComposedChart>
              </ResponsiveContainer>
            )}
          </ChartBox>
        </Grid>
        <Grid item xs={24} lg={6}>
          <BoxInfo height={"100%"}>
            <Box flex={1}>
              <BoxInfoItemRight display={"flex"} alignItems="center" justifyContent={"center"}>
                <Box>
                  <CustomIcon height={30} fill={theme.palette.secondary.light} icon={HighestIconComponent} />
                  <Title>{tab === "BALANCE" ? t("common.highestBalance") : t("common.highestReward")}</Title>
                  <ValueInfo>
                    {loading || loadingReward ? (
                      <SkeletonUI variant="rectangular" />
                    ) : (
                      formatADAFull(tab === "BALANCE" ? maxBalance : maxReward)
                    )}
                  </ValueInfo>
                </Box>
              </BoxInfoItemRight>
            </Box>
            <Box flex={1}>
              <BoxInfoItem display={"flex"} alignItems="center" justifyContent={"center"}>
                <Box>
                  <CustomIcon height={30} fill={theme.palette.secondary.light} icon={LowestIconComponent} />
                  <Title>{tab === "BALANCE" ? t("common.lowestBalance") : t("common.lowestReward")}</Title>
                  <ValueInfo>
                    {loading || loadingReward ? (
                      <SkeletonUI variant="rectangular" />
                    ) : (
                      formatADAFull(tab === "BALANCE" ? minBalance : minReward)
                    )}
                  </ValueInfo>
                </Box>
              </BoxInfoItem>
            </Box>
          </BoxInfo>
        </Grid>
      </Wrapper>
    </Card>
  );
};

export default StakeAnalytics;
