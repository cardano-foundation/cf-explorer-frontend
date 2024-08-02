import { Box, Grid, useTheme } from "@mui/material";
import { HiArrowLongLeft } from "react-icons/hi2";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { ActionIcon, DateIcon, FeedbackIcon } from "src/commons/resources";
import CustomIcon from "src/components/commons/CustomIcon";
import DynamicEllipsisText from "src/components/DynamicEllipsisText";
import { TruncateSubTitleContainer } from "src/components/share/styled";
import DatetimeTypeTooltip from "src/components/commons/DatetimeTypeTooltip";
import { formatDateLocal } from "src/commons/utils/helper";
import { statusOverview } from "src/components/Overview/TabOverview";
import { actionTypeListDrep } from "src/components/commons/CardGovernanceVotes";

import VoteSubmitted from "./VoteSubmitted";
import {
  BackButton,
  BackText,
  HeaderDetailContainer,
  HeaderTitle,
  SlotLeader,
  SlotLeaderValue,
  StyledCard,
  TitleContainer
} from "./styles";

interface Props {
  data: OverviewGovActions | null;
}

export default function OverviewHeader({ data }: Props) {
  const history = useHistory();
  const theme = useTheme();
  const actionsType = actionTypeListDrep.find((el) => el.value === data?.actionType)?.text;

  const { t } = useTranslation();
  return (
    <Box sx={{ marginBottom: "20px" }}>
      <Box width="100%" marginBottom={"48px"}>
        <HeaderDetailContainer>
          <BackButton onClick={history.goBack}>
            <HiArrowLongLeft color={theme.palette.secondary.light} />
            <BackText>{t("common.back")}</BackText>
          </BackButton>

          <TitleContainer>
            <HeaderTitle>{actionsType}</HeaderTitle>
          </TitleContainer>
          {data?.txHash && (
            <SlotLeader>
              <Box sx={{ paddingTop: "1.5px", color: theme.palette.secondary.light, whiteSpace: "nowrap" }}>
                Governance Action ID:
              </Box>
              <SlotLeaderValue>
                <TruncateSubTitleContainer>
                  <DynamicEllipsisText value={`${data?.txHash}#${data.index}`} isCopy />
                </TruncateSubTitleContainer>
              </SlotLeaderValue>
            </SlotLeader>
          )}
        </HeaderDetailContainer>
      </Box>
      <Grid spacing={3} container>
        <Grid item container lg={6} md={12} sm={12}>
          <Grid container item spacing={3}>
            <Grid item container md={12} lg={12}>
              <Grid item xs={12} sm={12} md={12}>
                <StyledCard.Container>
                  <CustomIcon
                    icon={ActionIcon}
                    fill={theme.mode === "dark" ? theme.palette.primary.main : theme.palette.secondary.light}
                    height={24}
                    width={24}
                  />
                  <StyledCard.Title>Action Type</StyledCard.Title>
                  <StyledCard.Value>{actionsType}</StyledCard.Value>
                </StyledCard.Container>
              </Grid>
            </Grid>
            <Grid item container md={12} lg={12} spacing={3}>
              <Grid item xs={12} sm={6} md={6}>
                <StyledCard.Container>
                  <CustomIcon
                    icon={DateIcon}
                    fill={theme.mode === "dark" ? theme.palette.primary.main : theme.palette.secondary.light}
                    height={24}
                    width={24}
                  />
                  <StyledCard.Title>Date Created</StyledCard.Title>
                  <StyledCard.Value>
                    <DatetimeTypeTooltip>{formatDateLocal(data?.dateCreated ?? "")}</DatetimeTypeTooltip>
                  </StyledCard.Value>
                </StyledCard.Container>
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <StyledCard.Container>
                  <CustomIcon
                    icon={FeedbackIcon}
                    fill={theme.mode === "dark" ? theme.palette.primary.main : theme.palette.secondary.light}
                    height={24}
                    width={24}
                  />
                  <StyledCard.Title>Status</StyledCard.Title>
                  <StyledCard.Value>{statusOverview.find((el) => el.value === data?.status)?.text}</StyledCard.Value>
                </StyledCard.Container>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item container lg={6} md={12} sm={12}>
          <StyledCard.Container>
            <VoteSubmitted />
          </StyledCard.Container>
        </Grid>
      </Grid>
    </Box>
  );
}
