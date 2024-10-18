import { BarChart, Bar, XAxis, YAxis, Legend, ResponsiveContainer } from "recharts";
import { Box, Grid, useMediaQuery } from "@mui/material";
import { useTheme } from "@emotion/react";
import { t } from "i18next";

import useFetch from "src/commons/hooks/useFetch";
import { API } from "src/commons/utils/api";
import NoRecord from "src/components/commons/NoRecord";
import { numberWithCommas } from "src/commons/utils/helper";
import FetchDataErr from "src/components/commons/FetchDataErr";

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

export default function PreDefinedVotesChart() {
  const theme = useTheme();
  const isMobile = useMediaQuery("(max-width:600px)");
  const { data, loading, error, statusError } = useFetch<REGISTERED_STAKEPOOLS>(
    API.NETWORK_MONITORING_API.REGISTERED_STAKEPOOLS
  );
  const activePool = data?.activePool;
  const registeredPool = data?.registeredPool;

  if (loading)
    return (
      <StyledCard.Container>
        <Grid>
          <StyledSkeleton style={{ minHeight: "150px" }} variant="rectangular" />
        </Grid>
      </StyledCard.Container>
    );

  if (error && (statusError || 0) < 500)
    return (
      <StyledCard.Container>
        <StyledCard.Title>{t("overview.page.preDefinedVotes")}</StyledCard.Title>
        <NoRecord />
      </StyledCard.Container>
    );

  if (error && (statusError || 0) >= 500)
    return (
      <StyledCard.Container>
        <StyledCard.Title>{t("overview.page.preDefinedVotes")}</StyledCard.Title>
        <FetchDataErr />
      </StyledCard.Container>
    );
  return (
    <StyledCard.Container sx={{ padding: isMobile ? "16px" : "12px 32px 32px 32px" }}>
      {error ? (
        <NoRecord />
      ) : (
        <Box>
          <StyledCard.Title>{t("overview.page.preDefinedVotes")}</StyledCard.Title>
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
            width: 20,
            height: 20,
            backgroundColor: "#3B82F6",
            marginRight: "5px",
            borderRadius: "4px"
          }}
        ></Box>
        <Box sx={{ marginRight: "8px", color: color, fontWeight: "500" }}>Auto-abstain</Box>
        <Box sx={{ color: color, fontSize: "16px" }}>
          {registeredPool ? numberWithCommas(registeredPool) : t("N/A")}
        </Box>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box
          sx={{
            width: 20,
            height: 20,
            backgroundColor: "#FF8E72",
            marginRight: "5px",
            borderRadius: "4px"
          }}
        ></Box>
        <Box sx={{ marginRight: "8px", color: color, fontWeight: "500" }}>No-confidence</Box>
        <Box sx={{ color: color, fontSize: "16px" }}>{activePool ? numberWithCommas(activePool) : t("N/A")}</Box>
      </Box>
    </Box>
  );
};
