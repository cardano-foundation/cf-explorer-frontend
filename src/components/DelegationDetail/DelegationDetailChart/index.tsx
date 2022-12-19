import React, { useEffect, useState } from "react";
import { Grid, Skeleton, styled } from "@mui/material";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";

import styles from "./index.module.scss";
import { formatADA } from "../../../commons/utils/helper";
import { Button, ChartContainer, GridRight, GridWrapper, Item, StyledContainer, Title, Value } from "./styles";
import { HighestIcon, LowestIcon } from "../../../commons/resources";

interface DelegationDetailChartProps {
  data: AnalyticsDelegators | null;
  loading: boolean;
}

const DelegationDetailChart: React.FC<DelegationDetailChartProps> = ({ data, loading }) => {
  const [selectAnalytic, setSelectAnalytic] = useState<"epochChart" | "delegatorChart">("epochChart");
  return (
    <StyledContainer>
      <h2 style={{ margin: "50px 0  15px" }}>Analytics</h2>
      <GridWrapper container columns={24}>
        <Grid item xs={24} lg={18}>
          <div style={{ marginBottom: 10 }}>
            <Button
              active={selectAnalytic === "epochChart" ? 1 : 0}
              style={{ marginRight: 5 }}
              onClick={() => setSelectAnalytic("epochChart")}
            >
              Stake
            </Button>
            <Button
              active={selectAnalytic === "delegatorChart" ? 1 : 0}
              onClick={() => setSelectAnalytic("delegatorChart")}
            >
              Delegator
            </Button>
          </div>
          <ChartContainer>
            {loading && <SkeletonUI variant="rectangular" style={{ height: "280px" }} />}
            {!loading && <Chart data={data ? data[selectAnalytic].dataByDays : []} />}
          </ChartContainer>
        </Grid>
        <Grid item xs={24} lg={6}>
          <GridRight container columns={24}>
            <Grid item xs={24} sm={12} lg={24}>
              <Item style={{ borderRadius: "12px 12px 0 0" }}>
                <img src={HighestIcon} alt="heighest icon" />
                <Title>{selectAnalytic === "epochChart" ? "Highest stake" : "Highest number of delegators"}</Title>
                <Value>
                  {loading && <SkeletonUI variant="rectangular" />}
                  {!loading &&
                    (data
                      ? selectAnalytic === "epochChart"
                        ? formatADA(data[selectAnalytic].highest)
                        : data[selectAnalytic].highest
                      : 0)}
                </Value>
              </Item>
            </Grid>
            <Grid item xs={24} sm={12} lg={24} className={`${styles.col} ${styles.bottom}`}>
              <Item style={{ borderRadius: "0 0 12px 12px" }}>
                <img src={LowestIcon} alt="lowest icon" />
                <Title>{selectAnalytic === "epochChart" ? "Lowest stake" : "Lowest number of delegators"}</Title>
                <Value>
                  {loading && <SkeletonUI variant="rectangular" />}
                  {!loading &&
                    (data
                      ? selectAnalytic === "epochChart"
                        ? formatADA(data[selectAnalytic].lowest)
                        : data[selectAnalytic].lowest
                      : 0)}
                </Value>
              </Item>
            </Grid>
          </GridRight>
        </Grid>
      </GridWrapper>
    </StyledContainer>
  );
};

export default DelegationDetailChart;

const Chart = ({ data }: { data: AnalyticsDelegators["epochChart"]["dataByDays"] | [] }) => {
  const [dataChart, setData] = useState<number[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    if (data) {
      setData(data.map(i => i.ychart));
      setCategories(data.map(i => i.xchart));
    }
  }, [data]);

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={{
        chart: { type: "areaspline", backgroundColor: "transparent" },
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
