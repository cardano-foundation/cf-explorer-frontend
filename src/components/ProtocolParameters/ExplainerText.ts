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
        children: [
          { title: "a. Stake pool operators" },
          { title: "b. Ada holders" },
          { title: "c. DeFi users" },
          { title: "d. Infrastructure users" },
          { title: "e. Developers (e.g. DApps)" },
          { title: "f. Financial intermediaries (e.g. Exchanges)" }
        ]
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
          { title: "e. Stake Pool Operators" },
          { title: "f. Voting transactions" }
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
  {
    label: "Maximum block body size",
    explanation: "maxBBSize",
    description: "Maximum size of a block body. Limits blockchain storage size and communication costs."
  },
  {
    label: "Maximum transaction size",
    explanation: "maxTxSize",
    description:
      "	Maximum size of a transaction. While several transactions may be included in a block, the maximum transaction size must be strictly less than the maximum block size."
  },
  {
    label: "Maximum block header size",
    explanation: "maxBHSize",
    description: "Maximum size of the block header, which should be significantly less than the maximum block size."
  },
  {
    label: "Maximum size of a serialized asset value",
    explanation: "maxValSize",
    description: "The limit on the serialized size of the Value in each output in Bytes"
  },
  {
    label: "Maximum number of memory units in a single transaction",
    explanation: "maxTxExMem",
    description: "Maximum number of Plutus memory units that can be used in a single transaction."
  },
  {
    label: "Maximum number of steps in a single transaction",
    explanation: "maxTxExSteps",
    description: "Maximum number of Plutus execution steps that can be used in a single transaction."
  },
  {
    label: "Maximum number of memory units in a single transaction",
    explanation: "maxBlockExMem",
    description: "Maximum number of Plutus execution steps that can be used in a single block."
  },
  {
    label: "Maximum number of steps in a single block",
    explanation: "maxBlockExSteps",
    description: "The limit on the maximum number of CPU steps that can be used by Plutus scripts per block"
  },
  {
    label: "Maximum number of collateral inputs",
    explanation: "maxCollateralInputs",
    description: "Maximum number of collateral inputs in a transaction."
  }
];

export const ExplanationDetailEconomic = [
  {
    label: "Minimum fee coefficient",
    explanation: "minFeeA",
    description: "Additional transaction fee per byte of data (in lovelace)."
  },
  {
    label: "Minimum fee constant",
    explanation: "minFeeB",
    description: "Base transaction fee (in lovelace)."
  },
  {
    label: "Delegation key Lovelace deposit",
    explanation: "keyDeposit",
    description:
      "Deposit charged for stake keys (in Lovelace), which ensures that unused keys are returned thus freeing resources."
  },
  {
    label: "Pool registration Lovelace deposit",
    explanation: "poolDeposit",
    description: "Pool deposit (in lovelace)."
  },
  {
    label: "Monetary expansion",
    explanation: "rho",
    description:
      "Monetary expansion rate per epoch, which governs the rewards that are returned from reserves to the ecosystem (treasury, stake pools, and delegators)."
  },
  {
    label: "Treasury expansion",
    explanation: "tau",
    description:
      "Treasury rate (0.2 = 20%). The proportion of total rewards allocated to treasury each epoch before the remaining rewards are distributed to pools."
  },
  {
    label: "Minimum fixed rewards cut for pools",
    explanation: "minPoolCost",
    description: "Minimum pool cost per epoch (in lovelace), which enables the pledge effect."
  },
  {
    label: "Minimum Lovelace deposit per byte of serialized UTxO",
    explanation: "coinsPerUTxOByte",
    description: "Defines the cost for using Plutus reference scripts in Lovelace"
  },
  {
    label: "Fee per Plutus execution step",
    explanation: "priceStep",
    description:
      "Defines the fees for executing Plutus scripts. Gives an economic return for Plutus script execution. Provides security against low-cost DoS attacks. "
  },
  {
    label: "Prices of Plutus execution units",
    explanation: "priceMem",
    description:
      "Defines the fees for executing Plutus scripts. Gives an economic return for Plutus script execution. Provides security against low-cost DoS attacks. "
  }
];

export const ExplanationDetailTechnical = [
  {
    label: "Pool pledge influence",
    explanation: "a0",
    description: "The ‘influence factor’ that governs how much impact the pledge has on rewards."
  },
  {
    label: "PoolRetireMaxEpoch",
    explanation: "eMax",
    description: "Maximum number of epochs within which a pool can be announced to retire starting from the next epoch."
  },
  {
    label: "Desired number of pools",
    explanation: "nOpt",
    description:
      "The target number of stake pools, also known as k, impacts the saturation threshold and encourages the growth of stake pools."
  },
  {
    label: "Plutus execution cost models",
    explanation: "costModels",
    description: "Plutus cost models."
  },
  {
    label: "Proportion of collateral needed for scripts",
    explanation: "collateralPercentage",
    description: "Percentage of fee that is used as collateral for a failed transaction."
  }
];

export const ExplanationDetailGovernance = [
  {
    label: "Governance action maximum lifetime in epochs",
    explanation: "govActionLifetime",
    description:
      "The period after which a governance action will expire if it is not enacted (as a whole number of epochs)"
  },
  {
    label: "Governance action deposit",
    explanation: "govActionDeposit",
    description:
      "The deposit that is charged when submitting a governance action. Helps to limit the number of actions that are submitted."
  },
  {
    label: "DRep deposit amount",
    explanation: "drepDeposit",
    description: "The deposit that is charged when registering a DRep. Helps to limit the number of active DReps."
  },
  {
    label: "DRep deposit amount",
    explanation: "drepDeposit",
    description: "The deposit that is charged when registering a DRep. Helps to limit the number of active DReps."
  },
  {
    label: "DRep activity period in epochs",
    explanation: "drepActivity",
    description: "The deposit that is charged when registering a DRep. Helps to limit the number of active DReps."
  },
  {
    label: "Minimal constitutional committee size",
    explanation: "ccMinSize",
    description:
      "The least number of members that can be included in a constitutional committee following a governance action to change the Constitutional Committee.",
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

export const displayTooltipNetwork = {
  maxBBSize: { description: "Maximum size of a block body. Limits blockchain storage size and communication costs." },
  maxTxSize: {
    description:
      "	Maximum size of a transaction. While several transactions may be included in a block, the maximum transaction size must be strictly less than the maximum block size."
  },
  maxBHSize: {
    description: "Maximum size of the block header, which should be significantly less than the maximum block size."
  },
  maxValSize: { description: "The limit on the serialized size of the Value in each output in Bytes" },
  maxTxExMem: {
    description: "Maximum number of Plutus memory units that can be used in a single transaction."
  },
  maxTxExSteps: {
    description: "Maximum number of Plutus execution steps that can be used in a single transaction."
  },
  maxBlockExMem: {
    description: "Maximum number of Plutus execution steps that can be used in a single block."
  },
  maxBlockExSteps: {
    description: "The limit on the maximum number of CPU steps that can be used by Plutus scripts per block"
  },
  maxCollateralInputs: {
    description: "Maximum number of collateral inputs in a transaction."
  }
};

export const displayTooltipEconomic = {
  minFeeA: {
    description: "Additional transaction fee per byte of data (in lovelace)."
  },
  minFeeB: {
    description: "Base transaction fee (in lovelace)."
  },
  keyDeposit: {
    description:
      "Deposit charged for stake keys (in Lovelace), which ensures that unused keys are returned thus freeing resources."
  },
  poolDeposit: {
    description: "Pool deposit (in lovelace)."
  },
  rho: {
    description:
      "Monetary expansion rate per epoch, which governs the rewards that are returned from reserves to the ecosystem (treasury, stake pools, and delegators)."
  },
  tau: {
    description:
      "Treasury rate (0.2 = 20%). The proportion of total rewards allocated to treasury each epoch before the remaining rewards are distributed to pools."
  },
  minPoolCost: {
    description: "Minimum pool cost per epoch (in lovelace), which enables the pledge effect."
  },
  coinsPerUTxOByte: { description: "Defines the cost for using Plutus reference scripts in Lovelace" },
  priceStep: {
    description:
      "Defines the fees for executing Plutus scripts. Gives an economic return for Plutus script execution. Provides security against low-cost DoS attacks. "
  },
  priceMem: {
    description:
      "Defines the fees for executing Plutus scripts. Gives an economic return for Plutus script execution. Provides security against low-cost DoS attacks."
  }
};

export const displayTooltipTechnical = {
  a0: {
    description: "The ‘influence factor’ that governs how much impact the pledge has on rewards."
  },
  eMax: {
    description: "Maximum number of epochs within which a pool can be announced to retire starting from the next epoch."
  },
  nOpt: {
    description:
      "The target number of stake pools, also known as k, impacts the saturation threshold and encourages the growth of stake pools."
  },
  costModels: {
    description: "Plutus cost models."
  },
  collateralPercentage: {
    description: "	Percentage of fee that is used as collateral for a failed transaction."
  }
};

export const displayTooltipGovernance = {
  govActionLifetime: {
    description:
      "The period after which a governance action will expire if it is not enacted (as a whole number of epochs)"
  },
  govActionDeposit: {
    description:
      "The deposit that is charged when submitting a governance action. Helps to limit the number of actions that are submitted."
  },
  drepDeposit: {
    description: "The deposit that is charged when registering a DRep. Helps to limit the number of active DReps."
  },
  drepActivity: {
    description:
      "The period after which a DRep is considered to be inactive for vote calculation purposes, if they do not vote on any proposal (as a whole number of epochs)."
  },
  ccMinSize: {
    description:
      "The least number of members that can be included in a constitutional committee following a governance action to change the Constitutional Committee.",
    children: [
      {
        description: "Collateral is used to pay for failed script execution instead of the usual script execution fees"
      },
      { description: "If a script fails to execute, then the collateral is lost" },
      { description: "The collateral is never lost if a script executes successfully" },
      { description: "By making it more expensive rather than less expensive to execute failed scripts" }
    ]
  },
  ccMaxTermLength: {
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
};
