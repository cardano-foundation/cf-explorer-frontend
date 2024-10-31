import { BigNumber } from "bignumber.js";
import moment from "moment";
import { useTranslation } from "react-i18next";
import React, { useMemo, useState } from "react";
import { Box, Grid, alpha, useTheme } from "@mui/material";
import {
  Area,
  ComposedChart,
  CartesianGrid,
  Label,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis,
  Line
} from "recharts";
import { getNiceTickValues } from "recharts-scale";
import { useSelector } from "react-redux";

import useFetch from "src/commons/hooks/useFetch";
import { HighestIconComponent, LowestIconComponent } from "src/commons/resources";
import CustomIcon from "src/components/commons/CustomIcon";
import { API } from "src/commons/utils/api";
import { OPTIONS_CHART_ANALYTICS } from "src/commons/utils/constants";
import { formatADAFull, formatPrice, getIntervalAnalyticChart } from "src/commons/utils/helper";
import Card from "src/components/commons/Card";
import { TooltipBody } from "src/components/commons/Layout/styles";

import {
  BoxInfo,
  BoxInfoItem,
  BoxInfoItemRight,
  ButtonTitle,
  ChartBox,
  SkeletonUI,
  Tab,
  Tabs,
  TextCardHighlight,
  Title,
  TooltipLabel,
  TooltipValue,
  ValueInfo,
  Wrapper
} from "./styles";

type AnalyticsData = { date: string; value: number };

interface AddressAnalyticsData {
  data: AnalyticsData[];
  highestBalance: number | null;
  lowestBalance: number | null;
}

interface AnalyticsExpanded extends AnalyticsData {
  highest: number;
  lowest: number;
}

const AddressAnalytics: React.FC<{ address?: string }> = ({ address }) => {
  const { t } = useTranslation();
  const options = [
    { value: OPTIONS_CHART_ANALYTICS.ONE_DAY, label: t("time.1d") },
    { value: OPTIONS_CHART_ANALYTICS.ONE_WEEK, label: t("time.1w") },
    { value: OPTIONS_CHART_ANALYTICS.ONE_MONTH, label: t("time.1m") },
    { value: OPTIONS_CHART_ANALYTICS.THREE_MONTH, label: t("time.3m") }
  ];
  const [rangeTime, setRangeTime] = useState<OPTIONS_CHART_ANALYTICS>(OPTIONS_CHART_ANALYTICS.ONE_DAY);
  const blockKey = useSelector(({ system }: RootState) => system.blockKey);
  const theme = useTheme();
  const { data, loading } = useFetch<AddressAnalyticsData>(
    `${API.ADDRESS.ANALYTICS}/${address}/${rangeTime}`,
    undefined,
    false,
    blockKey
  );
  const calculatedHighestAndLowest = useMemo(() => {
    if (!data?.data?.length) return { highest: 0, lowest: 0 };

    return data.data.reduce(
      (acc, curr) => ({
        highest: Math.max(acc.highest, curr.value),
        lowest: Math.min(acc.lowest, curr.value)
      }),
      { highest: data.data[0].value, lowest: data.data[0].value }
    );
  }, [data?.data]);

  const maxBalance = BigNumber(calculatedHighestAndLowest.highest || 0).toString();
  const minBalance = BigNumber(calculatedHighestAndLowest.lowest || 0).toString();

  const highest = Number(maxBalance);
  const lowest = Number(minBalance);
  const isEqualLine = highest === lowest;

  const convertDataChart: AnalyticsExpanded[] =
    data?.data?.map((item) => ({
      value: item.value || 0,
      date: item.date,
      highest,
      lowest
    })) || [];

  const customTicks = useMemo(() => {
    const values = data?.data?.map((item) => item.value) || [0];

    const minValue = Math.min(...values);
    const maxValue = Math.max(...values);

    const tickMin = Math.min(0, minValue);
    const tickMax = Math.max(maxValue * 1.2, Math.abs(minValue) * 1.2, 0);

    const ticks = getNiceTickValues([tickMin, tickMax], 5);
    const tickMaxValue = Math.max(...ticks.map(Math.abs));

    const threshold = tickMaxValue * 0.1;

    const filteredTicks = ticks.filter((tick) => {
      if (tick === ticks[0] || tick === ticks[ticks.length - 1]) return true;
      const distanceToHighest = Math.abs(tick - highest);
      const distanceToLowest = Math.abs(tick - lowest);
      return distanceToHighest > threshold && distanceToLowest > threshold;
    });

    filteredTicks.push(highest);
    if (BigNumber(highest).minus(lowest).div(tickMaxValue).abs().gt(0)) {
      filteredTicks.push(lowest);
    }

    return [...new Set(filteredTicks)].sort((a, b) => a - b);
  }, [data?.data, highest, lowest]);

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
        <TooltipLabel>{getLabelTimeTooltip(content.label)}</TooltipLabel>
        <TooltipValue>{formatADAFull(content.payload?.[0]?.value) || 0}</TooltipValue>
      </TooltipBody>
    );
  };

  const getTickOffset = (value: number) => {
    if (!customTicks.includes(value)) {
      return 0;
    }

    const maxAbsValue = Math.max(...customTicks.map(Math.abs));
    const isNearlyEqual = Math.abs(highest - lowest) / maxAbsValue < 0.05;

    if (value === highest) {
      if (Math.abs(value) / maxAbsValue > 0.95) {
        return -45;
      }
      if (isNearlyEqual) {
        return -20;
      }
      return -10;
    }

    if (value === lowest) {
      if (isNearlyEqual) {
        return 20;
      }
      if (Math.abs(highest - lowest) / maxAbsValue < 0.1) {
        return 10;
      }
    }
    return 0;
  };

  return (
    <Card title={<TextCardHighlight>{t("analytics")}</TextCardHighlight>}>
      <Wrapper container columns={24} spacing="35px">
        <Grid item xs={24} lg={18}>
          <Grid spacing={2} container alignItems="center" justifyContent={"space-between"}>
            <Grid item xs={4} sm={6}>
              <ButtonTitle data-testid="addressAnalytics.balance">{t("common.balance")}</ButtonTitle>
            </Grid>
            <Grid item xs={8} sm={6}>
              <Tabs>
                {options.map(({ value, label }) => (
                  <Tab
                    data-testid={`addressAnalytics.${value}`}
                    key={value}
                    active={rangeTime === value ? 1 : 0}
                    onClick={() => setRangeTime(value)}
                  >
                    {label}
                  </Tab>
                ))}
              </Tabs>
            </Grid>
          </Grid>
          <ChartBox data-testid="addressAnalytics.balance" highest={highestIndex} lowest={lowestIndex}>
            {loading || !data ? (
              <SkeletonUI variant="rectangular" style={{ height: "400px" }} />
            ) : (
              <ResponsiveContainer width="100%" height={400}>
                <ComposedChart
                  width={900}
                  height={400}
                  data={convertDataChart}
                  margin={{ top: 10, right: 10, bottom: 14, left: 15 }}
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
                    dataKey="date"
                    tickFormatter={(value) => moment(value).format(rangeTime === "ONE_DAY" ? "HH:mm" : "DD MMM")}
                    tick={{
                      fill: theme.mode === "light" ? theme.palette.secondary.light : theme.palette.secondary[800]
                    }}
                    tickLine={false}
                    tickMargin={5}
                    color={theme.palette.secondary.light}
                    stroke={theme.palette.secondary.light}
                    dx={-15}
                    interval={getIntervalAnalyticChart(rangeTime)}
                  >
                    <Label
                      value={rangeTime === "ONE_DAY" ? "(UTC)" : "(As of 00:00 UTC)"}
                      offset={-12}
                      position="insideBottom"
                    />
                  </XAxis>
                  <YAxis
                    tickFormatter={formatPriceValue}
                    tick={({ x, y, payload }) => (
                      <g transform={`translate(${x},${y})`}>
                        <text
                          dy={getTickOffset(payload.value)}
                          x={0}
                          y={0}
                          textAnchor="end"
                          fill={theme.mode === "light" ? theme.palette.secondary.light : theme.palette.secondary[800]}
                        >
                          {formatPriceValue(payload.value)}
                        </text>
                      </g>
                    )}
                    tickLine={{
                      stroke: theme.mode === "light" ? theme.palette.secondary.light : theme.palette.secondary[800]
                    }}
                    color={theme.palette.secondary.light}
                    interval={0}
                    ticks={customTicks}
                    padding={{ top: 10, bottom: 10 }}
                    width={80}
                  />
                  <Tooltip content={renderTooltip} cursor={false} />
                  <CartesianGrid vertical={false} strokeWidth={0.33} />
                  <Area
                    stackId="1"
                    type="monotone"
                    dataKey="value"
                    stroke={theme.palette.primary.main}
                    strokeWidth={4}
                    fill={alpha(theme.palette.primary.main, theme.isDark ? 0.6 : 0.2)}
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
          <BoxInfo height={"100%"} space={data?.data?.length ? 36 : 16}>
            <Box flex={1}>
              <BoxInfoItemRight display={"flex"} justifyContent={"center"}>
                <Box>
                  <Box minHeight={"90px"}>
                    <CustomIcon height={30} fill={theme.palette.secondary.light} icon={HighestIconComponent} />
                    <Title data-testid="addressAnalytics.highestBalanceTitle">{t("common.highestBalance")}</Title>
                  </Box>
                  <ValueInfo data-testid="addressAnalytics.highestBalanceValue">
                    {loading ? <SkeletonUI variant="rectangular" /> : formatADAFull(maxBalance)}
                  </ValueInfo>
                </Box>
              </BoxInfoItemRight>
            </Box>
            <Box flex={1}>
              <BoxInfoItem display={"flex"} justifyContent={"center"}>
                <Box>
                  <Box minHeight={"90px"}>
                    <CustomIcon height={30} fill={theme.palette.secondary.light} icon={LowestIconComponent} />
                    <Title data-testid="addressAnalytics.lowestBalanceTitle">{t("common.lowestBalance")}</Title>
                  </Box>
                  <ValueInfo data-testid="addressAnalytics.lowestBalanceValue">
                    {loading ? <SkeletonUI variant="rectangular" /> : formatADAFull(minBalance)}
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

export default AddressAnalytics;
