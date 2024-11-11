import axios, { AxiosInstance } from "axios";

import { ApiConnector } from "../ApiConnector";
import { ApiReturnType } from "../types/APIReturnType";
import { TRANSACTION_STATUS } from "../../utils/constants";
import { BlockDto, BlocksPage, TransactionDetails, TransactionSummary, Epoch, EpochNo, TransactionPage } from "./types";
import { mapBlockDTOToBlock, mapTxUtxoToCollateralResponse, mapTxUtxoToUtxo } from "./mapper/Mapper";
import applyCaseMiddleware from "axios-case-converter";

export class YaciConnector implements ApiConnector {
  baseUrl: string;
  client: AxiosInstance;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    this.client = applyCaseMiddleware(axios.create());
  }

  async getBlocks(): Promise<ApiReturnType<Block[]>> {
    const response = await this.client.get<BlocksPage>(`${this.baseUrl}/blocks`);
    const blocks: Block[] = [];
    // getting additional data
    for (const block of response.data.blocks!) {
      blocks.push((await this.getBlockDetail(block.number!)).data as Block);
    }
    return {
      data: blocks,
      total: response.data.total,
      totalPage: response.data.totalPages,
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
    const response = await this.client.get<BlockDto>(`${this.baseUrl}/blocks/${blockId}`);
    const block: Block = mapBlockDTOToBlock(response.data);
    return {
      data: block,
      lastUpdated: Date.now()
    } as ApiReturnType<Block>;
  }

  async getTxList(blockId: number | string): Promise<ApiReturnType<Transaction[]>> {
    const response = await this.client.get<TransactionSummary[]>(`${this.baseUrl}/blocks/${blockId}/txs`);
    const txs: Transaction[] = [];
    for (const tx of response.data) {
      // get transaction detail
      txs.push((await this.getTx(tx.txHash!)).data as Transaction);
    }
    return {
      data: txs,
      total: txs.length,
      totalPage: 1, // TODO
      currentPage: 1, // TODO
      lastUpdated: Date.now()
    } as ApiReturnType<Transaction[]>;
  }

  async getCurrentEpoch(): Promise<ApiReturnType<EpochCurrentType>> {
    const epochResponse = await this.client.get<Epoch>(`${this.baseUrl}/epochs/latest/details`);
    const epoch = epochResponse.data;
    const epochCurrentType: EpochCurrentType = {
      no: epoch.number || 0,
      slot: epoch.maxSlot || 0,
      totalSlot: epoch.maxSlot || 0, // TODO: need to implement
      account: 0,
      endTime: epoch.endTime ? epoch.endTime.toString() : "",
      startTime: epoch.startTime ? epoch.startTime.toString() : "",
      circulatingSupply: 0, // TODO: need to implement
      syncingProgress: 0, // TODO: need to implement
      blkCount: epoch.blockCount || 0
    };
    return {
      data: epochCurrentType,
      error: null
    };
  }

  async getTx(txHash: string): Promise<ApiReturnType<Transaction>> {
    const response = await this.client.get<TransactionDetails>(`${this.baseUrl}/txs/${txHash}`);
    const txDetails = response.data;
    const blockResponse = await this.getBlockDetail(txDetails.blockHeight!);
    const block = blockResponse.data;
    const tx: Transaction = {
      tx: {
        hash: txDetails.hash!,
        time: block ? block.time : "",
        blockNo: block ? block.blockNo : 0,
        epochSlot: block ? block.epochSlotNo : 0,
        epochNo: block ? block.epochNo : 0,
        status: txDetails.invalid ? TRANSACTION_STATUS.FAILED : TRANSACTION_STATUS.SUCCESS,
        confirmation: 0, // TODO: need to implement
        fee: txDetails.fees || 0,
        totalOutput: txDetails.totalOutput || 0,
        maxEpochSlot: 0, // TODO: need to implement
        slotNo: block ? block.slotNo : 0
      },
      utxOs: {
        inputs: txDetails.inputs!.map((input) => {
          return mapTxUtxoToUtxo(input);
        }),
        outputs: response.data.outputs!.map((output) => {
          return mapTxUtxoToUtxo(output);
        })
      },
      collaterals: {
        collateralInputResponses: txDetails.collateralInputs
          ? txDetails.collateralInputs.map((input) => {
              return mapTxUtxoToCollateralResponse(input);
            })
          : [],
        collateralOutputResponses: [] // TODO: need to implement
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

  async getTransactions(): Promise<ApiReturnType<Transactions[]>> {
    const txsResponse = await this.client.get<TransactionPage>(`${this.baseUrl}/txs`);

    const transactions: Transactions[] = [];
    for (const txSummary of txsResponse.data.transactionSummaries!) {
      const block = await this.getBlockDetail(txSummary.blockNumber!);
      const tx: Transactions = {
        hash: txSummary.txHash || "",
        time: block.data?.time || "", // TODO: need to implement
        blockNo: txSummary.blockNumber || 0,
        blockHash: block.data?.hash || "", // TODO: need to implement
        fee: txSummary.fee || 0,
        epochNo: block.data?.epochNo || 0, // TODO: need to implement
        epochSlotNo: block.data?.epochSlotNo || 0, // TODO: need to implement
        slot: block.data?.slotNo || 0, // TODO: need to implement
        totalOutput: txSummary.totalOutput || 0,
        addressesOutput: txSummary.outputAddresses || [],
        addressesInput: [],
        balance: 0,
        tokens: [] // TODO: need to implement
      };
      transactions.push(tx);
    }
    return {
      data: transactions,
      lastUpdated: Date.now()
    } as ApiReturnType<Transactions[]>;
  }
}
