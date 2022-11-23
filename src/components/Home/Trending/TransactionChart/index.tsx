import React from "react";
import moment from "moment";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import styles from "./index.module.scss";
import useFetch from "../../../../commons/hooks/useFetch";

interface TransactionCount {
  date: string;
  txs: string;
}

const TransactionChart: React.FC = () => {
  const { data: dataOrigin } = useFetch<TransactionCount[]>(`tx/graph`);
  const data = (dataOrigin || []).map(item => item.txs);

  const categories = (dataOrigin || []).map(item => moment(item.date).format("MMM DD"));

  const options: Highcharts.Options = {
    chart: { type: "areaspline", className: styles.chart, height: 230 },
    title: { text: "" },
    yAxis: {
      title: { text: null },
      lineWidth: 1,
      lineColor: "#E3E5E9",
      gridLineWidth: 0,
    },
    xAxis: {
      categories,
      lineWidth: 1,
      lineColor: "#E3E5E9",
      plotLines: [],
      angle: 0,
      labels: {
        overflow: "visible",
        rotation: 0,
        align: "left",
        step: 14,
      },
      className: styles.xAxis,
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
        color: {
          linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
          stops: [
            [0, "#184C78"],
            [1, "#5A9C56"],
          ],
        },
        fillColor: {
          linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
          stops: [
            [0, "rgba(24, 76, 120, 0.3)"],
            [1, "rgba(90, 156, 86, 0)"],
          ],
        },
        data,
      },
    ],
  };
  return (
    <div className={styles.transactionChart}>
      <h3>Transaction in past 15 days</h3>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default TransactionChart;
