interface DrepOverview {
  activeVoteStake: number;
  anchorUrl: string;
  anchorHash: string;
  createdAt: string;
  delegators: number;
  drepHash: string;
  drepId: string;
  liveStake: number;
  status: "ACTIVE" | "INACTIVE";
  votingParticipation: number;
  type: string;
}

interface DrepOverviewChart {
  drepHash: string;
  govActionType:
    | "PARAMETER_CHANGE_ACTION"
    | "HARD_FORK_INITIATION_ACTION"
    | "TREASURY_WITHDRAWALS_ACTION"
    | "NO_CONFIDENCE"
    | "UPDATE_COMMITTEE"
    | "NEW_CONSTITUTION"
    | "INFO_ACTION"
    | "ALL";
  numberOfAbstainVotes: number | null;
  numberOfNoVotes: number | null;
  numberOfYesVote: number | null;
}
