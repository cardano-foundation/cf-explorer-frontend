interface CCOVerview {
  currentState: "NORMAL" | "NO_CONFIDENCE";
  proposalPolicy: string;
  activeMembers: number;
  threshold: number;
  governanceVotes: number;
  lastUpdate: string;
}

interface CCDetailOVerview {
  publicKey: string;
  scriptHash: string;
  status: "ACTIVE" | "EXPIRED";
  expiredEpoch: number;
  activeEpoch: number;
  registeredAt: string;
  termDuration: number;
  votingParticipation: number;
  resignedAt: string;
}

interface CCMember {
  publicKey: string;
  scriptHash: string;
  status: "ACTIVE" | "EXPIRED";
  expiredEpoch: number;
  activeEpoch: number;
  registeredAt: string;
  termDuration: number;
  votingParticipation: number;
  resignationInfo: string;
}

interface CCHistory {
  txHash: string;
  index: number;
  type:
    | "PARAMETER_CHANGE_ACTION"
    | "HARD_FORK_INITIATION_ACTION"
    | "TREASURY_WITHDRAWALS_ACTION"
    | "NO_CONFIDENCE"
    | "UPDATE_COMMITTEE"
    | "NEW_CONSTITUTION"
    | "INFO_ACTION"
    | "ALL";
  vote: "NO" | "YES" | "ABSTAIN" | "NONE" | "ANY";
  status: "ANY" | "OPEN_BALLOT" | "RATIFIED" | "ENACTED" | "EXPIRED";
  votingPower: number;
  indexType: number;
  isRepeatVote: boolean;
  voterHash: string;
  createdAt: string;
}
