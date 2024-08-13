import { Grid, useMediaQuery, useTheme } from "@mui/material";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, Label, LegendProps } from "recharts";
import { t } from "i18next";

import NoRecord from "src/components/commons/NoRecord";

import { LegendChart, StyledCard, StyledSkeleton } from "./styles";

interface DataItem {
  name: string;
  value: number;
  color: string;
}

interface TypeProps {
  data: {
    totalGovActions: number | undefined;
    govStatusMap:
      | {
          EXPIRED: number;
          ENACTED: number;
          OPEN_BALLOT: number;
          RATIFIED?: number;
        }
      | undefined;
    govCountMap:
      | {
          PARAMETER_CHANGE_ACTION: number;
          UPDATE_COMMITTEE: number;
          INFO_ACTION: number;
          NEW_CONSTITUTION: number;
          NO_CONFIDENCE: number;
          HARD_FORK_INITIATION_ACTION: number;
          TREASURY_WITHDRAWALS_ACTION: number;
        }
      | undefined;
  };

  loading: boolean;
}

type DataChart = Record<number, number> | undefined;

const ChartOverview = (props: TypeProps) => {
  const theme = useTheme();
  const { data, loading } = props;
  const { totalGovActions, govStatusMap, govCountMap } = data;

  const dataGovStatusMap: DataItem[] = [
    { name: "Active", value: govStatusMap?.OPEN_BALLOT ?? 0, color: "#2196F3" },
    { name: "Accepted", value: govStatusMap?.RATIFIED ?? 0, color: "#14B8A6" },
    { name: "Enacted", value: govStatusMap?.ENACTED ?? 0, color: "#EC4899" },
    { name: "Expired", value: govStatusMap?.EXPIRED ?? 0, color: "#F59E0B" }
  ];

  const dataGovCountMap: DataItem[] = [
    { name: t("pool.typeMotion"), value: govCountMap?.NO_CONFIDENCE ?? 0, color: "#14B8A6" },
    { name: t("pool.typeConstitutional"), value: govCountMap?.UPDATE_COMMITTEE ?? 0, color: "#3B82F6" },
    { name: t("pool.typeHardFork"), value: govCountMap?.HARD_FORK_INITIATION_ACTION ?? 0, color: "#6366F1" },
    { name: t("drep.updateConstitution"), value: govCountMap?.NEW_CONSTITUTION ?? 0, color: "#EC4899" },
    { name: t("drep.protocolChange"), value: govCountMap?.PARAMETER_CHANGE_ACTION ?? 0, color: "#F59E0B" },
    { name: t("drep.treasuryWithdrawals"), value: govCountMap?.TREASURY_WITHDRAWALS_ACTION ?? 0, color: "#FACC15" },
    { name: t("pool.typeInfo"), value: govCountMap?.INFO_ACTION ?? 0, color: "#F880FB" }
  ];
  const renderLegend = (props: LegendProps) => {
    const { payload } = props;

    return (
      <ul style={{ listStyleType: "none", paddingRight: "5px" }}>
        {payload?.map((entry, index) => {
          return (
            <LegendChart key={`item-${index}`}>
              <span
                style={{
                  display: "inline-block",
                  width: 12,
                  height: 12,
                  backgroundColor: entry.color,
                  borderRadius: "50%",
                  marginRight: 12
                }}
              ></span>
              {entry.value}
            </LegendChart>
          );
        })}
      </ul>
    );
  };
  const COLORS_CHART_ACTIOS = dataGovStatusMap.map((entry) => entry.color);
  const COLORS_CHART_TYPE = dataGovCountMap.map((entry) => entry.color);
  const middleScreen = useMediaQuery("(max-width:1255px)");
  const smallScreen = useMediaQuery("(max-width:600px)");

  const sumValues = (data: DataChart) => {
    return Object.values(data || {}).reduce((sum, value) => sum + value, 0);
  };

  const isEmpty = (data: DataChart) => {
    return Object.entries(data || {}).length === 0;
  };

  return (
    <Grid container mt={2} spacing={smallScreen || middleScreen ? 6 : 2}>
      <Grid item xl={6} md={middleScreen ? 12 : 6} xs={12}>
        {loading ? (
          <StyledSkeleton variant="rectangular" />
        ) : (
          <StyledCard.Container>
            <StyledCard.Title>Total Governance Actions</StyledCard.Title>
            {isEmpty(data?.govCountMap) && !sumValues(data?.govCountMap) ? (
              <NoRecord />
            ) : (
              <ResponsiveContainer width="100%" height={smallScreen ? 450 : 250}>
                <PieChart>
                  <Pie
                    animationDuration={500}
                    innerRadius={80}
                    data={dataGovCountMap}
                    outerRadius={107}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {dataGovCountMap.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS_CHART_TYPE[index % COLORS_CHART_TYPE.length]} />
                    ))}
                    <Label
                      dy={-10}
                      value="Total"
                      position="centerBottom"
                      style={{
                        fontSize: "12px",
                        fill: theme.mode === "light" ? "#737373" : "#fff",
                        pointerEvents: "none"
                      }}
                    />
                    <Label
                      value={totalGovActions}
                      position="centerTop"
                      style={{
                        fontSize: "28px",
                        fill: theme.mode === "light" ? "#24262E" : "#fff",
                        fontWeight: "bold",
                        pointerEvents: "none"
                      }}
                    />
                  </Pie>
                  <Tooltip />
                  <Legend
                    layout="vertical"
                    align={smallScreen ? "center" : "right"}
                    verticalAlign={smallScreen ? "bottom" : "middle"}
                    content={(props) => renderLegend(props as LegendProps)}
                  />
                </PieChart>
              </ResponsiveContainer>
            )}
          </StyledCard.Container>
        )}
      </Grid>

      <Grid item xl={6} md={middleScreen ? 12 : 6} xs={12}>
        {loading ? (
          <StyledSkeleton variant="rectangular" />
        ) : (
          <StyledCard.Container>
            <StyledCard.Title>Governance Status</StyledCard.Title>
            {isEmpty(data?.govStatusMap) && !sumValues(data?.govStatusMap) ? (
              <NoRecord />
            ) : (
              <ResponsiveContainer width="100%" height={smallScreen ? 450 : 250}>
                <PieChart style={{ posistion: "relative" }}>
                  <Pie
                    animationDuration={500}
                    data={dataGovStatusMap}
                    labelLine={false}
                    outerRadius={107}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {dataGovStatusMap.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS_CHART_ACTIOS[index % COLORS_CHART_ACTIOS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend
                    layout="vertical"
                    align={smallScreen ? "center" : "right"}
                    style={{ paddingRight: "100px" }}
                    verticalAlign={smallScreen ? "bottom" : "middle"}
                    content={(props) => renderLegend(props as LegendProps)}
                  />
                </PieChart>
              </ResponsiveContainer>
            )}
          </StyledCard.Container>
        )}
      </Grid>
    </Grid>
  );
};

export default ChartOverview;
