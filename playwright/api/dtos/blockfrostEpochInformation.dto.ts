export interface BlockfrostEpochInformationDto {
  epoch: number;
  start_time: number;
  end_time: number;
  first_block_time: number;
  last_block_time: number;
  block_count: number;
  tx_count: number;
  output: string;
  fees: string;
  active_stake: string;
}
