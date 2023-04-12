import React, { useState } from "react";
import moment from "moment";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import useFetch from "../../../../commons/hooks/useFetch";
import { Box, Grid, alpha, useTheme } from "@mui/material";
import { API } from "../../../../commons/utils/api";
import { BoxInfo, ColorChart, InfoItem, Skeleton, Tab, Tabs, Title, TransactionContainer } from "./styles";
import { formatDateTimeLocal } from "../../../../commons/utils/helper";

interface TransactionChartIF {
  date: string;
  txs: number;
  simpleTxs: number;
  complexTxs: number;
}

type Time = "ONE_DAY" | "ONE_WEEK" | "TWO_WEEK" | "ONE_MONTH";
export type TypeChart = "trx" | "simple" | "complex";

const TransactionChart: React.FC = () => {
  const [rangeTime, setRangeTime] = useState<Time>("ONE_DAY");

  const optionsTime: Record<Time, { label: string; displayName: string }> = {
    ONE_DAY: {
      label: "1d",
      displayName: "today",
    },
    ONE_WEEK: {
      label: "1w",
      displayName: "in week",
    },
    TWO_WEEK: {
      label: "2w",
      displayName: "in two week",
    },
    ONE_MONTH: {
      label: "1m",
      displayName: "in month",
    },
  };

  const formatTime = (type: Time) => {
    switch (type) {
      case "ONE_DAY":
        return "HH:mm";
      default:
        return "DD/MM";
    }
  };

  const { data, loading } = useFetch<TransactionChartIF[]>(`${API.TRANSACTION.GRAPH}/${rangeTime}`);
  const categories = (data || []).map(item => moment(formatDateTimeLocal(item.date)).format(formatTime(rangeTime)));

  const dataTxs = (data || []).map(item => [formatDateTimeLocal(item.date), item.txs]);
  const dataComplexTxs = (data || []).map(item => [formatDateTimeLocal(item.date), item.complexTxs]);
  const dataSimpleTxs = (data || []).map(item => [formatDateTimeLocal(item.date), item.simpleTxs]);
  const sumTxs = (data || []).reduce((prev, item) => prev + item.txs, 0);
  const sumComplexTxs = (data || []).reduce((prev, item) => prev + item.complexTxs, 0);
  const sumSimpleTxs = (data || []).reduce((prev, item) => prev + item.simpleTxs, 0);

  const dataOverview = [
    { key: "trx", title: "Total  transaction", value: sumTxs },
    { key: "simple", title: "Simple transaction", value: sumSimpleTxs },
    { key: "complex", title: "Complex transaction", value: sumComplexTxs },
  ];

  const theme = useTheme();

  const options: Highcharts.Options = {
    chart: { type: "areaspline", height: 300, style: { fontFamily: "Roboto, sans-serif" } },
    title: { text: "" },
    yAxis: {
      title: { text: null },
      lineWidth: 2,
      lineColor: theme.palette.border.main,
      gridLineWidth: 0,
    },
    xAxis: {
      categories,
      lineWidth: 2,
      lineColor: theme.palette.border.main,
      plotLines: [],
      angle: 0,
      type: "datetime",
      labels: {
        overflow: "allow",
        rotation: 0,
        align: "left",
        format: "{value:%Y}",
        step: 1,
      },
    },
    legend: { enabled: false },
    credits: { enabled: false },
    series: [
      {
        name: "",
        pointPlacement: "on",
        type: "areaspline",
        marker: { enabled: false },
        lineWidth: 1.5,
        color: theme.palette.green[450],
        tooltip: { valuePrefix: "Total transaction: " },
        fillColor: {
          linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
          stops: [
            [0, alpha(theme.palette.green[800], 0.3)],
            [1, alpha(theme.palette.green[450], 0)],
          ],
        },
        data: dataTxs,
      },
      {
        name: "",
        pointPlacement: "on",
        type: "areaspline",
        marker: { enabled: false },
        lineWidth: 1.5,
        color: "#387269",
        tooltip: { valuePrefix: "Complex transaction: " },
        fillColor: {
          linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
          stops: [
            [0, alpha(theme.palette.green[800], 0.3)],
            [1, alpha(theme.palette.green[450], 0)],
          ],
        },
        data: dataComplexTxs,
      },
      {
        name: "",
        pointPlacement: "on",
        type: "areaspline",
        marker: { enabled: false },
        lineWidth: 1.5,
        tooltip: { valuePrefix: "Simple transaction: " },
        color: theme.palette.green[800],
        fillColor: {
          linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
          stops: [
            [0, alpha(theme.palette.green[800], 0.3)],
            [1, alpha(theme.palette.green[450], 0)],
          ],
        },
        data: dataSimpleTxs,
      },
    ],
  };

  const renderLoading = () => {
    return (
      <Grid container spacing={2}>
        <Grid item xs={12} lg={8}>
          <Skeleton variant="rectangular" height={"300px"} style={{ borderRadius: 10 }} />
        </Grid>
        <Grid item xs={12} lg={4}>
          <Skeleton variant="rectangular" height={"300px"} />
        </Grid>
      </Grid>
    );
  };
  return (
    <TransactionContainer>
      <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
        <Title>Transaction {optionsTime[rangeTime].displayName}</Title>
        <Tabs>
          {Object.keys(optionsTime).map(option => {
            return (
              <Tab
                key={optionsTime[option as Time].label}
                active={rangeTime === option ? 1 : 0}
                onClick={() => setRangeTime(option as Time)}
              >
                {optionsTime[option as Time].label}
              </Tab>
            );
          })}
        </Tabs>
      </Box>
      {loading && renderLoading()}
      {!loading && (
        <Grid container spacing={2}>
          <Grid item xs={12} lg={8}>
            <HighchartsReact highcharts={Highcharts} options={options} />
          </Grid>
          <Grid item xs={12} lg={4}>
            <BoxInfo>
              {dataOverview.map(item => (
                <InfoItem key={item.key}>
                  <ColorChart type={item.key as TypeChart} />
                  <Box>
                    <Box color={({ palette }) => palette.grey[400]}>{item.title}</Box>
                    <Box textAlign={"left"} color={({ palette }) => palette.green[700]} fontWeight={"bold"}>
                      {item.value}
                    </Box>
                  </Box>
                </InfoItem>
              ))}
            </BoxInfo>
          </Grid>
        </Grid>
      )}
    </TransactionContainer>
  );
};

export default TransactionChart;
