import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Box, useMediaQuery, useTheme, FormControl, Select, MenuItem, SelectChangeEvent, Grid } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";

import useFetch from "src/commons/hooks/useFetch";
import { API } from "src/commons/utils/api";
import NoRecord from "src/components/commons/NoRecord";

import { StyledCard, StyledSkeleton } from "./styles";

export interface BlockPropagationChart {
  date: string;
  blockPropMean: number | null;
  blockPropMedian: number | null;
  blockPropP90: number | null;
  blockPropP95: number | null;
}

const SIZE_EPOCHS = 6;
const SIZE_DAILY = 30;

export default function BlockPropagationChart() {
  const theme = useTheme();
  const isMobile = useMediaQuery("(max-width:600px)");
  const [value, setValue] = useState<string>("EPOCH");
  const size = value === "DAY" ? SIZE_DAILY : SIZE_EPOCHS;
  const blockKey = useSelector(({ system }: RootState) => system.blockKey);
  const handleChange = (event: SelectChangeEvent<string>) => {
    setValue(event.target.value);
  };

  const { data, loading, error } = useFetch<BlockPropagationChart[]>(
    API.NETWORK_MONITORING_API.BLOCK_PROPAGATION(value, size),
    undefined,
    false,
    blockKey
  );

  const formatXAxis = (tickItem: string) => {
    const date = new Date(tickItem);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${month}/${day}`;
  };

  return (
    <StyledCard.Container sx={{ [theme.breakpoints.down("sm")]: { padding: "0 15px 15px 10px" } }}>
      {error ? (
        <NoRecord />
      ) : (
        <Box>
          {loading ? (
            <Grid>
              <StyledSkeleton style={{ minHeight: "150px" }} variant="rectangular" />
            </Grid>
          ) : (
            <Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  [theme.breakpoints.down("sm")]: {
                    flexDirection: "column",
                    alignItems: "start"
                  }
                }}
              >
                <StyledCard.Title>Block Propagation</StyledCard.Title>
                <Box>
                  <FormControl variant="outlined" size="small">
                    <Select
                      sx={{
                        borderRadius: "8px",
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderRadius: "8px",
                          borderColor: theme.isDark ? "#6c6f89" : "#D6E2FF",
                          borderWidth: "2px"
                        },
                        "& .MuiSelect-select": {
                          color: theme.palette.secondary.main
                        },
                        "& .MuiSvgIcon-root": {
                          color: theme.palette.secondary.main
                        }
                      }}
                      MenuProps={{
                        PaperProps: {
                          sx: {
                            bgcolor: theme.isDark ? "#24262e" : "#FFF",
                            "& .MuiMenuItem-root": {
                              color: theme.palette.secondary.main,
                              "&.Mui-selected": {
                                backgroundColor: theme.isDark ? "##6c6f89" : "#d6e2ff"
                              }
                            }
                          }
                        }
                      }}
                      displayEmpty
                      labelId="epochs-select-label"
                      id="epochs-select"
                      value={value}
                      onChange={handleChange}
                    >
                      <MenuItem value="EPOCH">Epochs</MenuItem>
                      <MenuItem value="DAY">Daily</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Box>
              <ResponsiveContainer width="100%" height={isMobile ? 700 : 400}>
                <LineChart
                  data={data ? [...data].reverse() : []}
                  margin={{ top: 32, right: isMobile ? 15 : 40, left: 0 }}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis
                    tick={{ fontSize: 12, fill: theme.palette.secondary.light }}
                    dy={10}
                    minTickGap={10}
                    dataKey="time"
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={formatXAxis}
                  />
                  <YAxis
                    tick={{ fontSize: 12, fill: theme.palette.secondary.light }}
                    dx={-10}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: theme.isDark ? "#24262ef5" : "#fffffff7",
                      color: theme.palette.secondary.main,
                      borderRadius: "4px"
                    }}
                  />
                  <Legend
                    layout={isMobile ? "horizontal" : "vertical"}
                    verticalAlign={isMobile ? "bottom" : "middle"}
                    align={isMobile ? "center" : "right"}
                    content={<CustomLegend />}
                  />
                  <Line type="linear" dataKey="blockPropP95" strokeWidth={2} stroke="#14B8A6" dot={{ r: 4 }} />
                  <Line type="linear" dataKey="blockPropP90" strokeWidth={2} stroke="#3B82F6" dot={{ r: 4 }} />
                  <Line type="linear" dataKey="blockPropMean" strokeWidth={2} stroke="#FACC15" dot={{ r: 4 }} />
                  <Line type="linear" dataKey="blockPropMedian" strokeWidth={2} stroke="#90E0EF" dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          )}
        </Box>
      )}
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
        width: "100%",
        [theme.breakpoints.down("sm")]: {
          marginTop: "20px",
          marginLeft: "6px"
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
        width: "100%",
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
