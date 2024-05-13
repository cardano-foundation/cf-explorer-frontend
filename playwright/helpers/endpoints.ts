import * as process from "process";

export class CardanoFoundation {
  static readonly BASE_URL = process.env.API_URL;

  static SignIn = class {
    public static get Base() {
      return `${CardanoFoundation.BASE_URL}/auth/sign-in`;
    }
  };
}

export class BlockFrost {
  static readonly BASE_MAIN_NET_URL = process.env.BLOCKFROST_API_URL;

  static BLOCKS = class {
    public static get Base() {
      return `${BlockFrost.BASE_MAIN_NET_URL}/blocks`;
    }
  };
  static EPOCHS = class {
    public static get Base() {
      return `${BlockFrost.BASE_MAIN_NET_URL}/epochs`;
    }
  };
}

export class Koios {
  static readonly BASE_MAIN_NET_URL = process.env.KOIOS_API_URL;

  static getEpochById = class {
    public static get Base() {
      return `${Koios.BASE_MAIN_NET_URL}/epoch_info`;
    }
  };
}
