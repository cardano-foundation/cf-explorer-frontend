import { YaciConnector } from "./yaciConnector";
import { ApiReturnType } from "./types/APIReturnType";

export abstract class ApiConnector {
  baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  public static getApiConnector(): ApiConnector {
    return new YaciConnector("https://api.mainnet.yaci.xyz/api/v1");
  }

  abstract getBlocks(): Promise<ApiReturnType<Block[]>>;

  abstract getBlockDetail(blockId: string): Promise<ApiReturnType<Block>>;

  abstract getTxList(blockId: number | string): Promise<ApiReturnType<Transaction[]>>;

  abstract getTx(txHash: string): Promise<ApiReturnType<Transaction>>;
}
