import { Box, Grid, useTheme } from "@mui/material";
import { BigNumber } from "bignumber.js";
import moment from "moment";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Label,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  XAxis,
  XAxisProps,
  YAxis
} from "recharts";

import useFetch from "src/commons/hooks/useFetch";
import { useScreen } from "src/commons/hooks/useScreen";
import { API } from "src/commons/utils/api";
import { OPTIONS_CHART_ANALYTICS } from "src/commons/utils/constants";
import { formatADAFull, formatPrice, getIntervalAnalyticChart } from "src/commons/utils/helper";
import { TextCardHighlight } from "src/components/AddressDetail/AddressAnalytics/styles";
import Card from "src/components/commons/Card";
import CustomIcon from "src/components/commons/CustomIcon";
import { TooltipBody } from "src/components/commons/Layout/styles";
import { HighestIconComponent, LowestIconComponent } from "src/commons/resources";

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

type AnalyticsBalance = { date: string; value: number };
type AnalyticsReward = {
  epoch: number;
  value: number;
};

const StakeAnalytics: React.FC = () => {
  const { t } = useTranslation();
  const [rangeTime, setRangeTime] = useState<OPTIONS_CHART_ANALYTICS>(OPTIONS_CHART_ANALYTICS.ONE_DAY);
  const [tab, setTab] = useState<"BALANCE" | "REWARD">("BALANCE");
  const { stakeId } = useParams<{ stakeId: string }>();
  const blockKey = useSelector(({ system }: RootState) => system.blockKey);
  const theme = useTheme();
  const { isMobile } = useScreen();
  const { data, loading } = useFetch<AnalyticsBalance[]>(
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
  const values = data?.map((item) => item.value || 0) || [];
  const maxBalance = BigNumber.max(0, ...values).toString();
  const minBalance = BigNumber.min(maxBalance, ...values).toString();

  const rewards = dataReward?.map((item) => item.value || 0) || [];
  const maxReward = BigNumber.max(0, ...rewards).toString();
  const minReward = BigNumber.min(maxReward, ...rewards).toString();

  const convertDataChart = data?.map((item) => ({
    value: item.value || 0,
    date: item.date
  }));
  const convertRewardChart = dataReward?.map((item) => ({
    value: item.value || 0,
    epoch: item.epoch
  }));

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
          <ChartBox>
            {loading || loadingReward || !data || !dataReward ? (
              <SkeletonUI variant="rectangular" style={{ height: "400px" }} />
            ) : (
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart
                  width={900}
                  height={400}
                  data={tab === "BALANCE" ? convertDataChart : convertRewardChart}
                  margin={{ top: 5, right: 10, bottom: 14 }}
                >
                  <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={theme.palette.primary.main} stopOpacity={0.2} />
                      <stop offset="100%" stopColor={theme.palette.primary.main} stopOpacity={0.2} />
                    </linearGradient>
                  </defs>
                  <XAxis
                    color={theme.palette.secondary.light}
                    stroke={theme.palette.secondary.light}
                    dataKey={tab === "BALANCE" ? "date" : "epoch"}
                    tickFormatter={(value) =>
                      tab === "BALANCE" ? moment(value).format(rangeTime === "ONE_DAY" ? "HH:mm" : "DD MMM") : value
                    }
                    tickLine={false}
                    interval={getIntervalAnalyticChart(rangeTime)}
                    {...xAxisProps}
                  >
                    <Label value="(UTC)" offset={-12} position="insideBottom" />
                  </XAxis>
                  <YAxis
                    color={theme.palette.secondary.light}
                    stroke={theme.palette.secondary.light}
                    tickFormatter={formatPriceValue}
                    tickLine={false}
                  />
                  <Tooltip content={renderTooltip} cursor={false} />
                  <CartesianGrid vertical={false} strokeWidth={0.33} />
                  <Area
                    stackId="1"
                    type="monotone"
                    dataKey="value"
                    stroke={theme.palette.primary.main}
                    strokeWidth={4}
                    fill="url(#colorUv)"
                    activeDot={{ r: 6 }}
                  />
                </AreaChart>
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
