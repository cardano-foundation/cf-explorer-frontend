import { Grid, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";

import {
  TeamsIconLight,
  TeamsIconDark,
  UserIconDark,
  UserIconLight,
  CommunityIconDark,
  CommunityIconLight
} from "src/commons/resources";
import { routers, details } from "src/commons/routers";

import { StyledCard, StyledImg, StyledSkeleton } from "./styles";
interface TypeProps {
  data: { activeDReps: number | undefined; activeSPOs: number | undefined; activeCommittees: number | undefined };
  loading: boolean;
}
export default function CardOverview({ data, loading }: TypeProps) {
  const { t } = useTranslation();
  const theme = useTheme();
  const GroupCard = [
    {
      title: "Constitutional Committee",
      value: data.activeCommittees ?? t("N/A"),
      linkTo: details.constitutionalCommittees("listMembers"),
      iconLight: TeamsIconLight,
      iconDark: TeamsIconDark
    },
    {
      title: "Delegated Representatives (DReps)",
      value: data.activeDReps ?? t("N/A"),
      linkTo: routers.DREPS,
      iconLight: UserIconLight,
      iconDark: UserIconDark
    },
    {
      title: "Stake Pool Operators (SPO’s)",
      value: data.activeSPOs ?? t("N/A"),
      linkTo: routers.DELEGATION_POOLS,
      iconLight: CommunityIconLight,
      iconDark: CommunityIconDark
    }
  ];
  return (
    <Grid container spacing={2}>
      {GroupCard.map((el, i) => {
        return (
          <Grid key={i} item xl={4} md={6} xs={12}>
            {loading ? (
              <StyledSkeleton style={{ minHeight: "130px" }} variant="rectangular" />
            ) : (
              <StyledCard.Container>
                <StyledCard.Content>
                  <StyledCard.Title>{el.title}</StyledCard.Title>
                  <StyledCard.Value>{`${el.value} Active`}</StyledCard.Value>
                  <StyledCard.Link to={el.linkTo}>View members</StyledCard.Link>
                </StyledCard.Content>
                <StyledImg src={theme.mode === "light" ? el.iconLight : el.iconDark} alt="icon" />
              </StyledCard.Container>
            )}
          </Grid>
        );
      })}
    </Grid>
  );
}
