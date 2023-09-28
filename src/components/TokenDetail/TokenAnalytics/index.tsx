import { Box, Grid, useTheme } from "@mui/material";
import BigNumber from "bignumber.js";
import moment from "moment";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { Area, AreaChart, CartesianGrid, Label, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { TooltipProps } from "recharts/types/component/Tooltip";
import { useSelector } from "react-redux";

import useFetch from "src/commons/hooks/useFetch";
import { HighestIconComponent, LowestIconComponent } from "src/commons/resources";
import { API } from "src/commons/utils/api";
import { OPTIONS_CHART_ANALYTICS } from "src/commons/utils/constants";
import { formatNumberDivByDecimals, formatPrice, getIntervalAnalyticChart } from "src/commons/utils/helper";
import { TextCardHighlight } from "src/components/AddressDetail/AddressAnalytics/styles";
import CustomIcon from "src/components/commons/CustomIcon";
import { TooltipBody } from "src/components/commons/Layout/styles";

import Card from "../../commons/Card";
import {
  BoxInfo,
  BoxInfoItem,
  BoxInfoItemRight,
  ButtonTitle,
  ChartBox,
  SkeletonUI,
  Tab,
  Tabs,
  Title,
  TooltipLabel,
  TooltipValue,
  ValueInfo,
  Wrapper
} from "./styles";

type AnalyticsData = { date: string; value: number };
interface ITokenAnalyticsProps {
  dataToken?: IToken | null;
}

const TokenAnalytics: FC<ITokenAnalyticsProps> = ({ dataToken }) => {
  const { t } = useTranslation();
  const options = [
    { value: OPTIONS_CHART_ANALYTICS.ONE_DAY, label: t("time.1d") },
    { value: OPTIONS_CHART_ANALYTICS.ONE_WEEK, label: t("time.1w") },
    { value: OPTIONS_CHART_ANALYTICS.ONE_MONTH, label: t("time.1m") },
    { value: OPTIONS_CHART_ANALYTICS.THREE_MONTH, label: t("time.3m") }
  ];
  const [rangeTime, setRangeTime] = useState<OPTIONS_CHART_ANALYTICS>(OPTIONS_CHART_ANALYTICS.ONE_DAY);
  const { tokenId } = useParams<{ tokenId: string }>();
  const blockKey = useSelector(({ system }: RootState) => system.blockKey);
  const theme = useTheme();
  const { data, loading } = useFetch<AnalyticsData[]>(
    `${API.TOKEN.ANALYTICS}/${tokenId}/${rangeTime}`,
    undefined,
    false,
    blockKey
  );

  const values = (data || [])?.map((item) => item.value || 0) || [];

  const maxBalance = BigNumber.max(0, ...values).toString();
  const minBalance = BigNumber.min(maxBalance, ...values).toString();

  const formatPriceValue = (value: string) => {
    return formatPrice(
      new BigNumber(value).div(new BigNumber(10).exponentiatedBy(dataToken?.metadata?.decimals || 0)).toString()
    );
  };

  const convertDataChart = data?.map((item) => ({
    value: item.value || 0,
    date: item.date
  }));

  const getLabelTimeTooltip = (label: string) => {
    switch (rangeTime) {
      case OPTIONS_CHART_ANALYTICS.ONE_DAY:
        return `${moment(label).format("DD MMM HH:mm")} - ${moment(label).add(2, "hour").format("HH:mm")}`;
      case OPTIONS_CHART_ANALYTICS.ONE_WEEK:
        return moment(label).format("DD MMM");
      case OPTIONS_CHART_ANALYTICS.ONE_MONTH:
        return `${moment(label).format("DD MMM")} - ${moment(label).add(1, "days").format("DD MMM")}`;
      case OPTIONS_CHART_ANALYTICS.THREE_MONTH:
        return `${moment(label).format("DD MMM")} - ${moment(label).add(1, "days").format("DD MMM")}`;
      default:
        return "";
    }
  };

  const renderTooltip: TooltipProps<number, number>["content"] = (content) => {
    return (
      <TooltipBody fontSize={"12px"}>
        <TooltipLabel>{getLabelTimeTooltip(content.label)}</TooltipLabel>
        <TooltipValue>
          {formatNumberDivByDecimals(content.payload?.[0]?.value, dataToken?.metadata?.decimals || 0) || 0}
        </TooltipValue>
      </TooltipBody>
    );
  };

  return (
    <Card title={<TextCardHighlight>{t("analytics")}</TextCardHighlight>}>
      <Wrapper container columns={24} spacing="35px">
        <Grid item xs={24} lg={18}>
          <Grid spacing={2} container alignItems="center" justifyContent={"space-between"}>
            <Grid item xs={4} sm={4}>
              <ButtonTitle>{t("glossary.volumn")}</ButtonTitle>
            </Grid>
            <Grid item xs={8} sm={8}>
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
              <SkeletonUI variant="rectangular" style={{ height: "375px", display: "block" }} />
            ) : (
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart
                  width={900}
                  height={400}
                  data={convertDataChart || []}
                  margin={{ top: 5, right: 5, bottom: 14 }}
                >
                  <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={theme.palette.primary.main} stopOpacity={0.2} />
                      <stop offset="100%" stopColor={theme.palette.primary.main} stopOpacity={0.2} />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="date"
                    tickFormatter={(value) => moment(value).format(rangeTime === "ONE_DAY" ? "HH:mm" : "DD MMM")}
                    tickLine={false}
                    tickMargin={5}
                    dx={-15}
                    color={theme.palette.secondary.light}
                    interval={getIntervalAnalyticChart(rangeTime)}
                  >
                    <Label value="(UTC)" offset={-12} position="insideBottom" />
                  </XAxis>
                  <YAxis tickFormatter={formatPriceValue} tickLine={false} color={theme.palette.secondary.light} />
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
          <BoxInfo height={"100%"} space={0}>
            <Box flex={1}>
              <BoxInfoItemRight display={"flex"} justifyContent={"center"}>
                <Box>
                  <Box minHeight={"90px"}>
                    <CustomIcon height={30} fill={theme.palette.secondary.light} icon={HighestIconComponent} />
                    <Title>{t("glossary.highestVolume")}</Title>
                  </Box>
                  <ValueInfo>
                    {loading ? (
                      <SkeletonUI variant="rectangular" />
                    ) : (
                      formatNumberDivByDecimals(maxBalance, dataToken?.metadata?.decimals || 0)
                    )}
                  </ValueInfo>
                </Box>
              </BoxInfoItemRight>
            </Box>
            <Box flex={1}>
              <BoxInfoItem display={"flex"} justifyContent={"center"}>
                <Box>
                  <Box minHeight={"90px"}>
                    <CustomIcon height={30} fill={theme.palette.secondary.light} icon={LowestIconComponent} />
                    <Title>{t("glossary.lowestVolume")}</Title>
                  </Box>
                  <ValueInfo>
                    {loading ? (
                      <SkeletonUI variant="rectangular" />
                    ) : (
                      formatNumberDivByDecimals(minBalance, dataToken?.metadata?.decimals || 0)
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

export default TokenAnalytics;
