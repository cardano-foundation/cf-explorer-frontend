import React, { useState } from "react";
import { Box, Grid } from "@mui/material";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
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
  StyledLine,
} from "./styles";
import moment from "moment";
import { useParams } from "react-router-dom";
import useFetch from "../../../commons/hooks/useFetch";
import Card from "../../commons/Card";
import { formatADA, formatADAFull, formatPrice } from "../../../commons/utils/helper";
import { HighestIcon, LowestIcon } from "../../../commons/resources";
import { BigNumber } from "bignumber.js";
import CustomTooltip from "../../commons/CustomTooltip";
import { API } from "../../../commons/utils/api";

type AnalyticsData = { date: string; value: number };

const options = [
  { value: "ONE_DAY", label: "1d" },
  { value: "ONE_WEEK", label: "1w" },
  { value: "ONE_MONTH", label: "1m" },
  { value: "THREE_MONTH", label: "3m" },
];

const AddressAnalytics: React.FC = () => {
  const [rangeTime, setRangeTime] = useState("ONE_DAY");
  const { address } = useParams<{ address: string }>();
  const { data, loading } = useFetch<AnalyticsData[]>(`${API.ADDRESS.ANALYTICS}/${address}/${rangeTime}`);
  const { data: balance, loading: balanceLoading } = useFetch<number[]>(`${API.ADDRESS.MIN_MAX_BALANCE}/${address}`);
  const dataChart = data?.map(i => +formatADAFull(BigNumber(i.value).toNumber() || 0).replaceAll(",", ""));

  const categories = data?.map(i => moment(i.date).format(`DD MMM ${rangeTime === "THREE_MONTH" ? "YYYY" : ""}`)) || [];
  const minBalance = Math.min(...(balance || []), 0);
  const maxBalance = Math.max(...(balance || []), 0);
  const el = document.getElementsByClassName("y-axis-lable");

  return (
    <Card title="Analytics" pt={5}>
      <Wrapper container columns={24}>
        <Grid item xs={24} lg={18}>
          <Grid spacing={2} container alignItems="center" justifyContent={"space-between"}>
            <Grid item xs={12} sm={6}>
              <ButtonTitle>Balance</ButtonTitle>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Tabs>
                {options.map(({ value, label }) => (
                  <Tab key={value} active={rangeTime === value ? 1 : 0} onClick={() => setRangeTime(value)}>
                    {label}
                  </Tab>
                ))}
              </Tabs>
            </Grid>
          </Grid>
          <ChartBox>
            {loading ? (
              <SkeletonUI variant="rectangular" style={{ height: "400px" }} />
            ) : (
              <Box position={"relative"}>
                <HighchartsReact
                  highcharts={Highcharts}
                  options={{
                    chart: { type: "areaspline", style: { fontFamily: "Helvetica, monospace" } },
                    title: { text: "" },
                    yAxis: {
                      title: { text: null },
                      lineWidth: 2,
                      lineColor: "#E3E5E9",
                      className: "y-axis-lable",
                      gridLineWidth: 1,
                      minorGridLineWidth: 1,
                      labels: {
                        style: { fontSize: 12 },
                        formatter: (e: { value: string }) => {
                          return formatPrice(e.value || 0);
                        },
                      },
                    },
                    xAxis: {
                      categories,
                      lineWidth: 2,
                      lineColor: "#E3E5E9",
                      plotLines: [],
                      angle: 0,
                      labels: {
                        style: {
                          fontSize: 12,
                        },
                      },
                    },
                    legend: { enabled: false },
                    tooltip: { shared: true },
                    credits: { enabled: false },
                    series: [
                      {
                        name: "",
                        pointPlacement: "on",
                        type: "areaspline",
                        marker: { enabled: false },
                        lineWidth: 4,
                        color: "#438f68",
                        fillColor: {
                          linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
                          stops: [
                            [0, "#438f6833"],
                            [1, "rgba(67, 143, 104, 0)"],
                          ],
                        },
                        data: dataChart,
                      },
                    ],
                  }}
                />
                <StyledLine left={el.length && el.length > 2 ? el[2].getBoundingClientRect().width + 24 : 0} />
              </Box>
            )}
          </ChartBox>
        </Grid>
        <Grid item xs={24} lg={6}>
          <BoxInfo>
            <Box flex={1}>
              <BoxInfoItemRight display={"flex"} alignItems="center" justifyContent={"center"}>
                <Box>
                  <img src={HighestIcon} width={"20%"} alt="heighest icon" />
                  <Title>Highest Balance</Title>
                  <CustomTooltip title={formatADAFull(maxBalance || 0)} placement="bottom">
                    <ValueInfo>
                      {balanceLoading ? <SkeletonUI variant="rectangular" /> : formatADA(maxBalance || 0)}
                    </ValueInfo>
                  </CustomTooltip>
                </Box>
              </BoxInfoItemRight>
            </Box>
            <Box flex={1}>
              <BoxInfoItem display={"flex"} alignItems="center" justifyContent={"center"}>
                <Box>
                  <img src={LowestIcon} width={"20%"} alt="lowest icon" />
                  <Title>Lowest Balance</Title>
                  <CustomTooltip title={formatADAFull(minBalance || 0)} placement="bottom">
                    <ValueInfo>
                      {balanceLoading ? <SkeletonUI variant="rectangular" /> : formatADA(minBalance || 0)}
                    </ValueInfo>
                  </CustomTooltip>
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
