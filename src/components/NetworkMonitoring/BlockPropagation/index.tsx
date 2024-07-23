import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Box, useMediaQuery, useTheme } from "@mui/material";

import { StyledCard } from "./styles";

export default function BlockPropagationChart() {
  const theme = useTheme();
  const isMobile = useMediaQuery("(max-width:600px)");
  const data = [
    { date: "01/11", p95: 900, p90: 350, mean: 300, median: 180 },
    { date: "04/19", p95: 420, p90: 360, mean: 310, median: 210 },
    { date: "04/27", p95: 450, p90: 370, mean: 320, median: 220 },
    { date: "05/05", p95: 460, p90: 380, mean: 330, median: 230 },
    { date: "05/13", p95: 470, p90: 390, mean: 340, median: 240 },
    { date: "05/21", p95: 480, p90: 400, mean: 350, median: 250 },
    { date: "05/29", p95: 490, p90: 410, mean: 360, median: 260 },
    { date: "12/06", p95: 500, p90: 420, mean: 370, median: 270 },
    { date: "06/14", p95: 600, p90: 500, mean: 450, median: 350 },
    { date: "06/22", p95: 700, p90: 400, mean: 550, median: 450 },
    { date: "06/30", p95: 800, p90: 700, mean: 650, median: 550 },
    { date: "07/08", p95: 1200, p90: 800, mean: 750, median: 650 },
    { date: "12/12", p95: 1200, p90: 800, mean: 750, median: 650 }
  ];

  return (
    <StyledCard.Container>
      <StyledCard.Title>Block Propagation</StyledCard.Title>
      <ResponsiveContainer width="100%" height={isMobile ? 700 : 400}>
        <LineChart data={data} margin={{ top: 32, right: 40, left: 0 }}>
          <CartesianGrid vertical={false} />
          <XAxis
            tick={{ fontSize: 12, fill: theme.palette.secondary.light }}
            dy={10}
            minTickGap={10}
            dataKey="date"
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 12, fill: theme.palette.secondary.light }}
            dx={-10}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip />
          <Legend
            layout={isMobile ? "horizontal" : "vertical"}
            verticalAlign={isMobile ? "bottom" : "middle"}
            align={isMobile ? "center" : "right"}
            content={<CustomLegend />}
          />
          <Line type="linear" dataKey="p95" strokeWidth={2} stroke="#14B8A6" dot={{ r: 4 }} />
          <Line type="linear" dataKey="p90" strokeWidth={2} stroke="#3B82F6" dot={{ r: 4 }} />
          <Line type="linear" dataKey="mean" strokeWidth={2} stroke="#FACC15" dot={{ r: 4 }} />
          <Line type="linear" dataKey="median" strokeWidth={2} stroke="#90E0EF" dot={{ r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </StyledCard.Container>
  );
}

const CustomLegend = () => {
  const theme = useTheme();
  const itemLegend = [
    { label: "Block Prop p95", color: "#14B8A6" },
    { label: "Block Prop p90", color: "#3B82F6" },
    { label: "Block Prop mean", color: "#FACC15" },
    { label: "Block Prop median", color: "#90E0EF" }
  ];
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        marginLeft: "48px",
        alignItems: "start",
        [theme.breakpoints.down("sm")]: {
          marginTop: "20px"
        }
      }}
    >
      <Box
        sx={{
          fontSize: "20px",
          color: theme.palette.secondary.main,
          fontWeight: 500,
          marginBottom: "8px",
          [theme.breakpoints.down("sm")]: {
            fontSize: "16px"
          }
        }}
      >
        Block types
      </Box>
      {itemLegend.map((item, i) => (
        <LegendItem key={i} color={item.color} label={item.label} isLast={i === itemLegend.length - 1} />
      ))}
    </Box>
  );
};
interface LegendItemProps {
  color: string;
  label: string;
  isLast: boolean;
}
const LegendItem = ({ color, label, isLast }: LegendItemProps) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        fontSize: "14px",
        alignItems: "center",
        marginBottom: "16px",
        position: "relative",
        marginTop: "16px",
        fontWeight: 500,
        color: theme.palette.secondary.main,
        [theme.breakpoints.down("sm")]: {
          marginTop: "8px",
          marginBottom: "8px",
          fontSize: "12px"
        }
      }}
    >
      <Box
        style={{
          width: "20px",
          height: "20px",
          backgroundColor: color,
          marginRight: "14px",
          borderRadius: "4px"
        }}
      ></Box>
      {label}
      {!isLast && (
        <Box
          sx={{
            position: "absolute",
            bottom: "-16px",
            left: "0",
            width: "100%",
            height: "1px",
            backgroundColor: theme.mode === "light" ? " #d6e2ff" : "#6c6f89",
            [theme.breakpoints.down("sm")]: {
              bottom: "-8px"
            }
          }}
        ></Box>
      )}
    </Box>
  );
};
