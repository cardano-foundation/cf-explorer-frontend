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
  XAxisProps,
  Label
} from "recharts";
import moment from "moment";
import { useParams } from "react-router-dom";
import { BigNumber } from "bignumber.js";

import useFetch from "src/commons/hooks/useFetch";
import Card from "src/components/commons/Card";
import { formatADAFull, formatPrice } from "src/commons/utils/helper";
import { HighestIcon, LowestIcon } from "src/commons/resources";
import { API } from "src/commons/utils/api";
import { useScreen } from "src/commons/hooks/useScreen";
import { TextCardHighlight } from "src/components/AddressDetail/AddressAnalytics/styles";

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
  CustomButton,
  TooltipBody,
  TooltipValue,
  TooltipLabel
} from "./styles";

type AnalyticsBalance = { date: string; value: number };
type AnalyticsReward = {
  epoch: number;
  value: number;
};

const options = [
  { value: "ONE_DAY", label: "1d" },
  { value: "ONE_WEEK", label: "1w" },
  { value: "ONE_MONTH", label: "1m" },
  { value: "THREE_MONTH", label: "3m" }
];

const StakeAnalytics: React.FC = () => {
  const [rangeTime, setRangeTime] = useState("ONE_DAY");
  const [tab, setTab] = useState<"BALANCE" | "REWARD">("BALANCE");
  const { stakeId } = useParams<{ stakeId: string }>();
  const theme = useTheme();
  const { isMobile } = useScreen();
  const { data, loading } = useFetch<AnalyticsBalance[]>(`${API.STAKE.ANALYTICS_BALANCE}/${stakeId}/${rangeTime}`);
  const { data: dataReward, loading: loadingReward } = useFetch<AnalyticsReward[]>(
    `${API.STAKE.ANALYTICS_REWARD}/${stakeId}`
  );

  const values = data?.map((item) => item.value || 0) || [];
  const maxBalance = BigNumber.max(0, ...values).toString();
  const minBalance = BigNumber.min(maxBalance, ...values).toString();

  const rewards = dataReward?.map((item) => item.value || 0) || [];
  const maxReward = BigNumber.max(0, ...rewards).toString();
  const minReward = BigNumber.min(maxReward, ...rewards).toString();

  const convertDataChart = data?.map((item) => ({
    value: item.value || 0,
    date: item.date
  }));
  const convertRewardChart = dataReward?.map((item) => ({
    value: item.value || 0,
    epoch: item.epoch
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
        <TooltipLabel>{tab === "BALANCE" ? getLabelTimeTooltip(content.label) : `Epoch ${content.label}`}</TooltipLabel>
        <TooltipValue>{formatADAFull(content.payload?.[0]?.value) || 0}</TooltipValue>
      </TooltipBody>
    );
  };

  const xAxisProps: XAxisProps = tab === "BALANCE" ? { tickMargin: 5, dx: -15 } : { tickMargin: 5 };

  return (
    <Card title={<TextCardHighlight>Analytics</TextCardHighlight>}>
      <Wrapper container columns={24} spacing="35px">
        <Grid item xs={24} lg={18}>
          <Grid spacing={2} container alignItems="center" justifyContent={"space-between"}>
            {isMobile ? (
              <Grid item sm={6}>
                <Box>
                  <CustomButton
                    active={tab === "BALANCE" ? 1 : 0}
                    style={{ marginRight: "2px" }}
                    onClick={() => setTab("BALANCE")}
                  >
                    Balance
                  </CustomButton>
                  <CustomButton active={tab === "REWARD" ? 1 : 0} onClick={() => setTab("REWARD")}>
                    Reward
                  </CustomButton>
                </Box>
              </Grid>
            ) : (
              <Grid item sm={6}>
                <ButtonTitle active={tab === "BALANCE"} onClick={() => setTab("BALANCE")}>
                  Balance
                </ButtonTitle>
                <ButtonTitle active={tab === "REWARD"} onClick={() => setTab("REWARD")}>
                  Reward
                </ButtonTitle>
              </Grid>
            )}
            <Grid item sm={6}>
              {tab === "BALANCE" && (
                <Tabs>
                  {options.map(({ value, label }) => (
                    <Tab key={value} active={rangeTime === value ? 1 : 0} onClick={() => setRangeTime(value)}>
                      {label}
                    </Tab>
                  ))}
                </Tabs>
              )}
            </Grid>
          </Grid>
          <ChartBox>
            {loading || loadingReward || !data || !dataReward ? (
              <SkeletonUI variant="rectangular" style={{ height: "400px" }} />
            ) : (
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart
                  width={900}
                  height={400}
                  data={tab === "BALANCE" ? convertDataChart : convertRewardChart}
                  margin={{ top: 5, right: 10, bottom: 14 }}
                >
                  <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={theme.palette.primary.main} stopOpacity={0.2} />
                      <stop offset="100%" stopColor={theme.palette.primary.main} stopOpacity={0.2} />
                    </linearGradient>
                  </defs>
                  <XAxis
                    color={theme.palette.secondary.light}
                    stroke={theme.palette.secondary.light}
                    dataKey={tab === "BALANCE" ? "date" : "epoch"}
                    tickFormatter={(value) =>
                      tab === "BALANCE" ? moment(value).format(rangeTime === "ONE_DAY" ? "HH:mm" : "DD MMM") : value
                    }
                    tickLine={false}
                    {...xAxisProps}
                  >
                    <Label value="(UTC)" offset={-12} position="insideBottom" />
                  </XAxis>
                  <YAxis
                    color={theme.palette.secondary.light}
                    stroke={theme.palette.secondary.light}
                    tickFormatter={formatPriceValue}
                    tickLine={false}
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
                    activeDot={{ r: 6 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </ChartBox>
        </Grid>
        <Grid item xs={24} lg={6}>
          <BoxInfo height={"100%"}>
            <Box flex={1}>
              <BoxInfoItemRight display={"flex"} alignItems="center" justifyContent={"center"}>
                <Box>
                  <img src={HighestIcon} alt="heighest icon" />
                  <Title>{tab === "BALANCE" ? "Highest Balance" : "Highest Reward"}</Title>
                  <ValueInfo>
                    {loading || loadingReward ? (
                      <SkeletonUI variant="rectangular" />
                    ) : (
                      formatADAFull(tab === "BALANCE" ? maxBalance : maxReward)
                    )}
                  </ValueInfo>
                </Box>
              </BoxInfoItemRight>
            </Box>
            <Box flex={1}>
              <BoxInfoItem display={"flex"} alignItems="center" justifyContent={"center"}>
                <Box>
                  <img src={LowestIcon} alt="lowest icon" />
                  <Title>{tab === "BALANCE" ? "Lowest Balance" : "Lowest Reward"}</Title>
                  <ValueInfo>
                    {loading || loadingReward ? (
                      <SkeletonUI variant="rectangular" />
                    ) : (
                      formatADAFull(tab === "BALANCE" ? minBalance : minReward)
                    )}
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

export default StakeAnalytics;
