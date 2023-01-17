import React, { useState } from "react";
import { Grid, Skeleton, styled, Box } from "@mui/material";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import { formatADA } from "../../../commons/utils/helper";
import { HighestIcon, LowestIcon } from "../../../commons/resources";
import useFetch from "../../../commons/hooks/useFetch";
import {
  AnalyticsTitle,
  Button,
  ChartContainer,
  GridRight,
  GridWrapper,
  Item,
  StyledContainer,
  Title,
  Value,
} from "./styles";

interface DelegationDetailChartProps {
  poolId: string;
}

const DelegationDetailChart: React.FC<DelegationDetailChartProps> = ({ poolId }) => {
  const [selected, setSelected] = useState<"epochChart" | "delegatorChart">("epochChart");
  const { data, loading } = useFetch<AnalyticsDelegators>(`/delegation/pool-detail-analytics?poolView=${poolId}`);

  const categories = data?.[selected]?.dataByDays?.map(item => item.epochNo) || null;
  const epochs = data?.epochChart?.dataByDays?.map(item => item.totalStake / 10 ** 6) || null;
  const delegators = data?.delegatorChart?.dataByDays?.map(item => item.numberDelegator) || null;
  return (
    <StyledContainer>
      <AnalyticsTitle>Analytics</AnalyticsTitle>
      <GridWrapper container columns={12} spacing={3}>
        <Grid item xs={12} lg={9}>
          <Box marginBottom={10}>
            <Button
              active={selected === "epochChart" ? 1 : 0}
              style={{ marginRight: "2px" }}
              onClick={() => setSelected("epochChart")}
            >
              Stake
            </Button>
            <Button active={selected === "delegatorChart" ? 1 : 0} onClick={() => setSelected("delegatorChart")}>
              Delegator
            </Button>
          </Box>
          <ChartContainer>
            {loading ? (
              <SkeletonUI variant="rectangular" height={280} />
            ) : (
              <HighchartsReact
                highcharts={Highcharts}
                options={{
                  chart: { type: "areaspline", backgroundColor: "transparent" },
                  title: { text: "" },
                  yAxis: {
                    title: { text: null },
                    lineWidth: 2,
                    lineColor: "#E3E5E9",
                    gridLineWidth: 1,
                  },
                  xAxis: {
                    categories,
                    lineWidth: 2,
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
                      lineWidth: 4,
                      color: "#438f68",
                      fillColor: {
                        linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
                        stops: [
                          [0, "#438f6833"],
                          [1, "rgba(67, 143, 104, 0)"],
                        ],
                      },
                      data: selected === "epochChart" ? epochs : delegators,
                    },
                  ],
                }}
              />
            )}
          </ChartContainer>
        </Grid>
        <Grid item xs={12} lg={3} display="flex" flexDirection="column">
          <GridRight container columns={12}>
            <Item item xs={12} sm={6} lg={12}>
              <img src={HighestIcon} alt="heighest icon" />
              <Title>{selected === "epochChart" ? "Highest stake" : "Highest number of delegators"}</Title>
              <Value>
                {loading || !data?.[selected] ? (
                  <SkeletonUI variant="rectangular" />
                ) : selected === "epochChart" ? (
                  formatADA(data[selected].highest)
                ) : (
                  data[selected].highest
                )}
              </Value>
            </Item>
            <Item item xs={12} sm={6} lg={12}>
              <img src={LowestIcon} alt="lowest icon" />
              <Title>{selected === "epochChart" ? "Lowest stake" : "Lowest number of delegators"}</Title>
              <Value>
                {loading || !data ? (
                  <SkeletonUI variant="rectangular" />
                ) : selected === "epochChart" ? (
                  formatADA(data[selected].lowest)
                ) : (
                  data[selected].lowest
                )}
              </Value>
            </Item>
          </GridRight>
        </Grid>
      </GridWrapper>
    </StyledContainer>
  );
};

export default DelegationDetailChart;

const SkeletonUI = styled(Skeleton)(({ theme }) => ({
  borderRadius: theme.borderRadius,
}));
