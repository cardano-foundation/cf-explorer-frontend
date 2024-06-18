export const EconomicParameters = [
  {
    title: "The overall goals when managing the economic parameters are to:",
    children: [
      {
        title: "1. Enable long-term economic sustainability for the Cardano Blockchain ecosystem;"
      },
      {
        title: "2. Ensure that stake pools are adequately rewarded for maintaining the Cardano Blockchain;"
      },
      {
        title:
          "3. Ensure that ada holders are adequately rewarded for using stake in constructive ways, including when delegating ada for block production;"
      },
      {
        title: "4. Balance economic incentives for different Cardano stakeholders, including but not limited to:",
        children: [{ title: "a. Stake pool operators" }, { title: "b. Ada holders" }]
      }
    ]
  }
];

export const NetworkParameters = [
  {
    title: "The overall goals when managing the Cardano Blockchain network parameters are to:",
    children: [
      {
        title:
          "1. Match the available Cardano Blockchain Layer 1 network capacity to current or future traffic demands, including:",
        children: [
          { title: "a. Payment transactions" },
          { title: "b. Layer 1 DApps" },
          { title: "c. Sidechain management" },
          { title: "d. Governance needs" }
        ]
      },
      {
        title: "2. Balance traffic demands for different user groups, including:",
        children: [
          { title: "a. Payment transactions" },
          { title: "b. Minters of Fungible/Non-Fungible Tokens" },
          { title: "c. Plutus scripts" },
          { title: "d. DeFi developers" },
          { title: "c. Stake Pool Operators" },
          { title: "d. Voting transactions" }
        ]
      }
    ]
  }
];

export const TechnicalParameters = [
  {
    title: "The overall goals when managing the technical/security parameters are:",
    children: [
      {
        title: "1. Ensure the security of the Cardano Blockchain network in terms of",
        children: [
          { title: "a. Decentralization" },
          { title: "b. Protection against Sybil and 51% attacks" },
          { title: "c. Protection against denial of service attacks" }
        ]
      },
      {
        title: "2. Enable changes to the Plutus language"
      }
    ]
  }
];

export const GovernanceParameters = [
  {
    title: "The overall goals when managing the governance parameters are to:",
    children: [
      {
        title: "1. Ensure governance stability"
      },
      {
        title: "2. Maintain a representative form of governance as outlined in CIP-1694"
      }
    ]
  }
];

export const ExplanationDetailNetwork = [
  { label: "Maximum block body size", explanation: "maxBBSize", description: "The maximum size of a block, in Bytes" },
  {
    label: "Maximum transaction size",
    explanation: "maxTxSize",
    description: "The maximum size of a transaction, in Bytes"
  },
  {
    label: "Maximum block header size",
    explanation: "maxBHSize",
    description:
      "The size of the block header. Note that increasing the block header size may affect the overall block size (maxBlockBodySize)"
  },
  {
    label: "Maximum size of a serialized asset value",
    explanation: "maxValSize",
    description: "The limit on the serialized size of the Value in each output in Bytes"
  },
  {
    label: "Maximum script execution units in a single transaction",
    explanation: "maxTxExUnits",
    description: "The limit on the maximum number of memory units that can be used by Plutus scripts per transaction"
  },
  {
    label: "Maximum script execution units in a single block",
    explanation: "maxBlockExUnits",
    description: "The limit on the maximum number of memory units that can be used by Plutus scripts per block"
  },
  {
    label: "Maximum number of collateral inputs",
    explanation: "axCollateralInputs",
    description: "Defines the maximum number of inputs that can be used for collateral when executing a Plutus script"
  }
];

export const ExplanationDetailEconomic = [
  {
    label: "Minimum fee coefficient",
    explanation: "minFeeA",
    description:
      "Defines the cost for basic transactions in Lovelace\nfee(tx)  =  txFeeFixed + txFeePerByte x nBytes(tx)"
  },
  {
    label: "Minimum fee constant",
    explanation: "minFeeB",
    description:
      "Defines the cost for basic transactions in Lovelace\nfee(tx)  =  txFeeFixed + txFeePerByte x nBytes(tx)"
  },
  {
    label: "Delegation key Lovelace deposit",
    explanation: "keyDeposit",
    description: "Ensures that stake addresses are retired when no longer needed",
    children: [
      { description: "Helps reduce long term storage costs" },
      { description: "Helps limit CPU and memory costs in the ledger" }
    ]
  },
  {
    label: "Pool registration Lovelace deposit",
    explanation: "poolDeposit",
    description:
      "Ensures that stake pools are retired by the stake pool operator when the stake pool is no longer needed by them. Helps reduce long term storage costs"
  },
  {
    label: "Monetary expansion",
    explanation: "rho",
    description: "Part of the rewards mechanism.",
    children: [
      { description: "The monetary expansion controls the amount of reserves that is used for rewards each epoch" },
      { description: "Governs the long-term sustainability of Cardano" }
    ]
  },
  {
    label: "Treasury expansion",
    explanation: "tau",
    description:
      "Part of the rewards mechanism. The treasury cut portion of the monetary expansion is transferred to the treasury before any pool rewards are paid. Can be set in the range 0.0-1.0 (0%-100%)"
  },
  {
    label: "Minimum fixed rewards cut for pools",
    explanation: "minPoolCost",
    description:
      "Part of the rewards mechanism. The minimum pool cost is transferred to the pool rewards address before any delegator rewards are paid"
  },
  {
    label: "Minimum Lovelace deposit per byte of serialized UTxO",
    explanation: "coinsPerUTxOByte",
    description: "Defines the cost for using Plutus reference scripts in Lovelace"
  },
  {
    label: "Prices of Plutus execution units",
    explanation: "prices",
    description:
      "Defines the fees for executing Plutus scripts. Gives an economic return for Plutus script execution. Provides security against low-cost DoS attacks. "
  }
];

export const ExplanationDetailTechnical = [
  {
    label: "Pool pledge influence",
    explanation: "a0",
    description: "Defines the maximum number of epochs notice that a pool can give when planning to retire"
  },
  {
    label: "poolRetireMaxEpoch",
    explanation: "eMax",
    description: "Defines the maximum number of epochs notice that a pool can give when planning to retire"
  },
  {
    label: "Desired number of pools",
    explanation: "nOpt",
    description: "Sets the target number of stake pools",
    children: [
      { description: "The expected number of pools when the network is in the equilibrium state" },
      { description: "Primarily a security parameter, ensuring decentralization by pool division/replication" },
      {
        description:
          "Has an economic effect as well as a security affect  - economic advice is also required when changing this parameter"
      },
      { description: "Large changes in this parameter will trigger mass redelegation events" }
    ]
  },
  {
    label: "Plutus execution cost models",
    explanation: "costModels",
    description:
      "Define the base costs for each Plutus primitive in terms of CPU and memory unit. There are about 150 distinct micro-parameters in total.\nCost models are defined for each Plutus language version. A new language version may introduce additional micro-parameters or remove existing micro-parameters"
  },
  {
    label: "Proportion of collateral needed for scripts",
    explanation: "collateralPercentage",
    description:
      "Defines how much collateral must be provided when executing a Plutus script as a percentage of the normal execution cost",
    children: [
      {
        description: "Collateral is used to pay for failed script execution instead of the usual script execution fees"
      },
      { description: "If a script fails to execute, then the collateral is lost" },
      { description: "The collateral is never lost if a script executes successfully" },
      { description: "By making it more expensive rather than less expensive to execute failed scripts" }
    ]
  }
];

export const ExplanationDetailGovernance = [
  {
    label: "Governance voting thresholds",
    explanation: "𝑃1, 𝑃2𝑎, 𝑃2𝑏, 𝑃3, 𝑃4, 𝑃5𝑎, 𝑃5𝑏, 𝑃5𝑐, 𝑃5𝑑, 𝑃6, 𝑄1, 𝑄2𝑎, 𝑄2𝑏, 𝑄4, 𝑄5",
    description: "Defines the maximum number of epochs notice that a pool can give when planning to retire"
  },
  {
    label: "Governance action maximum lifetime in epochs",
    explanation: "govActionLifetime",
    description:
      "The period after which a governance action will expire if it is not enacted (as a whole number of epochs)"
  },
  {
    label: "Governance action deposit",
    explanation: "govActionDeposit",
    description: "Sets the target number of stake pools",
    children: [
      { description: "The expected number of pools when the network is in the equilibrium state" },
      { description: "Primarily a security parameter, ensuring decentralization by pool division/replication" },
      {
        description:
          "Has an economic effect as well as a security affect  - economic advice is also required when changing this parameter"
      },
      { description: "Large changes in this parameter will trigger mass redelegation events" }
    ]
  },
  {
    label: "DRep activity period in epochs",
    explanation: "drepActivity",
    description:
      "The period after which a DRep is considered to be inactive for vote calculation purposes, if they do not vote on any proposal (as a whole number of epochs)"
  },
  {
    label: "Minimal constitutional committee size",
    explanation: "ccMinSize",
    description:
      "Defines how much collateral must be provided when executing a Plutus script as a percentage of the normal execution cost",
    children: [
      {
        description: "Collateral is used to pay for failed script execution instead of the usual script execution fees"
      },
      { description: "If a script fails to execute, then the collateral is lost" },
      { description: "The collateral is never lost if a script executes successfully" },
      { description: "By making it more expensive rather than less expensive to execute failed scripts" }
    ]
  },
  {
    label: "Maximum term length (in epochs) for the constitutional committee members",
    explanation: "ccMaxTermLength",
    description:
      "Defines how much collateral must be provided when executing a Plutus script as a percentage of the normal execution cost",
    children: [
      {
        description: "Collateral is used to pay for failed script execution instead of the usual script execution fees"
      },
      { description: "If a script fails to execute, then the collateral is lost" },
      { description: "The collateral is never lost if a script executes successfully" },
      { description: "By making it more expensive rather than less expensive to execute failed scripts" }
    ]
  }
];
