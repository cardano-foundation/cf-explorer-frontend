import { BarChart, Bar, XAxis, YAxis, Legend, ResponsiveContainer } from "recharts";
import { Box, Grid, useMediaQuery } from "@mui/material";
import { useTheme } from "@emotion/react";

import useFetch from "src/commons/hooks/useFetch";
import { API } from "src/commons/utils/api";
import { routers } from "src/commons/routers";
import NoRecord from "src/components/commons/NoRecord";

import { StyledCard, StyledSkeleton } from "./styles";

interface PropsLegend {
  registeredPool: number | null | undefined;
  activePool: number | null | undefined;
  color: string;
  isMobile: boolean;
}

interface REGISTERED_STAKEPOOLS {
  registeredPool: number | null;
  activePool: number | null;
}

export default function RegisteredStakepoolsChart() {
  const theme = useTheme();
  const isMobile = useMediaQuery("(max-width:600px)");
  const { data, loading, error } = useFetch<REGISTERED_STAKEPOOLS>(API.NETWORK_MONITORING_API.REGISTERED_STAKEPOOLS);
  const activePool = data?.activePool;
  const registeredPool = data?.registeredPool;
  return (
    <StyledCard.Container>
      {error ? (
        <NoRecord />
      ) : (
        <Box>
          <StyledCard.Title>Registered Stakepools</StyledCard.Title>
          {loading ? (
            <Grid>
              <StyledSkeleton style={{ minHeight: "150px" }} variant="rectangular" />
            </Grid>
          ) : (
            <Box style={{ width: "100%", height: 115 }}>
              <ResponsiveContainer>
                <BarChart barCategoryGap="0%" barGap={0} data={[data]} layout="vertical">
                  <XAxis type="number" hide />
                  <YAxis type="category" dataKey="name" hide />
                  <Legend
                    content={() =>
                      renderLegend({ activePool, registeredPool, color: theme.palette.secondary.main, isMobile })
                    }
                    verticalAlign="bottom"
                    align="left"
                  />
                  <Bar dataKey="registeredPool" fill="#3B82F6" barSize={20} />
                  <Bar dataKey="activePool" fill="#FF8E72" barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          )}

          <Box sx={{ textAlign: "start", marginTop: "16px", paddingLeft: "5px" }}>
            <StyledCard.Link to={routers.DELEGATION_POOLS}>View all</StyledCard.Link>
          </Box>
        </Box>
      )}
    </StyledCard.Container>
  );
}

const renderLegend = ({ registeredPool, activePool, color, isMobile }: PropsLegend) => {
  return (
    <Box sx={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: isMobile ? "8px" : "32px" }}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box
          sx={{
            width: 14,
            height: 14,
            backgroundColor: "#3B82F6",
            marginRight: "5px",
            borderRadius: "4px"
          }}
        ></Box>
        <Box sx={{ marginRight: "8px", color: color }}>Registered</Box>
        <Box sx={{ color: color }}>{registeredPool}</Box>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box
          sx={{
            width: 14,
            height: 14,
            backgroundColor: "#FF8E72",
            marginRight: "5px",
            borderRadius: "4px"
          }}
        ></Box>
        <Box sx={{ marginRight: "8px", color: color }}>Active</Box>
        <Box sx={{ color: color }}>{activePool}</Box>
      </Box>
    </Box>
  );
};
