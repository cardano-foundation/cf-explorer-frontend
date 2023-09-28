import { ProtocolHistory } from "src/types/protocol";

export const explainerTextProtocolHistory: Record<keyof Omit<ProtocolHistory, "epochChanges">, string> = {
  minFeeA: "Additional transaction fee per byte of data (in lovelace).",
  minFeeB: "Base transaction fee (in lovelace).",
  maxBlockSize: "Maximum size of a block body. Limits blockchain storage size, and communication costs.",
  maxTxSize:
    "Maximum size of a transaction. Several transactions may be included in a block. Must be strictly less than the max. block body size.",
  maxBhSize: "Maximum size of the block header. Should be significantly less than the maximum block size.",
  keyDeposit:
    "Deposit charged for stake keys (in Lovelace). Ensures that unused keys are returned, so freeing resources.",
  poolDeposit: "Pool deposit (in lovelace).",
  maxEpoch: "Maximum number of epochs within which a pool can be announced to retire, starting from the next epoch.",
  optimalPoolCount: `Target number of pools ("k"). Impacts saturation threshold, encouraging growth in number of stake pools.`,
  influence: '"Influence Factor". Governs how much impact the pledge has on rewards.',
  monetaryExpandRate:
    "Monetary expansion rate per epoch. Governs the rewards that are returned from reserves to the ecosystem (treasury, stake pools and delegators).",
  treasuryGrowthRate:
    "Treasury rate (0.2 = 20%). Proportion of total rewards allocated to treasury each epoch before remaining rewards are distributed to pools.",
  decentralisation:
    "Level of decentralisation. Starts at 1. Block production is fully decentralised when this reaches 0.",
  entropy:
    "Should additional entropy be included in the initial phases. This provides additional certainty that the blockchain has not been compromised by the seed key holders. Redundant once the system is sufficiently decentralised.",
  protocolMajor: "Protocol version. Major version 1 = Byron, 2 = Shelley. ",
  protocolMinor: "Protocol version. Minor versions indicate software updates (will generally be 0).",
  minUtxoValue:
    "Minimum allowed value in a UTxO. Security-related parameter used to prevent the creation of many small UTxOs that could use excessive resource to process.",
  minPoolCost: "Minimum Pool Cost per epoch (in lovelace). Enables pledge effect.",
  costModel: "Detailed cost models for each Plutus version.",
  priceMem: "Fee per Plutus execution per memory unit",
  priceStep: "Fee per Plutus execution step",
  maxTxExMem: "Maximum number of memory units in a single transaction.",
  maxTxExSteps: "Maximum number of steps in a single transaction.",
  maxBlockExMem: "Maximum number of memory units in a single block.",
  maxBlockExSteps: "Maximum number of steps in a single block.",
  maxValSize: "The limit on the serialized size of the Value in each output.",
  collateralPercent: "Percentage of fee that is used as collateral for a failed transaction.",
  maxCollateralInputs: "Maximum number of collateral inputs in a transaction.",
  coinsPerUTxOByte:
    "Starting in the Babbage era, update proposals that want to modify coinsPerUTxOByte must bear in mind that the measurement is in bytes, not words. In the Alonzo era, deposit charged per word of UTxO storage."
};

export const explainerTextGlobalConstants: Record<string, string> = {
  activeSlotsCoeff:
    "The fraction of the total number of slots that will, on average, be selected to include a block in the chain. Smaller numbers increase security, but reduce efficiency.",
  genDelegs:
    "Details of the public keys that have been selected by each of the genesis keys to act as a delegate for signing protocol updates etc.",
  updateQuorum: "How many of the genesis delegate keys must endorse an update proposal.",
  networkId: "Is this a testnet or mainnet",
  initialFunds: "initial distribution of funds to addresses.",
  maxLovelaceSupply: "The limit on the maximum number of lovelace that can be in circulation.",
  networkMagic: "A magic number used to distinguish different networks.",
  epochLength: "The number of slots in an epoch.",
  timestamp: "When did the system originally start operation.",
  slotsPerKESPeriod: "After how many slots will a pool's operational key pair evolve (Key Evolving Signatures).",
  slotLength: "The length of each slot (in seconds).",
  maxKESEvolutions:
    "What is the maximum number of times a KES key pair can evolve before a new KES key pair must be generated from the master keys.",
  securityParam:
    "After how many blocks is the blockchain considered to be final, and thus can no longer be rolled back (i.e. what is the maximum allowable length of any chain fork)."
};
