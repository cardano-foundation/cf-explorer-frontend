import axios from "axios";

import { ApiConnector } from "../ApiConnector";
import { ApiReturnType } from "../types/APIReturnType";
import { TRANSACTION_STATUS } from "../../utils/constants";
import { TransactionDetails } from "./types";
import { mapTxUtxoToUtxo } from "./mapper/Mapper";

export class YaciConnector implements ApiConnector {
  baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async getBlocks(): Promise<ApiReturnType<Block[]>> {
    const response = await axios.get<{ total: number; total_pages: number; blocks: { number: number }[] }>(
      `${this.baseUrl}/blocks`
    );
    const blocks: Block[] = [];
    // getting additional data
    for (const block of response.data.blocks) {
      blocks.push((await this.getBlockDetail(block.number)).data as Block);
    }
    return {
      data: blocks,
      total: response.data.total,
      totalPage: response.data.total_pages,
      lastUpdated: Date.now()
    } as ApiReturnType<Block[]>;
  }

  async getBlockDetail(blockId: number | string): Promise<ApiReturnType<Block>> {
    if (!blockId) {
      return {
        data: null,
        lastUpdated: Date.now()
      } as ApiReturnType<Block>;
    }
    const response = await axios.get(`${this.baseUrl}/blocks/${blockId}`);
    const block: Block = {
      time: response.data.time,
      blockNo: response.data.number,
      hash: response.data.hash,
      slotNo: response.data.slot,
      epochNo: response.data.epoch,
      epochSlotNo: response.data.epoch_slot,
      slotLeader: response.data.slot_leader,
      txCount: response.data.tx_count,
      totalOutput: response.data.output,
      totalFees: response.data.fees,
      maxEpochSlot: 0,
      poolName: "",
      poolTicker: "",
      poolView: "",
      description: ""
    };
    return {
      data: block,
      lastUpdated: Date.now()
    } as ApiReturnType<Block>;
  }

  async getTxList(blockId: number | string): Promise<ApiReturnType<Transaction[]>> {
    const response = await axios.get<{ tx_hash: string }[]>(`${this.baseUrl}/blocks/${blockId}/txs`);
    const txs: Transaction[] = [];
    for (const tx of response.data) {
      // get transaction detail
      txs.push((await this.getTx(tx.tx_hash)).data as Transaction);
    }
    return {
      data: txs,
      total: txs.length,
      totalPage: 1, // TODO
      currentPage: 1, // TODO
      lastUpdated: Date.now()
    } as ApiReturnType<Transaction[]>;
  }

  async getTx(txHash: string): Promise<ApiReturnType<Transaction>> {
    const response = await axios.get<TransactionDetails>(`${this.baseUrl}/txs/${txHash}`);
    const txDetails = response.data;
    const block = await this.getBlockDetail(txDetails.blockHeight!);
    const tx: Transaction = {
      tx: {
        hash: txDetails.hash!,
        time: block.data?.time || "",
        blockNo: block.data?.blockNo || 0,
        epochSlot: block.data?.epochSlotNo || 0,
        epochNo: block.data?.epochNo || 0,
        status: txDetails.invalid ? TRANSACTION_STATUS.SUCCESS : TRANSACTION_STATUS.FAILED,
        confirmation: 0, // TODO: need to implement
        fee: txDetails.fees!,
        totalOutput: txDetails.totalOutput!,
        maxEpochSlot: 0, // TODO: need to implement
        slotNo: block.data?.slotNo || 0
      },
      utxOs: {
        inputs: txDetails.inputs!.map((input) => {
          return mapTxUtxoToUtxo(input);
        }),
        outputs: response.data.outputs!.map((output) => {
          return mapTxUtxoToUtxo(output);
        })
      },
      summary: {
        stakeAddress: txDetails.inputs!.map((input) => {
          return {
            address: input.stakeAddress || "",
            value: 0, // TODO: need to implement
            tokens: [] // TODO: need to implement
          };
        })
      },
      metadataHash: "" // TODO
    };
    return {
      data: tx,
      lastUpdated: Date.now()
    } as ApiReturnType<Transaction>;
  }
}
