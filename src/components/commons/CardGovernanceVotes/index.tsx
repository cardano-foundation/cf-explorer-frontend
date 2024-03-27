import { Box, Grid, Stack, Tooltip, Typography, useTheme } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

import { VotesAbstainIcon, VotesNoIcon, VotesNoneIcon, VotesYesIcon } from "src/commons/resources";
import { ChipContainer } from "src/pages/NativeScriptsAndSC/Card";
import { GovernanceVote } from "src/components/DelegationDetail/DelegationDetailList";

import { CardGovernanceVote, StatusContainer } from "./styles";

interface ICardGovernanceVotes {
  data: GovernanceVote;
}

const CardGovernanceVotes: React.FC<ICardGovernanceVotes> = ({ data }) => {
  const { index, status, txHash, type, vote, votingPower } = data;
  const theme = useTheme();
  const { t } = useTranslation();
  const actionType = (type: string) => {
    switch (type) {
      case "UPDATE_COMMITTEE":
        return t("pool.normalState");
      case "HARD_FORK_INITIATION_ACTION":
        return t("pool.harkFork");
      case "NO_CONFIDENCE":
        return t("pool.typeMotion");
      case "INFO_ACTION":
        return t("pool.Infor");

      default:
        break;
    }
  };
  return (
    <CardGovernanceVote>
      <Grid container justifyContent="space-between">
        <Box display="flex" justifyContent="space-between" width="100%">
          <Box maxWidth="400px">
            <Tooltip title={txHash} placement="top" arrow>
              <Typography
                fontWeight={600}
                fontSize="24px"
                lineHeight="28px"
                color={theme.isDark ? theme.palette.secondary.main : theme.palette.secondary.main}
              >
                {actionType(type)} #{index}
              </Typography>
            </Tooltip>
          </Box>
          <>
            <VoteStatus status={vote} />
          </>
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
              {actionType(type)}
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
              {votingPower ? `${votingPower} ADA` : "N/A"}
            </Typography>
          </Box>
        </Stack>
      </Grid>
    </CardGovernanceVote>
  );
};

export default CardGovernanceVotes;

export const VoteStatus: React.FC<{ status: string }> = ({ status }) => {
  const { t } = useTranslation();
  const renderStatus = (key: string) => {
    switch (key) {
      case "YES":
        return [VotesYesIcon, "success"];
      case "NO":
        return [VotesNoIcon, "error"];
      case "ABSTAIN":
        return [VotesAbstainIcon, "warning"];

      default:
        return [VotesNoneIcon, "info"];
    }
  };

  const typeStatus = renderStatus(status);

  return (
    <ChipContainer
      Icon={typeStatus[0]}
      message={
        <Typography textTransform="uppercase" fontSize="12px" fontWeight={500}>
          {status ? status : t("pool.none")}
        </Typography>
      }
      variant={typeStatus[1] as "success" | "warning" | "info" | "error"}
    />
  );
};

export const GovernanceStatus: React.FC<{ status: string | null }> = ({ status }) => {
  const theme = useTheme();
  const renderStatus = (key: string) => {
    switch (key) {
      case "ratified":
        return "success";
      case "OPEN":
        return "warning";
      case "enacted":
        return "info";

      default:
        return "info";
    }
  };

  const typeStatus = renderStatus(status || "");

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
            {status === "OPEN" ? "Open Ballot" : !status ? "N/A" : status}
          </Typography>
        }
        variant={typeStatus as "success" | "warning" | "info" | "error"}
      />
    </StatusContainer>
  );
};
