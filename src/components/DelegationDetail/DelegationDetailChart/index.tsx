import { Box, Grid, styled, useTheme } from "@mui/material";
import BigNumber from "bignumber.js";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, TooltipProps, XAxis, YAxis } from "recharts";

import useFetch from "src/commons/hooks/useFetch";
import { HighestIconComponent, LowestIconComponent } from "src/commons/resources";
import { API } from "src/commons/utils/api";
import { formatADAFull, formatPrice, numberWithCommas } from "src/commons/utils/helper";
import CustomIcon from "src/components/commons/CustomIcon";
import { CommonSkeleton } from "src/components/commons/CustomSkeleton";
import { TooltipBody } from "src/components/commons/Layout/styles";
import NotAvailable from "src/components/commons/NotAvailable";

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
  TooltipLabel,
  TooltipValue,
  Value
} from "./styles";

interface DelegationDetailChartProps {
  poolId: string;
}

const DelegationDetailChart: React.FC<DelegationDetailChartProps> = ({ poolId }) => {
  const { t } = useTranslation();
  const [selected, setSelected] = useState<"epochChart" | "delegatorChart">("epochChart");
  const blockKey = useSelector(({ system }: RootState) => system.blockKey);
  const { data, loading } = useFetch<AnalyticsDelegators>(
    `${API.DELEGATION.POOL_ANALYTICS}?poolView=${poolId}`,
    undefined,
    false,
    blockKey
  );
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
      <TooltipBody fontSize={12}>
        <TooltipLabel>
          {t("epoch")} {content.label}
        </TooltipLabel>
        <TooltipValue>
          {selected === "delegatorChart"
            ? content.payload?.[0]?.value || 0
            : formatADAFull(content.payload?.[0]?.value) || 0}
        </TooltipValue>
      </TooltipBody>
    );
  };

  const renderData = () => {
    if (loading) {
      return <SkeletonUI variant="rectangular" style={{ height: "400px" }} />;
    }
    if (!loading && data?.delegatorChart === null) {
      return (
        <Box style={{ height: "400px" }}>
          <NotAvailable />
        </Box>
      );
    }
    if ((!loading && data?.epochChart === null) || data === null) {
      return (
        <Box style={{ height: "400px" }}>
          <NotAvailable />
        </Box>
      );
    }
    return (
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart
          width={900}
          height={400}
          data={data?.[selected]?.dataByDays || []}
          margin={{ top: 5, right: 10, bottom: 10 }}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={theme.palette.primary.main} stopOpacity={theme.isDark ? 0.6 : 0.2} />
              <stop offset="100%" stopColor={theme.palette.primary.main} stopOpacity={theme.isDark ? 0.6 : 0.2} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="epochNo"
            tickMargin={5}
            dx={-5}
            tick={{
              fill: theme.mode === "light" ? theme.palette.secondary.light : theme.palette.secondary[800]
            }}
            tickLine={{
              stroke: theme.mode === "light" ? theme.palette.secondary.light : theme.palette.secondary[800]
            }}
            color={theme.palette.secondary.light}
          />
          <YAxis
            dataKey={selected === "epochChart" ? "totalStake" : "numberDelegator"}
            color={theme.palette.secondary.light}
            tickFormatter={formatValue}
            tick={{
              fill: theme.mode === "light" ? theme.palette.secondary.light : theme.palette.secondary[800]
            }}
            tickLine={{
              stroke: theme.mode === "light" ? theme.palette.secondary.light : theme.palette.secondary[800]
            }}
          />
          <Tooltip content={renderTooltip} cursor={false} />
          <CartesianGrid vertical={false} strokeWidth={0.33} />
          <Area
            stackId="1"
            type="monotone"
            dataKey={selected === "epochChart" ? "totalStake" : "numberDelegator"}
            stroke={theme.palette.primary.main}
            strokeWidth={4}
            fill="url(#colorUv)"
            activeDot={{ r: 6 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    );
  };

  return (
    <StyledContainer>
      <AnalyticsTitle data-testid="delegatorChart.analytics">{t("common.analytics")}</AnalyticsTitle>
      <GridWrapper container columns={24} spacing="35px">
        <Grid item xs={24} lg={18}>
          <Box>
            <Box
              data-testid="delegatorChart.stake"
              component={Button}
              mr={1}
              active={selected === "epochChart" ? 1 : 0}
              onClick={() => setSelected("epochChart")}
            >
              {t("stake")}
            </Box>
            <Button
              data-testid="delegatorChart.delegator"
              active={selected === "delegatorChart" ? 1 : 0}
              onClick={() => setSelected("delegatorChart")}
            >
              {t("delegator")}
            </Button>
          </Box>
          <ChartContainer data-testid="delegatorChart.areaChart">{renderData()}</ChartContainer>
        </Grid>
        <Grid item xs={24} lg={6}>
          <BoxInfo height={"100%"} space={data?.[selected]?.dataByDays?.length ? 36 : 16}>
            <Box flex={1}>
              <BoxInfoItemRight display={"flex"} alignItems="center" justifyContent={"center"}>
                <Box>
                  <CustomIcon height={30} fill={theme.palette.secondary.light} icon={HighestIconComponent} />
                  <Title data-testid="delegatorChart.highestTitle">
                    {selected === "epochChart" ? t("highestStake") : t("highestNumberOfDelegators")}
                  </Title>
                  <Value data-testid="delegatorChart.highestValue">
                    {loading ? (
                      <SkeletonUI variant="rectangular" />
                    ) : !data?.[selected] ? (
                      t("common.N/A")
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
                  <CustomIcon height={30} fill={theme.palette.secondary.light} icon={LowestIconComponent} />
                  <Title data-testid="delegatorChart.lowestTitle">
                    {selected === "epochChart" ? t("lowestStake") : t("lowestNumberOfDelegators")}
                  </Title>
                  <Value data-testid="delegatorChart.lowestValue">
                    {loading ? (
                      <SkeletonUI variant="rectangular" />
                    ) : !data?.[selected] ? (
                      t("common.N/A")
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

const SkeletonUI = styled(CommonSkeleton)(() => ({
  borderRadius: 10
}));
