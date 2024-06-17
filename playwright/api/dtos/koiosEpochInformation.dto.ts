export interface KoiosEpochInformationDto {
  epoch_no: number;
  out_sum: string;
  fees: string;
  tx_count: number;
  blk_count: number;
  start_time: number;
  end_time: number;
  first_block_time: number;
  last_block_time: number;
  active_stake: string;
  total_rewards: string | null;
  avg_blk_reward: string;
}
