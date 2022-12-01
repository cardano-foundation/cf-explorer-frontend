import { useState } from "react";
import { Col, Row } from "antd";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";

import Card from "../commons/Card";

import styles from "./index.module.scss";
import highestIcon from "../../commons/resources/images/highestIcon.png";
import lowestIcon from "../../commons/resources/images/lowestIcon.png";
import moment from "moment";

const DelegationDetailChart = () => {
  const [selectAnalytic, setSelectAnalytic] = useState<"epoch" | "delegator">("epoch");
  return (
    <Card title="Analytics">
      <Row className={styles.wrapper}>
        <Col span={24} xl={18}>
          <div className={styles.tab}>
            <button
              className={`${styles.button} ${selectAnalytic === "epoch" ? styles.active : ""}`}
              style={{ marginRight: 5 }}
              onClick={() => setSelectAnalytic("epoch")}
            >
              Epoch
            </button>
            <button
              className={`${styles.button}  ${selectAnalytic === "delegator" ? styles.active : ""}`}
              onClick={() => setSelectAnalytic("delegator")}
            >
              Delegator
            </button>
          </div>
          <div className={styles.chart}>
            <Chart />
          </div>
        </Col>
        <Col span={24} xl={6}>
          <Row className={styles.right} gutter={4}>
            <Col span={24} sm={12} xl={24} className={`${styles.col} ${styles.top}`}>
              <div className={styles.item}>
                <div>
                  <img src={highestIcon} alt="heighest icon" />
                  <div className={styles.title}>
                    {selectAnalytic === "epoch" ? "Highest stake" : "Highest number of delegators"}
                  </div>
                  <div className={styles.value}>179</div>
                </div>
              </div>
            </Col>

            <Col span={24} sm={12} xl={24} className={`${styles.col} ${styles.bottom}`}>
              <div className={styles.item}>
                <div>
                  <img src={lowestIcon} alt="lowest icon" />
                  <div className={styles.title}>
                    {selectAnalytic === "epoch" ? "Lowest stake" : "Lowest number of delegators"}
                  </div>
                  <div className={styles.value}>179</div>
                </div>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
      {/* <HighchartsReact highcharts={Highcharts} constructorType={"stockChart"} options={chartOptions} /> */}
    </Card>
  );
};

export default DelegationDetailChart;

const Chart = () => {
  const data: [string, number][] = new Array(16).fill(0).map((_, i) => [
    moment()
      .add(i - 15, "day")
      .format("MMM DD")
      .toString(),
    880000 + Math.floor(100000 * i * (Math.random() - 0.3)),
  ]);
  const categories = new Array(16).fill(0).map((_, i) =>
    !i || i === 15
      ? moment()
          .add(i - 15, "day")
          .format("MMM DD")
          .toString()
      : ""
  );

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={{
        chart: { type: "areaspline" },
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
        },
        legend: { enabled: false },
        tooltip: { shared: true, valueSuffix: " transactions" },
        credits: { enabled: false },
        series: [
          {
            name: "",
            pointPlacement: "between",
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
      }}
    />
  );
};
