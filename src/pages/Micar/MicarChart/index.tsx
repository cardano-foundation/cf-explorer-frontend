import { useEffect, useState } from "react";
import { Box, Container, useTheme } from "@mui/material";
import { AreaChart, XAxis, YAxis, Tooltip, ResponsiveContainer, Area } from "recharts";
import { useTranslation } from "react-i18next";
import axios from "axios";
import moment from "moment";

import { useScreen } from "src/commons/hooks/useScreen";
import { Clock, ClockWhite } from "src/commons/resources";

import { StyledCard, StyledTitle, Tab, Tabs } from "./styled";

type Time = "THREE_MONTH" | "ONE_YEAR" | "THREE_YEAR" | "ALL_TIME";
export interface EmissionsChartIF {
  date: string;
  emissions_24h: number | null;
}
const EmissionsAreaChart = () => {
  const [rangeTime, setRangeTime] = useState<Time>("THREE_MONTH");
  const [dataChart, setDataChart] = useState();

  const { t } = useTranslation();
  const { isMobile, isLaptop } = useScreen();
  const theme = useTheme();

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

  const filteredData = filterDataByOption(dataChart, rangeTime);
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

  useEffect(() => {
    axios.get(`/currencies/ada/emissions/network?key=zy5ZrBDZpv420Oi3WIPwXP`).then(({ data }) => {
      const converdata = data.entries.map((it: EmissionsChartIF) => ({
        date: it.date,
        emissions: it.emissions_24h
      }));
      setDataChart(converdata);
    });
  }, []);

  const TabsComponent = () => {
    return (
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
    );
  };

  return (
    <Container>
      <StyledCard elevation={2} sx={{ backgroundColor: theme.isDark ? "#24262E" : "#F9F9F9" }}>
        <Box
          display="flex"
          justifyContent={isMobile ? "flex-start" : "space-between"}
          alignItems={isMobile ? "flex-start" : "center"}
          flexDirection={isMobile ? "column" : "row"}
        >
          {theme.isDark ? <ClockWhite /> : <Clock />}
          {!isMobile && <TabsComponent />}
        </Box>
        <StyledTitle
          sx={{ color: theme.isDark ? "#F7F9FF" : "#000000" }}
          fontSize={isMobile ? "20px" : isLaptop ? "40px" : "48px"}
        >
          {t("micar.indicators.emissions.title")}
        </StyledTitle>
        <ResponsiveContainer width="100%" height={300} style={{ alignSelf: "flex-start" }}>
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="colorEmissions" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
              </linearGradient>
            </defs>

            <XAxis dataKey="date" tickFormatter={(date: string) => formatX(date, rangeTime)} />
            <YAxis label={{ value: isMobile ? "" : "Emissions (T CO₂e)", angle: -90, position: "insideLeft" }} />
            <Tooltip />

            <Area type="monotone" dataKey="emissions" stroke="#3B82F6" fill="url(#colorEmissions)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
        {isMobile && <TabsComponent />}
      </StyledCard>
    </Container>
  );
};

export default EmissionsAreaChart;
