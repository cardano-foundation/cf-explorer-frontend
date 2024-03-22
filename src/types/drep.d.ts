interface DrepOverview {
  activeVoteStake: number;
  anchorUrl: string;
  createdAt: string;
  delegators: number;
  drepHash: string;
  drepId: string;
  liveStake: number;
  status: "ACTIVE" | "INACTIVE";
  votingParticipation: number;
  type: string;
}
