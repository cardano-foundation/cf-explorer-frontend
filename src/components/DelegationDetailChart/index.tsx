import React, { useEffect, useState } from "react";
import { Grid, Skeleton, styled } from "@mui/material";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";

import Card from "../commons/Card";

import styles from "./index.module.scss";
import highestIcon from "../../commons/resources/images/highestIcon.png";
import lowestIcon from "../../commons/resources/images/lowestIcon.png";
import moment from "moment";
import { formatADA } from "../../commons/utils/helper";

interface DelegationDetailChartProps {
  data: AnalyticsDelegators | null;
  loading: boolean;
}

const DelegationDetailChart: React.FC<DelegationDetailChartProps> = ({ data, loading }) => {
  const [selectAnalytic, setSelectAnalytic] = useState<"epochChart" | "delegatorChart">("epochChart");
  return (
    <Card title="Analytics">
      <Grid container columns={24} className={styles.wrapper}>
        <Grid item xs={24} lg={18}>
          <div className={styles.tab}>
            <button
              className={`${styles.button} ${selectAnalytic === "epochChart" ? styles.active : ""}`}
              style={{ marginRight: 5 }}
              onClick={() => setSelectAnalytic("epochChart")}
            >
              Epoch
            </button>
            <button
              className={`${styles.button}  ${selectAnalytic === "delegatorChart" ? styles.active : ""}`}
              onClick={() => setSelectAnalytic("delegatorChart")}
            >
              Delegator
            </button>
          </div>
          <div className={styles.chart}>
            {loading && <SkeletonUI variant="rectangular" style={{ height: "280px" }} />}
            {!loading && <Chart data={data ? data[selectAnalytic].dataByDays : []} />}
          </div>
        </Grid>
        <Grid item xs={24} lg={6}>
          <Grid container columns={24} spacing={2} className={styles.right}>
            <Grid item xs={24} sm={12} lg={24} className={`${styles.col} ${styles.top}`}>
              <div className={styles.item}>
                <div>
                  <img src={highestIcon} alt="heighest icon" />
                  <div className={styles.title}>
                    {selectAnalytic === "epochChart" ? "Highest stake" : "Highest number of delegators"}
                  </div>
                  <div className={styles.value}>
                    {loading && <SkeletonUI variant="rectangular" />}
                    {!loading &&
                      (data
                        ? selectAnalytic === "epochChart"
                          ? formatADA(data[selectAnalytic].highest)
                          : data[selectAnalytic].highest
                        : 0)}
                  </div>
                </div>
              </div>
            </Grid>
            <Grid item xs={24} sm={12} lg={24} className={`${styles.col} ${styles.bottom}`}>
              <div className={styles.item}>
                <div>
                  <img src={lowestIcon} alt="lowest icon" />
                  <div className={styles.title}>
                    {selectAnalytic === "epochChart" ? "Lowest stake" : "Lowest number of delegators"}
                  </div>
                  <div className={styles.value}>
                    {loading && <SkeletonUI variant="rectangular" />}
                    {!loading &&
                      (data
                        ? selectAnalytic === "epochChart"
                          ? formatADA(data[selectAnalytic].lowest)
                          : data[selectAnalytic].lowest
                        : 0)}
                  </div>
                </div>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
};

export default DelegationDetailChart;

const Chart = ({ data }: { data: AnalyticsDelegators["epochChart"]["dataByDays"] | [] }) => {
  const [dataChart, setData] = useState<number[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    if (data) {
      setData(data.map(i => i.dataChart));
      setCategories(data.map(i => moment(i.timeChart).format("MMM DD").toString()));
    }
  }, [data]);

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
          angle: 0,
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
            data: dataChart,
          },
        ],
      }}
    />
  );
};

const SkeletonUI = styled(Skeleton)(({ theme }) => ({
  borderRadius: theme.borderRadius,
}));
