import { useState } from "react";
import { Box, Container, useTheme } from "@mui/material";
import { AreaChart, XAxis, YAxis, Tooltip, ResponsiveContainer, Area, TooltipProps } from "recharts";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { Payload } from "recharts/types/component/DefaultTooltipContent";

import useFetch from "src/commons/hooks/useFetch";
import { useScreen } from "src/commons/hooks/useScreen";
import { Clock, ClockWhite } from "src/commons/resources";
import { API } from "src/commons/utils/api";
import { numberWithCommas } from "src/commons/utils/helper";

import { StyledBoxIcon, StyledCard, StyledTitle, Tab, Tabs } from "./styled";

type Time = "THREE_MONTH" | "ONE_YEAR" | "THREE_YEAR" | "ALL_TIME";
export interface EmissionsChartIF {
  date: string;
  emissions_24h: number | string | null;
}
export interface EmissionsChartItem {
  date: string;
  emissions: number | string | null;
}
export interface EmissionChartType {
  entries: EmissionsChartIF[];
}
const EmissionsAreaChart = () => {
  const [rangeTime, setRangeTime] = useState<Time>("THREE_MONTH");
  const { t } = useTranslation();
  const { isMobile, isGalaxyFoldSmall, isLaptop } = useScreen();
  const theme = useTheme();
  const { data } = useFetch<EmissionChartType>(`${API.MICAR?.HISTORYCAL}`, undefined, false);
  const dataHistoryChart = data?.entries?.map((it: EmissionsChartIF) => ({
    date: it.date,
    emissions: it.emissions_24h
  }));

  const formatTimeX = (date: Time) => {
    switch (date) {
      case "THREE_MONTH":
        return "MM/DD";
      case "ONE_YEAR":
      case "THREE_YEAR":
      case "ALL_TIME":
        return "MM/YY";
      default:
        break;
    }
  };

  const formatX = (date: string, range: Time) => moment(date, "YYYY-MM-DDTHH:mm:ssZ").format(formatTimeX(range));

  const filterDataByOption = (data: EmissionsChartIF[], option: Time) => {
    if (!Array.isArray(data) || data.length === 0) {
      return [];
    }

    let days;
    switch (option) {
      case "THREE_MONTH":
        days = 90;
        break;
      case "ONE_YEAR":
        days = 365;
        break;
      case "THREE_YEAR":
        days = 3 * 365;
        break;
      case "ALL_TIME":
        return data;
      default:
        return data;
    }

    return data.slice(-days);
  };

  const filteredData = filterDataByOption(dataHistoryChart, rangeTime);
  const removeDuplicateDates = (filteredData: EmissionsChartItem, rangeTime: Time) => {
    if (!Array.isArray(filteredData) || filteredData === null) {
      return [];
    }
    if (rangeTime === "THREE_MONTH") {
      return filteredData;
    }
    return filteredData.reduce((acc, current) => {
      const currentYearMonth = current.date.slice(0, 7);
      const existingIndex = acc.findIndex((item: EmissionsChartItem) => item.date.slice(0, 7) === currentYearMonth);
      if (existingIndex !== -1) {
        acc[existingIndex] = current;
      } else {
        acc.push(current);
      }

      return acc;
    }, []);
  };
  const result = removeDuplicateDates(filteredData, rangeTime);
  const optionsTime: Record<Time, { label: string; displayName: string }> = {
    THREE_MONTH: {
      label: t("time.3m"),
      displayName: t("option.tx.threeMonth")
    },
    ONE_YEAR: {
      label: t("time.1y"),
      displayName: t("option.tx.aYear")
    },
    THREE_YEAR: {
      label: t("time.3y"),
      displayName: t("option.tx.threeYear")
    },
    ALL_TIME: {
      label: t("time.all_time"),
      displayName: t("option.tx.all_time")
    }
  };

  const TabsComponent = () => {
    return (
      <Tabs>
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
    );
  };

  const renderTooltipContent = (o: TooltipProps<string | number | (string | number)[], string | number>) => {
    const { payload = [], label } = o;
    const getDayOfWeek = (dateString: string) => {
      const date = new Date(dateString);
      const options = { weekday: "long" };
      const dayOfWeek = date.toLocaleDateString(undefined, options as object);

      return dayOfWeek;
    };

    return (
      <Box>
        {(payload || [])
          .map(
            (
              entry: Payload<string | number | (string | number)[], string | number> & { fill?: string },
              index: number
            ) => {
              return (
                <Box
                  key={`item-${index}`}
                  style={{
                    textAlign: "left",
                    backgroundColor: "#000000",
                    padding: "4px 8px 4px 8px",
                    color: "#FFFFFF",
                    borderRadius: "8px"
                  }}
                >
                  <Box>
                    <Box>{`${getDayOfWeek(label)}, ${moment(label).format("DD/MM/YY")}`}</Box>
                    <Box>{`Emissions: ${numberWithCommas(entry.value as number)} tCO₂e`}</Box>
                  </Box>
                </Box>
              );
            }
          )
          .reverse()}
      </Box>
    );
  };

  return (
    <Container>
      <StyledCard elevation={2}>
        <Box
          display="flex"
          justifyContent={isGalaxyFoldSmall ? "flex-start" : "space-between"}
          alignItems={isGalaxyFoldSmall ? "flex-start" : "center"}
          flexDirection={isGalaxyFoldSmall ? "column" : "row"}
        >
          <StyledBoxIcon>{theme.isDark ? <ClockWhite /> : <Clock />}</StyledBoxIcon>
          {!isGalaxyFoldSmall && <TabsComponent />}
        </Box>
        <StyledTitle
          sx={{ color: theme.isDark ? "#F7F9FF" : "#000000" }}
          fontSize={isMobile ? "20px" : isLaptop ? "40px" : "48px"}
        >
          {t("micar.indicators.emissions.title")}
        </StyledTitle>
        <ResponsiveContainer
          width={isGalaxyFoldSmall ? "120%" : "100%"}
          height={300}
          style={{ alignSelf: "flex-start", position: "relative", left: `${isGalaxyFoldSmall ? "-30px" : "0px"}` }}
        >
          <AreaChart data={result}>
            <defs>
              <linearGradient id="colorEmissions" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
              </linearGradient>
            </defs>

            <XAxis dataKey="date" tickFormatter={(date: string) => formatX(date, rangeTime)} />
            <YAxis
              label={{
                value: `${isGalaxyFoldSmall ? "" : "Emissions (t CO₂e)"}`,
                angle: -90,
                position: "insideLeft",
                style: { textAnchor: "middle" }
              }}
            />
            <Tooltip content={(o) => renderTooltipContent(o)} />

            <Area type="monotone" dataKey="emissions" stroke="#3B82F6" fill="url(#colorEmissions)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
        {isGalaxyFoldSmall && <TabsComponent />}
      </StyledCard>
    </Container>
  );
};

export default EmissionsAreaChart;
