import React, { useRef, useState } from "react";
import { Box, Grid, useTheme } from "@mui/material";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import moment from "moment";
import { useParams } from "react-router-dom";
import { BigNumber } from "bignumber.js";

import useFetch from "src/commons/hooks/useFetch";
import Card from "src/components/commons/Card";
import { formatADAFull, formatPrice, numberWithCommas } from "src/commons/utils/helper";
import { HighestIcon, LowestIcon } from "src/commons/resources";
import { API } from "src/commons/utils/api";
import { useScreen } from "src/commons/hooks/useScreen";
import { TextCardHighlight } from "src/components/AddressDetail/AddressAnalytics/styles";
import useResizeHighChart from "src/commons/hooks/useResizeHighChart";

import {
  BoxInfo,
  BoxInfoItem,
  BoxInfoItemRight,
  Tabs,
  Tab,
  ButtonTitle,
  ChartBox,
  SkeletonUI,
  Title,
  ValueInfo,
  Wrapper,
  CustomButton
} from "./styles";

type AnalyticsBalance = { date: string; value: number };
type AnalyticsReward = {
  epoch: number;
  value: number;
};

const options = [
  { value: "ONE_DAY", label: "1d" },
  { value: "ONE_WEEK", label: "1w" },
  { value: "ONE_MONTH", label: "1m" },
  { value: "THREE_MONTH", label: "3m" }
];

const StakeAnalytics: React.FC = () => {
  const [rangeTime, setRangeTime] = useState("ONE_DAY");
  const [tab, setTab] = useState<"BALANCE" | "REWARD">("BALANCE");
  const { stakeId } = useParams<{ stakeId: string }>();
  const wrapperChartRef = useRef<HTMLDivElement>(null);
  useResizeHighChart(wrapperChartRef);
  const theme = useTheme();
  const { isMobile } = useScreen();
  const { data, loading } = useFetch<AnalyticsBalance[]>(`${API.STAKE.ANALYTICS_BALANCE}/${stakeId}/${rangeTime}`);
  const { data: dataReward, loading: loadingReward } = useFetch<AnalyticsReward[]>(
    `${API.STAKE.ANALYTICS_REWARD}/${stakeId}`
  );
  const { data: balanceRaw, loading: balanceLoading } = useFetch<number[]>(`${API.STAKE.MIN_MAX_BALANCE}/${stakeId}`);
  const balance = balanceRaw?.length ? balanceRaw : [0, 0];
  const dataBalanceChart = data?.map((i) => {
    const value = BigNumber(i.value || 0).div(10 ** 6);
    return Number(value.toString().match(/^-?\d+(?:\.\d{0,6})?/)?.[0]);
  });
  const categoriesBalance = data?.map((i) => moment(i.date)) || [];
  const minBalance = Math.min(...(balance || []));
  const maxBalance = Math.max(...(balance || []), 0);
  const dataRewardChart = dataReward?.map((i) => {
    const value = BigNumber(i.value || 0).div(10 ** 6);
    return Number(value.toString().match(/^-?\d+(?:\.\d{0,6})?/)?.[0]);
  });
  const categoriesReward = dataReward?.map((i) => i.epoch) || [];

  const minReward = dataReward
    ? dataReward.reduce(
        function (prev, current) {
          return new BigNumber(prev.value).isLessThan(new BigNumber(current.value)) ? prev : current;
        },
        { epoch: 0, value: 0 }
      )
    : { epoch: 0, value: 0 };
  const maxReward = dataReward
    ? dataReward.reduce(
        function (prev, current) {
          return new BigNumber(prev.value).isGreaterThan(new BigNumber(current.value)) ? prev : current;
        },
        { epoch: 0, value: 0 }
      )
    : { epoch: 0, value: 0 };
  return (
    <Card title={<TextCardHighlight>Analytics</TextCardHighlight>}>
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
                    Balance
                  </CustomButton>
                  <CustomButton active={tab === "REWARD" ? 1 : 0} onClick={() => setTab("REWARD")}>
                    Reward
                  </CustomButton>
                </Box>
              </Grid>
            ) : (
              <Grid item sm={6}>
                <ButtonTitle active={tab === "BALANCE"} onClick={() => setTab("BALANCE")}>
                  Balance
                </ButtonTitle>
                <ButtonTitle active={tab === "REWARD"} onClick={() => setTab("REWARD")}>
                  Reward
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
          <ChartBox ref={wrapperChartRef}>
            {loading || loadingReward ? (
              <SkeletonUI variant="rectangular" style={{ height: "375px" }} />
            ) : (
              <Box position={"relative"}>
                <HighchartsReact
                  highcharts={Highcharts}
                  options={{
                    chart: {
                      type: "areaspline",
                      backgroundColor: "transparent",
                      style: { fontFamily: "Helvetica, monospace" }
                    },
                    title: { text: "" },
                    yAxis: {
                      title: { text: null },
                      lineWidth: 2,
                      lineColor: theme.palette.border.main,
                      className: "y-axis-lable",
                      gridLineWidth: 1,
                      minorGridLineWidth: 1,
                      labels: {
                        style: { fontSize: 12 },
                        formatter: (e: { value: string }) => {
                          return formatPrice(e.value);
                        }
                      }
                    },
                    xAxis: {
                      categories: tab === "BALANCE" ? categoriesBalance : categoriesReward,
                      lineWidth: 2,
                      lineColor: theme.palette.border.main,
                      plotLines: [],
                      angle: 0,
                      labels: {
                        style: {
                          fontSize: rangeTime === "THREE_MONTH" ? 10 : 12
                        },
                        rotation: isMobile || rangeTime === "THREE_MONTH" ? -45 : null,
                        formatter: (e: { value: string }) => {
                          if (tab === "BALANCE")
                            return moment(e.value).format(rangeTime === "ONE_DAY" ? "HH:mm" : `DD MMM`);
                          return e.value;
                        }
                      }
                    },
                    legend: { enabled: false },
                    tooltip: {
                      shared: true,
                      formatter: function (this: Highcharts.TooltipFormatterContextObject) {
                        if (tab === "BALANCE")
                          return (
                            "<span>" +
                            moment(`${this.x}`).format("DD MMM HH:mm:ss") +
                            " (UTC time zone)" +
                            "</span><br><strong>" +
                            numberWithCommas(this.y || 0) +
                            "</strong>"
                          );
                        return "<span>" + this.x + "</span><br><strong>" + numberWithCommas(this.y || 0) + "</strong>";
                      }
                    },
                    credits: { enabled: false },
                    series: [
                      {
                        name: "",
                        pointPlacement: "on",
                        type: "areaspline",
                        marker: { enabled: tab === "BALANCE" },
                        lineWidth: 4,
                        color: theme.palette.green[700],
                        fillColor: {
                          linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
                          stops: [
                            [0, theme.palette.success.light],
                            [1, "transparent"]
                          ]
                        },
                        data: tab === "BALANCE" ? dataBalanceChart : dataRewardChart
                      }
                    ]
                  }}
                />
              </Box>
            )}
          </ChartBox>
        </Grid>
        <Grid item xs={24} lg={6}>
          <BoxInfo height={"100%"}>
            <Box flex={1}>
              <BoxInfoItemRight display={"flex"} alignItems="center" justifyContent={"center"}>
                <Box>
                  <img src={HighestIcon} alt="heighest icon" />
                  <Title>{tab === "BALANCE" ? "Highest Balance" : "Highest Reward"}</Title>
                  <ValueInfo>
                    {balanceLoading ? (
                      <SkeletonUI variant="rectangular" />
                    ) : tab === "BALANCE" ? (
                      formatADAFull(maxBalance)
                    ) : (
                      formatADAFull(maxReward.value)
                    )}
                  </ValueInfo>
                </Box>
              </BoxInfoItemRight>
            </Box>
            <Box flex={1}>
              <BoxInfoItem display={"flex"} alignItems="center" justifyContent={"center"}>
                <Box>
                  <img src={LowestIcon} alt="lowest icon" />
                  <Title>{tab === "BALANCE" ? "Lowest Balance" : "Lowest Reward"}</Title>
                  <ValueInfo>
                    {balanceLoading ? (
                      <SkeletonUI variant="rectangular" />
                    ) : tab === "BALANCE" ? (
                      formatADAFull(minBalance)
                    ) : (
                      formatADAFull(minReward.value)
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
