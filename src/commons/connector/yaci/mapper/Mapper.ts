import { TxUtxo } from "../types";

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
