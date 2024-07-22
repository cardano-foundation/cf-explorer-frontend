interface GOoverview {
  activeDReps: number;
  activeSPOs: number;
  activeCommittees: number;
  totalGovActions: number;
  govCountMap: {
    PARAMETER_CHANGE_ACTION: number;
    UPDATE_COMMITTEE: number;
    INFO_ACTION: number;
    NEW_CONSTITUTION: number;
    NO_CONFIDENCE: number;
    HARD_FORK_INITIATION_ACTION: number;
    TREASURY_WITHDRAWALS_ACTION: number;
  };
  govStatusMap: {
    EXPIRED: number;
    ENACTED: number;
    OPEN_BALLOT: number;
  };
}

interface OverViewDelegationTab {
  name: string;
  txHash: string;
  index: number;
  type: string;
  vote: null;
  status: string;
  votingPower: number;
  indexType: number;
  isRepeatVote: null;
  voterHash: null;
  createdAt: string;
}
