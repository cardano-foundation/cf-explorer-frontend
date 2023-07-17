import React, { useRef, useState } from "react";
import { Box, Grid, useTheme } from "@mui/material";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import moment from "moment";
import { useParams } from "react-router-dom";
import { BigNumber } from "bignumber.js";
import { isArray } from "lodash";

import useFetch from "src/commons/hooks/useFetch";
import Card from "src/components/commons/Card";
import { formatADAFull, formatPrice, numberWithCommas } from "src/commons/utils/helper";
import useResizeHighChart from "src/commons/hooks/useResizeHighChart";
import { HighestIcon, LowestIcon } from "src/commons/resources";
import { API } from "src/commons/utils/api";
import { useScreen } from "src/commons/hooks/useScreen";

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
  TextCardHighlight
} from "./styles";

type AnalyticsData = { date: string; value: number };

const options = [
  { value: "ONE_DAY", label: "1d" },
  { value: "ONE_WEEK", label: "1w" },
  { value: "ONE_MONTH", label: "1m" },
  { value: "THREE_MONTH", label: "3m" }
];

type IBalanceData = number[];

const AddressAnalytics: React.FC = () => {
  const [rangeTime, setRangeTime] = useState("ONE_DAY");
  const wrapperChartRef = useRef<HTMLDivElement>(null);
  const { address } = useParams<{ address: string }>();
  const { isMobile } = useScreen();
  const theme = useTheme();
  const { data, loading } = useFetch<AnalyticsData[]>(`${API.ADDRESS.ANALYTICS}/${address}/${rangeTime}`);

  const { data: balance, loading: balanceLoading } = useFetch<IBalanceData>(
    `${API.ADDRESS.MIN_MAX_BALANCE}/${address}`
  );
  useResizeHighChart(wrapperChartRef);

  const dataChartChecked = isArray(data) ? data : [];

  const dataChart = dataChartChecked.map((i: AnalyticsData) => {
    const value = BigNumber(i.value || 0).div(10 ** 6);
    return Number(value.toString().match(/^-?\d+(?:\.\d{0,6})?/)?.[0]);
  });

  const categories = dataChartChecked.map((i: AnalyticsData) => moment(i.date)) || [];

  const minBalance = isArray(balance) ? Math.min(...balance) : 0;
  const maxBalance = isArray(balance) ? Math.max(...balance, 0) : 0;

  return (
    <Card title={<TextCardHighlight>Analytics</TextCardHighlight>}>
      <Wrapper container columns={24} spacing="35px">
        <Grid item xs={24} lg={18}>
          <Grid spacing={2} container alignItems="center" justifyContent={"space-between"}>
            <Grid item xs={4} sm={6}>
              <ButtonTitle>Balance</ButtonTitle>
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
          <ChartBox ref={wrapperChartRef}>
            {loading ? (
              <SkeletonUI variant="rectangular" style={{ height: "400px" }} />
            ) : (
              <Box position={"relative"}>
                <HighchartsReact
                  highcharts={Highcharts}
                  options={{
                    chart: {
                      type: "areaspline",
                      backgroundColor: "transparent",
                      style: { fontFamily: "Roboto, sans-serif" }
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
                      categories,
                      lineWidth: 2,
                      lineColor: theme.palette.green[200],
                      plotLines: [],
                      angle: 0,
                      labels: {
                        style: {
                          fontSize: rangeTime === "THREE_MONTH" ? 10 : 12
                        },
                        rotation: isMobile || rangeTime === "THREE_MONTH" ? -45 : null,
                        formatter: (e: { value: string }) => {
                          return moment(e.value).format(
                            rangeTime === "ONE_DAY" ? "HH:mm" : `DD MMM ${rangeTime === "THREE_MONTH" ? "YYYY" : ""}`
                          );
                        }
                      }
                    },
                    legend: { enabled: false },
                    tooltip: {
                      shared: true,
                      formatter: function (this: Highcharts.TooltipFormatterContextObject) {
                        return (
                          "<span>" +
                          moment(`${this.x}`).format("DD MMM HH:mm:ss") +
                          " (UTC time zone)" +
                          "</span><br><strong>" +
                          numberWithCommas(this.y || 0) +
                          "</strong>"
                        );
                      }
                    },
                    credits: { enabled: false },
                    series: [
                      {
                        name: "",
                        pointPlacement: "on",
                        type: "areaspline",
                        marker: { enabled: true },
                        lineWidth: 4,
                        color: theme.palette.primary.main,
                        fillColor: {
                          linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
                          stops: [
                            [0, theme.palette.success.light],
                            [1, "transparent"]
                          ]
                        },
                        data: dataChart
                      }
                    ]
                  }}
                />
              </Box>
            )}
          </ChartBox>
        </Grid>
        <Grid item xs={24} lg={6}>
          <BoxInfo height={"100%"} space={categories.length ? 36 : 16}>
            <Box flex={1}>
              <BoxInfoItemRight display={"flex"} justifyContent={"center"}>
                <Box>
                  <Box minHeight={"90px"}>
                    <img src={HighestIcon} alt="heighest icon" />
                    <Title>Highest Balance</Title>
                  </Box>
                  <ValueInfo>
                    {balanceLoading ? <SkeletonUI variant="rectangular" /> : formatADAFull(maxBalance)}
                  </ValueInfo>
                </Box>
              </BoxInfoItemRight>
            </Box>
            <Box flex={1}>
              <BoxInfoItem display={"flex"} justifyContent={"center"}>
                <Box>
                  <Box minHeight={"90px"}>
                    <img src={LowestIcon} alt="lowest icon" />
                    <Title>Lowest Balance</Title>
                  </Box>
                  <ValueInfo>
                    {balanceLoading ? <SkeletonUI variant="rectangular" /> : formatADAFull(minBalance)}
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
