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

  static Blocks = class {
    public static get Base() {
      return `${BlockFrost.BASE_MAIN_NET_URL}/blocks`;
    }
    public static get Latest() {
      return `${BlockFrost.Blocks.Base}/latest`;
    }
  };
  static Epochs = class {
    public static get Base() {
      return `${BlockFrost.BASE_MAIN_NET_URL}/epochs`;
    }
    public static get Latest() {
      return `${BlockFrost.Epochs.Base}/latest`;
    }
  };

  static Transaction = class {
    public static get Base() {
      return `${BlockFrost.BASE_MAIN_NET_URL}/txs`;
    }
    public static get Contract() {
      return `${BlockFrost.Transaction.Base}/:hash/redeemers`;
    }
    public static get StakeCert() {
      return `${BlockFrost.Transaction.Base}/:hash/stakes`;
    }
    public static get RegisPoolCert() {
      return `${BlockFrost.Transaction.Base}/:hash/pool_updates`;
    }
    public static get DeregisPoolCert() {
      return `${BlockFrost.Transaction.Base}/:hash/pool_retires`;
    }
    public static get DelegationCert() {
      return `${BlockFrost.Transaction.Base}/:hash/delegations`;
    }
    public static get InstantaneousReward() {
      return `${BlockFrost.Transaction.Base}/:hash/mirs`;
    }
  };
  static Pools = class {
    public static get Base() {
      return `${BlockFrost.BASE_MAIN_NET_URL}/pools`;
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
  static Transactions = class {
    public static get Base() {
      return `${Koios.BASE_MAIN_NET_URL}/tx_info`;
    }
  };
}
