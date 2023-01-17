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