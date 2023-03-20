import React from "react";
import moment from "moment";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import useFetch from "../../../../commons/hooks/useFetch";
import { styled, useTheme } from "@mui/material";
import { BoxRaised } from "../../../commons/BoxRaised";
import { API } from "../../../../commons/utils/api";

const TransactionContainer = styled(BoxRaised)`
  margin-bottom: 24px;
  padding: 20px;
  height: calc(100% - 56px);
  [class*="highcharts-container"] {
    height: 230px;
    max-height: 300px;
    width: 100%;
    [class*="highcharts-xaxis-labels"] {
      background: red;
      text {
        &:last-child {
          text-anchor: end !important;
        }
      }
    }
  }
`;

const Title = styled("h3")`
  position: relative;
  text-align: left;
  margin-top: 0px;
  margin-bottom: 1.5rem;
  font-size: 1.25rem;

  &::after {
    position: absolute;
    top: 100%;
    left: 0;
    content: "";
    width: 50px;
    height: 4px;
    background: var(--color-green-light);
  }
`;

const Chart = styled(HighchartsReact)``;
interface TransactionCount {
  date: string;
  txs: string;
}

const TransactionChart: React.FC = () => {
  const { data: dataOrigin } = useFetch<TransactionCount[]>(API.TRANSACTION.GRAPH);
  const data = (dataOrigin || []).map(item => item.txs);
  const theme = useTheme();
  const categories = (dataOrigin || []).map(item => moment(item.date).format("MMM DD"));

  const options: Highcharts.Options = {
    chart: { type: "areaspline", height: 230 },
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
      labels: {
        overflow: "allow",
        rotation: 0,
        align: "left",
        step: data.length - 1,
      },
    },
    legend: { enabled: false },
    tooltip: { shared: true, valueSuffix: " transactions" },
    credits: { enabled: false },
    series: [
      {
        name: "",
        pointPlacement: "on",
        type: "areaspline",
        marker: { enabled: false },
        lineWidth: 4,
        color: theme.palette.primary.main,
        fillColor: {
          linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
          stops: [
            [0, theme.palette.success.light],
            [1, "transparent"],
          ],
        },
        data,
      },
    ],
  };
  return (
    <TransactionContainer>
      <Title>Transaction in past 15 days</Title>
      <Chart highcharts={Highcharts} options={options} />
    </TransactionContainer>
  );
};

export default TransactionChart;
