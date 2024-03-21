import { Box, Grid, Stack, Typography, useTheme } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

import { VotesAbstainIcon, VotesNoIcon, VotesNoneIcon, VotesYesIcon } from "src/commons/resources";
import { ChipContainer } from "src/pages/NativeScriptsAndSC/Card";

import { CardGovernanceVote, StatusContainer } from "./styles";

interface ICardGovernanceVotes {
  data: {
    vote: string;
    status: string;
  };
}

const CardGovernanceVotes: React.FC<ICardGovernanceVotes> = ({ data }) => {
  const { status, vote } = data;
  const theme = useTheme();
  const { t } = useTranslation();
  return (
    <CardGovernanceVote>
      <Grid container justifyContent="space-between">
        <Box display="flex" justifyContent="space-between" width="100%">
          <Box maxWidth="400px">
            <Typography fontWeight={600} fontSize="24px" lineHeight="28px">
              Governance Action Voting Name
            </Typography>
          </Box>
          <div>
            <VoteStatus status={vote} />
          </div>
        </Box>
        <Stack paddingTop="24px" spacing={"14px"}>
          <Box display="flex" alignItems="center">
            <Typography
              fontWeight={600}
              fontSize="16px"
              lineHeight="18.75px"
              color={theme.palette.secondary.light}
              paddingRight="8px"
            >
              {t("pool.actionType")}:
            </Typography>
            <Typography fontWeight={400} fontSize="16px" lineHeight="18.75px" color={theme.palette.secondary.light}>
              {t("pool.treasury")}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <Typography
              fontWeight={600}
              fontSize="16px"
              lineHeight="18.75px"
              color={theme.palette.secondary.light}
              paddingRight="8px"
            >
              {t("pool.status")}:
            </Typography>
            <GovernanceStatus status={status} />
          </Box>
          <Box display="flex" alignItems="center">
            <Typography
              fontWeight={600}
              fontSize="16px"
              lineHeight="18.75px"
              color={theme.palette.secondary.light}
              paddingRight="8px"
            >
              {t("pool.votingPower")}:
            </Typography>
            <Typography fontWeight={400} fontSize="16px" lineHeight="18.75px" color={theme.palette.secondary.light}>
              1,893,565.321 ADA
            </Typography>
          </Box>
        </Stack>
      </Grid>
    </CardGovernanceVote>
  );
};

export default CardGovernanceVotes;

export const VoteStatus: React.FC<{ status: string }> = ({ status }) => {
  const renderStatus = (key: string) => {
    switch (key) {
      case "yes":
        return [VotesYesIcon, "success"];
      case "no":
        return [VotesNoIcon, "error"];
      case "abstain":
        return [VotesAbstainIcon, "warning"];
      case "none":
        return [VotesNoneIcon, "info"];

      default:
        return [VotesYesIcon, "info"];
    }
  };

  const typeStatus = renderStatus(status);

  return (
    <ChipContainer
      Icon={typeStatus[0]}
      message={
        <Typography textTransform="uppercase" fontSize="12px" fontWeight={500}>
          {status}
        </Typography>
      }
      variant={typeStatus[1] as "success" | "warning" | "info" | "error"}
    />
  );
};

export const GovernanceStatus: React.FC<{ status: string }> = ({ status }) => {
  const theme = useTheme();
  const renderStatus = (key: string) => {
    switch (key) {
      case "ratified":
        return "success";
      case "ballot":
        return "warning";
      case "enacted":
        return "info";

      default:
        return "info";
    }
  };

  const typeStatus = renderStatus(status);

  return (
    <StatusContainer>
      <ChipContainer
        message={
          <Typography
            textTransform="uppercase"
            fontWeight={500}
            fontSize="12px"
            lineHeight="23px"
            color={theme.palette.secondary.light}
          >
            {status === "ballot" ? "Open Ballot" : status}
          </Typography>
        }
        variant={typeStatus as "success" | "warning" | "info" | "error"}
      />
    </StatusContainer>
  );
};
