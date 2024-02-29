interface NativeScripts {
  scriptHash: string;
  numberOfTokens: number;
  numberOfAssetHolders: number;
}

type NativeScriptsList = {
  before: string;
  after: string;
  isMultiSig: boolean;
  numberOfAssetHolders: number;
  numberOfTokens: number;
  scriptHash: string;
  isOpen: boolean;
  tokens: {
    displayName: string;
    fingerprint: string;
    name: string;
    policy: string;
    policyIsNativeScript: boolean;
    metadata: {
      decimals: number;
      description: string;
      logo: string;
      ticker: string;
      url: string;
    };
  }[];
};

interface ScriptSmartContracts {
  scriptHash: string;
  scriptVersion: "PLUTUSV2" | "PLUTUSV1";
  txCount: number;
  txPurposes: ["SPEND" | "MINT" | "CERT" | " REWARD"];
}

interface ScriptAssociatedAddress {
  scriptHash: string;
  scriptType: string;
  associatedAddresses: string[];
}

interface ScriptContractTransactions {
  hash: string;
  time: string;
  blockNo: number;
  epochNo: number;
  epochSlotNo: number;
  absoluteSlot: number;
  addresses: string[];
  scriptPurposeTypes: string[];
}
