type TAddPrivateNote = {
  txHash: string;
  note: string;
  network: NETWORK_TYPES;
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

type TGetInfo = {
  network: NETWORK_TYPES;
};

type TGetNonce = {
  address: string;
  walletName: string;
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
  refreshJwt: string;
};

type TSignIn = {
  address?: string;
  signature?: string;
  username?: string;
  password?: string;
  type: number;
};

type TSignOut = {
  refreshJwt: string;
  username: string;
};

type TSignUp = {
  username: string;
  email: string;
  password: string;
  role: string;
};

type TVerifyActive = {
  code: string;
};

type TForgotPassword = {
  email: string;
};
type TResetPassword = {
  code: string;
  password: string;
};

interface NonceObject {
  message: "SS_0" | "SS_1";
  nonce: string;
  userId: number;
  walletId: number;
}
