class Epoch():
  """
  Epoch
  """

  def __init__(self, epoch_no, out_sum, fees, tx_count, blk_count,
               start_time, end_time, first_block_time,
               last_block_time,
               active_stake, total_rewards, avg_blk_reward):
    self.tx_count = tx_count
    self.fees = fees
    self.blk_count = blk_count
    self.start_time = start_time
    self.end_time = end_time
    self.first_block_time = first_block_time
    self.last_block_time = last_block_time
    self.active_stake = active_stake
    self.total_rewards = total_rewards
    self.avg_blk_reward = avg_blk_reward
    self.out_sum = out_sum
    self.epoch_no = epoch_no

  epoch_no = ''
  out_sum = ''
  fees = ''
  tx_count = ''
  blk_count = ''
  start_time = ''
  end_time = ''
  first_block_time = ''
  last_block_time = ''
  active_stake = ''
  total_rewards = ''
  avg_blk_reward = ''
