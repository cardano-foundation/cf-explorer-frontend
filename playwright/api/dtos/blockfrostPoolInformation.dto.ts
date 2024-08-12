export interface BlockfrostStakePoolDto {
  pool_id: string;
  hex: string;
  vrf_key: string;
  blocks_minted: number;
  blocks_epoch: number;
  live_stake: string;
  live_size: number;
  live_saturation: number;
  live_delegators: number;
  active_stake: string;
  active_size: number;
  declared_pledge: string;
  live_pledge: string;
  margin_cost: number;
  fixed_cost: string;
  reward_account: string;
  owners: string[];
  registration: string[];
  retirement: string[];
}
export interface BlockfrostHistoryPoolDto {
  epoch: number;
  blocks: number;
  active_stake: string;
  active_size: number;
  delegators_count: number;
  rewards: string;
  fees: string;
}

export interface BlockfrostMetadataPoolDto {
  pool_id: string;
  hex: string;
  url: string;
  hash: string;
  ticker: string;
  name: string;
  description: string;
  homepage: string;
}
