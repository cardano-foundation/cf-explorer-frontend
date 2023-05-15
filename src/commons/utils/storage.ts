import { NETWORKS, STORAGE_KEYS } from './constants';

export default class StorageUtils {
  static getItem(key: string, defaultValue?: string): string | undefined {
    return localStorage.getItem(key) ?? defaultValue;
  }
  static getNetwork(): NETWORKS {
    return this.getItem(STORAGE_KEYS.NETWORK, NETWORKS.mainnet) as NETWORKS;
  }

  static setNetwork(network: NETWORKS) {
    localStorage.setItem(STORAGE_KEYS.NETWORK, network);
  }
}
