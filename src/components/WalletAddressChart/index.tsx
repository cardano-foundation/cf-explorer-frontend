import React, { useEffect, useState } from "react";
import { Box, Button, Grid, Skeleton, styled } from "@mui/material";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";

import Card from "../commons/Card";

import styles from "./index.module.scss";
import highestIcon from "../../commons/resources/images/highestIcon.png";
import lowestIcon from "../../commons/resources/images/lowestIcon.png";
import { formatADA, formatPrice } from "../../commons/utils/helper";
import {
  BoxInfo,
  BoxInfoItem,
  BoxInfoItemRight,
  BoxTab,
  ButtonTab,
  ButtonTabActive,
  ButtonTitle,
  ChartBox,
  SkeletonUI,
  Title,
  ValueInfo,
  Wrapper,
} from "./styles";
import moment from "moment";

interface WalletAddressChartProps {
  data:
    | {
        date: string;
        value: number;
      }[]
    | null;
  setAnalyticTime: (v: string) => void;
  analyticTime: string;
  loading: boolean;
  maxBalance: number | null;
  minBalance: number | null;
  maxBalanceLoading: boolean;
  minBalanceLoading: boolean;
}

const WalletAddressChart: React.FC<WalletAddressChartProps> = ({
  data,
  loading,
  analyticTime,
  setAnalyticTime,
  maxBalance,
  maxBalanceLoading,
  minBalance,
  minBalanceLoading,
}) => {
  return (
    <Card title="Analytics">
      <Wrapper container columns={24}>
        <Grid item xs={24} lg={18}>
          <Grid spacing={2} container alignItems="center" justifyContent={"space-between"}>
            <Grid item xs={12} sm={6}>
              <ButtonTitle className={styles.ffTitle}>Balance</ButtonTitle>
            </Grid>
            <Grid item xs={12} sm={6}>
              <BoxTab>
                <ButtonTab
                  className={`${styles.ffText} `}
                  as={analyticTime === "ONE_DAY" ? ButtonTabActive : ButtonTab}
                  onClick={() => setAnalyticTime("ONE_DAY")}
                >
                  1d
                </ButtonTab>

                <ButtonTab
                  as={analyticTime === "ONE_WEEK" ? ButtonTabActive : ButtonTab}
                  className={`${styles.ffText}`}
                  onClick={() => setAnalyticTime("ONE_WEEK")}
                >
                  1w
                </ButtonTab>

                <ButtonTab
                  className={`${styles.ffText}`}
                  as={analyticTime === "ONE_MONTH" ? ButtonTabActive : ButtonTab}
                  onClick={() => setAnalyticTime("ONE_MONTH")}
                >
                  1m
                </ButtonTab>
                <ButtonTab
                  as={analyticTime === "THREE_MONTH" ? ButtonTabActive : ButtonTab}
                  className={`${styles.ffText}`}
                  onClick={() => setAnalyticTime("THREE_MONTH")}
                >
                  3m
                </ButtonTab>
              </BoxTab>
            </Grid>
          </Grid>
          <ChartBox>
            {loading && <SkeletonUI variant="rectangular" style={{ height: "400px" }} />}
            {!loading && <Chart data={data} />}
          </ChartBox>
        </Grid>
        <Grid item xs={24} lg={6}>
          <BoxInfo>
            <Box flex={1}>
              <BoxInfoItemRight display={"flex"} alignItems="center" justifyContent={"center"}>
                <Box>
                  <img src={highestIcon} width={"20%"} alt="heighest icon" />
                  <Title>Highest Balance</Title>
                  <ValueInfo>
                    {maxBalanceLoading && <SkeletonUI variant="rectangular" />}
                    {!maxBalanceLoading && formatADA(maxBalance || 0)}
                  </ValueInfo>
                </Box>
              </BoxInfoItemRight>
            </Box>
            <Box flex={1}>
              <BoxInfoItem display={"flex"} alignItems="center" justifyContent={"center"}>
                <Box>
                  <img src={lowestIcon} width={"20%"} alt="lowest icon" />
                  <Title>Lowest Balance</Title>
                  <ValueInfo>
                    {minBalanceLoading && <SkeletonUI variant="rectangular" />}
                    {!minBalanceLoading && formatADA(minBalance || 0)}
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

export default WalletAddressChart;

const Chart = ({ data }: { data: WalletAddressChartProps["data"] }) => {
  const [dataChart, setData] = useState<number[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  useEffect(() => {
    if (data) {
      setData(data.map(i => i.value));
      setCategories(data.map(i => moment(i.date).format("DD MMM")));
    }
  }, [data]);

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={{
        chart: {
          type: "areaspline",
          style: {
            fontFamily: "Helvetica, monospace",
          },
        },
        title: { text: "" },
        yAxis: {
          title: { text: null },
          lineWidth: 1,
          lineColor: "#E3E5E9",
          gridLineWidth: 0,
          labels: {
            style: {
              fontSize: 12,
            },
            formatter: (e: { value: string }) => {
              return formatPrice(e.value || 0);
            },
          },
        },
        xAxis: {
          categories,
          lineWidth: 1,
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
