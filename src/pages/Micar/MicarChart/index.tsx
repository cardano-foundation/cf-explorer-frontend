import { useState } from "react";
import { Box, Container, useTheme } from "@mui/material";
import { AreaChart, XAxis, YAxis, Tooltip, ResponsiveContainer, Area } from "recharts";
import { useTranslation } from "react-i18next";
import axios from "axios";

import { useScreen } from "src/commons/hooks/useScreen";
import { Clock, ClockWhite } from "src/commons/resources";

import { StyledCard, StyledTitle, Tab, Tabs } from "./styled";

const dataMock = [
  { date: "01/21", emissions: 55 },
  { date: "02/21", emissions: 60 },
  { date: "03/21", emissions: 58 },
  { date: "04/21", emissions: 50 },
  { date: "05/21", emissions: 53 },
  { date: "06/21", emissions: 55 },
  { date: "07/21", emissions: 52 },
  { date: "08/21", emissions: 50 },
  { date: "09/21", emissions: 53 },
  { date: "10/21", emissions: 55 }
];

type Time = "THREE_MONTH" | "ONE_YEAR" | "THREE_YEAR" | "ALL_TIME";
export interface EmissionsChartIF {
  date: string;
  emissions: number | null;
}
const EmissionsAreaChart = () => {
  const { t } = useTranslation();
  const { isMobile, isLaptop } = useScreen();
  const theme = useTheme();

  const [rangeTime, setRangeTime] = useState<Time>("THREE_MONTH");
  // const [dataChart, setDataChart] = useState();
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

  axios.get(`/currencies/ada/emissions/network?key=zy5ZrBDZpv420Oi3WIPwXP`).then(() => {
    // setDataChart(data);
  });

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
          <AreaChart data={dataMock}>
            <defs>
              <linearGradient id="colorEmissions" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
              </linearGradient>
            </defs>

            <XAxis dataKey="date" />
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
