import { Box, Grid, useTheme } from "@mui/material";
import { BigNumber } from "bignumber.js";
import Highcharts from "highcharts";
import { HighchartsReact } from "highcharts-react-official";
import moment from "moment";
import { FC, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import { useScreen } from "src/commons/hooks/useScreen";
import { TextCardHighlight } from "src/components/AddressDetail/AddressAnalytics/styles";
import useResizeHighChart from "src/commons/hooks/useResizeHighChart";
import useFetch from "src/commons/hooks/useFetch";

import { HighestIcon, LowestIcon } from "../../../commons/resources";
import { API } from "../../../commons/utils/api";
import { formatPrice, numberWithCommas } from "../../../commons/utils/helper";
import Card from "../../commons/Card";
import {
  BoxInfo,
  BoxInfoItem,
  BoxInfoItemRight,
  ButtonTitle,
  ChartBox,
  SkeletonUI,
  Tab,
  Tabs,
  Title,
  ValueInfo,
  Wrapper
} from "./styles";

type AnalyticsData = { date: string; value: number };

const options = [
  { value: "ONE_DAY", label: "1d" },
  { value: "ONE_WEEK", label: "1w" },
  { value: "ONE_MONTH", label: "1m" },
  { value: "THREE_MONTH", label: "3m" }
];

const AddressAnalytics: FC = () => {
  const [rangeTime, setRangeTime] = useState("ONE_DAY");
  const wrapperChartRef = useRef<HTMLDivElement>(null);
  useResizeHighChart(wrapperChartRef);
  const { tokenId } = useParams<{ tokenId: string }>();
  const { isMobile } = useScreen();
  const theme = useTheme();
  const { data, loading } = useFetch<AnalyticsData[]>(`${API.TOKEN.ANALYTICS}/${tokenId}/${rangeTime}`);
  const dataChart = data?.map((i) => {
    const value = BigNumber(i.value || 0);
    return Number(value.toString().match(/^-?\d+(?:\.\d{0,6})?/)?.[0]);
  });

  const categories =
    data?.map((i) => moment(i.date).format(`DD MMM ${rangeTime === "THREE_MONTH" ? "YYYY" : ""}`)) || [];
  const minBalance = data
    ? data.reduce(function (prev, current) {
        return new BigNumber(prev.value).isLessThan(new BigNumber(current.value)) ? prev : current;
      })
    : { date: "", value: 0 };
  const maxBalance = data
    ? data.reduce(function (prev, current) {
        return new BigNumber(prev.value).isGreaterThan(new BigNumber(current.value)) ? prev : current;
      })
    : { date: "", value: 0 };

  return (
    <Box pt={isMobile ? 0 : "20px"}>
      <Card title={<TextCardHighlight>Analytics</TextCardHighlight>}>
        <Wrapper container columns={24} spacing="35px">
          <Grid item xs={24} lg={18}>
            <Grid spacing={2} container alignItems="center" justifyContent={"space-between"}>
              <Grid item xs={4} sm={4}>
                <ButtonTitle>Volume</ButtonTitle>
              </Grid>
              <Grid item xs={8} sm={8}>
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
                <SkeletonUI variant="rectangular" style={{ height: "375px", display: "block" }} />
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
                        categories,
                        lineWidth: 2,
                        lineColor: theme.palette.border.main,
                        plotLines: [],
                        angle: 0,
                        labels: {
                          style: {
                            fontSize: rangeTime === "THREE_MONTH" ? 10 : 12
                          },
                          rotation: isMobile || rangeTime === "THREE_MONTH" ? -45 : null
                        }
                      },
                      legend: { enabled: false },
                      tooltip: {
                        shared: true,
                        formatter: function (this: Highcharts.TooltipFormatterContextObject) {
                          return (
                            "<span>" + this.x + "</span><br><strong>" + numberWithCommas(this.y || 0) + "</strong>"
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
                          color: theme.palette.green[200],
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
            <BoxInfo height={"100%"} space={0}>
              <Box flex={1}>
                <BoxInfoItemRight display={"flex"} justifyContent={"center"}>
                  <Box>
                    <Box minHeight={"90px"}>
                      <img src={HighestIcon} alt="heighest icon" />
                      <Title>Highest Volume</Title>
                    </Box>
                    <ValueInfo>
                      {loading ? <SkeletonUI variant="rectangular" /> : numberWithCommas(maxBalance.value || 0)}
                    </ValueInfo>
                  </Box>
                </BoxInfoItemRight>
              </Box>
              <Box flex={1}>
                <BoxInfoItem display={"flex"} justifyContent={"center"}>
                  <Box>
                    <Box minHeight={"90px"}>
                      <img src={LowestIcon} alt="lowest icon" />
                      <Title>Lowest Volume</Title>
                    </Box>
                    <ValueInfo>
                      {loading ? <SkeletonUI variant="rectangular" /> : numberWithCommas(minBalance.value || 0)}
                    </ValueInfo>
                  </Box>
                </BoxInfoItem>
              </Box>
            </BoxInfo>
          </Grid>
        </Wrapper>
      </Card>
    </Box>
  );
};

export default AddressAnalytics;
