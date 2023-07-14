import React, { useRef, useState } from "react";
import { Grid, Skeleton, styled, Box, useTheme } from "@mui/material";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";

import { formatADAFull, formatPrice, numberWithCommas } from "src/commons/utils/helper";
import useResizeHighChart from "src/commons/hooks/useResizeHighChart";
import { HighestIcon, LowestIcon } from "src/commons/resources";
import useFetch from "src/commons/hooks/useFetch";
import { API } from "src/commons/utils/api";

import {
  AnalyticsTitle,
  BoxInfo,
  BoxInfoItem,
  BoxInfoItemRight,
  Button,
  ChartContainer,
  GridWrapper,
  StyledContainer,
  Title,
  Value
} from "./styles";

interface DelegationDetailChartProps {
  poolId: string;
}

const DelegationDetailChart: React.FC<DelegationDetailChartProps> = ({ poolId }) => {
  const [selected, setSelected] = useState<"epochChart" | "delegatorChart">("epochChart");
  const { data, loading } = useFetch<AnalyticsDelegators>(`${API.DELEGATION.POOL_ANALYTICS}?poolView=${poolId}`);
  const theme = useTheme();
  const wrapperChartRef = useRef<HTMLDivElement>(null);
  useResizeHighChart(wrapperChartRef);
  const categories = data?.[selected]?.dataByDays?.map((item) => item.epochNo) || [];
  const epochs = data?.epochChart?.dataByDays?.map((item) => item.totalStake / 10 ** 6 || 0) || [];
  const delegators = data?.delegatorChart?.dataByDays?.map((item) => item.numberDelegator || 0) || [];
  return (
    <StyledContainer>
      <AnalyticsTitle>Analytics</AnalyticsTitle>
      <GridWrapper container columns={24} spacing="35px">
        <Grid item xs={24} lg={18}>
          <Box>
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
          <ChartContainer ref={wrapperChartRef}>
            {loading ? (
              <SkeletonUI variant="rectangular" height={280} />
            ) : (
              <Box position={"relative"}>
                <HighchartsReact
                  key={selected}
                  highcharts={Highcharts}
                  options={{
                    chart: {
                      type: "areaspline",
                      backgroundColor: "transparent",
                      style: { fontFamily: "Roboto, sans-serif" }
                    },
                    title: { text: "" },
                    yAxis: {
                      title: { text: null },
                      lineWidth: 2,
                      lineColor: theme.palette.border.main,
                      className: "y-axis-lable",
                      gridLineWidth: 1,
                      labels: {
                        style: { fontSize: 12 },
                        formatter: (e: { value: string }) => {
                          return formatPrice(e.value || 0);
                        }
                      }
                    },
                    xAxis: {
                      categories,
                      lineWidth: 2,
                      lineColor: theme.palette.border.main,
                      plotLines: [],
                      angle: 0
                    },
                    legend: { enabled: false },
                    tooltip: {
                      shared: true,
                      formatter: function(this: Highcharts.TooltipFormatterContextObject) {
                        return '<span>' + this.x + '</span><br><strong>' + numberWithCommas(this.y || 0) + "</strong>";
                      }
                    },
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
                            [1, "transparent"]
                          ]
                        },
                        data: selected === "epochChart" ? epochs : delegators
                      }
                    ]
                  }}
                />{" "}
              </Box>
            )}
          </ChartContainer>
        </Grid>
        <Grid item xs={24} lg={6}>
          <BoxInfo height={"100%"} space={categories.length ? 36 : 16}>
            <Box flex={1}>
              <BoxInfoItemRight display={"flex"} alignItems="center" justifyContent={"center"}>
                <Box>
                  <img src={HighestIcon} alt="heighest icon" />
                  <Title>{selected === "epochChart" ? "Highest stake" : "Highest number of delegators"}</Title>
                  <Value>
                    {loading || !data?.[selected] ? (
                      <SkeletonUI variant="rectangular" />
                    ) : selected === "epochChart" ? (
                      formatADAFull(data[selected].highest)
                    ) : (
                      data[selected].highest
                    )}
                  </Value>
                </Box>
              </BoxInfoItemRight>
            </Box>
            <Box flex={1}>
              <BoxInfoItem display={"flex"} alignItems="center" justifyContent={"center"}>
                <Box>
                  <img src={LowestIcon} alt="lowest icon" />
                  <Title>{selected === "epochChart" ? "Lowest stake" : "Lowest number of delegators"}</Title>
                  <Value>
                    {loading || !data ? (
                      <SkeletonUI variant="rectangular" />
                    ) : selected === "epochChart" ? (
                      formatADAFull(data[selected].lowest)
                    ) : (
                      data[selected].lowest
                    )}
                  </Value>
                </Box>
              </BoxInfoItem>
            </Box>
          </BoxInfo>
        </Grid>
      </GridWrapper>
    </StyledContainer>
  );
};

export default DelegationDetailChart;

const SkeletonUI = styled(Skeleton)(() => ({
  borderRadius: 10
}));
