export interface TrxContract {
  tx_index: number;
  purpose: string;
  script_hash: string;
  redeemer_data_hash: string;
  unit_mem: string;
  unit_steps: string;
  fee: string;
}

export interface TrxStakeCert {
  cert_index: number;
  address: string;
  registration: boolean;
}

export interface TrxDeregisPoolCert {
  cert_index: number;
  pool_id: string;
  retiring_epoch: number;
}

export interface TrxDelegationCert {
  index: number;
  cert_index: number;
  address: string;
  pool_id: string;
  active_epoch: number;
}

export interface TrxInstantaneousReward {
  pot: string;
  cert_index: number;
  address: string;
  amount: string;
}

export interface TrxRegisPoolCert {
  cert_index: number;
  pool_id: string;
  vrf_key: string;
  pledge: string;
  margin_cost: number;
  fixed_cost: string;
  reward_account: string;
  owners: string[];
  metadata: {
    url: string;
    hash: string;
    ticker: string;
    name: string;
    description: string;
    homepage: string;
  };
  relays: [
    {
      ipv4: string;
      ipv6: string;
      dns: string;
      dns_srv: string;
      port: number;
    }
  ];
  active_epoch: number;
}
