interface NativeScripts {
  scriptHash: string;
  numberOfTokens: number;
  numberOfAssetHolders: number;
}

interface ScriptSmartContracts {
  scriptHash: string;
  version: string;
  associatedAddress: string[];
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
