import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";

import { fireEvent, render, screen } from "src/test-utils";
import { details } from "src/commons/routers";

import TransactionMetadata from ".";

const mockTransaction = {
  tx: {
    hash: "transaction-hash",
    time: "2022-01-01 12:00:00",
    blockNo: 123,
    epochSlot: 456,
    epochNo: 789,
    status: "PENDDING",
    confirmation: 10,
    fee: 100,
    totalOutput: 1000,
    maxEpochSlot: 1000
  },
  summary: {
    stakeAddress: [
      {
        address: "stake-address-1",
        value: 100,
        tokens: []
      },
      {
        address: "stake-address-2",
        value: 200,
        fee: 10,
        tokens: []
      }
    ]
  },
  contracts: [
    {
      contract: "contract-1",
      address: "address-1",
      datumBytesIn: "datum-in",
      datumBytesOut: "datum-out",
      datumHashIn: "datum-hash-in",
      datumHashOut: "datum-hash-out",
      purpose: "purpose",
      redeemerBytes: "redeemer-bytes",
      redeemerMem: 100,
      redeemerSteps: 200,
      scriptBytes: "script-bytes",
      scriptHash: "script-hash"
    }
  ],
  collaterals: {
    collateralInputResponses: [
      {
        address: "address-1",
        assetId: "asset-id-1",
        index: "index-1",
        txHash: "tx-hash-1",
        value: 100,
        tokens: []
      }
    ],
    collateralOutputResponses: [
      {
        address: "address-2",
        assetId: "asset-id-2",
        index: "index-2",
        txHash: "tx-hash-2",
        value: 200,
        tokens: []
      }
    ]
  },
  notes: [
    {
      note: "note-1"
    },
    {
      note: "note-2"
    }
  ],
  utxOs: {
    inputs: [
      {
        address: "address-1",
        value: 100,
        txHash: "tx-hash-1",
        index: "index-1",
        tokens: []
      }
    ],
    outputs: [
      {
        address: "address-2",
        value: 200,
        txHash: "tx-hash-2",
        tokens: [],
        index: "index-2"
      }
    ]
  },
  mints: [
    {
      assetName: "asset-1",
      assetId: "asset-id-1",
      assetQuantity: 100,
      policy: "policy-1",
      metadata: {
        decimals: 18,
        description: "Token Description",
        logo: "token-logo.png",
        ticker: "TKN",
        url: "https://example.com/token"
      }
    }
  ],
  protocols: {},
  previousProtocols: {},
  delegations: [
    {
      address: "address-1",
      poolId: "pool-id-1"
    },
    {
      address: "address-2",
      poolId: "pool-id-2"
    }
  ],
  withdrawals: [
    {
      stakeAddressFrom: "stake-address-1",
      addressTo: ["address-1", "address-2"],
      amount: 0
    }
  ],
  poolCertificates: [
    {
      cost: 100,
      margin: 0.02,
      metadataHash: "metadata-hash-1",
      metadataUrl: "https://example.com/metadata",
      pledge: 1000,
      poolId: "pool-id-1",
      poolOwners: ["owner-1", "owner-2"],
      relays: [
        {
          dnsName: "relay-1",
          dnsSrvName: "relay-1-srv",
          ipv4: "127.0.0.1",
          ipv6: "::1",
          port: 3001
        }
      ],
      rewardAccount: "reward-account-1",
      type: "POOL_REGISTRATION",
      vrfKey: "vrf-key-1",
      epoch: 123
    }
  ],
  stakeCertificates: [
    {
      stakeAddress: "stake-address-1",
      type: "STAKE_REGISTRATION"
    }
  ],
  instantaneousRewards: [
    {
      amount: "100",
      stakeAddress: "stake-address-1"
    }
  ],
  metadataHash: "metadata-hash-2",
  metadata: [
    {
      label: 1,
      value: "value-1"
    },
    {
      label: 2,
      value: "value-2"
    }
  ]
} as Transaction;

describe("TransactionMetadata component", () => {
  it("should component render", () => {
    render(<TransactionMetadata data={mockTransaction} loading={false} />);
    expect(screen.getByRole("tab", { name: /summaryicon\.svg summary/i })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: /utxoicon\.svg utxos/i })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: /contracticon\.svg contracts\(1\)/i })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: /noteicon\.svg notes\(2\)/i })).toBeInTheDocument();
  });

  it("should user goto detail page", () => {
    const {
      summary: { stakeAddress }
    } = mockTransaction;

    const history = createBrowserHistory();
    render(
      <Router history={history}>
        <TransactionMetadata data={mockTransaction} loading={false} />
      </Router>
    );
    fireEvent.click(screen.getByRole("link", { name: stakeAddress[0].address }));
    expect(history.location.pathname).toBe(details.stake(stakeAddress[0].address));
  });
});
