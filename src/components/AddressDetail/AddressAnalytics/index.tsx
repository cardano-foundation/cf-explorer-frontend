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
import { HighestIcon, LowestIcon } from "src/commons/resources";
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

const AddressAnalytics: React.FC = () => {
  const { t } = useTranslation();
  const options = [
    { value: OPTIONS_CHART_ANALYTICS.ONE_DAY, label: t("time.1d") },
    { value: OPTIONS_CHART_ANALYTICS.ONE_WEEK, label: t("time.1w") },
    { value: OPTIONS_CHART_ANALYTICS.ONE_MONTH, label: t("time.1m") },
    { value: OPTIONS_CHART_ANALYTICS.THREE_MONTH, label: t("time.3m") }
  ];
  const [rangeTime, setRangeTime] = useState<OPTIONS_CHART_ANALYTICS>(OPTIONS_CHART_ANALYTICS.ONE_DAY);
  const { address } = useParams<{ address: string }>();
  const blockKey = useSelector(({ system }: RootState) => system.blockKey);
  const theme = useTheme();
  const { data, loading } = useFetch<AddressAnalyticsData>(
    `${API.ADDRESS.ANALYTICS}/${address}/${rangeTime}`,
    undefined,
    false,
    blockKey
  );
  const values = data?.data?.map?.((item) => item.value || 0) || [];
  const maxBalance = BigNumber.max(0, ...values).toString();
  const minBalance = BigNumber.min(maxBalance, ...values).toString();

  const highest = Number(data?.highestBalance || maxBalance);
  const lowest = Number(data?.lowestBalance || minBalance);

  const convertDataChart: AnalyticsExpanded[] =
    data?.data?.map((item) => ({
      value: item.value || 0,
      date: item.date,
      highest,
      lowest
    })) || [];

  const customTicks = useMemo(() => {
    // Default ticks by recharts
    const ticks = getNiceTickValues([0, Math.max(Number(maxBalance), highest)], 5);

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
  }, [maxBalance, highest, lowest]);

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

  return (
    <Card title={<TextCardHighlight>{t("analytics")}</TextCardHighlight>}>
      <Wrapper container columns={24} spacing="35px">
        <Grid item xs={24} lg={18}>
          <Grid spacing={2} container alignItems="center" justifyContent={"space-between"}>
            <Grid item xs={4} sm={6}>
              <ButtonTitle>{t("common.balance")}</ButtonTitle>
            </Grid>
            <Grid item xs={8} sm={6}>
              <Tabs>
                {options.map(({ value, label }) => (
                  <Tab key={value} active={rangeTime === value ? 1 : 0} onClick={() => setRangeTime(value)}>
                    {label}
                  </Tab>
                ))}
              </Tabs>
            </Grid>
          </Grid>
          <ChartBox highest={highestIndex} lowest={lowestIndex}>
            {loading || !data ? (
              <SkeletonUI variant="rectangular" style={{ height: "400px" }} />
            ) : (
              <ResponsiveContainer width="100%" height={400}>
                <ComposedChart
                  width={900}
                  height={400}
                  data={convertDataChart}
                  margin={{ top: 5, right: 5, bottom: 14 }}
                >
                  {/* Defs for ticks filter background color */}
                  {["lowest", "highest"].map((item) => (
                    <defs key={item}>
                      <filter x="-.15" y="-.15" width="1.25" height="1.2" id={item}>
                        <feFlood
                          floodColor={theme.palette[item === "highest" ? "success" : "error"][100]}
                          result="bg"
                        />
                        <feMerge>
                          <feMergeNode in="bg" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                    </defs>
                  ))}
                  <XAxis
                    dataKey="date"
                    tickFormatter={(value) => moment(value).format(rangeTime === "ONE_DAY" ? "HH:mm" : "DD MMM")}
                    tickLine={false}
                    tickMargin={5}
                    color={theme.palette.secondary.light}
                    stroke={theme.palette.secondary.light}
                    dx={-15}
                    interval={getIntervalAnalyticChart(rangeTime)}
                  >
                    <Label value="(UTC)" offset={-12} position="insideBottom" />
                  </XAxis>
                  <YAxis
                    tickFormatter={formatPriceValue}
                    tickLine={false}
                    color={theme.palette.secondary.light}
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
                    stroke={theme.palette.error[700]}
                    strokeWidth={1}
                    dot={false}
                    activeDot={false}
                    strokeDasharray="3 3"
                  />
                  <Line
                    type="monotone"
                    dataKey="highest"
                    stroke={theme.palette.success.main}
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
                    <img src={HighestIcon} alt="heighest icon" />
                    <Title>{t("common.highestBalance")}</Title>
                  </Box>
                  <ValueInfo>{loading ? <SkeletonUI variant="rectangular" /> : formatADAFull(maxBalance)}</ValueInfo>
                </Box>
              </BoxInfoItemRight>
            </Box>
            <Box flex={1}>
              <BoxInfoItem display={"flex"} justifyContent={"center"}>
                <Box>
                  <Box minHeight={"90px"}>
                    <img src={LowestIcon} alt="lowest icon" />
                    <Title>{t("common.lowestBalance")}</Title>
                  </Box>
                  <ValueInfo>{loading ? <SkeletonUI variant="rectangular" /> : formatADAFull(minBalance)}</ValueInfo>
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
