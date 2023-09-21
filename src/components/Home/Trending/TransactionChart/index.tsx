import React, { useState } from "react";
import moment from "moment";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Box, Grid, alpha, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import useFetch from "src/commons/hooks/useFetch";
import { API } from "src/commons/utils/api";
import { numberWithCommas } from "src/commons/utils/helper";
import { useScreen } from "src/commons/hooks/useScreen";

import {
  BoxInfo,
  ColorChart,
  InfoItem,
  Skeleton,
  StyledTransactionTypeItem,
  StyledTransactionTypes,
  Tab,
  Tabs,
  Title,
  TransactionContainer,
  ValueChart
} from "./styles";

export interface TransactionChartIF {
  date: string;
  simpleTransactions: number;
  smartContract: number;
  metadata: number;
}

type Time = "ONE_DAY" | "ONE_WEEK" | "TWO_WEEK" | "ONE_MONTH";
export type TypeChart = "trx" | "simple" | "complex";

const TransactionChart: React.FC = () => {
  const { t } = useTranslation();
  const [rangeTime, setRangeTime] = useState<Time>("ONE_DAY");
  const blockKey = useSelector(({ system }: RootState) => system.blockKey);
  const { isMobile } = useScreen();
  const optionsTime: Record<Time, { label: string; displayName: string }> = {
    ONE_DAY: {
      label: t("time.24h"),
      displayName: t("option.tx.in24h")
    },
    ONE_WEEK: {
      label: t("time.1w"),
      displayName: t("option.tx.aWeek")
    },
    TWO_WEEK: {
      label: t("time.2w"),
      displayName: t("option.tx.twoWeeks")
    },
    ONE_MONTH: {
      label: t("time.1m"),
      displayName: t("option.tx.aMonth")
    }
  };

  const { data, loading } = useFetch<TransactionChartIF[]>(
    `${API.TRANSACTION.GRAPH}/${rangeTime}`,
    undefined,
    false,
    blockKey
  );

  const sumSimple = (data || []).reduce((prev, item) => prev + item.simpleTransactions, 0);
  const sumMetadata = (data || []).reduce((prev, item) => prev + item.metadata, 0);
  const sumSmartContract = (data || []).reduce((prev, item) => prev + item.smartContract, 0);

  const dataOverview = [
    {
      key: "trx",
      title: (
        <Box textAlign={"left"}>
          {t("glossary.metadata")} <Box fontSize={"0.6875rem"}>({t("glossary.withoutSC")})</Box>
        </Box>
      ),
      value: sumMetadata || 0
    },
    {
      key: "simple",
      title: <Box textAlign={"left"}>{t("glossary.smartContracts")}</Box>,
      value: sumSmartContract || 0
    },
    { key: "complex", title: t("glossary.simpleTxs"), value: sumSimple || 0 }
  ];

  const renderLoading = () => {
    return (
      <Grid container spacing={2}>
        <Grid item xs={12} lg={9}>
          <Skeleton variant="rectangular" height={"250px"} style={{ borderRadius: 10 }} />
        </Grid>
        <Grid item xs={12} lg={3}>
          <Skeleton variant="rectangular" height={"250px"} />
        </Grid>
      </Grid>
    );
  };
  return (
    <TransactionContainer>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={8} md={8} lg={9}>
          <Title>
            {t("drawer.transactions")} {optionsTime[rangeTime].displayName}
          </Title>
        </Grid>
        <Grid item xs={12} sm={4} md={4} lg={3}>
          <Box maxWidth={"260px"} mx={isMobile ? "auto" : "none"}>
            <Tabs display="flex" justifyContent="space-between" width={isMobile ? "100%" : "auto"}>
              {Object.keys(optionsTime).map((option) => {
                return (
                  <Tab
                    key={optionsTime[option as Time].label}
                    active={+(rangeTime === option)}
                    onClick={() => setRangeTime(option as Time)}
                  >
                    {optionsTime[option as Time].label}
                  </Tab>
                );
              })}
            </Tabs>
          </Box>
        </Grid>
      </Grid>
      {loading && renderLoading()}
      {!loading && (
        <Grid container spacing={2}>
          <Grid item xs={12} lg={9}>
            <Chart data={data} range={rangeTime} />
          </Grid>
          <Grid item xs={12} lg={3}>
            <BoxInfo>
              <StyledTransactionTypes>{t("glossary.txTypes")}</StyledTransactionTypes>
              {dataOverview.map((item) => (
                <InfoItem key={item.key}>
                  <Box display={"flex"} alignItems={"center"} mb={1}>
                    <ColorChart type={item.key as TypeChart} />
                    <StyledTransactionTypeItem>{item.title}</StyledTransactionTypeItem>
                  </Box>

                  <ValueChart data-testid={item.key}>{numberWithCommas(item.value)}</ValueChart>
                </InfoItem>
              ))}
            </BoxInfo>
          </Grid>
        </Grid>
      )}
    </TransactionContainer>
  );
};

export default TransactionChart;

const toPercent = (decimal: number) => `${(decimal * 100).toFixed()}%`;
const formatTimeX = (date: Time) => {
  switch (date) {
    case "ONE_DAY":
      return "HH:mm";
    case "ONE_WEEK":
    case "TWO_WEEK":
    case "ONE_MONTH":
      return "MM/DD";

    default:
      break;
  }
};

const getLabel = (date: string, range: Time) => {
  switch (range) {
    case "ONE_DAY":
      return `${moment(date).format("MM/DD HH:mm")} - ${moment(date).add(1, "hour").format("HH:mm")} (UTC)`;
    case "ONE_WEEK":
    case "TWO_WEEK":
    case "ONE_MONTH":
      return moment(date).format("MM/DD");

    default:
      break;
  }
};

const formatX = (date: string, range: Time) => moment(date).format(formatTimeX(range));

const getPercent = (value: number, total: number) => {
  const ratio = total > 0 ? value / total : 0;

  return toPercent(ratio);
};

const renderTooltipContent = (o: any, range: Time) => {
  const { payload = [], label } = o;
  const nameTooltips = {
    simpleTransactions: "Simple transactions",
    smartContract: "Smart contracts",
    metadata: "Metadata"
  };
  const total = (payload || []).reduce((result: number, entry: any) => result + entry.value, 0);
  return (
    <Box key={label}>
      <Box
        p={1}
        bgcolor={({ palette }) => alpha(palette.secondary[0], 0.9)}
        borderRadius={"8px"}
        textAlign={"left"}
        boxShadow={(theme) => theme.shadow.dropdown}
      >
        <Box color={({ palette }) => palette.secondary.main} textAlign={"center"}>
          {getLabel(label, range)}
        </Box>
        {(payload || [])
          .map((entry: any, index: number) => {
            return (
              <Box key={`item-${index}`} mt={1}>
                <Box fontSize={"0.75rem"} color={({ palette }) => palette.secondary.light}>{`${
                  nameTooltips[entry.name as keyof typeof nameTooltips]
                }`}</Box>
                <Box display={"flex"} alignItems={"center"} mt={1}>
                  <Box width={"20px"} height={"20px"} bgcolor={entry.fill} borderRadius={"4px"} mr={1} />
                  <Box fontWeight={"bold"} color={({ palette }) => palette.secondary.main}>
                    {`${numberWithCommas(entry.value)} (${getPercent(entry.value, total)})`}
                  </Box>
                </Box>
              </Box>
            );
          })
          .reverse()}
      </Box>
    </Box>
  );
};

const Chart = ({ data, range }: { data: TransactionChartIF[] | null; range: Time }) => {
  const theme = useTheme();
  const { theme: themeMode } = useSelector(({ user }: RootState) => user);

  if (!data) return <></>;
  return (
    <Box width={"100%"} minHeight={"250px"} height={250}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          height={500}
          width={500}
          data={data}
          stackOffset="expand"
          margin={{
            top: 10,
            right: 20,
            left: 0,
            bottom: 0
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            tick={{ fill: themeMode === "light" ? theme.palette.secondary.light : theme.palette.secondary[800] }}
            tickLine={{ stroke: themeMode === "light" ? theme.palette.secondary.light : theme.palette.secondary[800] }}
            dataKey="date"
            tickFormatter={(date: string) => formatX(date, range)}
          />
          <YAxis
            tick={{ fill: themeMode === "light" ? theme.palette.secondary.light : theme.palette.secondary[800] }}
            tickLine={{ stroke: themeMode === "light" ? theme.palette.secondary.light : theme.palette.secondary[800] }}
            tickFormatter={toPercent}
          />
          <Tooltip content={(o: any) => renderTooltipContent(o, range)} />
          <Area
            type="monotone"
            dataKey="simpleTransactions"
            stackId="1"
            strokeWidth={3}
            stroke={theme.palette.secondary[0]}
            fill={theme.palette.warning[700]}
          />
          <Area
            type="monotone"
            dataKey="smartContract"
            stackId="1"
            strokeWidth={3}
            stroke={theme.palette.secondary[0]}
            fill={theme.mode === "light" ? theme.palette.primary[500] : theme.palette.primary.main}
          />
          <Area
            type="monotone"
            dataKey="metadata"
            strokeWidth={3}
            stackId="1"
            stroke={theme.palette.secondary[0]}
            fill={theme.palette.success[700]}
          />
        </AreaChart>
      </ResponsiveContainer>
    </Box>
  );
};
