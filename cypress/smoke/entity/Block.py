class Block():
  """
  Block
  """

  def __init__(self, hash, epoch_no, abs_slot, epoch_slot, block_height, block_size, block_time, tx_count, vrf_key,
               pool, op_cert_counter, proto_major, proto_minor):
    self.vrf_key = vrf_key
    self.tx_count = tx_count
    self.block_time = block_time
    self.block_size = block_size
    self.block_height = block_height
    self.epoch_slot = epoch_slot
    self.abs_slot = abs_slot
    self.proto_major = proto_major
    self.pool = pool
    self.op_cert_counter = op_cert_counter
    self.proto_minor = proto_minor
    self.epoch_no = epoch_no
    self.hash = hash
