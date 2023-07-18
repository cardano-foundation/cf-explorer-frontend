import React, { useState } from "react";
import { Grid, Skeleton, styled, Box, useTheme } from "@mui/material";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, TooltipProps, XAxis, YAxis } from "recharts";
import BigNumber from "bignumber.js";

import { formatADAFull, formatPrice, numberWithCommas } from "src/commons/utils/helper";
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
  TooltipBody,
  TooltipLabel,
  TooltipValue,
  Value
} from "./styles";

interface DelegationDetailChartProps {
  poolId: string;
}

const DelegationDetailChart: React.FC<DelegationDetailChartProps> = ({ poolId }) => {
  const [selected, setSelected] = useState<"epochChart" | "delegatorChart">("epochChart");
  const { data, loading } = useFetch<AnalyticsDelegators>(`${API.DELEGATION.POOL_ANALYTICS}?poolView=${poolId}`);
  const theme = useTheme();
  const totalStakes =
    data?.epochChart?.dataByDays?.map((item) => item.totalStake).filter((item) => item !== null) || [];
  const maxTotalStake = BigNumber.max(0, ...totalStakes).toString();
  const minTotalStake = BigNumber.min(maxTotalStake, ...totalStakes).toString();

  const numberDelegators =
    data?.delegatorChart?.dataByDays?.map((item) => item.numberDelegator).filter((item) => item !== null) || [];
  const maxNumberDelegation = BigNumber.max(0, ...numberDelegators).toString();
  const minNumberDelegation = BigNumber.min(maxNumberDelegation, ...numberDelegators).toString();

  const formatValue = (value: string) => {
    if (selected === "delegatorChart") return numberWithCommas(value);
    const bigValue = BigNumber(value).div(10 ** 6);
    return formatPrice(bigValue.toString());
  };

  const renderTooltip: TooltipProps<number, number>["content"] = (content) => {
    return (
      <TooltipBody>
        <TooltipLabel>{content.label}</TooltipLabel>
        <TooltipValue>
          {selected === "delegatorChart"
            ? content.payload?.[0]?.value || 0
            : formatADAFull(content.payload?.[0]?.value) || 0}
        </TooltipValue>
      </TooltipBody>
    );
  };

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
          <ChartContainer>
            {loading || !data ? (
              <SkeletonUI variant="rectangular" style={{ height: "400px" }} />
            ) : (
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart
                  width={900}
                  height={400}
                  data={data[selected]?.dataByDays || []}
                  margin={{ top: 5, right: 10, bottom: 10 }}
                >
                  <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={theme.palette.green[700]} stopOpacity={0.2} />
                      <stop offset="100%" stopColor={theme.palette.green[700]} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="epochNo"
                    tickLine={false}
                    tickMargin={5}
                    dx={-5}
                    // interval={isMobile ? 3 : undefined}
                  />
                  <YAxis
                    dataKey={selected === "epochChart" ? "totalStake" : "numberDelegator"}
                    tickFormatter={formatValue}
                    tickLine={false}
                  />
                  <Tooltip content={renderTooltip} cursor={false} />
                  <CartesianGrid vertical={false} strokeWidth={0.33} />
                  <Area
                    stackId="1"
                    type="monotone"
                    dataKey={selected === "epochChart" ? "totalStake" : "numberDelegator"}
                    stroke={theme.palette.green[700]}
                    strokeWidth={4}
                    fill="url(#colorUv)"
                    activeDot={{ r: 6 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </ChartContainer>
        </Grid>
        <Grid item xs={24} lg={6}>
          <BoxInfo height={"100%"} space={data?.[selected]?.dataByDays?.length ? 36 : 16}>
            <Box flex={1}>
              <BoxInfoItemRight display={"flex"} alignItems="center" justifyContent={"center"}>
                <Box>
                  <img src={HighestIcon} alt="heighest icon" />
                  <Title>{selected === "epochChart" ? "Highest stake" : "Highest number of delegators"}</Title>
                  <Value>
                    {loading || !data?.[selected] ? (
                      <SkeletonUI variant="rectangular" />
                    ) : selected === "epochChart" ? (
                      formatADAFull(maxTotalStake)
                    ) : (
                      maxNumberDelegation
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
                    {loading || !data?.[selected] ? (
                      <SkeletonUI variant="rectangular" />
                    ) : selected === "epochChart" ? (
                      formatADAFull(minTotalStake)
                    ) : (
                      minNumberDelegation
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
