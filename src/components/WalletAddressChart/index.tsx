import React, { useEffect, useState } from "react";
import { Box, Button, Grid, Skeleton, styled } from "@mui/material";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";

import Card from "../commons/Card";

import styles from "./index.module.scss";
import highestIcon from "../../commons/resources/images/highestIcon.png";
import lowestIcon from "../../commons/resources/images/lowestIcon.png";
import { formatADA } from "../../commons/utils/helper";
import { BoxInfo, BoxInfoItem, Title, ValueInfo } from "./styles";

interface WalletAddressChartProps {
  data: AnalyticsDelegators["epochChart"] | null;
  setAnalyticTime: (v: string) => void;
  analyticTime: string;
  loading: boolean;
}

const WalletAddressChart: React.FC<WalletAddressChartProps> = ({ data, loading, analyticTime, setAnalyticTime }) => {
  return (
    <Card title="Analytics">
      <Grid container columns={24} className={styles.wrapper}>
        <Grid item xs={24} lg={18}>
          <Grid spacing={2} container className={styles.tab} alignItems="center" justifyContent={"space-between"}>
            <Grid item xs={12} sm={6}>
              <button className={`${styles.button} ${styles.active}`} style={{ marginRight: 5 }}>
                Balance
              </button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <BoxTab>
                <ButtonTab
                  className={`${analyticTime === "ONE_DAY" && styles.activeTab}`}
                  onClick={e => setAnalyticTime("ONE_DAY")}
                >
                  1d
                </ButtonTab>

                <ButtonTab
                  className={`${analyticTime === "THREE_DAY" && styles.activeTab}`}
                  onClick={e => setAnalyticTime("THREE_DAY")}
                >
                  3d
                </ButtonTab>

                <ButtonTab
                  className={`${analyticTime === "ONE_WEEK" && styles.activeTab}`}
                  onClick={e => setAnalyticTime("ONE_WEEK")}
                >
                  1w
                </ButtonTab>

                <ButtonTab
                  className={`${analyticTime === "ONE_MONTH" && styles.activeTab}`}
                  onClick={e => setAnalyticTime("ONE_MONTH")}
                >
                  1m
                </ButtonTab>
              </BoxTab>
            </Grid>
          </Grid>
          <div className={styles.chart}>
            {loading && <SkeletonUI variant="rectangular" style={{ height: "280px" }} />}
            {!loading && <Chart data={data ? data.dataByDays : []} />}
          </div>
        </Grid>
        <Grid item xs={24} lg={6}>
          <BoxInfo>
            <Box flex={1}>
              <BoxInfoItem display={"flex"} alignItems="center" justifyContent={"center"}>
                <Box>
                  <img src={highestIcon} width={"20%"} alt="heighest icon" />
                  <Title>Highest stake</Title>
                  <ValueInfo>
                    {loading && <SkeletonUI variant="rectangular" />}
                    {!loading && data && formatADA(data.highest)}
                  </ValueInfo>
                </Box>
              </BoxInfoItem>
            </Box>
            <Box flex={1}>
              <BoxInfoItem display={"flex"} alignItems="center" justifyContent={"center"}>
                <Box>
                  <img src={lowestIcon} width={"20%"} alt="lowest icon" />
                  <Title>Lowest stake</Title>
                  <ValueInfo>
                    {loading && <SkeletonUI variant="rectangular" />}
                    {!loading && data && formatADA(data.lowest)}
                  </ValueInfo>
                </Box>
              </BoxInfoItem>
            </Box>
          </BoxInfo>
        </Grid>
        {/* <Grid item xs={24} lg={6}>
          <Grid container columns={24} spacing={2} className={styles.right}>
            <Grid item xs={24} sm={12} lg={24} className={`${styles.col} ${styles.top}`}>
              <div className={styles.item}>
                <div>
                  <img src={highestIcon} alt="heighest icon" />
                  <div className={styles.title}>Highest stake</div>
                  <div className={styles.value}>
                    {loading && <SkeletonUI variant="rectangular" />}
                    {!loading && data && formatADA(data.highest)}
                  </div>
                </div>
              </div>
            </Grid>
            <Grid item xs={24} sm={12} lg={24} className={`${styles.col} ${styles.bottom}`}>
              <div className={styles.item}>
                <div>
                  <img src={lowestIcon} alt="lowest icon" />
                  <div className={styles.title}>Lowest stake</div>
                  <div className={styles.value}>
                    {loading && <SkeletonUI variant="rectangular" />}
                    {!loading && data && formatADA(data.lowest)}
                  </div>
                </div>
              </div>
            </Grid>
          </Grid>
        </Grid> */}
      </Grid>
    </Card>
  );
};

export default WalletAddressChart;

const Chart = ({ data }: { data: AnalyticsDelegators["epochChart"]["dataByDays"] | [] }) => {
  const [dataChart, setData] = useState<number[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    if (data) {
      setData(data.map(i => i.ychart));
      setCategories(data.map(i => `${i.xchart}`));
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

const ButtonTab = styled(Button)(({ theme }) => ({
  textTransform: "lowercase",
  borderRadius: theme.borderRadius,
  border: "2px solid rgba(24, 76, 120, 0.2)",
  marginRight: theme.spacing(1),
  color: theme.textColorPale,
  fontWeight: "bold",
}));

const BoxTab = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    textAlign: "end",
    paddingRight: theme.spacing(3),
  },
  [theme.breakpoints.down("md")]: {
    display: "flex",
    justifyContent: "space-between",
  },
}));
