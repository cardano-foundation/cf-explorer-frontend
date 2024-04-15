interface DrepOverview {
  activeVoteStake: number;
  anchorUrl: string;
  anchorHash: string;
  createdAt: string;
  delegators: number;
  drepHash: string;
  drepId: string;
  liveStake: number;
  status: "ACTIVE" | "INACTIVE" | "RETIRED";
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

interface OverViewDreps {
  countDownEndTime: number;
  delegators: number;
  epochNo: number;
  epochSlotNo: number;
  liveStake: number;
  activePools: number;
  retiredPools: number;
  activeStake: number;
  totalDReps: number;
  activeDReps: number;
  inactiveDReps: number;
  retiredDReps: number;
  abstainDReps: number;
  noConfidenceDReps: number;
  registeredDReps: number;
  totalAdaStaked: number;
}

interface Drep {
  activeVoteStake: number;
  anchorHash: string;
  anchorUrl: string;
  createdAt: string;
  drepHash: string;
  drepId: string;
  status: "ACTIVE" | "INACTIVE" | "RETIRED";
  updatedAt: string;
  votingPower: number;
}
