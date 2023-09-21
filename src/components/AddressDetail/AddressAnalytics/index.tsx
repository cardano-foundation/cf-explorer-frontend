import React, { useState } from "react";
import { Box, Grid, useTheme } from "@mui/material";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  TooltipProps,
  Label
} from "recharts";
import moment from "moment";
import { useParams } from "react-router-dom";
import { BigNumber } from "bignumber.js";
import { isArray } from "lodash";
import { useTranslation } from "react-i18next";

import useFetch from "src/commons/hooks/useFetch";
import Card from "src/components/commons/Card";
import { formatADAFull, formatPrice } from "src/commons/utils/helper";
import { HighestIconComponent, LowestIconComponent } from "src/commons/resources";
import { API } from "src/commons/utils/api";
import CustomIcon from "src/components/commons/CustomIcon";

import {
  BoxInfo,
  BoxInfoItem,
  BoxInfoItemRight,
  Tabs,
  Tab,
  ButtonTitle,
  ChartBox,
  SkeletonUI,
  Title,
  ValueInfo,
  Wrapper,
  TextCardHighlight,
  TooltipBody,
  TooltipLabel,
  TooltipValue
} from "./styles";

type AnalyticsData = { date: string; value: number };

const options = [
  { value: "ONE_DAY", label: "1d" },
  { value: "ONE_WEEK", label: "1w" },
  { value: "ONE_MONTH", label: "1m" },
  { value: "THREE_MONTH", label: "3m" }
];

const AddressAnalytics: React.FC = () => {
  const { t } = useTranslation();
  const [rangeTime, setRangeTime] = useState("ONE_DAY");
  const { address } = useParams<{ address: string }>();
  const theme = useTheme();
  const { data: dataAnalytics, loading } = useFetch<AnalyticsData[]>(
    `${API.ADDRESS.ANALYTICS}/${address}/${rangeTime}`
  );
  const data = isArray(dataAnalytics) ? dataAnalytics : [];
  const values = data?.map((item) => item.value || 0) || [];
  const maxBalance = BigNumber.max(0, ...values).toString();
  const minBalance = BigNumber.min(maxBalance, ...values).toString();

  const convertDataChart = data?.map((item) => ({
    value: item.value || 0,
    date: item.date
  }));
  const formatPriceValue = (value: string) => {
    const bigValue = BigNumber(value).div(10 ** 6);
    return formatPrice(bigValue.toString());
  };

  const getLabelTimeTooltip = (label: string) => {
    switch (rangeTime) {
      case "ONE_DAY":
        return `${moment(label).format("DD MMM YYYY HH:mm:ss")}`;
      case "ONE_WEEK":
      case "ONE_MONTH":
      case "THREE_MONTH":
        return moment(label).format("DD MMM YYYY");
      default:
        return "";
    }
  };

  const renderTooltip: TooltipProps<number, number>["content"] = (content) => {
    return (
      <TooltipBody>
        <TooltipLabel>{getLabelTimeTooltip(content.label)}</TooltipLabel>
        <TooltipValue>{formatADAFull(content.payload?.[0]?.value) || 0}</TooltipValue>
      </TooltipBody>
    );
  };

  return (
    <Card title={<TextCardHighlight>Analytics</TextCardHighlight>}>
      <Wrapper container columns={24} spacing="35px">
        <Grid item xs={24} lg={18}>
          <Grid spacing={2} container alignItems="center" justifyContent={"space-between"}>
            <Grid item xs={4} sm={6}>
              <ButtonTitle>{t("common.balance")}</ButtonTitle>
            </Grid>
            <Grid item xs={8} sm={6}>
              <Tabs>
                {options.map(({ value, label }) => (
                  <Tab key={value} active={rangeTime === value ? 1 : 0} onClick={() => setRangeTime(value)}>
                    {label}
                  </Tab>
                ))}
              </Tabs>
            </Grid>
          </Grid>
          <ChartBox>
            {loading || !data ? (
              <SkeletonUI variant="rectangular" style={{ height: "400px" }} />
            ) : (
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart width={900} height={400} data={convertDataChart} margin={{ top: 5, right: 5, bottom: 14 }}>
                  <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={theme.palette.primary.main} stopOpacity={0.2} />
                      <stop offset="100%" stopColor={theme.palette.primary.main} stopOpacity={0.2} />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="date"
                    tickFormatter={(value) => moment(value).format(rangeTime === "ONE_DAY" ? "HH:mm" : "DD MMM")}
                    tick={{
                      fill: theme.mode === "light" ? theme.palette.secondary.light : theme.palette.secondary[800]
                    }}
                    tickLine={{
                      stroke: theme.mode === "light" ? theme.palette.secondary.light : theme.palette.secondary[800]
                    }}
                    tickMargin={5}
                    color={theme.palette.secondary.light}
                    stroke={theme.palette.secondary.light}
                    dx={-15}
                  >
                    <Label value="(UTC)" offset={-12} position="insideBottom" />
                  </XAxis>
                  <YAxis
                    tickFormatter={formatPriceValue}
                    tick={{
                      fill: theme.mode === "light" ? theme.palette.secondary.light : theme.palette.secondary[800]
                    }}
                    tickLine={{
                      stroke: theme.mode === "light" ? theme.palette.secondary.light : theme.palette.secondary[800]
                    }}
                    color={theme.palette.secondary.light}
                    stroke={theme.palette.secondary.light}
                  />
                  <Tooltip content={renderTooltip} cursor={false} />
                  <CartesianGrid vertical={false} strokeWidth={0.33} />
                  <Area
                    stackId="1"
                    type="monotone"
                    dataKey="value"
                    stroke={theme.palette.primary.main}
                    strokeWidth={4}
                    fill="url(#colorUv)"
                    dot={{ r: 2 }}
                    activeDot={{ r: 6 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </ChartBox>
        </Grid>
        <Grid item xs={24} lg={6}>
          <BoxInfo height={"100%"} space={data?.length ? 36 : 16}>
            <Box flex={1}>
              <BoxInfoItemRight display={"flex"} justifyContent={"center"}>
                <Box>
                  <Box minHeight={"90px"}>
                    <CustomIcon height={30} fill={theme.palette.secondary.light} icon={HighestIconComponent} />
                    <Title>{t("common.highestBalance")}</Title>
                  </Box>
                  <ValueInfo>{loading ? <SkeletonUI variant="rectangular" /> : formatADAFull(maxBalance)}</ValueInfo>
                </Box>
              </BoxInfoItemRight>
            </Box>
            <Box flex={1}>
              <BoxInfoItem display={"flex"} justifyContent={"center"}>
                <Box>
                  <Box minHeight={"90px"}>
                    <CustomIcon height={30} fill={theme.palette.secondary.light} icon={LowestIconComponent} />
                    <Title>{t("common.lowestBalance")}</Title>
                  </Box>
                  <ValueInfo>{loading ? <SkeletonUI variant="rectangular" /> : formatADAFull(minBalance)}</ValueInfo>
                </Box>
              </BoxInfoItem>
            </Box>
          </BoxInfo>
        </Grid>
      </Wrapper>
    </Card>
  );
};

export default AddressAnalytics;
