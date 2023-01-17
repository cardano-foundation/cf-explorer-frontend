type TAddPrivateNote = {
  txHash: string;
  note: string;
};

type TCurrentNote = {
  hash: string;
  note: string;
  id: number;
};

type TPrivateNote = {
  createdDate: string;
  id: number;
  note: string;
  txHash: string;
};

type TEditPrivateNote = {
  note: string;
  noteId: number;
};

type TEditUser = {
  email?: string;
  username?: string;
};

type TGetNonce = {
  address: string;
};

type TCheckExistEmail = {
  email: string;
};

type TCheckExistUsername = {
  username: string;
};

type TRefreshToken = {
  refreshJwt: string;
};

type TTransferWallet = {
  username?: string;
  wallet: {
    address?: string;
    walletName?: string;
    networkType: NETWORK_TYPES;
    networkId: NETWORK_TYPES;
  };
  refreshToken: string;
};

type TSignIn = {
  address: string;
  signature: string;
  ipAddress: string;
};
