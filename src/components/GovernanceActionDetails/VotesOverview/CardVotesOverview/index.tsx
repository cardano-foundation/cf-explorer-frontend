import { t } from "i18next";
import { Box, useTheme } from "@mui/material";
import { useEffect, useState } from "react";

import { VoteStatus } from "src/components/commons/CardGovernanceVotes";
import CustomTooltip from "src/components/commons/CustomTooltip";
import { VOTE_TYPE_GOV_ACTIONS } from "src/commons/utils/constants";
import { formatADAFull, formatDateTimeLocal, getShortHash } from "src/commons/utils/helper";
import DatetimeTypeTooltip from "src/components/commons/DatetimeTypeTooltip";
import { details } from "src/commons/routers";

import { CardContainer, ContainerField, StyledLink, TitleField, ValueField } from "./styles";

interface Vote {
  data: {
    voterHash: string;
    timestamp: string;
    voterType:
      | "CONSTITUTIONAL_COMMITTEE_HOT_KEY_HASH"
      | "CONSTITUTIONAL_COMMITTEE_HOT_SCRIPT_HASH"
      | "DREP_KEY_HASH"
      | "DREP_SCRIPT_HASH"
      | "STAKING_POOL_KEY_HASH";
    votingStake: number | null;
    votingPower: number | null;
    vote: "NO" | "YES" | "ABSTAIN" | "NONE" | "ANY";
    isRepeatVote: boolean;
  };
}

export default function CardVotesOverview({ data }: Vote) {
  const theme = useTheme();
  const [link, setLink] = useState("");
  const VOTER_TYPE = [
    {
      value: VOTE_TYPE_GOV_ACTIONS.CONSTITUTIONAL_COMMITTEE_HOT_KEY_HASH,
      text: t("vote.committee"),
      link: details.constitutionalCommitteeDetail(data.voterHash)
    },
    {
      value: VOTE_TYPE_GOV_ACTIONS.CONSTITUTIONAL_COMMITTEE_HOT_SCRIPT_HASH,
      text: t("vote.committee"),
      link: details.constitutionalCommitteeDetail(data.voterHash)
    },
    { value: VOTE_TYPE_GOV_ACTIONS.DREP_KEY_HASH, text: t("vote.drep"), link: details.drep(data.voterHash) },
    { value: VOTE_TYPE_GOV_ACTIONS.DREP_SCRIPT_HASH, text: t("vote.drep"), link: details.drep(data.voterHash) },
    {
      value: VOTE_TYPE_GOV_ACTIONS.STAKING_POOL_KEY_HASH,
      text: t("vote.stakePool"),
      link: details.delegation(data.voterHash)
    }
  ];

  useEffect(() => {
    const checkLink = (voteType: string) => {
      switch (voteType) {
        case VOTE_TYPE_GOV_ACTIONS.CONSTITUTIONAL_COMMITTEE_HOT_KEY_HASH:
          setLink(details.constitutionalCommitteeDetail(data.voterHash));
          return;
        case VOTE_TYPE_GOV_ACTIONS.CONSTITUTIONAL_COMMITTEE_HOT_SCRIPT_HASH:
          setLink(details.constitutionalCommitteeDetail(data.voterHash));
          return;
        case VOTE_TYPE_GOV_ACTIONS.DREP_KEY_HASH:
          setLink(details.drep(data.voterHash));
          return;
        case VOTE_TYPE_GOV_ACTIONS.DREP_SCRIPT_HASH:
          setLink(details.drep(data.voterHash));
          return;
        case VOTE_TYPE_GOV_ACTIONS.STAKING_POOL_KEY_HASH:
          setLink(details.delegation(data.voterHash));
          return;
      }
    };
    checkLink(data.voterType);
  }, [data.voterType]);

  return (
    <CardContainer>
      <ContainerField>
        <TitleField>Voter Type:</TitleField>
        <ValueField>{VOTER_TYPE.find((el) => el.value === data?.voterType)?.text}</ValueField>
      </ContainerField>

      <ContainerField>
        <TitleField>Voter Hash:</TitleField>
        <ValueField>
          <CustomTooltip title={data.voterHash} placement="top">
            <Box
              sx={{ color: theme.palette.primary.main, fontWeight: 500, textDecoration: "underline" }}
              component={"span"}
            >
              <StyledLink to={link}>{getShortHash(data.voterHash)}</StyledLink>
            </Box>
          </CustomTooltip>
        </ValueField>
      </ContainerField>

      <ContainerField>
        <TitleField>Timestamp:</TitleField>
        <ValueField>
          <DatetimeTypeTooltip>{formatDateTimeLocal(data?.timestamp)}</DatetimeTypeTooltip>
        </ValueField>
      </ContainerField>

      <ContainerField>
        <TitleField>Vote:</TitleField>
        <VoteStatus status={data.vote} />
      </ContainerField>

      {data.voterType !== VOTE_TYPE_GOV_ACTIONS.CONSTITUTIONAL_COMMITTEE_HOT_KEY_HASH &&
        data.voterType !== VOTE_TYPE_GOV_ACTIONS.CONSTITUTIONAL_COMMITTEE_HOT_SCRIPT_HASH && (
          <ContainerField>
            <TitleField>{`${t("filter.voitingStake")}:`}</TitleField>
            <ValueField>{data.votingStake === null ? t("N/A") : `${formatADAFull(data.votingStake)} ADA`}</ValueField>
          </ContainerField>
        )}

      {data.voterType !== VOTE_TYPE_GOV_ACTIONS.CONSTITUTIONAL_COMMITTEE_HOT_KEY_HASH &&
        data.voterType !== VOTE_TYPE_GOV_ACTIONS.CONSTITUTIONAL_COMMITTEE_HOT_SCRIPT_HASH && (
          <ContainerField>
            <TitleField>Voting Power:</TitleField>
            <ValueField>{data.votingPower ? `${data.votingPower}%` : t("N/A")}</ValueField>
          </ContainerField>
        )}
    </CardContainer>
  );
}
