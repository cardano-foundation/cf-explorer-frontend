export default class StorageUtils {
  static getItem(key: string, defaultValue?: string): string | undefined {
    return localStorage.getItem(key) ?? defaultValue;
  }
}
