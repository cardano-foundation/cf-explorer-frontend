import { BlockDto, TxUtxo } from "../types";

export function mapTxUtxoToUtxo(input: TxUtxo) {
  return {
    address: input.address || "",
    stakeAddress: input.stakeAddress || "",
    value:
      input.amount! && input.amount.length > 0 && input.amount![0].unit === "lovelace" ? input.amount![0].quantity! : 0,
    txHash: input.txHash || "",
    index: input.outputIndex ? input.outputIndex.toString() : "",
    tokens: (input.amount!.length > 0 && input.amount![0].unit === "lovelace"
      ? input.amount!.slice(1)
      : input.amount!
    ).map((amount) => {
      // TODO move all types to types folder
      return {
        assetName: amount.assetName,
        assetId: amount.unit!.replace(amount.policyId!, ""),
        assetQuantity: amount.quantity,
        policy: {
          policyId: amount.policyId,
          totalToken: 0, // TODO: need to implement
          policyScript: "" // TODO: need to implement
        }
      } as Token;
    })
  };
}

export function mapTxUtxoToCollateralResponse(input: TxUtxo): CollateralResponses {
  return {
    address: input.address || "",
    assetId: "", // TODO: need to implement
    index: input.outputIndex ? input.outputIndex.toString() : "",
    txHash: input.txHash || "",
    value: input.amount && input.amount[0].assetName === "lovelace" ? input.amount[0].quantity! : 0,
    tokens: input.amount!.map((amount) => {
      return {
        assetName: amount.assetName,
        assetId: amount.unit!.replace(amount.policyId!, ""),
        assetQuantity: amount.quantity,
        policy: {
          policyId: amount.policyId,
          totalToken: 0, // TODO: need to implement
          policyScript: "" // TODO: need to implement
        }
      } as Token;
    })
  };
}

export function mapBlockDTOToBlock(input: BlockDto): Block {
  return {
    time: input.time ? input.time!.toString() : "",
    blockNo: input.number || 0,
    hash: input.hash || "",
    slotNo: input.slot || 0,
    epochNo: input.epoch || 0,
    epochSlotNo: input.epochSlot || 0,
    slotLeader: input.slotLeader || "",
    txCount: input.txCount || 0,
    totalOutput: input.output || 0,
    totalFees: input.fees || 0,
    maxEpochSlot: 0,
    poolName: "",
    poolTicker: "",
    poolView: "",
    description: ""
  };
}
